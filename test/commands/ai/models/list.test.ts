import {expect} from 'chai'
import {stderr, stdout} from 'stdout-stderr'
import Cmd from '../../../../src/commands/ai/models/list'
import stripAnsi from '../../../helpers/strip-ansi'
import {runCommand} from '../../../run-command'
import {availableModels} from '../../../helpers/fixtures'
import nock from 'nock'

describe('ai:models:list', function () {
  let herokuAI: nock.Scope

  beforeEach(function () {
    herokuAI = nock('https://inference.heroku.com')
  })

  afterEach(function () {
    herokuAI.done()
    nock.cleanAll()
  })

  it('displays all available models', async function () {
    herokuAI
      .get('/available-models')
      .reply(200, availableModels)

    await runCommand(Cmd)
      .then(() => expect(stdout.output).to.contain('stable-diffusion-xl       Text to image'))
      .then(() => expect(stdout.output).to.contain('claude-3-5-sonnet         Text to text'))
      .then(() => expect(stdout.output).to.contain('claude-3-opus             Text to text'))
      .then(() => expect(stdout.output).to.contain('claude-3-sonnet           Text to text'))
      .then(() => expect(stdout.output).to.contain('claude-3-haiku            Text to text'))
      .then(() => expect(stdout.output).to.contain('cohere-embed-english      Text to text, Embedding'))
      .then(() => expect(stdout.output).to.contain('cohere-embed-multilingual Text to text, Embedding'))
      .then(() => expect(stdout.output).to.contain('See https://devcenter.heroku.com/articles/rainbow-unicorn-princess-models for more info'))
      .then(() => expect(stderr.output).to.eq(''))
  })

  it('warns if no models are available', async function () {
    const statusURL = 'https://status.heroku.com/'
    const modelsDevCenterURL = 'https://devcenter.heroku.com/articles/rainbow-unicorn-princess-models'

    herokuAI
      .get('/available-models')
      .reply(200, [])

    await runCommand(Cmd)
      .then(() => expect(stdout.output).to.eq(''))
      .then(() => expect(stripAnsi(stderr.output)).to.contain('Failed to retrieve the list of available models.'))
      .then(() => expect(stripAnsi(stderr.output)).to.contain(statusURL))
      .then(() => expect(stripAnsi(stderr.output)).to.contain(modelsDevCenterURL))
  })
})
