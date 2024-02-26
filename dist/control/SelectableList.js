import { defineComponent as _, computed as d, toValue as m, openBlock as a, createElementBlock as o, normalizeClass as g, Fragment as c, renderList as v, createBlock as A } from "vue";
import { _ as z } from "../_shared/CheckboxField.vue_vue_type_style_index_0_lang-ChsoVgGC.js";
import { _ as $ } from "../_shared/RadioField.vue_vue_type_style_index_0_lang-c671lQKS.js";
const q = ["id"], k = {
  name: "SelectableList"
}, x = /* @__PURE__ */ _({
  ...k,
  props: {
    id: {},
    name: {},
    modelValue: {},
    options: {},
    size: {},
    multiple: { type: Boolean },
    disabled: {},
    readonly: {},
    required: {},
    validation: {},
    validationMessage: {}
  },
  emits: ["update:modelValue"],
  setup(p, { emit: V }) {
    const e = p, y = V, s = d({
      get() {
        let r = e.modelValue || null;
        return e.multiple ? r === null ? [] : Array.isArray(r) ? r : [r] : r;
      },
      set(r) {
        e.multiple ? y("update:modelValue", r === null ? [] : Array.isArray(r) ? r : [r]) : y("update:modelValue", Array.isArray(r) ? r[0] || null : r);
      }
    }), t = d(() => e.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`), f = d(() => m(e.disabled || !1) || typeof e.disabled == "string" ? !0 : !!(m(e.readonly || !1) || typeof e.readonly == "string")), b = d(() => m(e.required || !1) || typeof e.required == "string");
    return (r, i) => (a(), o("div", {
      id: t.value,
      class: g([
        "field-input",
        "field-selectable-list",
        e.size ? `field-${e.size}` : "",
        e.validation ? `field-${e.validation}` : ""
      ])
    }, [
      e.multiple ? (a(!0), o(c, { key: 0 }, v(e.options, (l, u) => (a(), A(z, {
        key: `${t.value}-${u}`,
        label: Array.isArray(l) ? (l[1] || l[0]).toString() : l.label,
        value: Array.isArray(l) ? l[0].toString() : l.value,
        disabled: f.value || (Array.isArray(l) ? !1 : l.disabled),
        required: b.value,
        size: e.size,
        modelValue: s.value,
        "onUpdate:modelValue": i[0] || (i[0] = (n) => s.value = n)
      }, null, 8, ["label", "value", "disabled", "required", "size", "modelValue"]))), 128)) : (a(!0), o(c, { key: 1 }, v(e.options, (l, u) => (a(), A($, {
        key: `${t.value}-${u}`,
        label: Array.isArray(l) ? (l[1] || l[0]).toString() : l.label,
        value: Array.isArray(l) ? l[0].toString() : l.value,
        disabled: f.value || (Array.isArray(l) ? !1 : l.disabled),
        required: b.value,
        size: e.size,
        modelValue: s.value,
        "onUpdate:modelValue": i[1] || (i[1] = (n) => s.value = n)
      }, null, 8, ["label", "value", "disabled", "required", "size", "modelValue"]))), 128))
    ], 10, q));
  }
});
export {
  x as default
};
