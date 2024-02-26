import { defineComponent as m, useSlots as g, computed as l, openBlock as o, createElementBlock as n, normalizeClass as b, renderSlot as k, normalizeProps as y, guardReactiveProps as _, Fragment as i, createBlock as r, resolveDynamicComponent as d, mergeProps as u, createCommentVNode as c, toDisplayString as f } from "vue";
const v = {
  key: 1,
  class: "badge-dot"
}, z = {
  key: 1,
  class: "badge-label"
}, P = {
  key: 1,
  class: "badge-dot"
}, h = {
  name: "BadgeStd"
}, S = /* @__PURE__ */ m({
  ...h,
  props: {
    color: {},
    label: {},
    icon: {},
    iconProps: {},
    iconPlacement: {},
    size: {},
    dot: { type: Boolean }
  },
  setup(p) {
    const e = p;
    g();
    const t = l(() => !e.label && e.icon ? "icon" : e.iconPlacement || "left"), a = l(() => {
      const s = {
        size: (e.size || "sm") == "lg" ? 24 : 16,
        strokeWidth: (e.size || "sm") == "lg" ? 1.5 : 2
      };
      return Object.assign(s, e.iconProps || {});
    });
    return (s, B) => (o(), n("div", {
      class: b(["badge", [
        e.color ? `badge-${e.color}` : "",
        e.size ? `badge-${e.size}` : "",
        e.iconPlacement == "icon" ? "badge-icon-only" : ""
      ]])
    }, [
      k(s.$slots, "default", y(_(e)), () => [
        (e.icon || e.dot) && t.value != "right" ? (o(), n(i, { key: 0 }, [
          e.icon ? (o(), r(d(s.icon), u({
            key: 0,
            class: "badge-icon"
          }, a.value), null, 16)) : (o(), n("span", v))
        ], 64)) : c("", !0),
        t.value != "icon" ? (o(), n("span", z, f(e.label), 1)) : c("", !0),
        (e.icon || e.dot) && t.value == "right" ? (o(), n(i, { key: 2 }, [
          e.icon ? (o(), r(d(s.icon), u({
            key: 0,
            class: "badge-icon"
          }, a.value), null, 16)) : (o(), n("span", P))
        ], 64)) : c("", !0)
      ])
    ], 2));
  }
});
export {
  S as default
};
