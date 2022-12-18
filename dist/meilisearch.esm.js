const S = {
  ALL: "all",
  LAST: "last"
};
var d = /* @__PURE__ */ ((e) => (e.TASK_SUCCEEDED = "succeeded", e.TASK_PROCESSING = "processing", e.TASK_FAILED = "failed", e.TASK_ENQUEUED = "enqueued", e))(d || {}), D = /* @__PURE__ */ ((e) => (e.INDEX_CREATION = "indexCreation", e.INDEX_UPDATE = "indexUpdate", e.INDEX_DELETION = "indexDeletion", e.DOCUMENTS_ADDITION_OR_UPDATE = "documentAdditionOrUpdate", e.DOCUMENT_DELETION = "documentDeletion", e.SETTINGS_UPDATE = "settingsUpdate", e.INDEXES_SWAP = "indexSwap", e.TASK_DELETION = "taskDeletion", e.SNAPSHOT_CREATION = "snapshotCreation", e.TASK_CANCELATION = "taskCancelation", e))(D || {}), r = /* @__PURE__ */ ((e) => (e.INDEX_CREATION_FAILED = "index_creation_failed", e.INDEX_ALREADY_EXISTS = "index_already_exists", e.INDEX_NOT_FOUND = "index_not_found", e.INVALID_INDEX_UID = "invalid_index_uid", e.INDEX_NOT_ACCESSIBLE = "index_not_accessible", e.INVALID_STATE = "invalid_state", e.PRIMARY_KEY_INFERENCE_FAILED = "primary_key_inference_failed", e.INDEX_PRIMARY_KEY_ALREADY_EXISTS = "index_primary_key_already_exists", e.DOCUMENTS_FIELDS_LIMIT_REACHED = "document_fields_limit_reached", e.MISSING_DOCUMENT_ID = "missing_document_id", e.INVALID_DOCUMENT_ID = "invalid_document_id", e.INVALID_CONTENT_TYPE = "invalid_content_type", e.MISSING_CONTENT_TYPE = "missing_content_type", e.PAYLOAD_TOO_LARGE = "payload_too_large", e.MISSING_PAYLOAD = "missing_payload", e.MALFORMED_PAYLOAD = "malformed_payload", e.NO_SPACE_LEFT_ON_DEVICE = "no_space_left_on_device", e.INVALID_STORE_FILE = "invalid_store_file", e.INVALID_RANKING_RULES = "missing_document_id", e.INVALID_REQUEST = "invalid_request", e.INVALID_FILTER = "invalid_filter", e.INVALID_SORT = "invalid_sort", e.INVALID_GEO_FIELD = "invalid_geo_field", e.BAD_REQUEST = "bad_request", e.DOCUMENT_NOT_FOUND = "document_not_found", e.INTERNAL = "internal", e.INVALID_API_KEY = "invalid_api_key", e.INVALID_API_KEY_DESCRIPTION = "invalid_api_key_description", e.INVALID_API_KEY_ACTIONS = "invalid_api_key_actions", e.INVALID_API_KEY_INDEXES = "invalid_api_key_indexes", e.INVALID_API_KEY_EXPIRES_AT = "invalid_api_key_expires_at", e.API_KEY_NOT_FOUND = "api_key_not_found", e.MISSING_PARAMETER = "missing_parameter", e.MISSING_AUTHORIZATION_HEADER = "missing_authorization_header", e.UNRETRIEVABLE_DOCUMENT = "unretrievable_document", e.MAX_DATABASE_SIZE_LIMIT_REACHED = "database_size_limit_reached", e.TASK_NOT_FOUND = "task_not_found", e.DUMP_PROCESS_FAILED = "dump_process_failed", e.DUMP_NOT_FOUND = "dump_not_found", e.DUPLICATE_INDEX_FOUND = "duplicate_index_found", e.MISSING_MASTER_KEY = "missing_master_key", e.INVALID_TASK_TYPES_FILTER = "invalid_task_types_filter", e.INVALID_TASK_STATUSES_FILTER = "invalid_task_statuses_filter", e.INVALID_TASK_CANCELED_BY_FILTER = "invalid_task_canceled_by_filter", e.INVALID_TASK_UIDS_FILTER = "invalid_task_uids_filter", e.INVALID_TASK_DATE_FILTER = "invalid_task_date_filter", e.MISSING_TASK_FILTERS = "missing_task_filters", e))(r || {});
class l extends Error {
  constructor(i, t, n, _) {
    var c, I, s;
    super(i), Object.setPrototypeOf(this, l.prototype), this.name = "MeiliSearchCommunicationError", t instanceof Response && (this.message = t.statusText, this.statusCode = t.status), t instanceof Error && (this.errno = t.errno, this.code = t.code), _ && (this.stack = _, this.stack = (c = this.stack) == null ? void 0 : c.replace(/(TypeError|FetchError)/, this.name), this.stack = (I = this.stack) == null ? void 0 : I.replace(
      "Failed to fetch",
      `request to ${n} failed, reason: connect ECONNREFUSED`
    ), this.stack = (s = this.stack) == null ? void 0 : s.replace("Not Found", `Not Found: ${n}`));
  }
}
const h = class extends Error {
  constructor(e, i) {
    super(e.message), Object.setPrototypeOf(this, h.prototype), this.name = "MeiliSearchApiError", this.code = e.code, this.type = e.type, this.link = e.link, this.message = e.message, this.httpStatus = i;
  }
};
async function T(e) {
  if (!e.ok) {
    let i;
    try {
      i = await e.json();
    } catch {
      throw new l(
        e.statusText,
        e,
        e.url
      );
    }
    throw new h(i, e.status);
  }
  return e;
}
function o(e, i, t) {
  throw e.name !== "MeiliSearchApiError" ? new l(
    e.message,
    e,
    t,
    i
  ) : e;
}
class A extends Error {
  constructor(i) {
    super(i), Object.setPrototypeOf(this, A.prototype), this.name = "MeiliSearchError";
  }
}
class N extends Error {
  constructor(i) {
    super(i), Object.setPrototypeOf(this, N.prototype), this.name = "MeiliSearchTimeOutError";
  }
}
const O = "0.30.0";
function p(e) {
  return Object.entries(e).reduce((i, t) => {
    const [n, _] = t;
    return _ !== void 0 && (i[n] = _), i;
  }, {});
}
function L(e) {
  return e.startsWith("https://") || e.startsWith("http://") ? e : `http://${e}`;
}
function R(e) {
  return e.endsWith("/") || (e += "/"), e;
}
function f(e) {
  try {
    return e = L(e), e = R(e), e;
  } catch {
    throw new A("The provided host is not valid.");
  }
}
function y(e) {
  const i = "X-Meilisearch-Client", t = `Meilisearch JavaScript (v${O})`, n = "Content-Type";
  e.headers = e.headers || {};
  const _ = Object.assign({}, e.headers);
  if (e.apiKey && (_.Authorization = `Bearer ${e.apiKey}`), e.headers[n] || (_["Content-Type"] = "application/json"), e.clientAgents && Array.isArray(e.clientAgents)) {
    const c = e.clientAgents.concat(t);
    _[i] = c.join(" ; ");
  } else {
    if (e.clientAgents && !Array.isArray(e.clientAgents))
      throw new A(
        `Meilisearch: The header "${i}" should be an array of string(s).
`
      );
    _[i] = t;
  }
  return _;
}
class m {
  constructor(i) {
    this.headers = y(i);
    try {
      const t = f(i.host);
      this.url = new URL(t);
    } catch {
      throw new A("The provided host is not valid.");
    }
  }
  async request({
    method: i,
    url: t,
    params: n,
    body: _,
    config: c
  }) {
    const I = new URL(t, this.url);
    if (n) {
      const s = new URLSearchParams();
      Object.keys(n).filter((a) => n[a] !== null).map((a) => s.set(a, n[a])), I.search = s.toString();
    }
    try {
      return await (await fetch(I.toString(), {
        ...c,
        method: i,
        body: JSON.stringify(_),
        headers: this.headers
      }).then((E) => T(E))).json().catch(() => {
      });
    } catch (s) {
      const a = s.stack;
      o(s, a, I.toString());
    }
  }
  async post(i, t, n, _) {
    return await this.request({
      method: "POST",
      url: i,
      body: t,
      params: n,
      config: _
    });
  }
}
class U {
  constructor(i, t) {
    this.uid = t, this.httpRequest = new m(i);
  }
  async search(i, t, n) {
    const _ = `indexes/${this.uid}/search`;
    return await this.httpRequest.post(
      _,
      p({ q: i, ...t }),
      void 0,
      n
    );
  }
}
class P {
  constructor(i) {
    this.config = i;
  }
  index(i) {
    return new U(this.config, i);
  }
}
export {
  r as ErrorStatusCode,
  S as MatchingStrategies,
  P as MeiliSearch,
  h as MeiliSearchApiError,
  l as MeiliSearchCommunicationError,
  A as MeiliSearchError,
  N as MeiliSearchTimeOutError,
  O as PACKAGE_VERSION,
  d as TaskStatus,
  D as TaskTypes,
  o as httpErrorHandler,
  T as httpResponseErrorHandler
};
