import { defineComponent as a, computed as t, openBlock as s, createElementBlock as n, normalizeClass as i, createBlock as r, resolveDynamicComponent as d, mergeProps as p, toDisplayString as m } from "vue";
const g = {
  key: 1,
  class: "badge-label"
}, b = {
  name: "BadgeStd"
}, z = /* @__PURE__ */ a({
  ...b,
  props: {
    color: {},
    label: {},
    icon: {},
    iconProps: {},
    size: {}
  },
  setup(c) {
    const e = c, l = t(() => {
      const o = {
        size: (e.size || "sm") == "lg" ? 24 : 16,
        strokeWidth: (e.size || "sm") == "lg" ? 1.5 : 2
      };
      return Object.assign(o, e.iconProps || {});
    });
    return (o, u) => (s(), n("div", {
      class: i(["badge badge-slim", [
        e.color ? `badge-${e.color}` : "",
        e.size ? `badge-${e.size}` : ""
      ]])
    }, [
      e.icon ? (s(), r(d(o.icon), p({
        key: 0,
        class: "badge-icon"
      }, l.value), null, 16)) : (s(), n("span", g, m(e.label), 1))
    ], 2));
  }
});
export {
  z as default
};
