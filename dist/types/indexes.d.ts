import { Config, SearchResponse, SearchParams } from './types';
import { HttpRequests } from './http-requests';
declare class Index<T extends Record<string, any> = Record<string, any>> {
    uid: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    httpRequest: HttpRequests;
    /**
     * @param {Config} config Request configuration options
     * @param {string} uid UID of the index
     * @param {string} [primaryKey] Primary Key of the index
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
    search<D = T>(query?: string | null, options?: SearchParams, config?: Partial<Request>): Promise<SearchResponse<D>>;
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
    searchGet<D = T>(query?: string | null, options?: SearchParams, config?: Partial<Request>): Promise<SearchResponse<D>>;
}
export { Index };
//# sourceMappingURL=indexes.d.ts.map