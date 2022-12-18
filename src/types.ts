// Type definitions for meilisearch
// Project: https://github.com/meilisearch/meilisearch-js
// Definitions by: qdequele <quentin@meilisearch.com> <https://github.com/meilisearch>
// Definitions: https://github.com/meilisearch/meilisearch-js
// TypeScript Version: ^3.8.3

export type Config = {
  host: string
  apiKey?: string
  clientAgents?: string[]
  headers?: Record<string, any>
}

///
/// Resources
///

type Pagination = {
  offset?: number
  limit?: number
}

/*
 * SEARCH PARAMETERS
 */

const MatchingStrategies = {
  ALL: 'all',
  LAST: 'last',
}

type MatchingStrategies =
  typeof MatchingStrategies[keyof typeof MatchingStrategies]

type Filter = string | Array<string | string[]>

type Query = {
  q?: string | null
}

type Highlight = {
  attributesToHighlight?: string[]
  highlightPreTag?: string
  highlightPostTag?: string
}

type Crop = {
  attributesToCrop?: string[]
  cropLength?: number
  cropMarker?: string
}

export type SearchParams = Query &
  Pagination &
  Highlight &
  Crop & {
    filter?: Filter
    sort?: string[]
    facets?: string[]
    attributesToRetrieve?: string[]
    showMatchesPosition?: boolean
    matchingStrategy?: MatchingStrategies
    hitsPerPage?: number
    page?: number
  }

type CategoriesDistribution = {
  [category: string]: number
}

type Facet = string
type FacetDistribution = Record<Facet, CategoriesDistribution>
type MatchesPosition<T> = Partial<
  Record<keyof T, Array<{ start: number; length: number }>>
>

type Hit<T extends Record<string, any>> = T & {
  _formatted?: Partial<T>
  _matchesPosition?: MatchesPosition<T>
}

export type Hits<T extends Record<string, any>> = Array<Hit<T>>

export type SearchResponse<T extends Record<string, any>> = {
  hits: Hits<T>
  processingTimeMs: number
  facetDistribution?: FacetDistribution
  query: string
  totalHits?: number
  hitsPerPage?: number
  page?: number
  totalPages?: number
  offset?: number
  limit?: number
  estimatedTotalHits?: number
}

/*
 ** TASKS
 */

const enum TaskStatus {
  TASK_SUCCEEDED = 'succeeded',
  TASK_PROCESSING = 'processing',
  TASK_FAILED = 'failed',
  TASK_ENQUEUED = 'enqueued',
}

const enum TaskTypes {
  INDEX_CREATION = 'indexCreation',
  INDEX_UPDATE = 'indexUpdate',
  INDEX_DELETION = 'indexDeletion',
  DOCUMENTS_ADDITION_OR_UPDATE = 'documentAdditionOrUpdate',
  DOCUMENT_DELETION = 'documentDeletion',
  SETTINGS_UPDATE = 'settingsUpdate',
  INDEXES_SWAP = 'indexSwap',
  TASK_DELETION = 'taskDeletion',
  SNAPSHOT_CREATION = 'snapshotCreation',
  TASK_CANCELATION = 'taskCancelation',
}

export type EnqueuedTaskObject = {
  taskUid: number
  indexUid?: string
  status: TaskStatus
  type: TaskTypes
  enqueuedAt: string
  canceledBy: number
}

/*
 ** ERROR HANDLER
 */

export interface FetchError extends Error {
  type: string
  errno: string
  code: string
}

export type MeiliSearchErrorInfo = {
  code: string
  link: string
  message: string
  type: string
}
