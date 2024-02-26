import { defineComponent as l, computed as a, openBlock as n, createElementBlock as c, normalizeClass as d, toValue as t, createBlock as r, resolveDynamicComponent as p, normalizeProps as b, guardReactiveProps as m } from "vue";
const u = ["type", "title", "disabled"], _ = {
  name: "ShadowButton"
}, y = /* @__PURE__ */ l({
  ..._,
  props: {
    color: {},
    icon: {},
    iconProps: {},
    size: {},
    type: {},
    title: {},
    active: { type: Boolean },
    disabled: { type: Boolean },
    loading: { type: Boolean }
  },
  setup(s) {
    const e = s, i = a(() => {
      const o = {
        size: { sm: 16, md: 24, lg: 32 }[e.size || "md"],
        strokeWidth: (e.size || "md") == "sm" ? 2 : 1.5
      };
      return Object.assign(o, e.iconProps || {});
    });
    return (o, f) => (n(), c("button", {
      type: e.type || "button",
      class: d(["btn btn-shadow", [
        e.color ? `btn-${e.color}` : "",
        e.size ? `btn-${e.size}` : "",
        t(e.active || !1) ? "btn-active" : "",
        t(e.disabled || !1) ? "btn-disabled" : "",
        t(e.loading || !1) ? "btn-loading" : ""
      ]]),
      title: e.title || void 0,
      disabled: t(e.disabled || !1) || t(e.loading || !1)
    }, [
      (n(), r(p(e.icon), b(m(i.value)), null, 16))
    ], 10, u));
  }
});
export {
  y as _
};
