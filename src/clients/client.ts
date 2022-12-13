/*
 * Bundle: MeiliSearch
 * Project: MeiliSearch - Javascript API
 * Author: Quentin de Quelen <quentin@meilisearch.com>
 * Copyright: 2019, MeiliSearch
 */

'use strict'

import { Index } from '../indexes'
import { Config } from '../types'

class Client {
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
  index<T extends Record<string, any> = any>(indexUid: string): Index<T> {
    return new Index<T>(this.config, indexUid)
  }
}

export { Client }
