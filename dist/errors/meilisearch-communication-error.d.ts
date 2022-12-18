import { FetchError } from '../types.js';
declare class MeiliSearchCommunicationError extends Error {
    statusCode?: number;
    errno?: string;
    code?: string;
    stack?: string;
    constructor(message: string, body: Response | FetchError, url?: string, stack?: string);
}
export { MeiliSearchCommunicationError };
