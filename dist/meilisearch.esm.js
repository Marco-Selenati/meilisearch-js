const o = {
  ALL: "all",
  LAST: "last"
};
var O = /* @__PURE__ */ ((e) => (e.TASK_SUCCEEDED = "succeeded", e.TASK_PROCESSING = "processing", e.TASK_FAILED = "failed", e.TASK_ENQUEUED = "enqueued", e))(O || {}), L = /* @__PURE__ */ ((e) => (e.INDEX_CREATION = "indexCreation", e.INDEX_UPDATE = "indexUpdate", e.INDEX_DELETION = "indexDeletion", e.DOCUMENTS_ADDITION_OR_UPDATE = "documentAdditionOrUpdate", e.DOCUMENT_DELETION = "documentDeletion", e.SETTINGS_UPDATE = "settingsUpdate", e.INDEXES_SWAP = "indexSwap", e.TASK_DELETION = "taskDeletion", e.SNAPSHOT_CREATION = "snapshotCreation", e.TASK_CANCELATION = "taskCancelation", e))(L || {}), u = /* @__PURE__ */ ((e) => (e.INDEX_CREATION_FAILED = "index_creation_failed", e.INDEX_ALREADY_EXISTS = "index_already_exists", e.INDEX_NOT_FOUND = "index_not_found", e.INVALID_INDEX_UID = "invalid_index_uid", e.INDEX_NOT_ACCESSIBLE = "index_not_accessible", e.INVALID_STATE = "invalid_state", e.PRIMARY_KEY_INFERENCE_FAILED = "primary_key_inference_failed", e.INDEX_PRIMARY_KEY_ALREADY_EXISTS = "index_primary_key_already_exists", e.DOCUMENTS_FIELDS_LIMIT_REACHED = "document_fields_limit_reached", e.MISSING_DOCUMENT_ID = "missing_document_id", e.INVALID_DOCUMENT_ID = "invalid_document_id", e.INVALID_CONTENT_TYPE = "invalid_content_type", e.MISSING_CONTENT_TYPE = "missing_content_type", e.PAYLOAD_TOO_LARGE = "payload_too_large", e.MISSING_PAYLOAD = "missing_payload", e.MALFORMED_PAYLOAD = "malformed_payload", e.NO_SPACE_LEFT_ON_DEVICE = "no_space_left_on_device", e.INVALID_STORE_FILE = "invalid_store_file", e.INVALID_RANKING_RULES = "missing_document_id", e.INVALID_REQUEST = "invalid_request", e.INVALID_FILTER = "invalid_filter", e.INVALID_SORT = "invalid_sort", e.INVALID_GEO_FIELD = "invalid_geo_field", e.BAD_REQUEST = "bad_request", e.DOCUMENT_NOT_FOUND = "document_not_found", e.INTERNAL = "internal", e.INVALID_API_KEY = "invalid_api_key", e.INVALID_API_KEY_DESCRIPTION = "invalid_api_key_description", e.INVALID_API_KEY_ACTIONS = "invalid_api_key_actions", e.INVALID_API_KEY_INDEXES = "invalid_api_key_indexes", e.INVALID_API_KEY_EXPIRES_AT = "invalid_api_key_expires_at", e.API_KEY_NOT_FOUND = "api_key_not_found", e.MISSING_PARAMETER = "missing_parameter", e.MISSING_AUTHORIZATION_HEADER = "missing_authorization_header", e.UNRETRIEVABLE_DOCUMENT = "unretrievable_document", e.MAX_DATABASE_SIZE_LIMIT_REACHED = "database_size_limit_reached", e.TASK_NOT_FOUND = "task_not_found", e.DUMP_PROCESS_FAILED = "dump_process_failed", e.DUMP_NOT_FOUND = "dump_not_found", e.DUPLICATE_INDEX_FOUND = "duplicate_index_found", e.MISSING_MASTER_KEY = "missing_master_key", e.INVALID_TASK_TYPES_FILTER = "invalid_task_types_filter", e.INVALID_TASK_STATUSES_FILTER = "invalid_task_statuses_filter", e.INVALID_TASK_CANCELED_BY_FILTER = "invalid_task_canceled_by_filter", e.INVALID_TASK_UIDS_FILTER = "invalid_task_uids_filter", e.INVALID_TASK_DATE_FILTER = "invalid_task_date_filter", e.MISSING_TASK_FILTERS = "missing_task_filters", e))(u || {});
class h extends Error {
  constructor(i, t, _, n) {
    var I, c, a;
    super(i), Object.setPrototypeOf(this, h.prototype), this.name = "MeiliSearchCommunicationError", t instanceof Response && (this.message = t.statusText, this.statusCode = t.status), t instanceof Error && (this.errno = t.errno, this.code = t.code), n && (this.stack = n, this.stack = (I = this.stack) == null ? void 0 : I.replace(/(TypeError|FetchError)/, this.name), this.stack = (c = this.stack) == null ? void 0 : c.replace(
      "Failed to fetch",
      `request to ${_} failed, reason: connect ECONNREFUSED`
    ), this.stack = (a = this.stack) == null ? void 0 : a.replace("Not Found", `Not Found: ${_}`));
  }
}
const D = class extends Error {
  constructor(e, i) {
    super(e.message), Object.setPrototypeOf(this, D.prototype), this.name = "MeiliSearchApiError", this.code = e.code, this.type = e.type, this.link = e.link, this.message = e.message, this.httpStatus = i;
  }
};
async function f(e) {
  if (!e.ok) {
    let i;
    try {
      i = await e.json();
    } catch {
      throw new h(
        e.statusText,
        e,
        e.url
      );
    }
    throw new D(i, e.status);
  }
  return e;
}
function R(e, i, t) {
  throw e.name !== "MeiliSearchApiError" ? new h(
    e.message,
    e,
    t,
    i
  ) : e;
}
class r extends Error {
  constructor(i) {
    super(i), Object.setPrototypeOf(this, r.prototype), this.name = "MeiliSearchError";
  }
}
class T extends Error {
  constructor(i) {
    super(i), Object.setPrototypeOf(this, T.prototype), this.name = "MeiliSearchTimeOutError";
  }
}
function E(e) {
  return Object.entries(e).reduce((i, t) => {
    const [_, n] = t;
    return n !== void 0 && (i[_] = n), i;
  }, {});
}
function y(e) {
  return e.startsWith("https://") || e.startsWith("http://") ? e : `http://${e}`;
}
function m(e) {
  return e.endsWith("/") || (e += "/"), e;
}
const S = "0.30.0";
function p(e) {
  try {
    return e = y(e), e = m(e), e;
  } catch {
    throw new r("The provided host is not valid.");
  }
}
function U(e) {
  const i = "X-Meilisearch-Client", t = `Meilisearch JavaScript (v${S})`, _ = "Content-Type";
  e.headers = e.headers || {};
  const n = Object.assign({}, e.headers);
  if (e.apiKey && (n.Authorization = `Bearer ${e.apiKey}`), e.headers[_] || (n["Content-Type"] = "application/json"), e.clientAgents && Array.isArray(e.clientAgents)) {
    const I = e.clientAgents.concat(t);
    n[i] = I.join(" ; ");
  } else {
    if (e.clientAgents && !Array.isArray(e.clientAgents))
      throw new r(
        `Meilisearch: The header "${i}" should be an array of string(s).
`
      );
    n[i] = t;
  }
  return n;
}
class M {
  constructor(i) {
    this.headers = U(i);
    try {
      const t = p(i.host);
      this.url = new URL(t);
    } catch {
      throw new r("The provided host is not valid.");
    }
  }
  async request({
    method: i,
    url: t,
    params: _,
    body: n,
    config: I
  }) {
    const c = new URL(t, this.url);
    if (_) {
      const a = new URLSearchParams();
      Object.keys(_).filter((s) => _[s] !== null).map((s) => a.set(s, _[s])), c.search = a.toString();
    }
    try {
      return await (await fetch(c.toString(), {
        ...I,
        method: i,
        body: JSON.stringify(n),
        headers: this.headers
      }).then((l) => f(l))).json().catch(() => {
      });
    } catch (a) {
      const s = a.stack;
      R(a, s, c.toString());
    }
  }
  async get(i, t, _) {
    return await this.request({
      method: "GET",
      url: i,
      params: t,
      config: _
    });
  }
  async post(i, t, _, n) {
    return await this.request({
      method: "POST",
      url: i,
      body: t,
      params: _,
      config: n
    });
  }
}
class P {
  constructor(i, t) {
    this.uid = t, this.httpRequest = new M(i);
  }
  async search(i, t, _) {
    const n = `indexes/${this.uid}/search`;
    return await this.httpRequest.post(
      n,
      E({ q: i, ...t }),
      void 0,
      _
    );
  }
  async searchGet(i, t, _) {
    var a, s, l, d, N;
    const n = `indexes/${this.uid}/search`, c = {
      q: i,
      ...t,
      filter: ((A) => {
        if (typeof A == "string")
          return A;
        if (Array.isArray(A))
          throw new r(
            "The filter query parameter should be in string format when using searchGet"
          );
      })(t == null ? void 0 : t.filter),
      sort: (a = t == null ? void 0 : t.sort) == null ? void 0 : a.join(","),
      facets: (s = t == null ? void 0 : t.facets) == null ? void 0 : s.join(","),
      attributesToRetrieve: (l = t == null ? void 0 : t.attributesToRetrieve) == null ? void 0 : l.join(","),
      attributesToCrop: (d = t == null ? void 0 : t.attributesToCrop) == null ? void 0 : d.join(","),
      attributesToHighlight: (N = t == null ? void 0 : t.attributesToHighlight) == null ? void 0 : N.join(",")
    };
    return await this.httpRequest.get(
      n,
      E(c),
      _
    );
  }
}
class v {
  constructor(i) {
    this.config = i;
  }
  index(i) {
    return new P(this.config, i);
  }
}
let g = class extends v {
  constructor(i) {
    super(i);
  }
};
const w = g;
export {
  u as ErrorStatusCode,
  P as Index,
  o as MatchingStrategies,
  g as MeiliSearch,
  D as MeiliSearchApiError,
  h as MeiliSearchCommunicationError,
  r as MeiliSearchError,
  T as MeiliSearchTimeOutError,
  O as TaskStatus,
  L as TaskTypes,
  w as default,
  R as httpErrorHandler,
  f as httpResponseErrorHandler
};
