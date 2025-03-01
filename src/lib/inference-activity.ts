import axios from 'axios'

interface RequestConfig {
  method: string
  url: string
  body?: any
  params?: any
}

interface ActivityData {
  timestamp: number
  response_time: number
  status_code: number
  status_message: string
  request: any
  response: any
}

/**
 * Redacts sensitive information from request data
 * @param config The request configuration to redact
 * @returns The redacted request configuration
 */
export function redactRequest(config: RequestConfig) {
  const body = typeof config.body === 'string' ? JSON.parse(config.body) : config.body

  // Clone the body to avoid modifying the original
  let redactedBody = {...body}

  if (config.url.endsWith('/v1/chat/completions') && redactedBody?.messages) {
    redactedBody = {...redactedBody, messages: '[REDACTED]'}
  }

  if (config.url.endsWith('/v1/embeddings') && redactedBody?.input) {
    redactedBody = {...redactedBody, input: '[REDACTED]'}
  }

  if (config.url.endsWith('/v1/images/generations')) {
    if (redactedBody?.prompt) {
      redactedBody = {...redactedBody, prompt: '[REDACTED]'}
    }

    if (redactedBody?.negative_prompt) {
      redactedBody = {...redactedBody, negative_prompt: '[REDACTED]'}
    }
  }

  return {
    method: config.method,
    url: config.url,
    params: config.params,
    body: redactedBody,
  }
}

/**
 * Redacts sensitive information from response data
 * @param response The response data to redact
 * @param endpoint The API endpoint that generated the response
 * @returns The redacted response data
 */
export function redactResponse(response: any, endpoint: string) {
  // Clone the response data to avoid modifying the original
  const responseData = {...response.body}

  if (endpoint === '/v1/chat/completions' && responseData.choices) {
    responseData.choices = responseData.choices.map((choice: any) => ({
      ...choice,
      message: choice.message ? {...choice.message, content: '[REDACTED]'} : choice.message,
    }))
  }

  if (endpoint === '/v1/embeddings' && responseData.data) {
    responseData.data = responseData.data.map((item: any) => ({
      ...item,
      embedding: '[REDACTED]',
    }))
  }

  if (endpoint === '/v1/images/generations' && responseData.data) {
    responseData.data = responseData.data.map((item: any) => ({
      ...item,
      b64_json: item.b64_json ? '[REDACTED]' : undefined,
      revised_prompt: item.revised_prompt ? '[REDACTED]' : undefined,
    }))
  }

  return {
    headers: response.headers,
    data: responseData,
  }
}

/**
 * Logs inference activity to the configured endpoint
 * @param activityData The activity data to log
 * @param activityUrl The URL of the activity logging endpoint
 * @param activityKey The authentication key for the activity logging endpoint
 * @returns A promise that resolves when the activity is logged
 */
export async function logInferenceActivity(
  activityData: ActivityData,
  activityUrl: string,
  activityKey: string,
): Promise<void> {
  try {
    await axios.post(activityUrl, activityData, {
      headers: {
        Authorization: `Bearer ${activityKey}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    // Log error but don't throw to keep logging non-blocking
    console.error('Failed to send inference activity:', error instanceof Error ? error.message : 'Unknown error')
  }
}
