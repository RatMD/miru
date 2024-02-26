import { defineComponent as J, ref as b, computed as c, watch as K, openBlock as r, createElementBlock as m, createElementVNode as d, createVNode as N, unref as H, createTextVNode as O, toDisplayString as T, normalizeClass as B, createCommentVNode as g, Fragment as S, renderList as C, createBlock as Q } from "vue";
import { _ as F } from "../_shared/InputField.vue_vue_type_style_index_0_lang-DsEEGhs5.js";
import { c as z } from "../_shared/createLucideIcon-BD57EtaP.js";
/**
 * @license lucide-vue-next v0.340.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = z("ChevronLeftIcon", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-vue-next v0.340.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z = z("ChevronRightIcon", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]), ee = { class: "field-calendar" }, te = { class: "calendar-header" }, ae = {
  type: "button",
  class: "header-btn header-label"
}, le = { class: "calendar-body" }, se = { class: "week week-labels" }, ne = {
  key: 0,
  class: "week-item spacer"
}, oe = {
  key: 0,
  class: "week-item week-num"
}, ue = ["disabled", "onClick"], ie = {
  key: 0,
  class: "calendar-footer"
}, re = {
  key: 0,
  class: "time-selector"
}, de = /* @__PURE__ */ d("span", null, ":", -1), me = { key: 0 }, ce = {
  name: "CalendarField"
}, pe = /* @__PURE__ */ J({
  ...ce,
  props: {
    id: {},
    name: {},
    modelValue: {},
    weekStarts: { default: 0 },
    weekNumbers: { type: Boolean },
    minDate: {},
    maxDate: {},
    dates: {},
    time: { type: Boolean, default: !1 },
    minTime: {},
    maxTime: {},
    hoursStep: { default: 1 },
    minutesStep: { default: 1 },
    secondsStep: { type: [Number, Boolean], default: 5 },
    locale: { default: "en-GB" },
    disabled: {},
    readonly: {},
    required: {},
    validation: {},
    validationMessage: {}
  },
  emits: ["update:modelValue"],
  setup(Y, { emit: $ }) {
    const s = Y, P = $, w = b((/* @__PURE__ */ new Date()).getFullYear()), f = b((/* @__PURE__ */ new Date()).getMonth()), y = c({
      get() {
        return s.modelValue instanceof Date ? s.modelValue : typeof s.modelValue == "string" && s.modelValue.length > 0 ? new Date(s.modelValue) : null;
      },
      set(a) {
        P("update:modelValue", a);
      }
    }), x = c(() => s.minTime && s.minTime.split(":")[0] || "00"), A = c(() => s.minTime && s.minTime.split(":")[1] || "00"), M = c(() => s.minTime && s.minTime.split(":")[2] || "00"), p = b(y.value ? ("00" + y.value.getHours()).slice(-2) : x.value), D = b(y.value ? ("00" + y.value.getMinutes()).slice(-2) : A.value), h = b(y.value ? ("00" + y.value.getSeconds()).slice(-2) : M.value);
    K([p, D, h], () => {
      let a = y.value;
      a || (a = /* @__PURE__ */ new Date());
      let l = p.value ? parseInt(p.value) : null;
      l && !isNaN(l) && a.setHours(l);
      let e = D.value ? parseInt(D.value) : null;
      e && !isNaN(e) && a.setMinutes(e);
      let t = h.value ? parseInt(h.value) : null;
      t && !isNaN(t) && a.setSeconds(t), y.value = a;
    });
    const I = c(() => s.minDate ? v(s.minDate) : null), U = c(() => s.maxDate ? v(s.maxDate) : null), L = c(() => {
      const a = [], l = new Intl.DateTimeFormat(s.locale, { weekday: "short" }), e = /* @__PURE__ */ new Date();
      for (; e.getDay() != s.weekStarts; )
        e.setDate(e.getDate() + 1);
      for (; a.length < 7; )
        a.push(l.format(e)), e.setDate(e.getDate() + 1);
      return a;
    });
    c(() => {
      const a = [], l = new Intl.DateTimeFormat(s.locale, { weekday: "long" }), e = /* @__PURE__ */ new Date();
      for (; e.getDay() != s.weekStarts; )
        e.setDate(e.getDate() + 1);
      for (; a.length < 7; )
        a.push(l.format(e)), e.setDate(e.getDate() + 1);
      return a;
    });
    const q = c(() => new Intl.DateTimeFormat(s.locale, {
      month: "long"
    }).format(new Date(w.value, f.value, 1))), _ = c(() => {
      const a = [];
      for (const l of s.dates || [])
        if (!(l.type != "holiday" && l.type != "holidays"))
          if (Array.isArray(l.value))
            a.push(...[...l.value].map((e) => {
              let t = v(e);
              return { date: t, format: u(t) };
            }));
          else {
            let e = v(l.value);
            a.push({ date: e, format: u(e) });
          }
      return a;
    }), E = c(() => {
      let a = [], e = u(/* @__PURE__ */ new Date()), t = new Date(w.value, f.value, 1), o = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
      if (t.getDay() != s.weekStarts) {
        let n = new Date(t.getTime());
        do {
          n.setDate(n.getDate() - 1);
          let i = u(n);
          a.unshift({
            date: new Date(n.getTime()),
            type: "prev",
            label: n.getDate(),
            weekday: n.getDay(),
            isToday: i == e,
            isPast: i < e,
            isHoliday: _.value.find((k) => k.format === i) !== void 0,
            disabled: V(n)
          });
        } while (n.getDay() != s.weekStarts);
      }
      for (let n = 0; n < o; n++) {
        let i = u(t);
        a.push({
          date: new Date(t.getTime()),
          type: "cur",
          label: t.getDate(),
          weekday: t.getDay(),
          isToday: i == e,
          isPast: i < e,
          isHoliday: _.value.find((k) => k.format === i) !== void 0,
          disabled: V(t)
        }), t.setDate(t.getDate() + 1);
      }
      if (t.getDay() != s.weekStarts) {
        let n = new Date(t.getTime());
        do {
          let i = u(n);
          a.push({
            date: new Date(n.getTime()),
            type: "next",
            label: n.getDate(),
            weekday: n.getDay(),
            isToday: i == e,
            isPast: i < e,
            isHoliday: _.value.find((k) => k.format === i) !== void 0,
            disabled: V(n)
          }), n.setDate(n.getDate() + 1);
        } while (n.getDay() != s.weekStarts);
      }
      return a.reduce((n, i) => ((n.length == 0 || n[n.length - 1].days.length == 7) && n.push({
        label: R(i.date),
        days: []
      }), n[n.length - 1].days.push(i), n), []);
    });
    function R(a) {
      let l = new Date(Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()));
      l.setUTCDate(l.getUTCDate() + 4 - (l.getUTCDay() || 7));
      let e = new Date(Date.UTC(l.getUTCFullYear(), 0, 1));
      return Math.ceil(((l.getTime() - e.getTime()) / 864e5 + 1) / 7);
    }
    function v(a) {
      return a instanceof Date ? new Date(a.getTime()) : a == "now" ? /* @__PURE__ */ new Date() : new Date(a);
    }
    function u(a) {
      return `${a.getFullYear()}-${("00" + (a.getMonth() + 1)).slice(-2)}-${("00" + a.getDate()).slice(-2)}`;
    }
    function V(a) {
      let l = u(a);
      if (I.value && l < u(I.value))
        return !0;
      if (U.value && l > u(U.value))
        return !0;
      {
        let e = !1;
        for (const t of s.dates || []) {
          if ((t.type == "single" || t.type == "day") && (Array.isArray(t.value) ? t.value.map((o) => {
            u(v(o)) == l && (e = !0);
          }) : u(v(t.value)) == l && (e = !0)), (t.type == "holiday" || t.type == "holidays") && (Array.isArray(t.value) ? t.value.map((o) => {
            u(v(o)) == l && (e = !0);
          }) : u(v(t.value)) == l && (e = !0)), (t.type == "weekday" || t.type == "weekdays") && (Array.isArray(t.value) && t.value.includes(a.getDay()) || !Array.isArray(t.value) && t.value == a.getDay()) && (e = !0), t.type == "range") {
            let o = u(v(Array.isArray(t.value) ? t.value[0] : t.value.start)), n = u(v(Array.isArray(t.value) ? t.value[1] : t.value.end));
            l >= o && l <= n && (e = !0);
          }
          if (e)
            break;
        }
        return e;
      }
    }
    function W() {
      f.value > 0 ? f.value-- : (f.value = 11, w.value--);
    }
    function G() {
      f.value < 11 ? f.value++ : (f.value = 0, w.value++);
    }
    function j(a) {
      let l = new Date(a.getFullYear(), a.getMonth(), a.getDate());
      if (s.time) {
        let e = p.value ? parseInt(p.value) : null;
        e && !isNaN(e) && l.setHours(e);
        let t = D.value ? parseInt(D.value) : null;
        t && !isNaN(t) && l.setMinutes(t);
        let o = h.value ? parseInt(h.value) : null;
        o && !isNaN(o) && l.setSeconds(o);
      }
      y.value = l;
    }
    return (a, l) => (r(), m("div", ee, [
      d("div", te, [
        d("button", {
          type: "button",
          class: "header-btn",
          onClick: l[0] || (l[0] = (e) => W())
        }, [
          N(H(X), { size: 16 })
        ]),
        d("button", ae, [
          d("span", null, [
            O(T(q.value) + ", ", 1),
            d("b", null, T(w.value), 1)
          ])
        ]),
        d("button", {
          type: "button",
          class: "header-btn",
          onClick: l[1] || (l[1] = (e) => G())
        }, [
          N(H(Z), { size: 16 })
        ])
      ]),
      d("div", le, [
        d("div", {
          class: B(["body-weeks", { "has-week-nums": s.weekNumbers }])
        }, [
          d("div", se, [
            s.weekNumbers ? (r(), m("div", ne)) : g("", !0),
            (r(!0), m(S, null, C(L.value, (e, t) => (r(), m("div", {
              class: "week-item weekday-label",
              key: t
            }, [
              d("span", null, T(e), 1)
            ]))), 128))
          ]),
          (r(!0), m(S, null, C(E.value, (e, t) => (r(), m("div", {
            class: "week",
            key: t
          }, [
            s.weekNumbers ? (r(), m("div", oe, T(e.label), 1)) : g("", !0),
            (r(!0), m(S, null, C(e.days, (o, n) => (r(), m("div", {
              class: "week-item week-day",
              key: n
            }, [
              d("button", {
                type: "button",
                class: B({
                  "week-btn": !0,
                  "is-weekend": o.weekday == 0 || o.weekday == 6,
                  "is-today": o.isToday,
                  "is-past": o.isPast,
                  "is-outside": o.type != "cur",
                  "is-holiday": o.isHoliday
                }),
                disabled: o.disabled,
                onClick: () => j(o.date)
              }, [
                d("span", null, T(o.label), 1)
              ], 10, ue)
            ]))), 128))
          ]))), 128))
        ], 2)
      ]),
      s.time ? (r(), m("div", ie, [
        s.time ? (r(), m("div", re, [
          N(F, {
            type: "text",
            size: "sm",
            placeholder: x.value,
            modelValue: p.value,
            "onUpdate:modelValue": l[2] || (l[2] = (e) => p.value = e)
          }, null, 8, ["placeholder", "modelValue"]),
          de,
          N(F, {
            type: "text",
            size: "sm",
            placeholder: A.value,
            modelValue: D.value,
            "onUpdate:modelValue": l[3] || (l[3] = (e) => D.value = e)
          }, null, 8, ["placeholder", "modelValue"]),
          s.secondsStep ? (r(), m("span", me, ":")) : g("", !0),
          s.secondsStep ? (r(), Q(F, {
            key: 1,
            type: "text",
            size: "sm",
            placeholder: M.value,
            modelValue: h.value,
            "onUpdate:modelValue": l[4] || (l[4] = (e) => h.value = e)
          }, null, 8, ["placeholder", "modelValue"])) : g("", !0)
        ])) : g("", !0)
      ])) : g("", !0)
    ]));
  }
});
export {
  pe as default
};
