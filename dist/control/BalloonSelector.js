import { defineComponent as V, useSlots as q, computed as d, toValue as c, openBlock as t, createElementBlock as u, normalizeClass as g, Fragment as z, renderList as C, withModifiers as S, createElementVNode as _, renderSlot as D, mergeProps as y, createBlock as h, resolveDynamicComponent as k, createCommentVNode as m, toDisplayString as P } from "vue";
const x = ["id"], E = ["id", "aria-label", "title", "onClick"], I = ["id", "type", "name", "value", "disabled", "required", "checked"], M = { class: "item-label" }, N = {
  key: 1,
  class: "label-text"
}, O = {
  name: "BalloonSelector"
}, j = /* @__PURE__ */ V({
  ...O,
  props: {
    id: {},
    name: {},
    modelValue: {},
    options: {},
    size: {},
    iconProps: {},
    condensed: { type: Boolean },
    connected: { type: Boolean },
    multiple: { type: Boolean },
    unselect: { type: Boolean },
    disabled: {},
    readonly: {},
    required: {},
    validation: {},
    validationMessage: {}
  },
  emits: ["update:modelValue"],
  setup($, { emit: B }) {
    const l = $;
    q();
    const f = B, a = d({
      get() {
        let r = l.modelValue || null;
        return l.multiple ? r === null ? [] : Array.isArray(r) ? r : [r] : r;
      },
      set(r) {
        l.multiple ? f("update:modelValue", r === null ? [] : Array.isArray(r) ? r : [r]) : f("update:modelValue", Array.isArray(r) ? r[0] || null : r);
      }
    }), n = d(() => l.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`), o = d(() => c(l.disabled || !1) || typeof l.disabled == "string" ? !0 : !!(c(l.readonly || !1) || typeof l.readonly == "string")), A = d(() => c(l.required || !1) || typeof l.required == "string"), v = d(() => {
      const r = {
        size: (l.size || "md") == "lg" ? 24 : 16,
        strokeWidth: (l.size || "md") == "lg" ? 1.5 : 2
      };
      return Object.assign(r, l.iconProps || {});
    });
    function b(r) {
      let s = Array.isArray(r) ? r[0] : r.value;
      return l.multiple ? Array.isArray(a.value) && a.value.includes(s) : !Array.isArray(a.value) && a.value == s;
    }
    function p(r) {
      if (l.disabled || !Array.isArray(r) && r.disabled)
        return;
      let s = Array.isArray(r) ? r[0] : r.value;
      if (l.multiple) {
        let e = [...a.value], i = e.indexOf(s);
        i >= 0 ? e.splice(i, 1) : e.push(s), a.value = e;
      } else
        a.value == s && l.unselect ? a.value = null : a.value != s && (a.value = s);
    }
    return (r, s) => (t(), u("div", {
      id: n.value,
      class: g([
        "field-input",
        "field-balloon-selector",
        l.size ? `field-${l.size}` : "",
        l.validation ? `field-${l.validation}` : "",
        l.condensed ? "field-condensed" : "",
        l.connected ? "field-connected" : ""
      ])
    }, [
      (t(!0), u(z, null, C(l.options, (e, i) => (t(), u("label", {
        key: i,
        id: `${n.value}-${i}`,
        class: g({
          "balloon-item": !0,
          "item-disabled": o.value || (Array.isArray(e) ? !1 : e.disabled),
          "item-required": A.value,
          "item-checked": b(e)
        }),
        "aria-label": Array.isArray(e) ? e[1] || e[0].toString() : e.label,
        title: Array.isArray(e) ? e[1] || e[0].toString() : e.label,
        onClick: S(() => p(e), ["prevent"])
      }, [
        _("input", {
          id: `${n.value}-${i}`,
          type: l.multiple ? "checkbox" : "radio",
          name: `${l.name || l.id}${l.multiple ? "[]" : ""}`,
          value: Array.isArray(e) ? e[0] : e.value,
          disabled: o.value || (Array.isArray(e) ? !1 : e.disabled),
          required: A.value,
          checked: b(e)
        }, null, 8, I),
        D(r.$slots, "default", y(l, {
          option: e,
          idx: i
        }), () => [
          _("div", M, [
            !Array.isArray(e) && e.icon && (e.placement || "left") != "right" ? (t(), h(k(e.icon), y({ key: 0 }, v.value, { class: "label-icon" }), null, 16)) : m("", !0),
            !Array.isArray(e) && e.icon && (e.placement || "left") == "icon" ? m("", !0) : (t(), u("span", N, P(Array.isArray(e) ? e[1] || e[0] : e.label), 1)),
            !Array.isArray(e) && e.icon && (e.placement || "left") == "right" ? (t(), h(k(e.icon), y({ key: 2 }, v.value, { class: "label-icon" }), null, 16)) : m("", !0)
          ])
        ])
      ], 10, E))), 128))
    ], 10, x));
  }
});
export {
  j as default
};
