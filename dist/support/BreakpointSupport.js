import { defineComponent as l, useSlots as c, computed as p, renderSlot as f, unref as r, createCommentVNode as _ } from "vue";
import { useClient as x } from "../composables/client.js";
import { BREAKPOINT_XXL as d, BREAKPOINT_XL as I, BREAKPOINT_LG as h, BREAKPOINT_MD as B, BREAKPOINT_SM as N, BREAKPOINT_XS as A, BREAKPOINT_XXS as E } from "../constants/breakpoints.js";
const K = {
  name: "BreakpointSupport"
}, g = /* @__PURE__ */ l({
  ...K,
  props: {
    min: {},
    max: {},
    orientation: {}
  },
  setup(s) {
    const t = s;
    c();
    const { width: n, height: u, orientation: o } = x(), m = p(() => {
      let e = typeof t.min == "string" ? i(t.min) || 0 : t.min || 0, a = typeof t.max == "string" ? i(t.max) || 1 / 0 : t.max || 1 / 0;
      return (typeof t.orientation == "string" ? t.orientation == o.value : !0) && n.value >= e && n.value <= a - 1;
    });
    function i(e) {
      switch (e) {
        case "xxs":
          return E;
        case "xs":
          return A;
        case "sm":
          return N;
        case "md":
          return B;
        case "lg":
          return h;
        case "xl":
          return I;
        case "xxl":
          return d;
      }
      return null;
    }
    return (e, a) => m.value ? f(e.$slots, "default", {
      key: 0,
      width: r(n),
      height: r(u),
      orientation: r(o)
    }) : _("", !0);
  }
});
export {
  g as default
};
