var O = Object.defineProperty;
var m = (e, t, s) => t in e ? O(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var h = (e, t, s) => (m(e, typeof t != "symbol" ? t + "" : t, s), s), u = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
};
var r = (e, t, s) => (u(e, t, "read from private field"), s ? s.call(e) : t.get(e)), b = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, l = (e, t, s, i) => (u(e, t, "write to private field"), i ? i.call(e, s) : t.set(e, s), s);
var a = (e, t, s) => (u(e, t, "access private method"), s);
import { assign as y, guard as n, timeout as g } from "@cosmicmind/foundationjs";
var c, f, p;
class v {
  constructor(t) {
    b(this, f);
    b(this, c, void 0);
    l(this, c, t);
  }
  set(t, s) {
    return Object.defineProperty(r(this, c), t, {
      configurable: !0,
      enumerable: !0,
      writable: !1,
      value: s
    }), this;
  }
  map(t) {
    for (const [s, i] of Object.entries(t))
      this.set(s, i);
    return this;
  }
  build() {
    const t = r(this, c);
    return a(this, f, p).call(this), t;
  }
}
c = new WeakMap(), f = new WeakSet(), p = function() {
  r(this, c);
};
class w {
  /**
   * Creates a copy of itself and returns it.
   */
  clone() {
    return y(Object.create(Object.getPrototypeOf(this) ?? null), this);
  }
}
class S {
  constructor() {
    h(this, "topics");
    this.topics = {};
  }
  subscribe(t, ...s) {
    this.topics[t] || (this.topics[t] = /* @__PURE__ */ new Set());
    const i = this.topics[t];
    if (n(i))
      for (const o of s)
        i == null || i.add(o);
  }
  once(t, ...s) {
    const i = (o) => {
      this.unsubscribe(t, i);
      for (const d of s)
        d(o);
    };
    this.subscribe(t, i);
  }
  unsubscribe(t, ...s) {
    if (this.topics[t]) {
      const i = this.topics[t];
      if (n(i))
        for (const o of s)
          i == null || i.delete(o);
    }
  }
  publish(t, s) {
    return g(() => {
      const i = this.topics[t];
      if (n(i))
        for (const o of i)
          o(s);
    });
  }
  publishSync(t, s) {
    const i = this.topics[t];
    if (n(i))
      for (const o of i)
        o(s);
  }
}
export {
  v as Builder,
  S as Observable,
  w as Prototype
};
