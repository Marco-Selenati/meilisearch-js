import { MeiliSearchErrorInfo } from '../types';
declare const MeiliSearchApiError: {
    new (error: MeiliSearchErrorInfo, status: number): {
        httpStatus: number;
        code: string;
        link: string;
        type: string;
        stack?: string | undefined;
        name: string;
        message: string;
        cause?: Error | undefined;
    };
};
export { MeiliSearchApiError };
//# sourceMappingURL=meilisearch-api-error.d.ts.map