// Type definitions for meilisearch
// Project: https://github.com/meilisearch/meilisearch-js
// Definitions by: qdequele <quentin@meilisearch.com> <https://github.com/meilisearch>
// Definitions: https://github.com/meilisearch/meilisearch-js
// TypeScript Version: ^3.8.3
/*
 * SEARCH PARAMETERS
 */
const MatchingStrategies = {
    ALL: 'all',
    LAST: 'last',
};

class MeiliSearchCommunicationError extends Error {
    constructor(message, body, url, stack) {
        super(message);
        // Make errors comparison possible. ex: error instanceof MeiliSearchCommunicationError.
        Object.setPrototypeOf(this, MeiliSearchCommunicationError.prototype);
        this.name = 'MeiliSearchCommunicationError';
        if (body instanceof Response) {
            this.message = body.statusText;
            this.statusCode = body.status;
        }
        if (body instanceof Error) {
            this.errno = body.errno;
            this.code = body.code;
        }
        if (stack) {
            this.stack = stack;
            this.stack = this.stack?.replace(/(TypeError|FetchError)/, this.name);
            this.stack = this.stack?.replace('Failed to fetch', `request to ${url} failed, reason: connect ECONNREFUSED`);
            this.stack = this.stack?.replace('Not Found', `Not Found: ${url}`);
        }
    }
}

const MeiliSearchApiError = class extends Error {
    constructor(error, status) {
        super(error.message);
        // Make errors comparison possible. ex: error instanceof MeiliSearchApiError.
        Object.setPrototypeOf(this, MeiliSearchApiError.prototype);
        this.name = 'MeiliSearchApiError';
        this.code = error.code;
        this.type = error.type;
        this.link = error.link;
        this.message = error.message;
        this.httpStatus = status;
    }
};

async function httpResponseErrorHandler(response) {
    if (!response.ok) {
        let responseBody;
        try {
            // If it is not possible to parse the return body it means there is none
            // In which case it is a communication error with the Meilisearch instance
            responseBody = await response.json();
        }
        catch (e) {
            // Not sure on how to test this part of the code.
            throw new MeiliSearchCommunicationError(response.statusText, response, response.url);
        }
        // If the body is parsable, then it means Meilisearch returned a body with
        // information on the error.
        throw new MeiliSearchApiError(responseBody, response.status);
    }
    return response;
}
function httpErrorHandler(response, stack, url) {
    if (response.name !== 'MeiliSearchApiError') {
        throw new MeiliSearchCommunicationError(response.message, response, url, stack);
    }
    throw response;
}

class MeiliSearchError extends Error {
    constructor(message) {
        super(message);
        // Make errors comparison possible. ex: error instanceof MeiliSearchError.
        Object.setPrototypeOf(this, MeiliSearchError.prototype);
        this.name = 'MeiliSearchError';
    }
}

class MeiliSearchTimeOutError extends Error {
    constructor(message) {
        super(message);
        // Make errors comparison possible. ex: error instanceof MeiliSearchTimeOutError.
        Object.setPrototypeOf(this, MeiliSearchTimeOutError.prototype);
        this.name = 'MeiliSearchTimeOutError';
    }
}

/**
 * Removes undefined entries from object
 */
function removeUndefinedFromObject(obj) {
    return Object.entries(obj).reduce((acc, curEntry) => {
        const [key, val] = curEntry;
        if (val !== undefined)
            acc[key] = val;
        return acc;
    }, {});
}
function addProtocolIfNotPresent(host) {
    if (!(host.startsWith('https://') || host.startsWith('http://'))) {
        return `http://${host}`;
    }
    return host;
}
function addTrailingSlash(url) {
    if (!url.endsWith('/')) {
        url += '/';
    }
    return url;
}

const PACKAGE_VERSION = '0.30.0';

