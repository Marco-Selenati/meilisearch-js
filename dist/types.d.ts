export declare type Config = {
    host: string;
    apiKey?: string;
    clientAgents?: string[];
    headers?: Record<string, any>;
};
declare type Pagination = {
    offset?: number;
    limit?: number;
};
declare const MatchingStrategies: {
    ALL: string;
    LAST: string;
};
declare type MatchingStrategies = typeof MatchingStrategies[keyof typeof MatchingStrategies];
declare type Filter = string | Array<string | string[]>;
declare type Query = {
    q?: string | null;
};
declare type Highlight = {
    attributesToHighlight?: string[];
    highlightPreTag?: string;
    highlightPostTag?: string;
};
declare type Crop = {
    attributesToCrop?: string[];
    cropLength?: number;
    cropMarker?: string;
};
export declare type SearchParams = Query & Pagination & Highlight & Crop & {
    filter?: Filter;
    sort?: string[];
    facets?: string[];
    attributesToRetrieve?: string[];
    showMatchesPosition?: boolean;
    matchingStrategy?: MatchingStrategies;
    hitsPerPage?: number;
    page?: number;
};
declare type CategoriesDistribution = {
    [category: string]: number;
};
declare type Facet = string;
declare type FacetDistribution = Record<Facet, CategoriesDistribution>;
declare type MatchesPosition<T> = Partial<Record<keyof T, Array<{
    start: number;
    length: number;
}>>>;
declare type Hit<T extends Record<string, any>> = T & {
    _formatted?: Partial<T>;
    _matchesPosition?: MatchesPosition<T>;
};
export declare type Hits<T extends Record<string, any>> = Array<Hit<T>>;
export declare type SearchResponse<T extends Record<string, any>> = {
    hits: Hits<T>;
    processingTimeMs: number;
    facetDistribution?: FacetDistribution;
    query: string;
    totalHits?: number;
    hitsPerPage?: number;
    page?: number;
    totalPages?: number;
    offset?: number;
    limit?: number;
    estimatedTotalHits?: number;
};
declare const enum TaskStatus {
    TASK_SUCCEEDED = "succeeded",
    TASK_PROCESSING = "processing",
    TASK_FAILED = "failed",
    TASK_ENQUEUED = "enqueued"
}
declare const enum TaskTypes {
    INDEX_CREATION = "indexCreation",
    INDEX_UPDATE = "indexUpdate",
    INDEX_DELETION = "indexDeletion",
    DOCUMENTS_ADDITION_OR_UPDATE = "documentAdditionOrUpdate",
    DOCUMENT_DELETION = "documentDeletion",
    SETTINGS_UPDATE = "settingsUpdate",
    INDEXES_SWAP = "indexSwap",
    TASK_DELETION = "taskDeletion",
    SNAPSHOT_CREATION = "snapshotCreation",
    TASK_CANCELATION = "taskCancelation"
}
export declare type EnqueuedTaskObject = {
    taskUid: number;
    indexUid?: string;
    status: TaskStatus;
    type: TaskTypes;
    enqueuedAt: string;
    canceledBy: number;
};
export interface FetchError extends Error {
    type: string;
    errno: string;
    code: string;
}
export declare type MeiliSearchErrorInfo = {
    code: string;
    link: string;
    message: string;
    type: string;
};
export {};
