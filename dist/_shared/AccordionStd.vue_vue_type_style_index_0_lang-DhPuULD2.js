import { defineComponent as f, useSlots as v, computed as _, ref as b, reactive as S, watch as h, openBlock as r, createElementBlock as l, Fragment as k, renderList as y, createBlock as $, resolveDynamicComponent as g, mergeProps as B } from "vue";
const U = ["id"], w = {
  name: "AccordionStd"
}, D = /* @__PURE__ */ f({
  ...w,
  props: {
    id: {},
    multiple: { type: Boolean },
    pass: {}
  },
  setup(p) {
    const a = p, d = v(), s = _(() => a.id || `accordion-${crypto.randomUUID().replace(/\-/g, "")}`), i = b([]), e = S({});
    h(() => d.default(a), (o) => {
      o.map((c, t) => {
        e[t] = !1;
      }), i.value = o;
    }, { immediate: !0 });
    function u(o) {
      if (!a.multiple)
        for (const [c, t] of Object.entries(e))
          c != o.toString() && t && (e[c] = !1);
    }
    return (o, c) => (r(), l("div", {
      id: s.value,
      class: "accordion"
    }, [
      (r(!0), l(k, null, y(i.value, (t, n) => (r(), $(g(t), B({
        key: `${s.value}-tab-${n}`,
        id: `${s.value}-tab-${n}`
      }, a.pass, {
        visible: e[n],
        "onUpdate:visible": (m) => e[n] = m,
        onShow: () => u(n)
      }), null, 16, ["id", "visible", "onUpdate:visible", "onShow"]))), 128))
    ], 8, U));
  }
});
export {
  D as _
};
