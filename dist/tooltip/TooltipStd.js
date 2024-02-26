import { computed as A, unref as S, ref as v, shallowRef as yt, watch as $, getCurrentScope as wt, onScopeDispose as xt, shallowReadonly as _, defineComponent as vt, useSlots as bt, openBlock as Ct, createElementBlock as Tt, Fragment as Rt, renderSlot as Et, mergeProps as Lt, createVNode as At, normalizeClass as St, normalizeStyle as Dt, createSlots as Ot, withCtx as Nt, createTextVNode as Vt, toDisplayString as _t, nextTick as kt } from "vue";
import { _ as Bt } from "../_shared/BaseTooltip.vue_vue_type_style_index_0_lang-mfI_ZBxz.js";
const Q = Math.min, W = Math.max, H = Math.round, D = (t) => ({
  x: t,
  y: t
});
function Wt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function j(t) {
  return t.split("-")[0];
}
function lt(t) {
  return t.split("-")[1];
}
function Ft(t) {
  return t === "x" ? "y" : "x";
}
function Mt(t) {
  return t === "y" ? "height" : "width";
}
function z(t) {
  return ["top", "bottom"].includes(j(t)) ? "y" : "x";
}
function $t(t) {
  return Ft(z(t));
}
function st(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function U(t, e, n) {
  let {
    reference: o,
    floating: i
  } = t;
  const c = z(e), l = $t(e), r = Mt(l), u = j(e), s = c === "y", a = o.x + o.width / 2 - i.width / 2, f = o.y + o.height / 2 - i.height / 2, p = o[r] / 2 - i[r] / 2;
  let d;
  switch (u) {
    case "top":
      d = {
        x: a,
        y: o.y - i.height
      };
      break;
    case "bottom":
      d = {
        x: a,
        y: o.y + o.height
      };
      break;
    case "right":
      d = {
        x: o.x + o.width,
        y: f
      };
      break;
    case "left":
      d = {
        x: o.x - i.width,
        y: f
      };
      break;
    default:
      d = {
        x: o.x,
        y: o.y
      };
  }
  switch (lt(e)) {
    case "start":
      d[l] -= p * (n && s ? -1 : 1);
      break;
    case "end":
      d[l] += p * (n && s ? -1 : 1);
      break;
  }
  return d;
}
const Ht = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: c = [],
    platform: l
  } = n, r = c.filter(Boolean), u = await (l.isRTL == null ? void 0 : l.isRTL(e));
  let s = await l.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: a,
    y: f
  } = U(s, o, u), p = o, d = {}, m = 0;
  for (let g = 0; g < r.length; g++) {
    const {
      name: y,
      fn: N
    } = r[g], {
      x: b,
      y: T,
      data: V,
      reset: R
    } = await N({
      x: a,
      y: f,
      initialPlacement: o,
      placement: p,
      strategy: i,
      middlewareData: d,
      rects: s,
      platform: l,
      elements: {
        reference: t,
        floating: e
      }
    });
    a = b ?? a, f = T ?? f, d = {
      ...d,
      [y]: {
        ...d[y],
        ...V
      }
    }, R && m <= 50 && (m++, typeof R == "object" && (R.placement && (p = R.placement), R.rects && (s = R.rects === !0 ? await l.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : R.rects), {
      x: a,
      y: f
    } = U(s, p, u)), g = -1);
  }
  return {
    x: a,
    y: f,
    placement: p,
    strategy: i,
    middlewareData: d
  };
};
async function Pt(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, c = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), l = j(n), r = lt(n), u = z(n) === "y", s = ["left", "top"].includes(l) ? -1 : 1, a = c && u ? -1 : 1, f = Wt(e, t);
  let {
    mainAxis: p,
    crossAxis: d,
    alignmentAxis: m
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...f
  };
  return r && typeof m == "number" && (d = r === "end" ? m * -1 : m), u ? {
    x: d * a,
    y: p * s
  } : {
    x: p * s,
    y: d * a
  };
}
const Z = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: i,
        y: c,
        placement: l,
        middlewareData: r
      } = e, u = await Pt(e, t);
      return l === ((n = r.offset) == null ? void 0 : n.placement) && (o = r.arrow) != null && o.alignmentOffset ? {} : {
        x: i + u.x,
        y: c + u.y,
        data: {
          ...u,
          placement: l
        }
      };
    }
  };
};
function E(t) {
  return I(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function w(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function O(t) {
  var e;
  return (e = (I(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function I(t) {
  return t instanceof Node || t instanceof w(t).Node;
}
function L(t) {
  return t instanceof Element || t instanceof w(t).Element;
}
function C(t) {
  return t instanceof HTMLElement || t instanceof w(t).HTMLElement;
}
function tt(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof w(t).ShadowRoot;
}
function M(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = x(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !["inline", "contents"].includes(i);
}
function Xt(t) {
  return ["table", "td", "th"].includes(E(t));
}
function K(t) {
  const e = q(), n = x(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function Yt(t) {
  let e = B(t);
  for (; C(e) && !P(e); ) {
    if (K(e))
      return e;
    e = B(e);
  }
  return null;
}
function q() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function P(t) {
  return ["html", "body", "#document"].includes(E(t));
}
function x(t) {
  return w(t).getComputedStyle(t);
}
function X(t) {
  return L(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function B(t) {
  if (E(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    tt(t) && t.host || // Fallback.
    O(t)
  );
  return tt(e) ? e.host : e;
}
function rt(t) {
  const e = B(t);
  return P(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : C(e) && M(e) ? e : rt(e);
}
function Y(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = rt(t), c = i === ((o = t.ownerDocument) == null ? void 0 : o.body), l = w(i);
  return c ? e.concat(l, l.visualViewport || [], M(i) ? i : [], l.frameElement && n ? Y(l.frameElement) : []) : e.concat(i, Y(i, [], n));
}
function ct(t) {
  const e = x(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = C(t), c = i ? t.offsetWidth : n, l = i ? t.offsetHeight : o, r = H(n) !== c || H(o) !== l;
  return r && (n = c, o = l), {
    width: n,
    height: o,
    $: r
  };
}
function ut(t) {
  return L(t) ? t : t.contextElement;
}
function k(t) {
  const e = ut(t);
  if (!C(e))
    return D(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: c
  } = ct(e);
  let l = (c ? H(n.width) : n.width) / o, r = (c ? H(n.height) : n.height) / i;
  return (!l || !Number.isFinite(l)) && (l = 1), (!r || !Number.isFinite(r)) && (r = 1), {
    x: l,
    y: r
  };
}
const jt = /* @__PURE__ */ D(0);
function at(t) {
  const e = w(t);
  return !q() || !e.visualViewport ? jt : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function zt(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== w(t) ? !1 : e;
}
function F(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), c = ut(t);
  let l = D(1);
  e && (o ? L(o) && (l = k(o)) : l = k(t));
  const r = zt(c, n, o) ? at(c) : D(0);
  let u = (i.left + r.x) / l.x, s = (i.top + r.y) / l.y, a = i.width / l.x, f = i.height / l.y;
  if (c) {
    const p = w(c), d = o && L(o) ? w(o) : o;
    let m = p, g = m.frameElement;
    for (; g && o && d !== m; ) {
      const y = k(g), N = g.getBoundingClientRect(), b = x(g), T = N.left + (g.clientLeft + parseFloat(b.paddingLeft)) * y.x, V = N.top + (g.clientTop + parseFloat(b.paddingTop)) * y.y;
      u *= y.x, s *= y.y, a *= y.x, f *= y.y, u += T, s += V, m = w(g), g = m.frameElement;
    }
  }
  return st({
    width: a,
    height: f,
    x: u,
    y: s
  });
}
const It = [":popover-open", ":modal"];
function ft(t) {
  return It.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
function Kt(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const c = i === "fixed", l = O(o), r = e ? ft(e.floating) : !1;
  if (o === l || r && c)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = D(1);
  const a = D(0), f = C(o);
  if ((f || !f && !c) && ((E(o) !== "body" || M(l)) && (u = X(o)), C(o))) {
    const p = F(o);
    s = k(o), a.x = p.x + o.clientLeft, a.y = p.y + o.clientTop;
  }
  return {
    width: n.width * s.x,
    height: n.height * s.y,
    x: n.x * s.x - u.scrollLeft * s.x + a.x,
    y: n.y * s.y - u.scrollTop * s.y + a.y
  };
}
function qt(t) {
  return Array.from(t.getClientRects());
}
function dt(t) {
  return F(O(t)).left + X(t).scrollLeft;
}
function Gt(t) {
  const e = O(t), n = X(t), o = t.ownerDocument.body, i = W(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), c = W(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let l = -n.scrollLeft + dt(t);
  const r = -n.scrollTop;
  return x(o).direction === "rtl" && (l += W(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: c,
    x: l,
    y: r
  };
}
function Jt(t, e) {
  const n = w(t), o = O(t), i = n.visualViewport;
  let c = o.clientWidth, l = o.clientHeight, r = 0, u = 0;
  if (i) {
    c = i.width, l = i.height;
    const s = q();
    (!s || s && e === "fixed") && (r = i.offsetLeft, u = i.offsetTop);
  }
  return {
    width: c,
    height: l,
    x: r,
    y: u
  };
}
function Qt(t, e) {
  const n = F(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, c = C(t) ? k(t) : D(1), l = t.clientWidth * c.x, r = t.clientHeight * c.y, u = i * c.x, s = o * c.y;
  return {
    width: l,
    height: r,
    x: u,
    y: s
  };
}
function et(t, e, n) {
  let o;
  if (e === "viewport")
    o = Jt(t, n);
  else if (e === "document")
    o = Gt(O(t));
  else if (L(e))
    o = Qt(e, n);
  else {
    const i = at(t);
    o = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return st(o);
}
function pt(t, e) {
  const n = B(t);
  return n === e || !L(n) || P(n) ? !1 : x(n).position === "fixed" || pt(n, e);
}
function Ut(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = Y(t, [], !1).filter((r) => L(r) && E(r) !== "body"), i = null;
  const c = x(t).position === "fixed";
  let l = c ? B(t) : t;
  for (; L(l) && !P(l); ) {
    const r = x(l), u = K(l);
    !u && r.position === "fixed" && (i = null), (c ? !u && !i : !u && r.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || M(l) && !u && pt(t, l)) ? o = o.filter((a) => a !== l) : i = r, l = B(l);
  }
  return e.set(t, o), o;
}
function Zt(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const l = [...n === "clippingAncestors" ? Ut(e, this._c) : [].concat(n), o], r = l[0], u = l.reduce((s, a) => {
    const f = et(e, a, i);
    return s.top = W(f.top, s.top), s.right = Q(f.right, s.right), s.bottom = Q(f.bottom, s.bottom), s.left = W(f.left, s.left), s;
  }, et(e, r, i));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function te(t) {
  const {
    width: e,
    height: n
  } = ct(t);
  return {
    width: e,
    height: n
  };
}
function ee(t, e, n) {
  const o = C(e), i = O(e), c = n === "fixed", l = F(t, !0, c, e);
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = D(0);
  if (o || !o && !c)
    if ((E(e) !== "body" || M(i)) && (r = X(e)), o) {
      const f = F(e, !0, c, e);
      u.x = f.x + e.clientLeft, u.y = f.y + e.clientTop;
    } else
      i && (u.x = dt(i));
  const s = l.left + r.scrollLeft - u.x, a = l.top + r.scrollTop - u.y;
  return {
    x: s,
    y: a,
    width: l.width,
    height: l.height
  };
}
function nt(t, e) {
  return !C(t) || x(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function mt(t, e) {
  const n = w(t);
  if (!C(t) || ft(t))
    return n;
  let o = nt(t, e);
  for (; o && Xt(o) && x(o).position === "static"; )
    o = nt(o, e);
  return o && (E(o) === "html" || E(o) === "body" && x(o).position === "static" && !K(o)) ? n : o || Yt(t) || n;
}
const ne = async function(t) {
  const e = this.getOffsetParent || mt, n = this.getDimensions;
  return {
    reference: ee(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      ...await n(t.floating)
    }
  };
};
function oe(t) {
  return x(t).direction === "rtl";
}
const ie = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Kt,
  getDocumentElement: O,
  getClippingRect: Zt,
  getOffsetParent: mt,
  getElementRects: ne,
  getClientRects: qt,
  getDimensions: te,
  getScale: k,
  isElement: L,
  isRTL: oe
}, le = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: ie,
    ...n
  }, c = {
    ...i.platform,
    _c: o
  };
  return Ht(t, e, {
    ...i,
    platform: c
  });
};
function se(t) {
  return t != null && typeof t == "object" && "$el" in t;
}
function ot(t) {
  if (se(t)) {
    const e = t.$el;
    return I(e) && E(e) === "#comment" ? null : e;
  }
  return t;
}
function ht(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function it(t, e) {
  const n = ht(t);
  return Math.round(e * n) / n;
}
function re(t, e, n) {
  n === void 0 && (n = {});
  const o = n.whileElementsMounted, i = A(() => {
    var h;
    return (h = S(n.open)) != null ? h : !0;
  }), c = A(() => S(n.middleware)), l = A(() => {
    var h;
    return (h = S(n.placement)) != null ? h : "bottom";
  }), r = A(() => {
    var h;
    return (h = S(n.strategy)) != null ? h : "absolute";
  }), u = A(() => {
    var h;
    return (h = S(n.transform)) != null ? h : !0;
  }), s = A(() => ot(t.value)), a = A(() => ot(e.value)), f = v(0), p = v(0), d = v(r.value), m = v(l.value), g = yt({}), y = v(!1), N = A(() => {
    const h = {
      position: d.value,
      left: "0",
      top: "0"
    };
    if (!a.value)
      return h;
    const G = it(a.value, f.value), J = it(a.value, p.value);
    return u.value ? {
      ...h,
      transform: "translate(" + G + "px, " + J + "px)",
      ...ht(a.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: d.value,
      left: G + "px",
      top: J + "px"
    };
  });
  let b;
  function T() {
    s.value == null || a.value == null || le(s.value, a.value, {
      middleware: c.value,
      placement: l.value,
      strategy: r.value
    }).then((h) => {
      f.value = h.x, p.value = h.y, d.value = h.strategy, m.value = h.placement, g.value = h.middlewareData, y.value = !0;
    });
  }
  function V() {
    typeof b == "function" && (b(), b = void 0);
  }
  function R() {
    if (V(), o === void 0) {
      T();
      return;
    }
    if (s.value != null && a.value != null) {
      b = o(s.value, a.value, T);
      return;
    }
  }
  function gt() {
    i.value || (y.value = !1);
  }
  return $([c, l, r], T, {
    flush: "sync"
  }), $([s, a], R, {
    flush: "sync"
  }), $(i, gt, {
    flush: "sync"
  }), wt() && xt(V), {
    x: _(f),
    y: _(p),
    strategy: _(d),
    placement: _(m),
    middlewareData: _(g),
    isPositioned: _(y),
    floatingStyles: N,
    update: T
  };
}
const ce = {
  name: "TooltipStd"
}, fe = /* @__PURE__ */ vt({
  ...ce,
  props: {
    color: {},
    label: {},
    delay: {},
    placement: { default: "top" },
    offset: { default: 10 }
  },
  setup(t, { expose: e }) {
    const n = t, o = bt(), i = v(), c = v(), l = v(n.placement), r = v([
      Z(n.offset || 0)
    ]), u = v(), s = v(!1), { floatingStyles: a, placement: f } = re(i, c, {
      placement: l,
      middleware: r
    });
    $(n, () => {
      l.value = n.placement || l.value, r.value = [
        Z(n.offset || 0)
      ];
    });
    function p(m) {
      n.delay ? u.value = setTimeout(() => {
        i.value = m.target, s.value = !0;
      }, n.delay) : (i.value = m.target, s.value = !0);
    }
    function d(m) {
      n.delay ? (clearTimeout(u.value), kt(() => {
        i.value = void 0, s.value = !1;
      })) : (i.value = void 0, s.value = !1);
    }
    return e({
      show: p,
      hide: d,
      target: i,
      tooltip: c
    }), (m, g) => (Ct(), Tt(Rt, null, [
      Et(m.$slots, "default", Lt(n, {
        show: p,
        hide: d
      })),
      At(Bt, {
        ref_key: "tooltip",
        ref: c,
        color: n.color,
        label: m.$slots.label ? void 0 : n.label || void 0,
        class: St([`tooltip-${S(f)}`, s.value ? "is-visible" : ""]),
        style: Dt(S(a))
      }, Ot({ _: 2 }, [
        m.$slots.label ? {
          name: "default",
          fn: Nt(() => [
            Vt(_t(S(o).label(n)), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["color", "label", "class", "style"])
    ], 64));
  }
});
export {
  fe as default
};
