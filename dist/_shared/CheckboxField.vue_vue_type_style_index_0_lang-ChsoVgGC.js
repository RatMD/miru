import { defineComponent as v, computed as d, openBlock as n, createElementBlock as s, normalizeClass as f, withDirectives as b, createElementVNode as r, toValue as o, vModelCheckbox as y, toDisplayString as _, createCommentVNode as h } from "vue";
const k = ["id"], g = ["id", "name", "value", "disabled", "readonly", "required"], V = ["for"], q = { key: 0 }, x = {
  name: "CheckboxField"
}, $ = /* @__PURE__ */ v({
  ...x,
  props: {
    id: {},
    label: {},
    name: {},
    value: {},
    modelValue: { type: [null, Boolean, Number, String, Array] },
    size: {},
    disabled: {},
    readonly: {},
    required: {},
    validation: {},
    validationMessage: {}
  },
  emits: ["update:modelValue"],
  setup(u, { emit: c }) {
    const e = u, p = c, t = d({
      get() {
        return e.modelValue || null;
      },
      set(l) {
        p("update:modelValue", l);
      }
    }), a = d(() => e.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`);
    return (l, i) => (n(), s("div", {
      id: a.value,
      class: f([
        "field-input",
        "field-checkbox",
        e.size ? `field-${e.size}` : "",
        e.validation ? `field-${e.validation}` : ""
      ])
    }, [
      b(r("input", {
        id: `${a.value}-input`,
        type: "checkbox",
        class: "checkbox-input",
        name: e.name || a.value,
        value: e.value ? e.value : !0,
        disabled: o(e.disabled || !1) || typeof l.disabled == "string",
        readonly: o(e.readonly || !1) || typeof l.readonly == "string",
        required: o(e.required || !1) || typeof l.required == "string",
        "onUpdate:modelValue": i[0] || (i[0] = (m) => t.value = m)
      }, null, 8, g), [
        [y, t.value]
      ]),
      r("label", {
        for: `${a.value}-input`,
        class: "checkbox-label"
      }, [
        e.label ? (n(), s("span", q, _(e.label), 1)) : h("", !0)
      ], 8, V)
    ], 10, k));
  }
});
export {
  $ as _
};
