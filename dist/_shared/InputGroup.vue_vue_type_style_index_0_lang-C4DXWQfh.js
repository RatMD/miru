import { defineComponent as t, useSlots as n, openBlock as s, createElementBlock as p, normalizeClass as a, renderSlot as l, normalizeProps as u, guardReactiveProps as c } from "vue";
const i = {
  name: "InputGroup"
}, d = /* @__PURE__ */ t({
  ...i,
  props: {
    row: { type: Boolean }
  },
  setup(e) {
    const o = e;
    return n(), (r, m) => (s(), p("div", {
      class: a(["input-group", { "group-row": o.row }])
    }, [
      l(r.$slots, "default", u(c(o)))
    ], 2));
  }
});
export {
  d as _
};
