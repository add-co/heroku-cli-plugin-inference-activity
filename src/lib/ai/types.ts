/**
 * API reference doc: https://salesforce.quip.com/xi1fAHQczNbO
 */

/**
 * Model names and types
 */
export type ModelName =
  'claude-3-5-sonnet' |
  'claude-3-5-sonnet-latest' |
  'claude-3-haiku' |
  'claude-3-5-haiku' |
  'cohere-embed-multilingual' |
  'stable-image-ultra'

export type ModelType = 'text-to-image' | 'text-to-text' | 'text-to-embedding'

/**
 * Object schema for each collection item returned by the Model List endpoint.
 */
export type ModelListItem = {
  model_id: ModelName
  type: Array<ModelType>
}

/**
 * Collection schema for Model List endpoint responses.
 */
export type ModelList = Array<ModelListItem>

/**
 * Object schema for Model Info endpoint responses.
 */
export type ModelInfo = {
  name: ModelName
  description: string
  link: string
}

/**
 * Object schema for Model Status endpoint responses.
 */
export type ModelResource = {
  model_id: ModelName
  ready: string
  created: string
  tokens_in: string
  tokens_out?: string
  avg_performance: string
}

/**
 * OpenAI compatible response schemas for model calls
 */

/**
 * Tool call schema
 */
export type ToolCall = {
  /** The ID of the tool call. Currently, only function is supported */
  id: string
  /** The type of the tool call */
  type: string
  /** The function that the model called */
  function: {
    /** The name of the function to call */
    name: string
    /** The arguments to call the function with, as generated by the model in JSON format */
    arguments: string
  }
}

/**
 * Log probability token schema
 */
export type LogProbToken = {
  /** The token */
  token: string
  /** The log probability of this token */
  logprob: number
  /** The encoded bytes representing the token */
  bytes: Array<number> | null
}

/**
 * Log probability schema
 */
export type LogProb = LogProbToken & {
  /** List of the most likely tokens and their log probability */
  top_logprobs: Array<LogProbToken> | null
}

/**
 * Chat completion choice schema
 */
export type ChatCompletionChoice = {
  /** The reason the model stopped generating tokens */
  readonly finish_reason: 'stop' | 'length' | 'content_filter' | 'tool_calls'
  /** The index of the choice in the list of choices */
  readonly index: number
  /** A chat completion message generated by the model */
  readonly message: {
    /** The contents of the message */
    readonly content: string | null
    /** The refusal message generated by the model */
    readonly refusal: string | null
    readonly tool_calls?: Array<ToolCall> | null
    /** The role of the author of this message */
    readonly role: string
  }
  /** Log probability information for the choice */
  readonly logprobs?: {
    /** A list of message content tokens with log probability information */
    content: Array<LogProb> | null
    /** A list of message refusal tokens with log probability information */
    refusal: Array<LogProb> | null
  } | null
}

/**
 * Chat completion response schema.
 */
export type ChatCompletionResponse = {
  /** A unique identifier for the chat completion */
  readonly id: string
  /** A list of chat completion choices. Can be more than one if n is greater than 1 */
  readonly choices: Array<ChatCompletionChoice>
  /** The Unix timestamp (in seconds) of when the chat completion was created */
  readonly created: number
  /** The model used for the chat completion */
  readonly model: ModelName
  /** The service tier used for processing the request */
  readonly service_tier?: string | null
  /** This fingerprint represents the backend configuration that the model runs with */
  readonly system_fingerprint: string
  /** The object type, which is always chat.completion */
  readonly object: string
  /** Usage statistics for the completion request */
  readonly usage: {
    /** Number of tokens in the generated completion */
    readonly completion_tokens: number
    /** Number of tokens in the prompt */
    readonly prompt_tokens: number
    /** Total number of tokens used in the request (prompt + completion) */
    readonly total_tokens: number
  }
}

/**
 * Image schema
 */
export type Image = {
  /** The base64-encoded JSON of the generated image, if 'response_format' is 'b64_json' */
  readonly b64_json?: string | null
  /** The prompt that was used to generate the image, if there was any revision to the prompt */
  readonly revised_prompt: string
  /** The URL of the generated image, if 'response_format' is 'url' (default) */
  readonly url?: string | null
}

/**
 * Image response schema.
 */
export type ImageResponse = {
  /** The Unix timestamp (in seconds) of when the image was generated */
  readonly created: number
  /** A list of images */
  readonly data: Array<Image>
}

/**
 * Embedding schema
 */
export type Embedding = {
  /** The index of the embedding in the list of embeddings */
  readonly index: number
  /** The embedding vector, which is a list of floats */
  readonly embeddings: Array<number>
  /** The object type, which is always "embeddings" */
  readonly object: 'embeddings'
}

/**
 * Embedding response schema.
 */
export type EmbeddingResponse = {
  /** The object type, which is always "list" */
  readonly object: 'list'
  /** The list of Embedding objects */
  readonly data: Array<Embedding>
  /** The model used to generate the embeddings */
  readonly model: ModelName
  /** Usage statistics for embeddings generation */
  readonly usage: {
    /** Number of tokens in the generated embeddings */
    readonly completion_tokens: number
    /** Number of tokens in the prompt */
    readonly prompt_tokens: number
    /** Total number of tokens used in the request (prompt + completion) */
    readonly total_tokens: number
  }
}
