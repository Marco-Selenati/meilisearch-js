import { FetchError } from '../types.js';
declare function httpResponseErrorHandler(response: Response): Promise<Response>;
declare function httpErrorHandler(response: FetchError, stack?: string, url?: string): Promise<void>;
export { httpResponseErrorHandler, httpErrorHandler };
