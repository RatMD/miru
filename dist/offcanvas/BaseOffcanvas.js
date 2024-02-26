import { defineComponent as Ti, useSlots as Ii, ref as $e, computed as Ei, watch as jr, nextTick as Pi, openBlock as be, createBlock as _i, Teleport as xi, createElementVNode as ct, normalizeClass as Rr, createElementBlock as ft, renderSlot as vt, mergeProps as lt, toDisplayString as Ai, createVNode as ji, unref as Ri, createCommentVNode as dt } from "vue";
import { _ as Mi } from "../_shared/ShadowButton.vue_vue_type_style_index_0_lang-CDcrCbfB.js";
import { X as Ci } from "../_shared/x-YxuH06ct.js";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Lt = function(e, t) {
  return Lt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var a in n)
      n.hasOwnProperty(a) && (r[a] = n[a]);
  }, Lt(e, t);
};
function Di(e, t) {
  Lt(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var N = function() {
  return N = Object.assign || function(t) {
    for (var r, n = 1, a = arguments.length; n < a; n++) {
      r = arguments[n];
      for (var i in r)
        Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, N.apply(this, arguments);
};
function k(e, t, r, n) {
  var a = arguments.length, i = a < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(e, t, r, n);
  else
    for (var u = e.length - 1; u >= 0; u--)
      (o = e[u]) && (i = (a < 3 ? o(i) : a > 3 ? o(t, r, i) : o(t, r)) || i);
  return a > 3 && i && Object.defineProperty(t, r, i), i;
}
function Ni() {
  for (var e = 0, t = 0, r = arguments.length; t < r; t++)
    e += arguments[t].length;
  for (var n = Array(e), a = 0, t = 0; t < r; t++)
    for (var i = arguments[t], o = 0, u = i.length; o < u; o++, a++)
      n[a] = i[o];
  return n;
}
var we = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, S = function(e) {
  try {
    return !!e();
  } catch {
    return !0;
  }
}, Fi = S, Yt = !Fi(function() {
  var e = (function() {
  }).bind();
  return typeof e != "function" || e.hasOwnProperty("prototype");
}), na = Yt, aa = Function.prototype, kt = aa.call, Bi = na && aa.bind.bind(kt, kt), b = na ? Bi : function(e) {
  return function() {
    return kt.apply(e, arguments);
  };
}, ia = b, zi = ia({}.toString), Li = ia("".slice), J = function(e) {
  return Li(zi(e), 8, -1);
}, ki = b, Gi = S, Wi = J, ht = Object, Ui = ki("".split), er = Gi(function() {
  return !ht("z").propertyIsEnumerable(0);
}) ? function(e) {
  return Wi(e) === "String" ? Ui(e, "") : ht(e);
} : ht, Z = function(e) {
  return e == null;
}, Vi = Z, Hi = TypeError, Ye = function(e) {
  if (Vi(e))
    throw new Hi("Can't call method on " + e);
  return e;
}, Ki = er, Xi = Ye, Q = function(e) {
  return Ki(Xi(e));
}, ne = function(e) {
  return e && e.Math === Math && e;
}, I = (
  // eslint-disable-next-line es/no-global-this -- safe
  ne(typeof globalThis == "object" && globalThis) || ne(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  ne(typeof self == "object" && self) || ne(typeof we == "object" && we) || ne(typeof we == "object" && we) || // eslint-disable-next-line no-new-func -- fallback
  /* @__PURE__ */ function() {
    return this;
  }() || Function("return this")()
), oa = { exports: {} }, qi = !1, Mr = I, Ji = Object.defineProperty, tr = function(e, t) {
  try {
    Ji(Mr, e, { value: t, configurable: !0, writable: !0 });
  } catch {
    Mr[e] = t;
  }
  return t;
}, Zi = I, Qi = tr, Cr = "__core-js_shared__", Dr = oa.exports = Zi[Cr] || Qi(Cr, {});
(Dr.versions || (Dr.versions = [])).push({
  version: "3.36.0",
  mode: "global",
  copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var rr = oa.exports, Nr = rr, sa = function(e, t) {
  return Nr[e] || (Nr[e] = t || {});
}, Yi = Ye, eo = Object, le = function(e) {
  return eo(Yi(e));
}, to = b, ro = le, no = to({}.hasOwnProperty), j = Object.hasOwn || function(t, r) {
  return no(ro(t), r);
}, ao = b, io = 0, oo = Math.random(), so = ao(1 .toString), nr = function(e) {
  return "Symbol(" + (e === void 0 ? "" : e) + ")_" + so(++io + oo, 36);
}, uo = typeof navigator < "u" && String(navigator.userAgent) || "", ua = I, pt = uo, Fr = ua.process, Br = ua.Deno, zr = Fr && Fr.versions || Br && Br.version, Lr = zr && zr.v8, A, Ke;
Lr && (A = Lr.split("."), Ke = A[0] > 0 && A[0] < 4 ? 1 : +(A[0] + A[1]));
!Ke && pt && (A = pt.match(/Edge\/(\d+)/), (!A || A[1] >= 74) && (A = pt.match(/Chrome\/(\d+)/), A && (Ke = +A[1])));
var co = Ke, kr = co, fo = S, vo = I, lo = vo.String, ca = !!Object.getOwnPropertySymbols && !fo(function() {
  var e = Symbol("symbol detection");
  return !lo(e) || !(Object(e) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && kr && kr < 41;
}), ho = ca, fa = ho && !Symbol.sham && typeof Symbol.iterator == "symbol", po = I, yo = sa, Gr = j, go = nr, mo = ca, $o = fa, K = po.Symbol, yt = yo("wks"), bo = $o ? K.for || K : K && K.withoutSetter || go, x = function(e) {
  return Gr(yt, e) || (yt[e] = mo && Gr(K, e) ? K[e] : bo("Symbol." + e)), yt[e];
}, gt = typeof document == "object" && document.all, O = typeof gt > "u" && gt !== void 0 ? function(e) {
  return typeof e == "function" || e === gt;
} : function(e) {
  return typeof e == "function";
}, wo = O, T = function(e) {
  return typeof e == "object" ? e !== null : wo(e);
}, So = T, Oo = String, To = TypeError, F = function(e) {
  if (So(e))
    return e;
  throw new To(Oo(e) + " is not an object");
}, va = {}, Io = S, E = !Io(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
}), Eo = E, Po = S, la = Eo && Po(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype !== 42;
}), R = {}, _o = I, Wr = T, Gt = _o.document, xo = Wr(Gt) && Wr(Gt.createElement), da = function(e) {
  return xo ? Gt.createElement(e) : {};
}, Ao = E, jo = S, Ro = da, ha = !Ao && !jo(function() {
  return Object.defineProperty(Ro("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
}), Mo = Yt, Se = Function.prototype.call, z = Mo ? Se.bind(Se) : function() {
  return Se.apply(Se, arguments);
}, mt = I, Co = O, Do = function(e) {
  return Co(e) ? e : void 0;
}, de = function(e, t) {
  return arguments.length < 2 ? Do(mt[e]) : mt[e] && mt[e][t];
}, No = b, ar = No({}.isPrototypeOf), Fo = de, Bo = O, zo = ar, Lo = fa, ko = Object, pa = Lo ? function(e) {
  return typeof e == "symbol";
} : function(e) {
  var t = Fo("Symbol");
  return Bo(t) && zo(t.prototype, ko(e));
}, Go = String, ir = function(e) {
  try {
    return Go(e);
  } catch {
    return "Object";
  }
}, Wo = O, Uo = ir, Vo = TypeError, he = function(e) {
  if (Wo(e))
    return e;
  throw new Vo(Uo(e) + " is not a function");
}, Ho = he, Ko = Z, or = function(e, t) {
  var r = e[t];
  return Ko(r) ? void 0 : Ho(r);
}, $t = z, bt = O, wt = T, Xo = TypeError, qo = function(e, t) {
  var r, n;
  if (t === "string" && bt(r = e.toString) && !wt(n = $t(r, e)) || bt(r = e.valueOf) && !wt(n = $t(r, e)) || t !== "string" && bt(r = e.toString) && !wt(n = $t(r, e)))
    return n;
  throw new Xo("Can't convert object to primitive value");
}, Jo = z, Ur = T, Vr = pa, Zo = or, Qo = qo, Yo = x, es = TypeError, ts = Yo("toPrimitive"), rs = function(e, t) {
  if (!Ur(e) || Vr(e))
    return e;
  var r = Zo(e, ts), n;
  if (r) {
    if (t === void 0 && (t = "default"), n = Jo(r, e, t), !Ur(n) || Vr(n))
      return n;
    throw new es("Can't convert object to primitive value");
  }
  return t === void 0 && (t = "number"), Qo(e, t);
}, ns = rs, as = pa, ya = function(e) {
  var t = ns(e, "string");
  return as(t) ? t : t + "";
}, is = E, os = ha, ss = la, Oe = F, Hr = ya, us = TypeError, St = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, Ot = "enumerable", Tt = "configurable", It = "writable";
R.f = is ? ss ? function(t, r, n) {
  if (Oe(t), r = Hr(r), Oe(n), typeof t == "function" && r === "prototype" && "value" in n && It in n && !n[It]) {
    var a = cs(t, r);
    a && a[It] && (t[r] = n.value, n = {
      configurable: Tt in n ? n[Tt] : a[Tt],
      enumerable: Ot in n ? n[Ot] : a[Ot],
      writable: !1
    });
  }
  return St(t, r, n);
} : St : function(t, r, n) {
  if (Oe(t), r = Hr(r), Oe(n), os)
    try {
      return St(t, r, n);
    } catch {
    }
  if ("get" in n || "set" in n)
    throw new us("Accessors not supported");
  return "value" in n && (t[r] = n.value), t;
};
var fs = Math.ceil, vs = Math.floor, ls = Math.trunc || function(t) {
  var r = +t;
  return (r > 0 ? vs : fs)(r);
}, ds = ls, sr = function(e) {
  var t = +e;
  return t !== t || t === 0 ? 0 : ds(t);
}, hs = sr, ps = Math.max, ys = Math.min, gs = function(e, t) {
  var r = hs(e);
  return r < 0 ? ps(r + t, 0) : ys(r, t);
}, ms = sr, $s = Math.min, bs = function(e) {
  var t = ms(e);
  return t > 0 ? $s(t, 9007199254740991) : 0;
}, ws = bs, et = function(e) {
  return ws(e.length);
}, Ss = Q, Os = gs, Ts = et, Kr = function(e) {
  return function(t, r, n) {
    var a = Ss(t), i = Ts(a);
    if (i === 0)
      return !e && -1;
    var o = Os(n, i), u;
    if (e && r !== r) {
      for (; i > o; )
        if (u = a[o++], u !== u)
          return !0;
    } else
      for (; i > o; o++)
        if ((e || o in a) && a[o] === r)
          return e || o || 0;
    return !e && -1;
  };
}, Is = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: Kr(!0),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: Kr(!1)
}, tt = {}, Es = b, Et = j, Ps = Q, _s = Is.indexOf, xs = tt, Xr = Es([].push), ga = function(e, t) {
  var r = Ps(e), n = 0, a = [], i;
  for (i in r)
    !Et(xs, i) && Et(r, i) && Xr(a, i);
  for (; t.length > n; )
    Et(r, i = t[n++]) && (~_s(a, i) || Xr(a, i));
  return a;
}, ur = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], As = ga, js = ur, ma = Object.keys || function(t) {
  return As(t, js);
}, Rs = E, Ms = la, Cs = R, Ds = F, Ns = Q, Fs = ma;
va.f = Rs && !Ms ? Object.defineProperties : function(t, r) {
  Ds(t);
  for (var n = Ns(r), a = Fs(r), i = a.length, o = 0, u; i > o; )
    Cs.f(t, u = a[o++], n[u]);
  return t;
};
var Bs = de, zs = Bs("document", "documentElement"), Ls = sa, ks = nr, qr = Ls("keys"), cr = function(e) {
  return qr[e] || (qr[e] = ks(e));
}, Gs = F, Ws = va, Jr = ur, Us = tt, Vs = zs, Hs = da, Ks = cr, Zr = ">", Qr = "<", Wt = "prototype", Ut = "script", $a = Ks("IE_PROTO"), Pt = function() {
}, ba = function(e) {
  return Qr + Ut + Zr + e + Qr + "/" + Ut + Zr;
}, Yr = function(e) {
  e.write(ba("")), e.close();
  var t = e.parentWindow.Object;
  return e = null, t;
}, Xs = function() {
  var e = Hs("iframe"), t = "java" + Ut + ":", r;
  return e.style.display = "none", Vs.appendChild(e), e.src = String(t), r = e.contentWindow.document, r.open(), r.write(ba("document.F=Object")), r.close(), r.F;
}, Te, Le = function() {
  try {
    Te = new ActiveXObject("htmlfile");
  } catch {
  }
  Le = typeof document < "u" ? document.domain && Te ? Yr(Te) : Xs() : Yr(Te);
  for (var e = Jr.length; e--; )
    delete Le[Wt][Jr[e]];
  return Le();
};
Us[$a] = !0;
var fr = Object.create || function(t, r) {
  var n;
  return t !== null ? (Pt[Wt] = Gs(t), n = new Pt(), Pt[Wt] = null, n[$a] = t) : n = Le(), r === void 0 ? n : Ws.f(n, r);
}, qs = x, Js = fr, Zs = R.f, Vt = qs("unscopables"), Ht = Array.prototype;
Ht[Vt] === void 0 && Zs(Ht, Vt, {
  configurable: !0,
  value: Js(null)
});
var Qs = function(e) {
  Ht[Vt][e] = !0;
}, pe = {}, Ys = I, eu = O, en = Ys.WeakMap, wa = eu(en) && /native code/.test(String(en)), rt = function(e, t) {
  return {
    enumerable: !(e & 1),
    configurable: !(e & 2),
    writable: !(e & 4),
    value: t
  };
}, tu = E, ru = R, nu = rt, vr = tu ? function(e, t, r) {
  return ru.f(e, t, nu(1, r));
} : function(e, t, r) {
  return e[t] = r, e;
}, au = wa, Sa = I, iu = T, ou = vr, _t = j, xt = rr, su = cr, uu = tt, tn = "Object already initialized", Kt = Sa.TypeError, cu = Sa.WeakMap, Xe, ve, qe, fu = function(e) {
  return qe(e) ? ve(e) : Xe(e, {});
}, vu = function(e) {
  return function(t) {
    var r;
    if (!iu(t) || (r = ve(t)).type !== e)
      throw new Kt("Incompatible receiver, " + e + " required");
    return r;
  };
};
if (au || xt.state) {
  var M = xt.state || (xt.state = new cu());
  M.get = M.get, M.has = M.has, M.set = M.set, Xe = function(e, t) {
    if (M.has(e))
      throw new Kt(tn);
    return t.facade = e, M.set(e, t), t;
  }, ve = function(e) {
    return M.get(e) || {};
  }, qe = function(e) {
    return M.has(e);
  };
} else {
  var U = su("state");
  uu[U] = !0, Xe = function(e, t) {
    if (_t(e, U))
      throw new Kt(tn);
    return t.facade = e, ou(e, U, t), t;
  }, ve = function(e) {
    return _t(e, U) ? e[U] : {};
  }, qe = function(e) {
    return _t(e, U);
  };
}
var Y = {
  set: Xe,
  get: ve,
  has: qe,
  enforce: fu,
  getterFor: vu
}, lr = {}, dr = {}, Oa = {}.propertyIsEnumerable, Ta = Object.getOwnPropertyDescriptor, lu = Ta && !Oa.call({ 1: 2 }, 1);
dr.f = lu ? function(t) {
  var r = Ta(this, t);
  return !!r && r.enumerable;
} : Oa;
var du = E, hu = z, pu = dr, yu = rt, gu = Q, mu = ya, $u = j, bu = ha, rn = Object.getOwnPropertyDescriptor;
lr.f = du ? rn : function(t, r) {
  if (t = gu(t), r = mu(r), bu)
    try {
      return rn(t, r);
    } catch {
    }
  if ($u(t, r))
    return yu(!hu(pu.f, t, r), t[r]);
};
var Ia = { exports: {} }, Xt = E, wu = j, Ea = Function.prototype, Su = Xt && Object.getOwnPropertyDescriptor, hr = wu(Ea, "name"), Ou = hr && (function() {
}).name === "something", Tu = hr && (!Xt || Xt && Su(Ea, "name").configurable), Pa = {
  EXISTS: hr,
  PROPER: Ou,
  CONFIGURABLE: Tu
}, Iu = b, Eu = O, qt = rr, Pu = Iu(Function.toString);
Eu(qt.inspectSource) || (qt.inspectSource = function(e) {
  return Pu(e);
});
var _a = qt.inspectSource, pr = b, _u = S, xu = O, Ie = j, Jt = E, Au = Pa.CONFIGURABLE, ju = _a, xa = Y, Ru = xa.enforce, Mu = xa.get, nn = String, ke = Object.defineProperty, Cu = pr("".slice), Du = pr("".replace), Nu = pr([].join), Fu = Jt && !_u(function() {
  return ke(function() {
  }, "length", { value: 8 }).length !== 8;
}), Bu = String(String).split("String"), zu = Ia.exports = function(e, t, r) {
  Cu(nn(t), 0, 7) === "Symbol(" && (t = "[" + Du(nn(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), r && r.getter && (t = "get " + t), r && r.setter && (t = "set " + t), (!Ie(e, "name") || Au && e.name !== t) && (Jt ? ke(e, "name", { value: t, configurable: !0 }) : e.name = t), Fu && r && Ie(r, "arity") && e.length !== r.arity && ke(e, "length", { value: r.arity });
  try {
    r && Ie(r, "constructor") && r.constructor ? Jt && ke(e, "prototype", { writable: !1 }) : e.prototype && (e.prototype = void 0);
  } catch {
  }
  var n = Ru(e);
  return Ie(n, "source") || (n.source = Nu(Bu, typeof t == "string" ? t : "")), e;
};
Function.prototype.toString = zu(function() {
  return xu(this) && Mu(this).source || ju(this);
}, "toString");
var Aa = Ia.exports, Lu = O, ku = R, Gu = Aa, Wu = tr, ee = function(e, t, r, n) {
  n || (n = {});
  var a = n.enumerable, i = n.name !== void 0 ? n.name : t;
  if (Lu(r) && Gu(r, i, n), n.global)
    a ? e[t] = r : Wu(t, r);
  else {
    try {
      n.unsafe ? e[t] && (a = !0) : delete e[t];
    } catch {
    }
    a ? e[t] = r : ku.f(e, t, {
      value: r,
      enumerable: !1,
      configurable: !n.nonConfigurable,
      writable: !n.nonWritable
    });
  }
  return e;
}, nt = {}, Uu = ga, Vu = ur, Hu = Vu.concat("length", "prototype");
nt.f = Object.getOwnPropertyNames || function(t) {
  return Uu(t, Hu);
};
var yr = {};
yr.f = Object.getOwnPropertySymbols;
var Ku = de, Xu = b, qu = nt, Ju = yr, Zu = F, Qu = Xu([].concat), Yu = Ku("Reflect", "ownKeys") || function(t) {
  var r = qu.f(Zu(t)), n = Ju.f;
  return n ? Qu(r, n(t)) : r;
}, an = j, ec = Yu, tc = lr, rc = R, nc = function(e, t, r) {
  for (var n = ec(t), a = rc.f, i = tc.f, o = 0; o < n.length; o++) {
    var u = n[o];
    !an(e, u) && !(r && an(r, u)) && a(e, u, i(t, u));
  }
}, ac = S, ic = O, oc = /#|\.prototype\./, ye = function(e, t) {
  var r = uc[sc(e)];
  return r === fc ? !0 : r === cc ? !1 : ic(t) ? ac(t) : !!t;
}, sc = ye.normalize = function(e) {
  return String(e).replace(oc, ".").toLowerCase();
}, uc = ye.data = {}, cc = ye.NATIVE = "N", fc = ye.POLYFILL = "P", ja = ye, Ee = I, vc = lr.f, lc = vr, dc = ee, hc = tr, pc = nc, yc = ja, te = function(e, t) {
  var r = e.target, n = e.global, a = e.stat, i, o, u, s, c, f;
  if (n ? o = Ee : a ? o = Ee[r] || hc(r, {}) : o = Ee[r] && Ee[r].prototype, o)
    for (u in t) {
      if (c = t[u], e.dontCallGetSet ? (f = vc(o, u), s = f && f.value) : s = o[u], i = yc(n ? u : r + (a ? "." : "#") + u, e.forced), !i && s !== void 0) {
        if (typeof c == typeof s)
          continue;
        pc(c, s);
      }
      (e.sham || s && s.sham) && lc(c, "sham", !0), dc(o, u, c, e);
    }
}, gc = S, mc = !gc(function() {
  function e() {
  }
  return e.prototype.constructor = null, Object.getPrototypeOf(new e()) !== e.prototype;
}), $c = j, bc = O, wc = le, Sc = cr, Oc = mc, on = Sc("IE_PROTO"), Zt = Object, Tc = Zt.prototype, Ra = Oc ? Zt.getPrototypeOf : function(e) {
  var t = wc(e);
  if ($c(t, on))
    return t[on];
  var r = t.constructor;
  return bc(r) && t instanceof r ? r.prototype : t instanceof Zt ? Tc : null;
}, Ic = S, Ec = O, Pc = T, sn = Ra, _c = ee, xc = x, Qt = xc("iterator"), Ma = !1, G, At, jt;
[].keys && (jt = [].keys(), "next" in jt ? (At = sn(sn(jt)), At !== Object.prototype && (G = At)) : Ma = !0);
var Ac = !Pc(G) || Ic(function() {
  var e = {};
  return G[Qt].call(e) !== e;
});
Ac && (G = {});
Ec(G[Qt]) || _c(G, Qt, function() {
  return this;
});
var Ca = {
  IteratorPrototype: G,
  BUGGY_SAFARI_ITERATORS: Ma
}, jc = R.f, Rc = j, Mc = x, un = Mc("toStringTag"), gr = function(e, t, r) {
  e && !r && (e = e.prototype), e && !Rc(e, un) && jc(e, un, { configurable: !0, value: t });
}, Cc = Ca.IteratorPrototype, Dc = fr, Nc = rt, Fc = gr, Bc = pe, zc = function() {
  return this;
}, Lc = function(e, t, r, n) {
  var a = t + " Iterator";
  return e.prototype = Dc(Cc, { next: Nc(+!n, r) }), Fc(e, a, !1), Bc[a] = zc, e;
}, kc = b, Gc = he, Wc = function(e, t, r) {
  try {
    return kc(Gc(Object.getOwnPropertyDescriptor(e, t)[r]));
  } catch {
  }
}, Uc = T, Vc = function(e) {
  return Uc(e) || e === null;
}, Hc = Vc, Kc = String, Xc = TypeError, qc = function(e) {
  if (Hc(e))
    return e;
  throw new Xc("Can't set " + Kc(e) + " as a prototype");
}, Jc = Wc, Zc = F, Qc = qc, Da = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var e = !1, t = {}, r;
  try {
    r = Jc(Object.prototype, "__proto__", "set"), r(t, []), e = t instanceof Array;
  } catch {
  }
  return function(a, i) {
    return Zc(a), Qc(i), e ? r(a, i) : a.__proto__ = i, a;
  };
}() : void 0), Yc = te, ef = z, Na = Pa, tf = O, rf = Lc, cn = Ra, fn = Da, nf = gr, af = vr, Rt = ee, of = x, sf = pe, Fa = Ca, uf = Na.PROPER, cf = Na.CONFIGURABLE, vn = Fa.IteratorPrototype, Pe = Fa.BUGGY_SAFARI_ITERATORS, ae = of("iterator"), ln = "keys", ie = "values", dn = "entries", ff = function() {
  return this;
}, mr = function(e, t, r, n, a, i, o) {
  rf(r, t, n);
  var u = function(y) {
    if (y === a && l)
      return l;
    if (!Pe && y && y in f)
      return f[y];
    switch (y) {
      case ln:
        return function() {
          return new r(this, y);
        };
      case ie:
        return function() {
          return new r(this, y);
        };
      case dn:
        return function() {
          return new r(this, y);
        };
    }
    return function() {
      return new r(this);
    };
  }, s = t + " Iterator", c = !1, f = e.prototype, v = f[ae] || f["@@iterator"] || a && f[a], l = !Pe && v || u(a), d = t === "Array" && f.entries || v, h, g, m;
  if (d && (h = cn(d.call(new e())), h !== Object.prototype && h.next && (cn(h) !== vn && (fn ? fn(h, vn) : tf(h[ae]) || Rt(h, ae, ff)), nf(h, s, !0))), uf && a === ie && v && v.name !== ie && (cf ? af(f, "name", ie) : (c = !0, l = function() {
    return ef(v, this);
  })), a)
    if (g = {
      values: u(ie),
      keys: i ? l : u(ln),
      entries: u(dn)
    }, o)
      for (m in g)
        (Pe || c || !(m in f)) && Rt(f, m, g[m]);
    else
      Yc({ target: t, proto: !0, forced: Pe || c }, g);
  return f[ae] !== l && Rt(f, ae, l, { name: a }), sf[t] = l, g;
}, $r = function(e, t) {
  return { value: e, done: t };
}, vf = Q, br = Qs, hn = pe, Ba = Y, lf = R.f, df = mr, _e = $r, hf = E, za = "Array Iterator", pf = Ba.set, yf = Ba.getterFor(za);
df(Array, "Array", function(e, t) {
  pf(this, {
    type: za,
    target: vf(e),
    // target
    index: 0,
    // next index
    kind: t
    // kind
  });
}, function() {
  var e = yf(this), t = e.target, r = e.index++;
  if (!t || r >= t.length)
    return e.target = void 0, _e(void 0, !0);
  switch (e.kind) {
    case "keys":
      return _e(r, !1);
    case "values":
      return _e(t[r], !1);
  }
  return _e([r, t[r]], !1);
}, "values");
var pn = hn.Arguments = hn.Array;
br("keys");
br("values");
br("entries");
if (hf && pn.name !== "values")
  try {
    lf(pn, "name", { value: "values" });
  } catch {
  }
var La = { exports: {} }, ka = {}, gf = b, mf = gf([].slice), $f = J, bf = Q, Ga = nt.f, wf = mf, Wa = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], Sf = function(e) {
  try {
    return Ga(e);
  } catch {
    return wf(Wa);
  }
};
ka.f = function(t) {
  return Wa && $f(t) === "Window" ? Sf(t) : Ga(bf(t));
};
var Of = S, Tf = Of(function() {
  if (typeof ArrayBuffer == "function") {
    var e = new ArrayBuffer(8);
    Object.isExtensible(e) && Object.defineProperty(e, "a", { value: 8 });
  }
}), If = S, Ef = T, Pf = J, yn = Tf, Ge = Object.isExtensible, _f = If(function() {
  Ge(1);
}), xf = _f || yn ? function(t) {
  return !Ef(t) || yn && Pf(t) === "ArrayBuffer" ? !1 : Ge ? Ge(t) : !0;
} : Ge, Af = S, Ua = !Af(function() {
  return Object.isExtensible(Object.preventExtensions({}));
}), jf = te, Rf = b, Mf = tt, Cf = T, wr = j, Df = R.f, gn = nt, Nf = ka, Sr = xf, Ff = nr, Bf = Ua, Va = !1, B = Ff("meta"), zf = 0, Or = function(e) {
  Df(e, B, { value: {
    objectID: "O" + zf++,
    // object ID
    weakData: {}
    // weak collections IDs
  } });
}, Lf = function(e, t) {
  if (!Cf(e))
    return typeof e == "symbol" ? e : (typeof e == "string" ? "S" : "P") + e;
  if (!wr(e, B)) {
    if (!Sr(e))
      return "F";
    if (!t)
      return "E";
    Or(e);
  }
  return e[B].objectID;
}, kf = function(e, t) {
  if (!wr(e, B)) {
    if (!Sr(e))
      return !0;
    if (!t)
      return !1;
    Or(e);
  }
  return e[B].weakData;
}, Gf = function(e) {
  return Bf && Va && Sr(e) && !wr(e, B) && Or(e), e;
}, Wf = function() {
  Uf.enable = function() {
  }, Va = !0;
  var e = gn.f, t = Rf([].splice), r = {};
  r[B] = 1, e(r).length && (gn.f = function(n) {
    for (var a = e(n), i = 0, o = a.length; i < o; i++)
      if (a[i] === B) {
        t(a, i, 1);
        break;
      }
    return a;
  }, jf({ target: "Object", stat: !0, forced: !0 }, {
    getOwnPropertyNames: Nf.f
  }));
}, Uf = La.exports = {
  enable: Wf,
  fastKey: Lf,
  getWeakData: kf,
  onFreeze: Gf
};
Mf[B] = !0;
var at = La.exports, Vf = J, Hf = b, Kf = function(e) {
  if (Vf(e) === "Function")
    return Hf(e);
}, mn = Kf, Xf = he, qf = Yt, Jf = mn(mn.bind), it = function(e, t) {
  return Xf(e), t === void 0 ? e : qf ? Jf(e, t) : function() {
    return e.apply(t, arguments);
  };
}, Zf = x, Qf = pe, Yf = Zf("iterator"), ev = Array.prototype, Ha = function(e) {
  return e !== void 0 && (Qf.Array === e || ev[Yf] === e);
}, tv = x, rv = tv("toStringTag"), Ka = {};
Ka[rv] = "z";
var Tr = String(Ka) === "[object z]", nv = Tr, av = O, We = J, iv = x, ov = iv("toStringTag"), sv = Object, uv = We(/* @__PURE__ */ function() {
  return arguments;
}()) === "Arguments", cv = function(e, t) {
  try {
    return e[t];
  } catch {
  }
}, ot = nv ? We : function(e) {
  var t, r, n;
  return e === void 0 ? "Undefined" : e === null ? "Null" : typeof (r = cv(t = sv(e), ov)) == "string" ? r : uv ? We(t) : (n = We(t)) === "Object" && av(t.callee) ? "Arguments" : n;
}, fv = ot, $n = or, vv = Z, lv = pe, dv = x, hv = dv("iterator"), Ir = function(e) {
  if (!vv(e))
    return $n(e, hv) || $n(e, "@@iterator") || lv[fv(e)];
}, pv = z, yv = he, gv = F, mv = ir, $v = Ir, bv = TypeError, Xa = function(e, t) {
  var r = arguments.length < 2 ? $v(e) : t;
  if (yv(r))
    return gv(pv(r, e));
  throw new bv(mv(e) + " is not iterable");
}, wv = z, bn = F, Sv = or, qa = function(e, t, r) {
  var n, a;
  bn(e);
  try {
    if (n = Sv(e, "return"), !n) {
      if (t === "throw")
        throw r;
      return r;
    }
    n = wv(n, e);
  } catch (i) {
    a = !0, n = i;
  }
  if (t === "throw")
    throw r;
  if (a)
    throw n;
  return bn(n), r;
}, Ov = it, Tv = z, Iv = F, Ev = ir, Pv = Ha, _v = et, wn = ar, xv = Xa, Av = Ir, Sn = qa, jv = TypeError, Ue = function(e, t) {
  this.stopped = e, this.result = t;
}, On = Ue.prototype, st = function(e, t, r) {
  var n = r && r.that, a = !!(r && r.AS_ENTRIES), i = !!(r && r.IS_RECORD), o = !!(r && r.IS_ITERATOR), u = !!(r && r.INTERRUPTED), s = Ov(t, n), c, f, v, l, d, h, g, m = function(p) {
    return c && Sn(c, "normal", p), new Ue(!0, p);
  }, y = function(p) {
    return a ? (Iv(p), u ? s(p[0], p[1], m) : s(p[0], p[1])) : u ? s(p, m) : s(p);
  };
  if (i)
    c = e.iterator;
  else if (o)
    c = e;
  else {
    if (f = Av(e), !f)
      throw new jv(Ev(e) + " is not iterable");
    if (Pv(f)) {
      for (v = 0, l = _v(e); l > v; v++)
        if (d = y(e[v]), d && wn(On, d))
          return d;
      return new Ue(!1);
    }
    c = xv(e, f);
  }
  for (h = i ? e.next : c.next; !(g = Tv(h, c)).done; ) {
    try {
      d = y(g.value);
    } catch (p) {
      Sn(c, "throw", p);
    }
    if (typeof d == "object" && d && wn(On, d))
      return d;
  }
  return new Ue(!1);
}, Rv = ar, Mv = TypeError, Er = function(e, t) {
  if (Rv(t, e))
    return e;
  throw new Mv("Incorrect invocation");
}, Cv = x, Ja = Cv("iterator"), Za = !1;
try {
  var Dv = 0, Tn = {
    next: function() {
      return { done: !!Dv++ };
    },
    return: function() {
      Za = !0;
    }
  };
  Tn[Ja] = function() {
    return this;
  }, Array.from(Tn, function() {
    throw 2;
  });
} catch {
}
var Qa = function(e, t) {
  try {
    if (!t && !Za)
      return !1;
  } catch {
    return !1;
  }
  var r = !1;
  try {
    var n = {};
    n[Ja] = function() {
      return {
        next: function() {
          return { done: r = !0 };
        }
      };
    }, e(n);
  } catch {
  }
  return r;
}, Nv = O, Fv = T, In = Da, Bv = function(e, t, r) {
  var n, a;
  return (
    // it can work only with native `setPrototypeOf`
    In && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    Nv(n = t.constructor) && n !== r && Fv(a = n.prototype) && a !== r.prototype && In(e, a), e
  );
}, zv = te, Lv = I, kv = b, En = ja, Gv = ee, Wv = at, Uv = st, Vv = Er, Hv = O, Kv = Z, Mt = T, Ct = S, Xv = Qa, qv = gr, Jv = Bv, Pr = function(e, t, r) {
  var n = e.indexOf("Map") !== -1, a = e.indexOf("Weak") !== -1, i = n ? "set" : "add", o = Lv[e], u = o && o.prototype, s = o, c = {}, f = function(y) {
    var p = kv(u[y]);
    Gv(
      u,
      y,
      y === "add" ? function(w) {
        return p(this, w === 0 ? 0 : w), this;
      } : y === "delete" ? function($) {
        return a && !Mt($) ? !1 : p(this, $ === 0 ? 0 : $);
      } : y === "get" ? function(w) {
        return a && !Mt(w) ? void 0 : p(this, w === 0 ? 0 : w);
      } : y === "has" ? function(w) {
        return a && !Mt(w) ? !1 : p(this, w === 0 ? 0 : w);
      } : function(w, Oi) {
        return p(this, w === 0 ? 0 : w, Oi), this;
      }
    );
  }, v = En(
    e,
    !Hv(o) || !(a || u.forEach && !Ct(function() {
      new o().entries().next();
    }))
  );
  if (v)
    s = r.getConstructor(t, e, n, i), Wv.enable();
  else if (En(e, !0)) {
    var l = new s(), d = l[i](a ? {} : -0, 1) !== l, h = Ct(function() {
      l.has(1);
    }), g = Xv(function(y) {
      new o(y);
    }), m = !a && Ct(function() {
      for (var y = new o(), p = 5; p--; )
        y[i](p, p);
      return !y.has(-0);
    });
    g || (s = t(function(y, p) {
      Vv(y, u);
      var $ = Jv(new o(), y, s);
      return Kv(p) || Uv(p, $[i], { that: $, AS_ENTRIES: n }), $;
    }), s.prototype = u, u.constructor = s), (h || m) && (f("delete"), f("has"), n && f("get")), (m || d) && f(i), a && u.clear && delete u.clear;
  }
  return c[e] = s, zv({ global: !0, constructor: !0, forced: s !== o }, c), qv(s, e), a || r.setStrong(s, e, n), s;
}, Pn = Aa, Zv = R, Ya = function(e, t, r) {
  return r.get && Pn(r.get, t, { getter: !0 }), r.set && Pn(r.set, t, { setter: !0 }), Zv.f(e, t, r);
}, Qv = ee, _r = function(e, t, r) {
  for (var n in t)
    Qv(e, n, t[n], r);
  return e;
}, Yv = de, el = Ya, tl = x, rl = E, _n = tl("species"), nl = function(e) {
  var t = Yv(e);
  rl && t && !t[_n] && el(t, _n, {
    configurable: !0,
    get: function() {
      return this;
    }
  });
}, xn = fr, al = Ya, An = _r, il = it, ol = Er, sl = Z, ul = st, cl = mr, xe = $r, fl = nl, oe = E, jn = at.fastKey, ei = Y, Rn = ei.set, Dt = ei.getterFor, ti = {
  getConstructor: function(e, t, r, n) {
    var a = e(function(c, f) {
      ol(c, i), Rn(c, {
        type: t,
        index: xn(null),
        first: void 0,
        last: void 0,
        size: 0
      }), oe || (c.size = 0), sl(f) || ul(f, c[n], { that: c, AS_ENTRIES: r });
    }), i = a.prototype, o = Dt(t), u = function(c, f, v) {
      var l = o(c), d = s(c, f), h, g;
      return d ? d.value = v : (l.last = d = {
        index: g = jn(f, !0),
        key: f,
        value: v,
        previous: h = l.last,
        next: void 0,
        removed: !1
      }, l.first || (l.first = d), h && (h.next = d), oe ? l.size++ : c.size++, g !== "F" && (l.index[g] = d)), c;
    }, s = function(c, f) {
      var v = o(c), l = jn(f), d;
      if (l !== "F")
        return v.index[l];
      for (d = v.first; d; d = d.next)
        if (d.key === f)
          return d;
    };
    return An(i, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function() {
        for (var f = this, v = o(f), l = v.first; l; )
          l.removed = !0, l.previous && (l.previous = l.previous.next = void 0), l = l.next;
        v.first = v.last = void 0, v.index = xn(null), oe ? v.size = 0 : f.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      delete: function(c) {
        var f = this, v = o(f), l = s(f, c);
        if (l) {
          var d = l.next, h = l.previous;
          delete v.index[l.index], l.removed = !0, h && (h.next = d), d && (d.previous = h), v.first === l && (v.first = d), v.last === l && (v.last = h), oe ? v.size-- : f.size--;
        }
        return !!l;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function(f) {
        for (var v = o(this), l = il(f, arguments.length > 1 ? arguments[1] : void 0), d; d = d ? d.next : v.first; )
          for (l(d.value, d.key, this); d && d.removed; )
            d = d.previous;
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function(f) {
        return !!s(this, f);
      }
    }), An(i, r ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function(f) {
        var v = s(this, f);
        return v && v.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function(f, v) {
        return u(this, f === 0 ? 0 : f, v);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function(f) {
        return u(this, f = f === 0 ? 0 : f, f);
      }
    }), oe && al(i, "size", {
      configurable: !0,
      get: function() {
        return o(this).size;
      }
    }), a;
  },
  setStrong: function(e, t, r) {
    var n = t + " Iterator", a = Dt(t), i = Dt(n);
    cl(e, t, function(o, u) {
      Rn(this, {
        type: n,
        target: o,
        state: a(o),
        kind: u,
        last: void 0
      });
    }, function() {
      for (var o = i(this), u = o.kind, s = o.last; s && s.removed; )
        s = s.previous;
      return !o.target || !(o.last = s = s ? s.next : o.state.first) ? (o.target = void 0, xe(void 0, !0)) : xe(u === "keys" ? s.key : u === "values" ? s.value : [s.key, s.value], !1);
    }, r ? "entries" : "values", !r, !0), fl(t);
  }
}, vl = Pr, ll = ti;
vl("Map", function(e) {
  return function() {
    return e(this, arguments.length ? arguments[0] : void 0);
  };
}, ll);
var Ae = b, se = Map.prototype, dl = {
  // eslint-disable-next-line es/no-map -- safe
  Map,
  set: Ae(se.set),
  get: Ae(se.get),
  has: Ae(se.has),
  remove: Ae(se.delete),
  proto: se
}, hl = te, pl = b, yl = he, gl = Ye, ml = st, ut = dl, $l = qi, bl = ut.Map, wl = ut.has, Sl = ut.get, Ol = ut.set, Tl = pl([].push);
hl({ target: "Map", stat: !0, forced: $l }, {
  groupBy: function(t, r) {
    gl(t), yl(r);
    var n = new bl(), a = 0;
    return ml(t, function(i) {
      var o = r(i, a++);
      wl(n, o) ? Tl(Sl(n, o), i) : Ol(n, o, [i]);
    }), n;
  }
});
var Il = Tr, El = ot, Pl = Il ? {}.toString : function() {
  return "[object " + El(this) + "]";
}, _l = Tr, xl = ee, Al = Pl;
_l || xl(Object.prototype, "toString", Al, { unsafe: !0 });
var jl = ot, Rl = String, ri = function(e) {
  if (jl(e) === "Symbol")
    throw new TypeError("Cannot convert a Symbol value to a string");
  return Rl(e);
}, xr = b, Ml = sr, Cl = ri, Dl = Ye, Nl = xr("".charAt), Mn = xr("".charCodeAt), Fl = xr("".slice), Cn = function(e) {
  return function(t, r) {
    var n = Cl(Dl(t)), a = Ml(r), i = n.length, o, u;
    return a < 0 || a >= i ? e ? "" : void 0 : (o = Mn(n, a), o < 55296 || o > 56319 || a + 1 === i || (u = Mn(n, a + 1)) < 56320 || u > 57343 ? e ? Nl(n, a) : o : e ? Fl(n, a, a + 2) : (o - 55296 << 10) + (u - 56320) + 65536);
  };
}, Bl = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: Cn(!1),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: Cn(!0)
}, zl = Bl.charAt, Ll = ri, ni = Y, kl = mr, Dn = $r, ai = "String Iterator", Gl = ni.set, Wl = ni.getterFor(ai);
kl(String, "String", function(e) {
  Gl(this, {
    type: ai,
    string: Ll(e),
    index: 0
  });
}, function() {
  var t = Wl(this), r = t.string, n = t.index, a;
  return n >= r.length ? Dn(void 0, !0) : (a = zl(r, n), t.index += a.length, Dn(a, !1));
});
var Ul = I, ge = Ul, Vl = ge;
Vl.Map;
var Hl = Pr, Kl = ti;
Hl("Set", function(e) {
  return function() {
    return e(this, arguments.length ? arguments[0] : void 0);
  };
}, Kl);
var Xl = ge;
Xl.Set;
var ql = J, Jl = Array.isArray || function(t) {
  return ql(t) === "Array";
}, Zl = b, Ql = S, ii = O, Yl = ot, ed = de, td = _a, oi = function() {
}, si = ed("Reflect", "construct"), Ar = /^\s*(?:class|function)\b/, rd = Zl(Ar.exec), nd = !Ar.test(oi), ue = function(t) {
  if (!ii(t))
    return !1;
  try {
    return si(oi, [], t), !0;
  } catch {
    return !1;
  }
}, ui = function(t) {
  if (!ii(t))
    return !1;
  switch (Yl(t)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return !1;
  }
  try {
    return nd || !!rd(Ar, td(t));
  } catch {
    return !0;
  }
};
ui.sham = !0;
var ci = !si || Ql(function() {
  var e;
  return ue(ue.call) || !ue(Object) || !ue(function() {
    e = !0;
  }) || e;
}) ? ui : ue, Nn = Jl, ad = ci, id = T, od = x, sd = od("species"), Fn = Array, ud = function(e) {
  var t;
  return Nn(e) && (t = e.constructor, ad(t) && (t === Fn || Nn(t.prototype)) ? t = void 0 : id(t) && (t = t[sd], t === null && (t = void 0))), t === void 0 ? Fn : t;
}, cd = ud, fd = function(e, t) {
  return new (cd(e))(t === 0 ? 0 : t);
}, vd = it, ld = b, dd = er, hd = le, pd = et, yd = fd, Bn = ld([].push), L = function(e) {
  var t = e === 1, r = e === 2, n = e === 3, a = e === 4, i = e === 6, o = e === 7, u = e === 5 || i;
  return function(s, c, f, v) {
    for (var l = hd(s), d = dd(l), h = pd(d), g = vd(c, f), m = 0, y = v || yd, p = t ? y(s, h) : r || o ? y(s, 0) : void 0, $, w; h > m; m++)
      if ((u || m in d) && ($ = d[m], w = g($, m, l), e))
        if (t)
          p[m] = w;
        else if (w)
          switch (e) {
            case 3:
              return !0;
            case 5:
              return $;
            case 6:
              return m;
            case 2:
              Bn(p, $);
          }
        else
          switch (e) {
            case 4:
              return !1;
            case 7:
              Bn(p, $);
          }
    return i ? -1 : n || a ? a : p;
  };
}, gd = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: L(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: L(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: L(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: L(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: L(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: L(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: L(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: L(7)
}, md = b, zn = _r, je = at.getWeakData, $d = Er, bd = F, wd = Z, Nt = T, Sd = st, fi = gd, Ln = j, vi = Y, Od = vi.set, Td = vi.getterFor, Id = fi.find, Ed = fi.findIndex, Pd = md([].splice), _d = 0, Re = function(e) {
  return e.frozen || (e.frozen = new li());
}, li = function() {
  this.entries = [];
}, Ft = function(e, t) {
  return Id(e.entries, function(r) {
    return r[0] === t;
  });
};
li.prototype = {
  get: function(e) {
    var t = Ft(this, e);
    if (t)
      return t[1];
  },
  has: function(e) {
    return !!Ft(this, e);
  },
  set: function(e, t) {
    var r = Ft(this, e);
    r ? r[1] = t : this.entries.push([e, t]);
  },
  delete: function(e) {
    var t = Ed(this.entries, function(r) {
      return r[0] === e;
    });
    return ~t && Pd(this.entries, t, 1), !!~t;
  }
};
var xd = {
  getConstructor: function(e, t, r, n) {
    var a = e(function(s, c) {
      $d(s, i), Od(s, {
        type: t,
        id: _d++,
        frozen: void 0
      }), wd(c) || Sd(c, s[n], { that: s, AS_ENTRIES: r });
    }), i = a.prototype, o = Td(t), u = function(s, c, f) {
      var v = o(s), l = je(bd(c), !0);
      return l === !0 ? Re(v).set(c, f) : l[v.id] = f, s;
    };
    return zn(i, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      delete: function(s) {
        var c = o(this);
        if (!Nt(s))
          return !1;
        var f = je(s);
        return f === !0 ? Re(c).delete(s) : f && Ln(f, c.id) && delete f[c.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function(c) {
        var f = o(this);
        if (!Nt(c))
          return !1;
        var v = je(c);
        return v === !0 ? Re(f).has(c) : v && Ln(v, f.id);
      }
    }), zn(i, r ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function(c) {
        var f = o(this);
        if (Nt(c)) {
          var v = je(c);
          return v === !0 ? Re(f).get(c) : v ? v[f.id] : void 0;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function(c, f) {
        return u(this, c, f);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function(c) {
        return u(this, c, !0);
      }
    }), a;
  }
}, Ad = Ua, kn = I, Ve = b, Gn = _r, jd = at, Rd = Pr, di = xd, Me = T, Ce = Y.enforce, Md = S, Cd = wa, me = Object, Dd = Array.isArray, De = me.isExtensible, hi = me.isFrozen, Nd = me.isSealed, pi = me.freeze, Fd = me.seal, Bd = !kn.ActiveXObject && "ActiveXObject" in kn, ce, yi = function(e) {
  return function() {
    return e(this, arguments.length ? arguments[0] : void 0);
  };
}, gi = Rd("WeakMap", yi, di), H = gi.prototype, He = Ve(H.set), zd = function() {
  return Ad && Md(function() {
    var e = pi([]);
    return He(new gi(), e, 1), !hi(e);
  });
};
if (Cd)
  if (Bd) {
    ce = di.getConstructor(yi, "WeakMap", !0), jd.enable();
    var Wn = Ve(H.delete), Ne = Ve(H.has), Un = Ve(H.get);
    Gn(H, {
      delete: function(e) {
        if (Me(e) && !De(e)) {
          var t = Ce(this);
          return t.frozen || (t.frozen = new ce()), Wn(this, e) || t.frozen.delete(e);
        }
        return Wn(this, e);
      },
      has: function(t) {
        if (Me(t) && !De(t)) {
          var r = Ce(this);
          return r.frozen || (r.frozen = new ce()), Ne(this, t) || r.frozen.has(t);
        }
        return Ne(this, t);
      },
      get: function(t) {
        if (Me(t) && !De(t)) {
          var r = Ce(this);
          return r.frozen || (r.frozen = new ce()), Ne(this, t) ? Un(this, t) : r.frozen.get(t);
        }
        return Un(this, t);
      },
      set: function(t, r) {
        if (Me(t) && !De(t)) {
          var n = Ce(this);
          n.frozen || (n.frozen = new ce()), Ne(this, t) ? He(this, t, r) : n.frozen.set(t, r);
        } else
          He(this, t, r);
        return this;
      }
    });
  } else
    zd() && Gn(H, {
      set: function(t, r) {
        var n;
        return Dd(t) && (hi(t) ? n = pi : Nd(t) && (n = Fd)), He(this, t, r), n && n(t), this;
      }
    });
var Ld = ge;
Ld.WeakMap;
var kd = F, Gd = qa, Wd = function(e, t, r, n) {
  try {
    return n ? t(kd(r)[0], r[1]) : t(r);
  } catch (a) {
    Gd(e, "throw", a);
  }
}, Ud = E, Vd = R, Hd = rt, Kd = function(e, t, r) {
  Ud ? Vd.f(e, t, Hd(0, r)) : e[t] = r;
}, Xd = it, qd = z, Jd = le, Zd = Wd, Qd = Ha, Yd = ci, eh = et, Vn = Kd, th = Xa, rh = Ir, Hn = Array, nh = function(t) {
  var r = Jd(t), n = Yd(this), a = arguments.length, i = a > 1 ? arguments[1] : void 0, o = i !== void 0;
  o && (i = Xd(i, a > 2 ? arguments[2] : void 0));
  var u = rh(r), s = 0, c, f, v, l, d, h;
  if (u && !(this === Hn && Qd(u)))
    for (l = th(r, u), d = l.next, f = n ? new this() : []; !(v = qd(d, l)).done; s++)
      h = o ? Zd(l, i, [v.value, s], !0) : v.value, Vn(f, s, h);
  else
    for (c = eh(r), f = n ? new this(c) : Hn(c); c > s; s++)
      h = o ? i(r[s], s) : r[s], Vn(f, s, h);
  return f.length = s, f;
}, ah = te, ih = nh, oh = Qa, sh = !oh(function(e) {
  Array.from(e);
});
ah({ target: "Array", stat: !0, forced: sh }, {
  from: ih
});
var uh = ge;
uh.Array.from;
var Kn = E, ch = b, fh = z, vh = S, Bt = ma, lh = yr, dh = dr, hh = le, ph = er, V = Object.assign, Xn = Object.defineProperty, yh = ch([].concat), gh = !V || vh(function() {
  if (Kn && V({ b: 1 }, V(Xn({}, "a", {
    enumerable: !0,
    get: function() {
      Xn(this, "b", {
        value: 3,
        enumerable: !1
      });
    }
  }), { b: 2 })).b !== 1)
    return !0;
  var e = {}, t = {}, r = Symbol("assign detection"), n = "abcdefghijklmnopqrst";
  return e[r] = 7, n.split("").forEach(function(a) {
    t[a] = a;
  }), V({}, e)[r] !== 7 || Bt(V({}, t)).join("") !== n;
}) ? function(t, r) {
  for (var n = hh(t), a = arguments.length, i = 1, o = lh.f, u = dh.f; a > i; )
    for (var s = ph(arguments[i++]), c = o ? yh(Bt(s), o(s)) : Bt(s), f = c.length, v = 0, l; f > v; )
      l = c[v++], (!Kn || fh(u, s, l)) && (n[l] = s[l]);
  return n;
} : V, mh = te, qn = gh;
mh({ target: "Object", stat: !0, arity: 2, forced: Object.assign !== qn }, {
  assign: qn
});
var $h = ge;
$h.Object.assign;
var Fe, Je = /* @__PURE__ */ new WeakMap();
function mi() {
  if (Fe !== void 0)
    return Fe;
  var e = !1;
  try {
    var t = function() {
    }, r = Object.defineProperty({}, "passive", {
      enumerable: !0,
      get: function() {
        return e = !0, !0;
      }
    });
    window.addEventListener("testPassive", t, r), window.removeEventListener("testPassive", t, r);
  } catch {
  }
  return Fe = e ? { passive: !1 } : !1, Fe;
}
function re(e) {
  var t = Je.get(e) || [];
  return Je.set(e, t), function(n, a, i) {
    function o(u) {
      u.defaultPrevented || i(u);
    }
    a.split(/\s+/g).forEach(function(u) {
      t.push({ elem: n, eventName: u, handler: o }), n.addEventListener(u, o, mi());
    });
  };
}
function bh(e) {
  var t = Je.get(e);
  t && (t.forEach(function(r) {
    var n = r.elem, a = r.eventName, i = r.handler;
    n.removeEventListener(a, i, mi());
  }), Je.delete(e));
}
function wh(e) {
  return e.touches ? e.touches[e.touches.length - 1] : e;
}
function X(e) {
  var t = wh(e);
  return {
    x: t.clientX,
    y: t.clientY
  };
}
function Be(e, t) {
  return t === void 0 && (t = []), t.some(function(r) {
    return e === r;
  });
}
var $i = [
  "webkit",
  "moz",
  "ms",
  "o"
], Sh = new RegExp("^-(?!(?:" + $i.join("|") + ")-)");
function Oh(e) {
  var t = {};
  return Object.keys(e).forEach(function(r) {
    if (!Sh.test(r)) {
      t[r] = e[r];
      return;
    }
    var n = e[r];
    r = r.replace(/^-/, ""), t[r] = n, $i.forEach(function(a) {
      t["-" + a + "-" + r] = n;
    });
  }), t;
}
function W(e, t) {
  t = Oh(t), Object.keys(t).forEach(function(r) {
    var n = r.replace(/^-/, "").replace(/-([a-z])/g, function(a, i) {
      return i.toUpperCase();
    });
    e.style[n] = t[r];
  });
}
var Th = (
  /** @class */
  function() {
    function e(t) {
      this.velocityMultiplier = window.devicePixelRatio, this.updateTime = Date.now(), this.delta = { x: 0, y: 0 }, this.velocity = { x: 0, y: 0 }, this.lastPosition = { x: 0, y: 0 }, this.lastPosition = X(t);
    }
    return e.prototype.update = function(t) {
      var r = this, n = r.velocity, a = r.updateTime, i = r.lastPosition, o = Date.now(), u = X(t), s = {
        x: -(u.x - i.x),
        y: -(u.y - i.y)
      }, c = o - a || 16.7, f = s.x / c * 16.7, v = s.y / c * 16.7;
      n.x = f * this.velocityMultiplier, n.y = v * this.velocityMultiplier, this.delta = s, this.updateTime = o, this.lastPosition = u;
    }, e;
  }()
), Ih = (
  /** @class */
  function() {
    function e() {
      this._touchList = {};
    }
    return Object.defineProperty(e.prototype, "_primitiveValue", {
      get: function() {
        return { x: 0, y: 0 };
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.isActive = function() {
      return this._activeTouchID !== void 0;
    }, e.prototype.getDelta = function() {
      var t = this._getActiveTracker();
      return t ? N({}, t.delta) : this._primitiveValue;
    }, e.prototype.getVelocity = function() {
      var t = this._getActiveTracker();
      return t ? N({}, t.velocity) : this._primitiveValue;
    }, e.prototype.getEasingDistance = function(t) {
      var r = 1 - t, n = {
        x: 0,
        y: 0
      }, a = this.getVelocity();
      return Object.keys(a).forEach(function(i) {
        for (var o = Math.abs(a[i]) <= 10 ? 0 : a[i]; o !== 0; )
          n[i] += o, o = o * r | 0;
      }), n;
    }, e.prototype.track = function(t) {
      var r = this, n = t.targetTouches;
      return Array.from(n).forEach(function(a) {
        r._add(a);
      }), this._touchList;
    }, e.prototype.update = function(t) {
      var r = this, n = t.touches, a = t.changedTouches;
      return Array.from(n).forEach(function(i) {
        r._renew(i);
      }), this._setActiveID(a), this._touchList;
    }, e.prototype.release = function(t) {
      var r = this;
      delete this._activeTouchID, Array.from(t.changedTouches).forEach(function(n) {
        r._delete(n);
      });
    }, e.prototype._add = function(t) {
      this._has(t) && this._delete(t);
      var r = new Th(t);
      this._touchList[t.identifier] = r;
    }, e.prototype._renew = function(t) {
      if (this._has(t)) {
        var r = this._touchList[t.identifier];
        r.update(t);
      }
    }, e.prototype._delete = function(t) {
      delete this._touchList[t.identifier];
    }, e.prototype._has = function(t) {
      return this._touchList.hasOwnProperty(t.identifier);
    }, e.prototype._setActiveID = function(t) {
      this._activeTouchID = t[t.length - 1].identifier;
    }, e.prototype._getActiveTracker = function() {
      var t = this, r = t._touchList, n = t._activeTouchID;
      return r[n];
    }, e;
  }()
);
function _(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
function bi(e, t, r) {
  t === void 0 && (t = 0);
  var n, a = -1 / 0;
  return function() {
    for (var o = this, u = [], s = 0; s < arguments.length; s++)
      u[s] = arguments[s];
    if (r) {
      var c = Date.now(), f = c - a;
      a = c, f >= t && e.apply(this, u);
    }
    clearTimeout(n), n = setTimeout(function() {
      e.apply(o, u);
    }, t);
  };
}
function Jn(e, t) {
  return e === void 0 && (e = -1 / 0), t === void 0 && (t = 1 / 0), function(r, n) {
    var a = "_" + n;
    Object.defineProperty(r, n, {
      get: function() {
        return this[a];
      },
      set: function(i) {
        Object.defineProperty(this, a, {
          value: _(i, e, t),
          enumerable: !1,
          writable: !0,
          configurable: !0
        });
      },
      enumerable: !0,
      configurable: !0
    });
  };
}
function zt(e, t) {
  var r = "_" + t;
  Object.defineProperty(e, t, {
    get: function() {
      return this[r];
    },
    set: function(n) {
      Object.defineProperty(this, r, {
        value: !!n,
        enumerable: !1,
        writable: !0,
        configurable: !0
      });
    },
    enumerable: !0,
    configurable: !0
  });
}
function wi() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  return function(r, n, a) {
    var i = a.value;
    return {
      get: function() {
        return this.hasOwnProperty(n) || Object.defineProperty(this, n, {
          value: bi.apply(void 0, Ni([i], e))
        }), this[n];
      }
    };
  };
}
var Eh = (
  /** @class */
  function() {
    function e(t) {
      var r = this;
      t === void 0 && (t = {}), this.damping = 0.1, this.thumbMinSize = 20, this.renderByPixels = !0, this.alwaysShowTracks = !1, this.continuousScrolling = !0, this.delegateTo = null, this.plugins = {}, Object.keys(t).forEach(function(n) {
        r[n] = t[n];
      });
    }
    return Object.defineProperty(e.prototype, "wheelEventTarget", {
      get: function() {
        return this.delegateTo;
      },
      set: function(t) {
        console.warn("[smooth-scrollbar]: `options.wheelEventTarget` is deprecated and will be removed in the future, use `options.delegateTo` instead."), this.delegateTo = t;
      },
      enumerable: !0,
      configurable: !0
    }), k([
      Jn(0, 1)
    ], e.prototype, "damping", void 0), k([
      Jn(0, 1 / 0)
    ], e.prototype, "thumbMinSize", void 0), k([
      zt
    ], e.prototype, "renderByPixels", void 0), k([
      zt
    ], e.prototype, "alwaysShowTracks", void 0), k([
      zt
    ], e.prototype, "continuousScrolling", void 0), e;
  }()
), q;
(function(e) {
  e.X = "x", e.Y = "y";
})(q || (q = {}));
var Ph = (
  /** @class */
  function() {
    function e(t, r) {
      r === void 0 && (r = 0), this._direction = t, this._minSize = r, this.element = document.createElement("div"), this.displaySize = 0, this.realSize = 0, this.offset = 0, this.element.className = "scrollbar-thumb scrollbar-thumb-" + t;
    }
    return e.prototype.attachTo = function(t) {
      t.appendChild(this.element);
    }, e.prototype.update = function(t, r, n) {
      this.realSize = Math.min(r / n, 1) * r, this.displaySize = Math.max(this.realSize, this._minSize), this.offset = t / n * (r + (this.realSize - this.displaySize)), W(this.element, this._getStyle());
    }, e.prototype._getStyle = function() {
      switch (this._direction) {
        case q.X:
          return {
            width: this.displaySize + "px",
            "-transform": "translate3d(" + this.offset + "px, 0, 0)"
          };
        case q.Y:
          return {
            height: this.displaySize + "px",
            "-transform": "translate3d(0, " + this.offset + "px, 0)"
          };
        default:
          return null;
      }
    }, e;
  }()
), Zn = (
  /** @class */
  function() {
    function e(t, r) {
      r === void 0 && (r = 0), this.element = document.createElement("div"), this._isShown = !1, this.element.className = "scrollbar-track scrollbar-track-" + t, this.thumb = new Ph(t, r), this.thumb.attachTo(this.element);
    }
    return e.prototype.attachTo = function(t) {
      t.appendChild(this.element);
    }, e.prototype.show = function() {
      this._isShown || (this._isShown = !0, this.element.classList.add("show"));
    }, e.prototype.hide = function() {
      this._isShown && (this._isShown = !1, this.element.classList.remove("show"));
    }, e.prototype.update = function(t, r, n) {
      W(this.element, {
        display: n <= r ? "none" : "block"
      }), this.thumb.update(t, r, n);
    }, e;
  }()
), _h = (
  /** @class */
  function() {
    function e(t) {
      this._scrollbar = t;
      var r = t.options.thumbMinSize;
      this.xAxis = new Zn(q.X, r), this.yAxis = new Zn(q.Y, r), this.xAxis.attachTo(t.containerEl), this.yAxis.attachTo(t.containerEl), t.options.alwaysShowTracks && (this.xAxis.show(), this.yAxis.show());
    }
    return e.prototype.update = function() {
      var t = this._scrollbar, r = t.size, n = t.offset;
      this.xAxis.update(n.x, r.container.width, r.content.width), this.yAxis.update(n.y, r.container.height, r.content.height);
    }, e.prototype.autoHideOnIdle = function() {
      this._scrollbar.options.alwaysShowTracks || (this.xAxis.hide(), this.yAxis.hide());
    }, k([
      wi(300)
    ], e.prototype, "autoHideOnIdle", null), e;
  }()
);
function xh(e) {
  var t = e.containerEl, r = e.contentEl, n = getComputedStyle(t), a = [
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight"
  ].map(function(u) {
    return n[u] ? parseFloat(n[u]) : 0;
  }), i = a[0] + a[1], o = a[2] + a[3];
  return {
    container: {
      // requires `overflow: hidden`
      width: t.clientWidth,
      height: t.clientHeight
    },
    content: {
      // border width and paddings should be included
      width: r.offsetWidth - r.clientWidth + r.scrollWidth + o,
      height: r.offsetHeight - r.clientHeight + r.scrollHeight + i
    }
  };
}
function Ah(e, t) {
  var r = e.bounding, n = t.getBoundingClientRect(), a = Math.max(r.top, n.top), i = Math.max(r.left, n.left), o = Math.min(r.right, n.right), u = Math.min(r.bottom, n.bottom);
  return a < u && i < o;
}
function jh(e) {
  var t = e.getSize(), r = {
    x: Math.max(t.content.width - t.container.width, 0),
    y: Math.max(t.content.height - t.container.height, 0)
  }, n = e.containerEl.getBoundingClientRect(), a = {
    top: Math.max(n.top, 0),
    right: Math.min(n.right, window.innerWidth),
    bottom: Math.min(n.bottom, window.innerHeight),
    left: Math.max(n.left, 0)
  };
  e.size = t, e.limit = r, e.bounding = a, e.track.update(), e.setPosition();
}
function Rh(e, t, r) {
  var n = e.options, a = e.offset, i = e.limit, o = e.track, u = e.contentEl;
  return n.renderByPixels && (t = Math.round(t), r = Math.round(r)), t = _(t, 0, i.x), r = _(r, 0, i.y), t !== a.x && o.xAxis.show(), r !== a.y && o.yAxis.show(), n.alwaysShowTracks || o.autoHideOnIdle(), t === a.x && r === a.y ? null : (a.x = t, a.y = r, W(u, {
    "-transform": "translate3d(" + -t + "px, " + -r + "px, 0)"
  }), o.update(), {
    offset: N({}, a),
    limit: N({}, i)
  });
}
var Qn = /* @__PURE__ */ new WeakMap();
function Mh(e, t, r, n, a) {
  n === void 0 && (n = 0);
  var i = a === void 0 ? {} : a, o = i.easing, u = o === void 0 ? Ch : o, s = i.callback, c = e.options, f = e.offset, v = e.limit;
  c.renderByPixels && (t = Math.round(t), r = Math.round(r));
  var l = f.x, d = f.y, h = _(t, 0, v.x) - l, g = _(r, 0, v.y) - d, m = Date.now();
  function y() {
    var p = Date.now() - m, $ = n ? u(Math.min(p / n, 1)) : 1;
    if (e.setPosition(l + h * $, d + g * $), p >= n)
      typeof s == "function" && s.call(e);
    else {
      var w = requestAnimationFrame(y);
      Qn.set(e, w);
    }
  }
  cancelAnimationFrame(Qn.get(e)), y();
}
function Ch(e) {
  return Math.pow(e - 1, 3) + 1;
}
function Dh(e, t, r) {
  var n = r === void 0 ? {} : r, a = n.alignToTop, i = a === void 0 ? !0 : a, o = n.onlyScrollIfNeeded, u = o === void 0 ? !1 : o, s = n.offsetTop, c = s === void 0 ? 0 : s, f = n.offsetLeft, v = f === void 0 ? 0 : f, l = n.offsetBottom, d = l === void 0 ? 0 : l, h = e.containerEl, g = e.bounding, m = e.offset, y = e.limit;
  if (!(!t || !h.contains(t))) {
    var p = t.getBoundingClientRect();
    if (!(u && e.isVisible(t))) {
      var $ = i ? p.top - g.top - c : p.bottom - g.bottom + d;
      e.setMomentum(p.left - g.left - v, _($, -m.y, y.y - m.y));
    }
  }
}
var Nh = (
  /** @class */
  function() {
    function e(t, r) {
      var n = this.constructor;
      this.scrollbar = t, this.name = n.pluginName, this.options = N(N({}, n.defaultOptions), r);
    }
    return e.prototype.onInit = function() {
    }, e.prototype.onDestroy = function() {
    }, e.prototype.onUpdate = function() {
    }, e.prototype.onRender = function(t) {
    }, e.prototype.transformDelta = function(t, r) {
      return N({}, t);
    }, e.pluginName = "", e.defaultOptions = {}, e;
  }()
), Ze = {
  order: /* @__PURE__ */ new Set(),
  constructors: {}
};
function Fh() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  e.forEach(function(r) {
    var n = r.pluginName;
    if (!n)
      throw new TypeError("plugin name is required");
    Ze.order.add(n), Ze.constructors[n] = r;
  });
}
function Bh(e, t) {
  return Array.from(Ze.order).filter(function(r) {
    return t[r] !== !1;
  }).map(function(r) {
    var n = Ze.constructors[r], a = new n(e, t[r]);
    return t[r] = a.options, a;
  });
}
var P;
(function(e) {
  e[e.TAB = 9] = "TAB", e[e.SPACE = 32] = "SPACE", e[e.PAGE_UP = 33] = "PAGE_UP", e[e.PAGE_DOWN = 34] = "PAGE_DOWN", e[e.END = 35] = "END", e[e.HOME = 36] = "HOME", e[e.LEFT = 37] = "LEFT", e[e.UP = 38] = "UP", e[e.RIGHT = 39] = "RIGHT", e[e.DOWN = 40] = "DOWN";
})(P || (P = {}));
function zh(e) {
  var t = re(e), r = e.containerEl;
  t(r, "keydown", function(n) {
    var a = document.activeElement;
    if (!(a !== r && !r.contains(a)) && !Gh(a)) {
      var i = Lh(e, n.keyCode || n.which);
      if (i) {
        var o = i[0], u = i[1];
        e.addTransformableMomentum(o, u, n, function(s) {
          s ? n.preventDefault() : (e.containerEl.blur(), e.parent && e.parent.containerEl.focus());
        });
      }
    }
  });
}
function Lh(e, t) {
  var r = e.size, n = e.limit, a = e.offset;
  switch (t) {
    case P.TAB:
      return kh(e);
    case P.SPACE:
      return [0, 200];
    case P.PAGE_UP:
      return [0, -r.container.height + 40];
    case P.PAGE_DOWN:
      return [0, r.container.height - 40];
    case P.END:
      return [0, n.y - a.y];
    case P.HOME:
      return [0, -a.y];
    case P.LEFT:
      return [-40, 0];
    case P.UP:
      return [0, -40];
    case P.RIGHT:
      return [40, 0];
    case P.DOWN:
      return [0, 40];
    default:
      return null;
  }
}
function kh(e) {
  requestAnimationFrame(function() {
    e.scrollIntoView(document.activeElement, {
      offsetTop: e.size.container.height / 2,
      offsetLeft: e.size.container.width / 2,
      onlyScrollIfNeeded: !0
    });
  });
}
function Gh(e) {
  return e.tagName === "INPUT" || e.tagName === "SELECT" || e.tagName === "TEXTAREA" || e.isContentEditable ? !e.disabled : !1;
}
var C;
(function(e) {
  e[e.X = 0] = "X", e[e.Y = 1] = "Y";
})(C || (C = {}));
function Wh(e) {
  var t = re(e), r = e.containerEl, n = e.track, a = n.xAxis, i = n.yAxis;
  function o(d, h) {
    var g = e.size, m = e.limit, y = e.offset;
    if (d === C.X) {
      var p = g.container.width + (a.thumb.realSize - a.thumb.displaySize);
      return _(h / p * g.content.width, 0, m.x) - y.x;
    }
    if (d === C.Y) {
      var $ = g.container.height + (i.thumb.realSize - i.thumb.displaySize);
      return _(h / $ * g.content.height, 0, m.y) - y.y;
    }
    return 0;
  }
  function u(d) {
    if (Be(d, [a.element, a.thumb.element]))
      return C.X;
    if (Be(d, [i.element, i.thumb.element]))
      return C.Y;
  }
  var s, c, f, v, l;
  t(r, "click", function(d) {
    if (!(c || !Be(d.target, [a.element, i.element]))) {
      var h = d.target, g = u(h), m = h.getBoundingClientRect(), y = X(d);
      if (g === C.X) {
        var p = y.x - m.left - a.thumb.displaySize / 2;
        e.setMomentum(o(g, p), 0);
      }
      if (g === C.Y) {
        var p = y.y - m.top - i.thumb.displaySize / 2;
        e.setMomentum(0, o(g, p));
      }
    }
  }), t(r, "mousedown", function(d) {
    if (Be(d.target, [a.thumb.element, i.thumb.element])) {
      s = !0;
      var h = d.target, g = X(d), m = h.getBoundingClientRect();
      v = u(h), f = {
        x: g.x - m.left,
        y: g.y - m.top
      }, l = r.getBoundingClientRect(), W(e.containerEl, {
        "-user-select": "none"
      });
    }
  }), t(window, "mousemove", function(d) {
    if (s) {
      c = !0;
      var h = X(d);
      if (v === C.X) {
        var g = h.x - f.x - l.left;
        e.setMomentum(o(v, g), 0);
      }
      if (v === C.Y) {
        var g = h.y - f.y - l.top;
        e.setMomentum(0, o(v, g));
      }
    }
  }), t(window, "mouseup blur", function() {
    s = c = !1, W(e.containerEl, {
      "-user-select": ""
    });
  });
}
function Uh(e) {
  var t = re(e);
  t(window, "resize", bi(e.update.bind(e), 300));
}
function Vh(e) {
  var t = re(e), r = e.containerEl, n = e.contentEl, a = !1, i = !1, o;
  function u(s) {
    var c = s.x, f = s.y;
    if (!(!c && !f)) {
      var v = e.offset, l = e.limit;
      e.setMomentum(_(v.x + c, 0, l.x) - v.x, _(v.y + f, 0, l.y) - v.y), o = requestAnimationFrame(function() {
        u({ x: c, y: f });
      });
    }
  }
  t(window, "mousemove", function(s) {
    if (a) {
      cancelAnimationFrame(o);
      var c = Hh(e, s);
      u(c);
    }
  }), t(n, "contextmenu", function() {
    i = !0, cancelAnimationFrame(o), a = !1;
  }), t(n, "mousedown", function() {
    i = !1;
  }), t(n, "selectstart", function() {
    i || (cancelAnimationFrame(o), a = !0);
  }), t(window, "mouseup blur", function() {
    cancelAnimationFrame(o), a = !1, i = !1;
  }), t(r, "scroll", function(s) {
    s.preventDefault(), r.scrollTop = r.scrollLeft = 0;
  });
}
function Hh(e, t) {
  var r = e.bounding, n = r.top, a = r.right, i = r.bottom, o = r.left, u = X(t), s = u.x, c = u.y, f = {
    x: 0,
    y: 0
  }, v = 20;
  return s === 0 && c === 0 || (s > a - v ? f.x = s - a + v : s < o + v && (f.x = s - o - v), c > i - v ? f.y = c - i + v : c < n + v && (f.y = c - n - v), f.x *= 2, f.y *= 2), f;
}
var ze;
function Kh(e) {
  var t = e.options.delegateTo || e.containerEl, r = new Ih(), n = re(e), a, i = 0;
  n(t, "touchstart", function(o) {
    r.track(o), e.setMomentum(0, 0), i === 0 && (a = e.options.damping, e.options.damping = Math.max(a, 0.5)), i++;
  }), n(t, "touchmove", function(o) {
    if (!(ze && ze !== e)) {
      r.update(o);
      var u = r.getDelta(), s = u.x, c = u.y;
      e.addTransformableMomentum(s, c, o, function(f) {
        f && o.cancelable && (o.preventDefault(), ze = e);
      });
    }
  }), n(t, "touchcancel touchend", function(o) {
    var u = r.getEasingDistance(a);
    e.addTransformableMomentum(u.x, u.y, o), i--, i === 0 && (e.options.damping = a), r.release(o), ze = null;
  });
}
function Xh(e) {
  var t = re(e), r = e.options.delegateTo || e.containerEl, n = "onwheel" in window || document.implementation.hasFeature("Events.wheel", "3.0") ? "wheel" : "mousewheel";
  t(r, n, function(a) {
    var i = Jh(a), o = i.x, u = i.y;
    e.addTransformableMomentum(o, u, a, function(s) {
      s && a.preventDefault();
    });
  });
}
var fe = {
  STANDARD: 1,
  OTHERS: -3
}, Yn = [1, 28, 500], qh = function(e) {
  return Yn[e] || Yn[0];
};
function Jh(e) {
  if ("deltaX" in e) {
    var t = qh(e.deltaMode);
    return {
      x: e.deltaX / fe.STANDARD * t,
      y: e.deltaY / fe.STANDARD * t
    };
  }
  return "wheelDeltaX" in e ? {
    x: e.wheelDeltaX / fe.OTHERS,
    y: e.wheelDeltaY / fe.OTHERS
  } : {
    x: 0,
    y: e.wheelDelta / fe.OTHERS
  };
}
const ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  keyboardHandler: zh,
  mouseHandler: Wh,
  resizeHandler: Uh,
  selectHandler: Vh,
  touchHandler: Kh,
  wheelHandler: Xh
}, Symbol.toStringTag, { value: "Module" }));
var D = /* @__PURE__ */ new Map(), ta = (
  /** @class */
  function() {
    function e(t, r) {
      var n = this;
      this.offset = {
        x: 0,
        y: 0
      }, this.limit = {
        x: 1 / 0,
        y: 1 / 0
      }, this.bounding = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }, this._plugins = [], this._momentum = { x: 0, y: 0 }, this._listeners = /* @__PURE__ */ new Set(), this.containerEl = t;
      var a = this.contentEl = document.createElement("div");
      this.options = new Eh(r), t.setAttribute("data-scrollbar", "true"), t.setAttribute("tabindex", "-1"), W(t, {
        overflow: "hidden",
        outline: "none"
      }), window.navigator.msPointerEnabled && (t.style.msTouchAction = "none"), a.className = "scroll-content", Array.from(t.childNodes).forEach(function(s) {
        a.appendChild(s);
      }), t.appendChild(a), this.track = new _h(this), this.size = this.getSize(), this._plugins = Bh(this, this.options.plugins);
      var i = t.scrollLeft, o = t.scrollTop;
      t.scrollLeft = t.scrollTop = 0, this.setPosition(i, o, {
        withoutCallbacks: !0
      });
      var u = window.ResizeObserver;
      typeof u == "function" && (this._observer = new u(function() {
        n.update();
      }), this._observer.observe(a)), D.set(t, this), requestAnimationFrame(function() {
        n._init();
      });
    }
    return Object.defineProperty(e.prototype, "parent", {
      /**
       * Parent scrollbar
       */
      get: function() {
        for (var t = this.containerEl.parentElement; t; ) {
          var r = D.get(t);
          if (r)
            return r;
          t = t.parentElement;
        }
        return null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "scrollTop", {
      /**
       * Gets or sets `scrollbar.offset.y`
       */
      get: function() {
        return this.offset.y;
      },
      set: function(t) {
        this.setPosition(this.scrollLeft, t);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "scrollLeft", {
      /**
       * Gets or sets `scrollbar.offset.x`
       */
      get: function() {
        return this.offset.x;
      },
      set: function(t) {
        this.setPosition(t, this.scrollTop);
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.getSize = function() {
      return xh(this);
    }, e.prototype.update = function() {
      jh(this), this._plugins.forEach(function(t) {
        t.onUpdate();
      });
    }, e.prototype.isVisible = function(t) {
      return Ah(this, t);
    }, e.prototype.setPosition = function(t, r, n) {
      var a = this;
      t === void 0 && (t = this.offset.x), r === void 0 && (r = this.offset.y), n === void 0 && (n = {});
      var i = Rh(this, t, r);
      !i || n.withoutCallbacks || this._listeners.forEach(function(o) {
        o.call(a, i);
      });
    }, e.prototype.scrollTo = function(t, r, n, a) {
      t === void 0 && (t = this.offset.x), r === void 0 && (r = this.offset.y), n === void 0 && (n = 0), a === void 0 && (a = {}), Mh(this, t, r, n, a);
    }, e.prototype.scrollIntoView = function(t, r) {
      r === void 0 && (r = {}), Dh(this, t, r);
    }, e.prototype.addListener = function(t) {
      if (typeof t != "function")
        throw new TypeError("[smooth-scrollbar] scrolling listener should be a function");
      this._listeners.add(t);
    }, e.prototype.removeListener = function(t) {
      this._listeners.delete(t);
    }, e.prototype.addTransformableMomentum = function(t, r, n, a) {
      this._updateDebounced();
      var i = this._plugins.reduce(function(u, s) {
        return s.transformDelta(u, n) || u;
      }, { x: t, y: r }), o = !this._shouldPropagateMomentum(i.x, i.y);
      o && this.addMomentum(i.x, i.y), a && a.call(this, o);
    }, e.prototype.addMomentum = function(t, r) {
      this.setMomentum(this._momentum.x + t, this._momentum.y + r);
    }, e.prototype.setMomentum = function(t, r) {
      this.limit.x === 0 && (t = 0), this.limit.y === 0 && (r = 0), this.options.renderByPixels && (t = Math.round(t), r = Math.round(r)), this._momentum.x = t, this._momentum.y = r;
    }, e.prototype.updatePluginOptions = function(t, r) {
      this._plugins.forEach(function(n) {
        n.name === t && Object.assign(n.options, r);
      });
    }, e.prototype.destroy = function() {
      var t = this, r = t.containerEl, n = t.contentEl;
      bh(this), this._listeners.clear(), this.setMomentum(0, 0), cancelAnimationFrame(this._renderID), this._observer && this._observer.disconnect(), D.delete(this.containerEl);
      for (var a = Array.from(n.childNodes); r.firstChild; )
        r.removeChild(r.firstChild);
      a.forEach(function(i) {
        r.appendChild(i);
      }), W(r, {
        overflow: ""
      }), r.scrollTop = this.scrollTop, r.scrollLeft = this.scrollLeft, this._plugins.forEach(function(i) {
        i.onDestroy();
      }), this._plugins.length = 0;
    }, e.prototype._init = function() {
      var t = this;
      this.update(), Object.keys(ea).forEach(function(r) {
        ea[r](t);
      }), this._plugins.forEach(function(r) {
        r.onInit();
      }), this._render();
    }, e.prototype._updateDebounced = function() {
      this.update();
    }, e.prototype._shouldPropagateMomentum = function(t, r) {
      t === void 0 && (t = 0), r === void 0 && (r = 0);
      var n = this, a = n.options, i = n.offset, o = n.limit;
      if (!a.continuousScrolling)
        return !1;
      o.x === 0 && o.y === 0 && this._updateDebounced();
      var u = _(t + i.x, 0, o.x), s = _(r + i.y, 0, o.y), c = !0;
      return c = c && u === i.x, c = c && s === i.y, c = c && (i.x === o.x || i.x === 0 || i.y === o.y || i.y === 0), c;
    }, e.prototype._render = function() {
      var t = this._momentum;
      if (t.x || t.y) {
        var r = this._nextTick("x"), n = this._nextTick("y");
        t.x = r.momentum, t.y = n.momentum, this.setPosition(r.position, n.position);
      }
      var a = N({}, this._momentum);
      this._plugins.forEach(function(i) {
        i.onRender(a);
      }), this._renderID = requestAnimationFrame(this._render.bind(this));
    }, e.prototype._nextTick = function(t) {
      var r = this, n = r.options, a = r.offset, i = r._momentum, o = a[t], u = i[t];
      if (Math.abs(u) <= 0.1)
        return {
          momentum: 0,
          position: o + u
        };
      var s = u * (1 - n.damping);
      return n.renderByPixels && (s |= 0), {
        momentum: s,
        position: o + u - s
      };
    }, k([
      wi(100, !0)
    ], e.prototype, "_updateDebounced", null), e;
  }()
), Zh = "rgba(222, 222, 222, .75)", Qh = "rgba(0, 0, 0, .5)", Yh = `
[data-scrollbar] {
  display: block;
  position: relative;
}

.scroll-content {
  display: flow-root;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}

.scrollbar-track {
  position: absolute;
  opacity: 0;
  z-index: 1;
  background: ` + Zh + `;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-transition: opacity 0.5s 0.5s ease-out;
          transition: opacity 0.5s 0.5s ease-out;
}
.scrollbar-track.show,
.scrollbar-track:hover {
  opacity: 1;
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
}

.scrollbar-track-x {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
}
.scrollbar-track-y {
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
}
.scrollbar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: ` + Qh + `;
  border-radius: 4px;
}
`, Si = "smooth-scrollbar-style", Qe = !1;
function ra() {
  if (!(Qe || typeof window > "u")) {
    var e = document.createElement("style");
    e.id = Si, e.textContent = Yh, document.head && document.head.appendChild(e), Qe = !0;
  }
}
function ep() {
  if (!(!Qe || typeof window > "u")) {
    var e = document.getElementById(Si);
    !e || !e.parentNode || (e.parentNode.removeChild(e), Qe = !1);
  }
}
var tp = (
  /** @class */
  function(e) {
    Di(t, e);
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return t.init = function(r, n) {
      if (!r || r.nodeType !== 1)
        throw new TypeError("expect element to be DOM Element, but got " + r);
      return ra(), D.has(r) ? D.get(r) : new ta(r, n);
    }, t.initAll = function(r) {
      return Array.from(document.querySelectorAll("[data-scrollbar]"), function(n) {
        return t.init(n, r);
      });
    }, t.has = function(r) {
      return D.has(r);
    }, t.get = function(r) {
      return D.get(r);
    }, t.getAll = function() {
      return Array.from(D.values());
    }, t.destroy = function(r) {
      var n = D.get(r);
      n && n.destroy();
    }, t.destroyAll = function() {
      D.forEach(function(r) {
        r.destroy();
      });
    }, t.use = function() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      return Fh.apply(void 0, r);
    }, t.attachStyle = function() {
      return ra();
    }, t.detachStyle = function() {
      return ep();
    }, t.version = "8.8.4", t.ScrollbarPlugin = Nh, t;
  }(ta)
);
const rp = { class: "offcanvas-title" }, np = {
  key: 1,
  class: "offcanvas-footer"
}, ap = {
  name: "BaseOffcanvas"
}, up = /* @__PURE__ */ Ti({
  ...ap,
  props: {
    title: {},
    placement: {},
    size: {},
    backdrop: { type: Boolean },
    target: {},
    visible: { type: Boolean }
  },
  emits: ["update:visible"],
  setup(e, { expose: t, emit: r }) {
    const n = e;
    Ii();
    const a = r, i = $e(!1), o = $e(), u = $e(), s = $e(), c = Ei({
      get() {
        return n.visible;
      },
      set(h) {
        a("update:visible", h);
      }
    });
    jr(c, async (h) => {
      h ? (i.value = !0, await Pi(), u.value && u.value.classList.add("offcanvas-visible"), o.value && o.value.classList.add("backdrop-visible")) : (o.value && o.value.classList.remove("backdrop-visible"), u.value && u.value.classList.remove("offcanvas-visible"), setTimeout(() => {
        i.value = !1;
      }, 300));
    }), jr(s, () => {
      s.value && tp.init(s.value);
    });
    function f() {
    }
    function v() {
      c.value = !0;
    }
    function l() {
      c.value = !1;
    }
    function d() {
      l();
    }
    return t({
      visible: c,
      open: v,
      close: l,
      toggle: f
    }), (h, g) => (be(), _i(xi, {
      to: n.target ? n.target : "#app"
    }, [
      ct("div", {
        ref_key: "offcanvas",
        ref: u,
        class: Rr(["offcanvas", [
          n.placement ? `offcanvas-${h.placement}` : "offcanvas-right",
          n.size ? `offcanvas-${h.size}` : "offcanvas-md"
        ]])
      }, [
        h.$slots.header || n.title ? (be(), ft("header", {
          key: 0,
          class: Rr(["offcanvas-header", { "header-title": !h.$slots.header && n.title }])
        }, [
          vt(h.$slots, "header", lt(n, {
            visible: c.value,
            open: v,
            close: l,
            toggle: f
          }), () => [
            ct("div", rp, Ai(n.title), 1)
          ]),
          ji(Mi, {
            icon: Ri(Ci),
            onClick: l
          }, null, 8, ["icon"])
        ], 2)) : dt("", !0),
        ct("article", {
          ref_key: "offcanvasContent",
          ref: s,
          class: "offcanvas-content"
        }, [
          vt(h.$slots, "default", lt(n, {
            visible: c.value,
            open: v,
            close: l,
            toggle: f
          }))
        ], 512),
        h.$slots.footer ? (be(), ft("header", np, [
          vt(h.$slots, "footer", lt(n, {
            visible: c.value,
            open: v,
            close: l,
            toggle: f
          }))
        ])) : dt("", !0)
      ], 2),
      n.backdrop ? (be(), ft("div", {
        key: 0,
        ref_key: "backdrop",
        ref: o,
        class: "offcanvas-backdrop",
        onClick: d
      }, null, 512)) : dt("", !0)
    ], 8, ["to"]));
  }
});
export {
  up as default
};
