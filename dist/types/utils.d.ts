/**
 * Removes undefined entries from object
 */
declare function removeUndefinedFromObject(obj: Record<string, any>): object;
declare function sleep(ms: number): Promise<void>;
declare function addProtocolIfNotPresent(host: string): string;
declare function addTrailingSlash(url: string): string;
declare function validateUuid4(uuid: string): boolean;
export { sleep, removeUndefinedFromObject, addProtocolIfNotPresent, addTrailingSlash, validateUuid4, };
//# sourceMappingURL=utils.d.ts.map