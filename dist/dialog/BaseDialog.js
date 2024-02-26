import { defineComponent as B, ref as u, onBeforeUnmount as $, watch as k, nextTick as h, openBlock as i, createBlock as C, Teleport as L, createElementVNode as b, normalizeClass as S, createElementBlock as d, renderSlot as m, toDisplayString as z, createCommentVNode as s, createVNode as N, unref as O } from "vue";
import l from "../utils/wait.js";
import { X as D } from "../_shared/x-YxuH06ct.js";
const E = {
  key: 0,
  class: "dialog-header"
}, T = {
  key: 1,
  class: "dialog-title"
}, U = {
  key: 1,
  class: "dialog-body"
}, V = {
  key: 2,
  class: "dialog-footer"
}, X = {
  name: "BaseDialog"
}, F = /* @__PURE__ */ B({
  ...X,
  props: {
    title: {},
    size: {},
    backdrop: { type: [Boolean, String] },
    visible: { type: Boolean },
    target: {},
    closable: { type: Boolean }
  },
  emits: ["update:visible", "show", "open", "shown", "hide", "close", "hidden", "clickOutside"],
  setup(y, { expose: g, emit: w }) {
    const t = y, a = w, o = u(null), r = u(null), f = u(!1), n = u(!1);
    $(() => {
      c();
    }), k(t, (e) => {
      f.value != e.visible && (f.value = e.visible);
    }, { immediate: !0 }), k(f, async (e) => {
      e && !n.value ? (await h(), await p()) : !e && n.value && (await c(), await h());
    }, { immediate: !0 });
    async function p() {
      n.value = !0, await l(10), !(!o.value || o.value.classList.contains("visible")) && (a("show"), await l(10), o.value.classList.add("visible"), a("open"), await l(300), a("shown"), a("update:visible", !0));
    }
    async function c() {
      !o.value || !o.value.classList.contains("visible") || (a("hide"), await l(10), o.value.classList.remove("visible"), a("close"), await l(300), a("hidden"), await l(10), n.value = !1, a("update:visible", !1));
    }
    function _(e) {
      if (!r.value || !r.value)
        return;
      let v = e.target;
      r.value == v || r.value.contains(v) || (a("clickOutside"), (t.backdrop || !0) == !0 && c());
    }
    return g({
      open: p,
      close: c
    }), (e, v) => n.value ? (i(), C(L, {
      key: 0,
      to: t.target ? t.target : "#app"
    }, [
      b("div", {
        class: S(["modal", [
          `modal-${t.size || "md"}`
        ]]),
        ref_key: "modal",
        ref: o,
        onClick: _
      }, [
        b("div", {
          class: "modal-dialog",
          ref_key: "dialog",
          ref: r
        }, [
          e.$slots.header || t.title ? (i(), d("header", E, [
            e.$slots.header ? m(e.$slots, "header", { key: 0 }) : t.title ? (i(), d("div", T, z(t.title), 1)) : s("", !0),
            t.closable ? (i(), d("button", {
              key: 2,
              type: "button",
              class: "dialog-close",
              onClick: c
            }, [
              N(O(D), { "stroke-width": 1.5 })
            ])) : s("", !0)
          ])) : s("", !0),
          e.$slots.default ? (i(), d("article", U, [
            m(e.$slots, "default")
          ])) : s("", !0),
          e.$slots.footer ? (i(), d("footer", V, [
            m(e.$slots, "footer")
          ])) : s("", !0)
        ], 512)
      ], 2)
    ], 8, ["to"])) : s("", !0);
  }
});
export {
  F as default
};
