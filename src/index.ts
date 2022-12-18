export * from './types'
export * from './errors'

import {
  Config,
  SearchResponse,
  SearchParams,
  EnqueuedTaskObject,
} from './types'
import {
  MeiliSearchError,
  httpResponseErrorHandler,
  httpErrorHandler,
} from './errors'

export const PACKAGE_VERSION = '0.30.0'

/**
 * Removes undefined entries from object
 */
function removeUndefinedFromObject(obj: Record<string, any>): object {
  return Object.entries(obj).reduce((acc, curEntry) => {
    const [key, val] = curEntry
    if (val !== undefined) acc[key] = val
    return acc
  }, {} as Record<string, any>)
}

function addProtocolIfNotPresent(host: string): string {
  if (!(host.startsWith('https://') || host.startsWith('http://'))) {
    return `http://${host}`
  }
  return host
}

function addTrailingSlash(url: string): string {
  if (!url.endsWith('/')) {
    url += '/'
  }
  return url
}

function constructHostURL(host: string): string {
  try {
    host = addProtocolIfNotPresent(host)
    host = addTrailingSlash(host)
    return host
  } catch (e) {
    throw new MeiliSearchError('The provided host is not valid.')
  }
}

function createHeaders(config: Config): Record<string, any> {
  const agentHeader = 'X-Meilisearch-Client'
  const packageAgent = `Meilisearch JavaScript (v${PACKAGE_VERSION})`
  const contentType = 'Content-Type'
  config.headers = config.headers || {}

  const headers: Record<string, any> = Object.assign({}, config.headers) // Create a hard copy and not a reference to config.headers

  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`
  }

  if (!config.headers[contentType]) {
    headers['Content-Type'] = 'application/json'
  }

  // Creates the custom user agent with information on the package used.
  if (config.clientAgents && Array.isArray(config.clientAgents)) {
    const clients = config.clientAgents.concat(packageAgent)

    headers[agentHeader] = clients.join(' ; ')
  } else if (config.clientAgents && !Array.isArray(config.clientAgents)) {
    // If the header is defined but not an array
    throw new MeiliSearchError(
      `Meilisearch: The header "${agentHeader}" should be an array of string(s).\n`
    )
  } else {
    headers[agentHeader] = packageAgent
  }

  return headers
}

class HttpRequests {
  headers: Record<string, any>
  url: URL

  constructor(config: Config) {
    this.headers = createHeaders(config)

    try {
      const host = constructHostURL(config.host)
      this.url = new URL(host)
    } catch (e) {
      throw new MeiliSearchError('The provided host is not valid.')
    }
  }

  async request({
    method,
    url,
    params,
    body,
    config,
  }: {
    method: string
    url: string
    params?: { [key: string]: any }
    body?: any
    config?: Record<string, any>
  }) {
    const constructURL = new URL(url, this.url)
    if (params) {
      const queryParams = new URLSearchParams()
      Object.keys(params)
        .filter((x: string) => params[x] !== null)
        .map((x: string) => queryParams.set(x, params[x]))
      constructURL.search = queryParams.toString()
    }

    try {
      const response: any = await fetch(constructURL.toString(), {
        ...config,
        method,
        body: JSON.stringify(body),
        headers: this.headers,
      }).then((res) => httpResponseErrorHandler(res))
      const parsedBody = await response.json().catch(() => undefined)

      return parsedBody
    } catch (e: any) {
      const stack = e.stack
      httpErrorHandler(e, stack, constructURL.toString())
    }
  }

  async post<T = any, R = EnqueuedTaskObject>(
    url: string,
    data?: T,
    params?: { [key: string]: any },
    config?: Record<string, any>
  ): Promise<R>

  async post(
    url: string,
    data?: any,
    params?: { [key: string]: any },
    config?: Record<string, any>
  ): Promise<any> {
    return await this.request({
      method: 'POST',
      url,
      body: data,
      params,
      config,
    })
  }
}

class Index<T extends Record<string, any>> {
  uid: string
  httpRequest: HttpRequests

  /**
   * @param {Config} config Request configuration options
   * @param {string} uid UID of the index
   */
  constructor(config: Config, uid: string) {
    this.uid = uid
    this.httpRequest = new HttpRequests(config)
  }

  /**
   * Search for documents into an index
   * @memberof Index
   * @method search
   * @template T
   * @param {string | null} query? Query string
   * @param {SearchParams} options? Search options
   * @param {Partial<Request>} config? Additional request configuration options
   * @returns {Promise<SearchResponse<T>>} Promise containing the search response
   */
  async search(
    query?: string | null,
    options?: SearchParams,
    config?: Partial<Request>
  ): Promise<SearchResponse<T>> {
    const url = `indexes/${this.uid}/search`

    return await this.httpRequest.post(
      url,
      removeUndefinedFromObject({ q: query, ...options }),
      undefined,
      config
    )
  }
}

class MeiliSearch {
  config: Config

  /**
   * Creates new MeiliSearch instance
   * @param {Config} config Configuration object
   */
  constructor(config: Config) {
    this.config = config
  }

  /**
   * Return an Index instance
   * @memberof MeiliSearch
   * @method index
   * @template T
   * @param {string} indexUid The index UID
   * @returns {Index<T>} Instance of Index
   */
  index<T extends Record<string, any>>(indexUid: string): Index<T> {
    return new Index<T>(this.config, indexUid)
  }
}

export { MeiliSearch }
