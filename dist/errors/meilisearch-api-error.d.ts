import { MeiliSearchErrorInfo } from '../types.js';
declare const MeiliSearchApiError: {
    new (error: MeiliSearchErrorInfo, status: number): {
        httpStatus: number;
        code: string;
        link: string;
        type: string;
        stack?: string | undefined;
        name: string;
        message: string;
        cause?: unknown;
    };
};
export { MeiliSearchApiError };
