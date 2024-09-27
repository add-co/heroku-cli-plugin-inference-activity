import color from '@heroku-cli/color'
import {flags} from '@heroku-cli/command'
import {Args, ux} from '@oclif/core'
import Command from '../../../lib/base'
import {ModelResource} from '../../../lib/ai/types'
import appAddons from '../../../lib/ai/models/app_addons'
import * as Heroku from '@heroku-cli/schema'

export default class Info extends Command {
  static description = 'get the current status of all the AI model resources attached to your app or a specific resource'
  static examples = [
    'heroku ai:models:info claude-3-5-sonnet-acute-04281 --app example-app',
    'heroku ai:models:info --app example-app',
  ]

  static flags = {
    app: flags.app({required: true}),
    remote: flags.remote(),
  }

  static args = {
    modelResource: Args.string({description: 'The resource ID or alias of the model resource to check.'}),
  }

  public async run(): Promise<any> {
    const {args, flags} = await this.parse(Info)
    const {app} = flags
    const {modelResource} = args
    const synthesizedModels: any = []

    const modelInfo = async () => {
      const modelInfoResponse = await this.herokuAI.get<ModelResource>(`/models/${this.apiModelId}`, {
        headers: {authorization: `Bearer ${this.apiKey}`},
      })
        .catch(error => {
          console.log('WE ARE HERE4')
          if (error.statusCode === 404) {
            ux.warn(`We can’t find a model resource called ${color.yellow(modelResource)}.\nRun ${color.cmd('heroku ai:models:info -a <app>')} to see a list of model resources.`)
          } else {
            throw error
          }
        })

      return modelInfoResponse
    }

    const getModelDetails = async (collectedModels: Array<Heroku.AddOn> | string) => {
      if (typeof collectedModels === 'string') {
        const modelResource = collectedModels
        await this.configureHerokuAIClient(modelResource, app)

        const modelResourceResponse = await modelInfo()
        synthesizedModels.push(modelResourceResponse)
      } else {
        for (const addonModel of collectedModels) {
          await this.configureHerokuAIClient(addonModel.modelResource, app)

          const modelResourceResponse = await modelInfo()
          const {body: currentModelResource} = modelResourceResponse || {body: null}
          synthesizedModels.push(currentModelResource)
        }
      }

      return synthesizedModels
    }

    if (modelResource) {
      const listOfProvisionedModels = await getModelDetails(modelResource)
      console.log('listOfProvisionedModels', listOfProvisionedModels)
    } else {
      const provisionedModelsInfo: Record<string, string | undefined>[] = []
      const inferenceRegex = /inference/
      const addonsResponse = await appAddons(this.config, app)

      for (const addonInfo of addonsResponse as Array<Heroku.AddOn>) {
        const addonType = addonInfo.addon_service?.name || ''
        const isModelAddon = inferenceRegex.test(addonType)

        if (isModelAddon) {
          provisionedModelsInfo.push({
            addonName: addonInfo.addon_service?.name,
            modelResource: addonInfo.name,
            modelId: addonInfo.addon_service?.id,
          })
        }
      }

      const listOfProvisionedModels = await getModelDetails(provisionedModelsInfo)

      console.log('listOfProvisionedModels', listOfProvisionedModels)
      // console.log('provisionedModelsInfo', provisionedModelsInfo)
    }

    // this.displayModelResource()
  }

  // pass this function when iterating through model resources
  displayModelResource(modelResource: ModelResource) {
    ux.styledObject({
      'Base Model ID': modelResource.plan,
      Ready: modelResource.ready,
      'Tokens In': modelResource.tokens_in,
      'Tokens Out': modelResource.tokens_out,
      'Avg Performance': modelResource.avg_performance,
    })
  }
}
