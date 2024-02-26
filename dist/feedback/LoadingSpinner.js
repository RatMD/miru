import { defineComponent as o, openBlock as s, createElementBlock as r, createElementVNode as t, normalizeClass as c } from "vue";
const i = { class: "loading-spinner" }, l = {
  name: "LoadingSpinner"
}, d = /* @__PURE__ */ o({
  ...l,
  props: {
    color: {},
    size: {}
  },
  setup(n) {
    const e = n;
    return (a, p) => (s(), r("div", i, [
      t("div", {
        class: c(["spinner", [
          e.color ? `spinner-${e.color}` : "",
          e.size ? `spinner-${e.size}` : ""
        ]])
      }, null, 2)
    ]));
  }
});
export {
  d as default
};
