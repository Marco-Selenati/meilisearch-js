/*
 * Bundle: MeiliSearch / Indexes
 * Project: MeiliSearch - Javascript API
 * Author: Quentin de Quelen <quentin@meilisearch.com>
 * Copyright: 2019, MeiliSearch
 */

'use strict'

import { MeiliSearchError } from './errors'

import {
  Config,
  SearchResponse,
  SearchParams,
  Filter,
  SearchRequestGET,
} from './types'
import { removeUndefinedFromObject } from './utils'
import { HttpRequests } from './http-requests'

class Index<T extends Record<string, any> = Record<string, any>> {
  uid: string
  createdAt: Date | undefined
  updatedAt: Date | undefined
  httpRequest: HttpRequests

  /**
   * @param {Config} config Request configuration options
   * @param {string} uid UID of the index
   * @param {string} [primaryKey] Primary Key of the index
   */
  constructor(config: Config, uid: string) {
    this.uid = uid
    this.httpRequest = new HttpRequests(config)
  }

  ///
  /// SEARCH
  ///

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
  async search<D = T>(
    query?: string | null,
    options?: SearchParams,
    config?: Partial<Request>
  ): Promise<SearchResponse<D>> {
    const url = `indexes/${this.uid}/search`

    return await this.httpRequest.post(
      url,
      removeUndefinedFromObject({ q: query, ...options }),
      undefined,
      config
    )
  }

  /**
   * Search for documents into an index using the GET method
   * @memberof Index
   * @method search
   * @template T
   * @param {string | null} query? Query string
   * @param {SearchParams} options? Search options
   * @param {Partial<Request>} config? Additional request configuration options
   * @returns {Promise<SearchResponse<T>>} Promise containing the search response
   */
  async searchGet<D = T>(
    query?: string | null,
    options?: SearchParams,
    config?: Partial<Request>
  ): Promise<SearchResponse<D>> {
    const url = `indexes/${this.uid}/search`

    const parseFilter = (filter?: Filter): string | undefined => {
      if (typeof filter === 'string') return filter
      else if (Array.isArray(filter))
        throw new MeiliSearchError(
          'The filter query parameter should be in string format when using searchGet'
        )
      else return undefined
    }

    const getParams: SearchRequestGET = {
      q: query,
      ...options,
      filter: parseFilter(options?.filter),
      sort: options?.sort?.join(','),
      facets: options?.facets?.join(','),
      attributesToRetrieve: options?.attributesToRetrieve?.join(','),
      attributesToCrop: options?.attributesToCrop?.join(','),
      attributesToHighlight: options?.attributesToHighlight?.join(','),
    }

    return await this.httpRequest.get<SearchResponse<D>>(
      url,
      removeUndefinedFromObject(getParams),
      config
    )
  }
}

export { Index }
