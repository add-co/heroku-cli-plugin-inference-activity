inference-activity
=====================

Inference Activity CLI plugin


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/inference-activity.svg)](https://npmjs.org/package/inference-activity)
[![Downloads/week](https://img.shields.io/npm/dw/inference-activity.svg)](https://npmjs.org/package/inference-activity)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
```sh-session
$ heroku plugins:install inference-activity
$ heroku inference-activity:COMMAND
running command...
$ heroku inference-activity --help [COMMAND]
USAGE
  $ heroku inference-activity:COMMAND
...
```
# Commands
<!-- commands -->
* [`heroku ai:models:call MODEL_RESOURCE`](#heroku-aimodelscall-model_resource)
* [`heroku ai:models:info MODEL_RESOURCE`](#heroku-aimodelsinfo-model_resource)
* [`heroku inference-activity:docs`](#heroku-inference-activitydocs)
* [`heroku inference-activity:models:call MODEL_RESOURCE`](#heroku-inference-activitymodelscall-model_resource)
* [`heroku inference-activity:models:info MODEL_RESOURCE`](#heroku-inference-activitymodelsinfo-model_resource)

## `heroku ai:models:call MODEL_RESOURCE`

make an inference request to a specific AI model resource

```
USAGE
  $ heroku ai:models:call MODEL_RESOURCE -p <value> [-a <value>] [-j] [--optfile <value>] [--opts <value>] [-o
    <value>] [-r <value>]

ARGUMENTS
  MODEL_RESOURCE  resource ID or alias of the model (the --app flag must be included if an alias is used)

FLAGS
  -a, --app=<value>      name or ID of the app (this flag is required if an alias is used for the MODEL_RESOURCE
                         argument)
  -j, --json             output response as JSON
  -o, --output=<value>   the file path where the command writes the model response
  -p, --prompt=<value>   (required) the input prompt for the model
  -r, --remote=<value>   git remote of app to use
      --optfile=<value>  additional options for model inference, provided as a JSON config file
      --opts=<value>     additional options for model inference, provided as a JSON string

DESCRIPTION
  make an inference request to a specific AI model resource

EXAMPLES
  $ heroku inference-activity:models:call my_llm --app my-app --prompt "What is the meaning of life?"

  $ heroku inference-activity:models:call diffusion --app my-app --prompt "Generate an image of a sunset" --opts '{"quality":"hd"}' -o sunset.png
```

_See code: [src/commands/ai/models/call.ts](https://github.com/add-co/heroku-cli-plugin-inference-activity/blob/v0.0.1/src/commands/ai/models/call.ts)_

## `heroku ai:models:info MODEL_RESOURCE`

get the current status of an AI model resource attached to your app

```
USAGE
  $ heroku ai:models:info MODEL_RESOURCE -a <value> [-r <value>]

ARGUMENTS
  MODEL_RESOURCE  resource ID or alias of the model resource

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  get the current status of an AI model resource attached to your app

EXAMPLES
  $ heroku ai:models:info claude-3-5-sonnet-acute-04281 --app example-app
```

_See code: [src/commands/ai/models/info.ts](https://github.com/add-co/heroku-cli-plugin-inference-activity/blob/v0.0.1/src/commands/ai/models/info.ts)_

## `heroku inference-activity:docs`

opens docs for Inference Activity in your web browser

```
USAGE
  $ heroku inference-activity:docs [--browser <value>]

FLAGS
  --browser=<value>  browser to open docs with (example: "firefox", "safari")

DESCRIPTION
  opens docs for Inference Activity in your web browser
```

_See code: [src/commands/inference-activity/docs.ts](https://github.com/add-co/heroku-cli-plugin-inference-activity/blob/v0.0.1/src/commands/inference-activity/docs.ts)_

## `heroku inference-activity:models:call MODEL_RESOURCE`

make an inference request to a specific AI model resource

```
USAGE
  $ heroku inference-activity:models:call MODEL_RESOURCE -p <value> [-a <value>] [-j] [--optfile <value>] [--opts <value>] [-o
    <value>] [-r <value>]

ARGUMENTS
  MODEL_RESOURCE  resource ID or alias of the model (the --app flag must be included if an alias is used)

FLAGS
  -a, --app=<value>      name or ID of the app (this flag is required if an alias is used for the MODEL_RESOURCE
                         argument)
  -j, --json             output response as JSON
  -o, --output=<value>   the file path where the command writes the model response
  -p, --prompt=<value>   (required) the input prompt for the model
  -r, --remote=<value>   git remote of app to use
      --optfile=<value>  additional options for model inference, provided as a JSON config file
      --opts=<value>     additional options for model inference, provided as a JSON string

DESCRIPTION
  make an inference request to a specific AI model resource

EXAMPLES
  $ heroku inference-activity:models:call my_llm --app my-app --prompt "What is the meaning of life?"

  $ heroku inference-activity:models:call diffusion --app my-app --prompt "Generate an image of a sunset" --opts '{"quality":"hd"}' -o sunset.png
```

_See code: [src/commands/inference-activity/models/call.ts](https://github.com/add-co/heroku-cli-plugin-inference-activity/blob/v0.0.1/src/commands/inference-activity/models/call.ts)_

## `heroku inference-activity:models:info MODEL_RESOURCE`

get the current status of an AI model resource attached to your app

```
USAGE
  $ heroku inference-activity:models:info MODEL_RESOURCE -a <value> [-r <value>]

ARGUMENTS
  MODEL_RESOURCE  resource ID or alias of the model resource

FLAGS
  -a, --app=<value>     (required) app to run command against
  -r, --remote=<value>  git remote of app to use

DESCRIPTION
  get the current status of an AI model resource attached to your app

EXAMPLES
  $ heroku ai:models:info claude-3-5-sonnet-acute-04281 --app example-app
```

_See code: [src/commands/inference-activity/models/info.ts](https://github.com/add-co/heroku-cli-plugin-inference-activity/blob/v0.0.1/src/commands/inference-activity/models/info.ts)_
<!-- commandsstop -->
