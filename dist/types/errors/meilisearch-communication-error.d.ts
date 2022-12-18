import { FetchError } from '../types';
declare class MeiliSearchCommunicationError extends Error {
    statusCode?: number;
    errno?: string;
    code?: string;
    stack?: string;
    constructor(message: string, body: Response | FetchError, url?: string, stack?: string);
}
export { MeiliSearchCommunicationError };
//# sourceMappingURL=meilisearch-communication-error.d.ts.map