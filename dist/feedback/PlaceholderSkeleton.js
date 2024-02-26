import { defineComponent as s, computed as n, openBlock as i, createElementBlock as r, normalizeClass as a, normalizeStyle as c } from "vue";
const h = {
  name: "PlaceholderSkeleton"
}, u = /* @__PURE__ */ s({
  ...h,
  props: {
    class: {},
    width: {},
    height: {},
    vertical: { type: Boolean }
  },
  setup(l) {
    const e = l, o = n(() => {
      let t = {};
      return typeof e.width == "string" && (t.width = e.width), typeof e.height == "string" && (t.height = e.height), t;
    });
    return (t, p) => (i(), r("div", {
      class: a(["skeleton", [e.vertical ? "skeleton-vertical" : "", e.class]]),
      style: c(o.value)
    }, null, 6));
  }
});
export {
  u as default
};
