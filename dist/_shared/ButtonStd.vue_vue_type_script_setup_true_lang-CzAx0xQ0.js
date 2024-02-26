import { defineComponent as b, computed as d, openBlock as o, createElementBlock as u, normalizeClass as m, toValue as t, createBlock as s, resolveDynamicComponent as c, unref as f, mergeProps as r, createCommentVNode as i, toDisplayString as g } from "vue";
import { c as y } from "./createLucideIcon-BD57EtaP.js";
/**
 * @license lucide-vue-next v0.340.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _ = y("Loader2Icon", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]), h = ["type", "title", "disabled"], v = {
  key: 2,
  class: "btn-label"
}, k = {
  name: "ButtonStd"
}, P = /* @__PURE__ */ b({
  ...k,
  props: {
    color: {},
    label: {},
    icon: {},
    iconLoading: {},
    iconProps: {},
    iconPlacement: {},
    size: {},
    type: { default: "button" },
    title: {},
    fullwidth: { type: Boolean },
    disabled: { type: Boolean },
    loading: { type: Boolean }
  },
  setup(p) {
    const e = p, n = d(() => !e.label && e.icon ? "icon" : e.iconPlacement || "left"), a = d(() => {
      const l = {
        size: (e.size || "sm") == "lg" ? 24 : 16,
        strokeWidth: (e.size || "sm") == "lg" ? 1.5 : 2
      };
      return Object.assign(l, e.iconProps || {});
    });
    return (l, z) => (o(), u("button", {
      type: e.type || "button",
      class: m(["btn", [
        e.color ? `btn-${e.color}` : "",
        e.size ? `btn-${e.size}` : "",
        `btn-${n.value == "icon" ? "icon-only" : n.value}`,
        t(e.disabled || !1) ? "btn-disabled" : "",
        t(e.loading || !1) ? "btn-loading" : "",
        e.fullwidth ? "btn-fullwidth" : ""
      ]]),
      title: e.title || void 0,
      disabled: t(e.disabled || !1) || t(e.loading || !1)
    }, [
      t(e.loading || !1) ? (o(), s(c(e.iconLoading ? e.iconLoading : f(_)), r({
        key: 0,
        class: "btn-icon spin"
      }, a.value), null, 16)) : i("", !0),
      e.icon && n.value != "right" ? (o(), s(c(l.icon), r({
        key: 1,
        class: "btn-icon"
      }, a.value), null, 16)) : i("", !0),
      n.value != "icon" ? (o(), u("span", v, g(e.label), 1)) : i("", !0),
      e.icon && n.value == "right" ? (o(), s(c(l.icon), r({
        key: 3,
        class: "btn-icon"
      }, a.value), null, 16)) : i("", !0)
    ], 10, h));
  }
});
export {
  P as _
};
