import { Index } from '../indexes';
import { Config } from '../types';
declare class Client {
    config: Config;
    /**
     * Creates new MeiliSearch instance
     * @param {Config} config Configuration object
     */
    constructor(config: Config);
    /**
     * Return an Index instance
     * @memberof MeiliSearch
     * @method index
     * @template T
     * @param {string} indexUid The index UID
     * @returns {Index<T>} Instance of Index
     */
    index<T extends Record<string, any> = any>(indexUid: string): Index<T>;
}
export { Client };
//# sourceMappingURL=client.d.ts.map