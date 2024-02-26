import { defineComponent as f, useSlots as m, ref as s, reactive as h, watch as v, nextTick as y, openBlock as w, createElementBlock as b, normalizeStyle as g, renderSlot as _, normalizeProps as x, guardReactiveProps as k } from "vue";
import l from "../utils/wait.js";
const B = /* @__PURE__ */ f({
  __name: "CollapseSupport",
  props: {
    collapsed: { type: Boolean },
    duration: {}
  },
  emits: ["hide", "hidden", "show", "shown"],
  setup(u, { emit: c }) {
    const t = u;
    m();
    const a = c, n = s(), i = s(), r = h({
      height: "0px",
      transitionDuration: `${typeof t.duration == "number" ? t.duration : 300}ms`
    });
    v(t, async (e) => {
      typeof e.duration == "number" && (r.transitionDuration = `${e.duration}ms`), e.collapsed && (i.value || i.value === void 0) ? (a("hide"), i.value = !1, r.height = "0px", await l(typeof t.duration == "number" ? t.duration : 300), a("hidden")) : !e.collapsed && !i.value && (a("show"), i.value = !0, r.height = `${await p()}px`, await l(typeof t.duration == "number" ? t.duration : 300), a("shown"));
    }, { immediate: !0 });
    async function p() {
      if (!n.value && (await y(), !n.value))
        return;
      const e = n.value.parentElement;
      if (!e)
        return;
      const o = n.value.cloneNode(!0);
      o.style.height = "auto", o.style.position = "absolute", o.style.opacity = "0", o.style.overflow = "visible", e.appendChild(o);
      const d = o.offsetHeight;
      return o.remove(), d;
    }
    return (e, o) => (w(), b("div", {
      ref_key: "content",
      ref: n,
      class: "content",
      style: g(r)
    }, [
      _(e.$slots, "default", x(k(t)))
    ], 4));
  }
});
export {
  B as _
};
