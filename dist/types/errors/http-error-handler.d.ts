import { FetchError } from '../types';
declare function httpResponseErrorHandler(response: Response): Promise<Response>;
declare function httpErrorHandler(response: FetchError, stack?: string, url?: string): Promise<void>;
export { httpResponseErrorHandler, httpErrorHandler };
//# sourceMappingURL=http-error-handler.d.ts.map