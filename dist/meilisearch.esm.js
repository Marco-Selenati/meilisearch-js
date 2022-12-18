class u extends Error {
  constructor(e, s, i, r) {
    var c, o, n;
    super(e), Object.setPrototypeOf(this, u.prototype), this.name = "MeiliSearchCommunicationError", s instanceof Response && (this.message = s.statusText, this.statusCode = s.status), s instanceof Error && (this.errno = s.errno, this.code = s.code), r && (this.stack = r, this.stack = (c = this.stack) == null ? void 0 : c.replace(/(TypeError|FetchError)/, this.name), this.stack = (o = this.stack) == null ? void 0 : o.replace(
      "Failed to fetch",
      `request to ${i} failed, reason: connect ECONNREFUSED`
    ), this.stack = (n = this.stack) == null ? void 0 : n.replace("Not Found", `Not Found: ${i}`));
  }
}
const d = class extends Error {
  constructor(t, e) {
    super(t.message), Object.setPrototypeOf(this, d.prototype), this.name = "MeiliSearchApiError", this.code = t.code, this.type = t.type, this.link = t.link, this.message = t.message, this.httpStatus = e;
  }
};
async function y(t) {
  if (!t.ok) {
    let e;
    try {
      e = await t.json();
    } catch {
      throw new u(
        t.statusText,
        t,
        t.url
      );
    }
    throw new d(e, t.status);
  }
  return t;
}
function f(t, e, s) {
  throw t.name !== "MeiliSearchApiError" ? new u(
    t.message,
    t,
    s,
    e
  ) : t;
}
class h extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, h.prototype), this.name = "MeiliSearchError";
  }
}
class l extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, l.prototype), this.name = "MeiliSearchTimeOutError";
  }
}
const w = "0.30.0";
function E(t) {
  return Object.entries(t).reduce((e, s) => {
    const [i, r] = s;
    return r !== void 0 && (e[i] = r), e;
  }, {});
}
function S(t) {
  return t.startsWith("https://") || t.startsWith("http://") ? t : `http://${t}`;
}
function m(t) {
  return t.endsWith("/") || (t += "/"), t;
}
function O(t) {
  try {
    return t = S(t), t = m(t), t;
  } catch {
    throw new h("The provided host is not valid.");
  }
}
function A(t) {
  const e = "X-Meilisearch-Client", s = `Meilisearch JavaScript (v${w})`, i = "Content-Type";
  t.headers = t.headers || {};
  const r = Object.assign({}, t.headers);
  if (t.apiKey && (r.Authorization = `Bearer ${t.apiKey}`), t.headers[i] || (r["Content-Type"] = "application/json"), t.clientAgents && Array.isArray(t.clientAgents)) {
    const c = t.clientAgents.concat(s);
    r[e] = c.join(" ; ");
  } else {
    if (t.clientAgents && !Array.isArray(t.clientAgents))
      throw new h(
        `Meilisearch: The header "${e}" should be an array of string(s).
`
      );
    r[e] = s;
  }
  return r;
}
class k {
  constructor(e) {
    this.headers = A(e);
    try {
      const s = O(e.host);
      this.url = new URL(s);
    } catch {
      throw new h("The provided host is not valid.");
    }
  }
  async request({
    method: e,
    url: s,
    params: i,
    body: r,
    config: c
  }) {
    const o = new URL(s, this.url);
    if (i) {
      const n = new URLSearchParams();
      Object.keys(i).filter((a) => i[a] !== null).map((a) => n.set(a, i[a])), o.search = n.toString();
    }
    try {
      return await (await fetch(o.toString(), {
        ...c,
        method: e,
        body: JSON.stringify(r),
        headers: this.headers
      }).then((p) => y(p))).json().catch(() => {
      });
    } catch (n) {
      const a = n.stack;
      f(n, a, o.toString());
    }
  }
  async post(e, s, i, r) {
    return await this.request({
      method: "POST",
      url: e,
      body: s,
      params: i,
      config: r
    });
  }
}
class j {
  constructor(e, s) {
    this.uid = s, this.httpRequest = new k(e);
  }
  async search(e, s, i) {
    const r = `indexes/${this.uid}/search`;
    return await this.httpRequest.post(
      r,
      E({ q: e, ...s }),
      void 0,
      i
    );
  }
}
class R {
  constructor(e) {
    this.config = e;
  }
  index(e) {
    return new j(this.config, e);
  }
}
export {
  R as MeiliSearch,
  d as MeiliSearchApiError,
  u as MeiliSearchCommunicationError,
  h as MeiliSearchError,
  l as MeiliSearchTimeOutError,
  w as PACKAGE_VERSION,
  f as httpErrorHandler,
  y as httpResponseErrorHandler
};
