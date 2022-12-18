export * from './types.js';
import { httpErrorHandler, httpResponseErrorHandler } from './errors/http-error-handler.js';
import { MeiliSearchApiError } from './errors/meilisearch-api-error.js';
import { MeiliSearchCommunicationError } from './errors/meilisearch-communication-error.js';
import { MeiliSearchError } from './errors/meilisearch-error.js';
import { MeiliSearchTimeOutError } from './errors/meilisearch-timeout-error.js';
import { Config, SearchResponse, SearchParams, EnqueuedTaskObject } from './types.js';
export declare const PACKAGE_VERSION = "0.30.0";
declare class HttpRequests {
    headers: Record<string, any>;
    url: URL;
    constructor(config: Config);
    request({ method, url, params, body, config, }: {
        method: string;
        url: string;
        params?: {
            [key: string]: any;
        };
        body?: any;
        config?: Record<string, any>;
    }): Promise<any>;
    post<T = any, R = EnqueuedTaskObject>(url: string, data?: T, params?: {
        [key: string]: any;
    }, config?: Record<string, any>): Promise<R>;
}
declare class Index<T extends Record<string, any>> {
    uid: string;
    httpRequest: HttpRequests;
    /**
     * @param {Config} config Request configuration options
     * @param {string} uid UID of the index
     */
    constructor(config: Config, uid: string);
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
    search(query?: string | null, options?: SearchParams, config?: Partial<Request>): Promise<SearchResponse<T>>;
}
declare class MeiliSearch {
    config: Config;
    /**
     * Creates new MeiliSearch instance
     * @param {Config} config Configuration object
     */
    constructor(config: Config);
    /**
     * Return an Index instance
     * @memberof MeiliSearch
     * @method index
     * @template T
     * @param {string} indexUid The index UID
     * @returns {Index<T>} Instance of Index
     */
    index<T extends Record<string, any>>(indexUid: string): Index<T>;
}
export { httpErrorHandler, httpResponseErrorHandler };
export { MeiliSearchApiError };
export { MeiliSearchCommunicationError };
export { MeiliSearchError };
export { MeiliSearchTimeOutError };
export { MeiliSearch };
