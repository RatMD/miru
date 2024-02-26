import { defineComponent as s, useSlots as u, ref as i, watch as c, nextTick as p, openBlock as g, createElementBlock as f, normalizeClass as m, renderSlot as d, normalizeProps as b, guardReactiveProps as h } from "vue";
const y = {
  name: "ButtonGroup"
}, _ = /* @__PURE__ */ s({
  ...y,
  props: {
    align: {},
    size: {},
    manually: { type: Boolean },
    vertical: { type: Boolean }
  },
  setup(o) {
    const e = o, l = u(), r = i();
    return c(() => l.default, async () => {
      if (await p(), !r.value || !e.manually)
        return;
      let t = r.value.querySelectorAll(".btn:not(.btn-ungrouped)");
      t.forEach((n) => n.classList.remove("btn-group-first", "btn-group-num", "btn-group-last")), t.length > 1 && (t[0].classList.add("btn-group-first"), t[t.length - 1].classList.add("btn-group-last")), t.length > 2 && t.forEach((n, a) => {
        a === 0 || a === t.length - 1 || n.classList.add("btn-group-num");
      });
    }, { immediate: !0 }), (t, n) => (g(), f("div", {
      ref_key: "group",
      ref: r,
      class: m(["btn-group", [
        `btn-group-${e.align || "right"}`,
        `btn-group-${e.size || "md"}`,
        e.manually ? "is-manually" : "",
        e.vertical ? "is-vertical" : "is-horizontal"
      ]])
    }, [
      d(t.$slots, "default", b(h(e)))
    ], 2));
  }
});
export {
  _ as default
};