function constructHostURL(host) {
    try {
        host = addProtocolIfNotPresent(host);
        host = addTrailingSlash(host);
        return host;
    }
    catch (e) {
        throw new MeiliSearchError('The provided host is not valid.');
    }
}
function createHeaders(config) {
    const agentHeader = 'X-Meilisearch-Client';
    const packageAgent = `Meilisearch JavaScript (v${PACKAGE_VERSION})`;
    const contentType = 'Content-Type';
    config.headers = config.headers || {};
    const headers = Object.assign({}, config.headers); // Create a hard copy and not a reference to config.headers
    if (config.apiKey) {
        headers['Authorization'] = `Bearer ${config.apiKey}`;
    }
    if (!config.headers[contentType]) {
        headers['Content-Type'] = 'application/json';
    }
    // Creates the custom user agent with information on the package used.
    if (config.clientAgents && Array.isArray(config.clientAgents)) {
        const clients = config.clientAgents.concat(packageAgent);
        headers[agentHeader] = clients.join(' ; ');
    }
    else if (config.clientAgents && !Array.isArray(config.clientAgents)) {
        // If the header is defined but not an array
        throw new MeiliSearchError(`Meilisearch: The header "${agentHeader}" should be an array of string(s).\n`);
    }
    else {
        headers[agentHeader] = packageAgent;
    }
    return headers;
}
class HttpRequests {
    constructor(config) {
        this.headers = createHeaders(config);
        try {
            const host = constructHostURL(config.host);
            this.url = new URL(host);
        }
        catch (e) {
            throw new MeiliSearchError('The provided host is not valid.');
        }
    }
    async request({ method, url, params, body, config, }) {
        const constructURL = new URL(url, this.url);
        if (params) {
            const queryParams = new URLSearchParams();
            Object.keys(params)
                .filter((x) => params[x] !== null)
                .map((x) => queryParams.set(x, params[x]));
            constructURL.search = queryParams.toString();
        }
        try {
            const response = await fetch(constructURL.toString(), {
                ...config,
                method,
                body: JSON.stringify(body),
                headers: this.headers,
            }).then((res) => httpResponseErrorHandler(res));
            const parsedBody = await response.json().catch(() => undefined);
            return parsedBody;
        }
        catch (e) {
            const stack = e.stack;
            httpErrorHandler(e, stack, constructURL.toString());
        }
    }
    async get(url, params, config) {
        return await this.request({
            method: 'GET',
            url,
            params,
            config,
        });
    }
    async post(url, data, params, config) {
        return await this.request({
            method: 'POST',
            url,
            body: data,
            params,
            config,
        });
    }
}

/*
 * Bundle: MeiliSearch / Indexes
 * Project: MeiliSearch - Javascript API
 * Author: Quentin de Quelen <quentin@meilisearch.com>
 * Copyright: 2019, MeiliSearch
 */
class Index {
    /**
     * @param {Config} config Request configuration options
     * @param {string} uid UID of the index
     * @param {string} [primaryKey] Primary Key of the index
     */
    constructor(config, uid) {
        this.uid = uid;
        this.httpRequest = new HttpRequests(config);
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
    async search(query, options, config) {
        const url = `indexes/${this.uid}/search`;
        return await this.httpRequest.post(url, removeUndefinedFromObject({ q: query, ...options }), undefined, config);
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
    async searchGet(query, options, config) {
        const url = `indexes/${this.uid}/search`;
        const parseFilter = (filter) => {
            if (typeof filter === 'string')
                return filter;
            else if (Array.isArray(filter))
                throw new MeiliSearchError('The filter query parameter should be in string format when using searchGet');
            else
                return undefined;
        };
        const getParams = {
            q: query,
            ...options,
            filter: parseFilter(options?.filter),
            sort: options?.sort?.join(','),
            facets: options?.facets?.join(','),
            attributesToRetrieve: options?.attributesToRetrieve?.join(','),
            attributesToCrop: options?.attributesToCrop?.join(','),
            attributesToHighlight: options?.attributesToHighlight?.join(','),
        };
        return await this.httpRequest.get(url, removeUndefinedFromObject(getParams), config);
    }
}

/*
 * Bundle: MeiliSearch
 * Project: MeiliSearch - Javascript API
 * Author: Quentin de Quelen <quentin@meilisearch.com>
 * Copyright: 2019, MeiliSearch
 */
class Client {
    /**
     * Creates new MeiliSearch instance
     * @param {Config} config Configuration object
     */
    constructor(config) {
        this.config = config;
    }
    /**
     * Return an Index instance
     * @memberof MeiliSearch
     * @method index
     * @template T
     * @param {string} indexUid The index UID
     * @returns {Index<T>} Instance of Index
     */
    index(indexUid) {
        return new Index(this.config, indexUid);
    }
}

class MeiliSearch extends Client {
    constructor(config) {
        super(config);
    }
}

export { Index, MatchingStrategies, MeiliSearch, MeiliSearchApiError, MeiliSearchCommunicationError, MeiliSearchError, MeiliSearchTimeOutError, MeiliSearch as default, httpErrorHandler, httpResponseErrorHandler };
