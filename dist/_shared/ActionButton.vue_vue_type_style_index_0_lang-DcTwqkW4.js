import { defineComponent as l, computed as a, openBlock as n, createElementBlock as c, normalizeClass as r, toValue as t, createBlock as d, resolveDynamicComponent as p, mergeProps as b } from "vue";
const m = ["type", "title", "disabled"], u = {
  name: "ActionButton"
}, g = /* @__PURE__ */ l({
  ...u,
  props: {
    icon: {},
    color: {},
    iconProps: {},
    size: {},
    type: {},
    title: {},
    active: { type: Boolean },
    loading: { type: Boolean },
    disabled: { type: Boolean }
  },
  setup(s) {
    const e = s, i = a(() => {
      const o = {
        size: (e.size || "sm") == "lg" ? 24 : 16,
        strokeWidth: (e.size || "sm") == "lg" ? 1.5 : 2
      };
      return Object.assign(o, e.iconProps || {});
    });
    return (o, _) => (n(), c("button", {
      type: e.type || "button",
      class: r(["btn btn-action", [
        e.color ? `btn-${e.color}` : "",
        e.size ? `btn-${e.size}` : "",
        t(e.active || !1) ? "btn-active" : "",
        t(e.disabled || !1) ? "btn-disabled" : "",
        t(e.loading || !1) ? "btn-loading" : ""
      ]]),
      title: e.title || void 0,
      disabled: t(e.disabled || !1) || t(e.loading || !1)
    }, [
      (n(), d(p(o.icon), b({ class: "btn-icon" }, i.value), null, 16))
    ], 10, m));
  }
});
export {
  g as _
};
