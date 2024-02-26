import { defineComponent as S, useSlots as B, computed as p, ref as l, openBlock as n, createElementBlock as d, normalizeClass as H, renderSlot as m, normalizeProps as h, guardReactiveProps as v, createElementVNode as u, Fragment as f, createBlock as s, resolveDynamicComponent as k, mergeProps as b, unref as y, createCommentVNode as g, toDisplayString as I, createVNode as V, withCtx as x } from "vue";
import { _ as N } from "./CollapseSupport.vue_vue_type_style_index_0_lang-U4ay10pX.js";
import { c as T } from "./createLucideIcon-BD57EtaP.js";
/**
 * @license lucide-vue-next v0.340.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P = T("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]), z = ["id"], E = ["aria-expanded", "aria-controls"], U = { class: "header-label" }, q = ["id"], A = {
  name: "AccordionTab"
}, j = /* @__PURE__ */ S({
  ...A,
  props: {
    id: {},
    label: {},
    icon: {},
    iconPlacement: {},
    iconProps: {},
    duration: {},
    visible: { type: Boolean }
  },
  emits: ["update:visible", "hide", "hidden", "show", "shown"],
  setup(_, { emit: w }) {
    const e = _;
    B();
    const i = w, t = p({
      get() {
        return e.visible || !1;
      },
      set(a) {
        i("update:visible", a);
      }
    }), c = p(() => e.id || `accordion-tab-${crypto.randomUUID().replace(/\-/g, "")}`), $ = l(), C = l(), D = l();
    return (a, o) => (n(), d("div", {
      ref_key: "accordionTab",
      ref: $,
      id: c.value,
      class: H(["accordion-tab", {
        "is-visible": t.value,
        "has-icon": e.icon !== null,
        "icon-left": (e.iconPlacement || "right") == "left",
        "icon-right": (e.iconPlacement || "right") == "right"
      }])
    }, [
      m(a.$slots, "header", h(v(e)), () => [
        u("button", {
          ref_key: "accordionHeader",
          ref: C,
          class: "accordion-header",
          "aria-expanded": t.value ? "true" : "false",
          "aria-controls": `${c.value}-pane`,
          onClick: o[0] || (o[0] = (r) => t.value = !t.value)
        }, [
          e.icon !== null && (e.iconPlacement || "right") == "left" ? (n(), d(f, { key: 0 }, [
            e.icon ? (n(), s(k(e.icon), b({ key: 0 }, e.iconProps, { class: "header-icon" }), null, 16)) : (n(), s(y(P), {
              key: 1,
              "stroke-width": 1.5,
              class: "header-icon"
            }))
          ], 64)) : g("", !0),
          u("span", U, I(e.label), 1),
          e.icon !== null && (e.iconPlacement || "right") == "right" ? (n(), d(f, { key: 1 }, [
            e.icon ? (n(), s(k(e.icon), b({ key: 0 }, e.iconProps, { class: "header-icon" }), null, 16)) : (n(), s(y(P), {
              key: 1,
              "stroke-width": 1.5,
              class: "header-icon"
            }))
          ], 64)) : g("", !0)
        ], 8, E)
      ]),
      u("div", {
        ref_key: "accordionPane",
        ref: D,
        id: `${c.value}-pane`,
        class: "accordion-pane"
      }, [
        V(N, {
          collapsed: !t.value,
          duration: e.duration || 300,
          onHide: o[1] || (o[1] = (r) => i("hide")),
          onHidden: o[2] || (o[2] = (r) => i("hidden")),
          onShow: o[3] || (o[3] = (r) => i("show")),
          onShown: o[4] || (o[4] = (r) => i("shown"))
        }, {
          default: x(() => [
            m(a.$slots, "default", h(v(e)))
          ]),
          _: 3
        }, 8, ["collapsed", "duration"])
      ], 8, q)
    ], 10, z));
  }
});
export {
  j as _
};
