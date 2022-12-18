import { Config, EnqueuedTaskObject } from './types';
declare type queryParams<T> = {
    [key in keyof T]: string;
};
declare function toQueryParams<T extends object>(parameters: T): queryParams<T>;
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
    get(url: string, params?: {
        [key: string]: any;
    }, config?: Record<string, any>): Promise<void>;
    get<T = any>(url: string, params?: {
        [key: string]: any;
    }, config?: Record<string, any>): Promise<T>;
    post<T = any, R = EnqueuedTaskObject>(url: string, data?: T, params?: {
        [key: string]: any;
    }, config?: Record<string, any>): Promise<R>;
}
export { HttpRequests, toQueryParams };
//# sourceMappingURL=http-requests.d.ts.map