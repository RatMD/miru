import { defineComponent as p, computed as o, withDirectives as m, openBlock as f, createElementBlock as v, normalizeClass as c, toValue as a, vModelText as y } from "vue";
const g = ["id", "name", "placeholder", "disabled", "readonly", "required", "invalid"], V = {
  name: "TextareaField"
}, h = /* @__PURE__ */ p({
  ...V,
  props: {
    id: {},
    name: {},
    modelValue: {},
    placeholder: {},
    size: {},
    validation: {},
    validationMessage: {},
    disabled: {},
    readonly: {},
    required: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: n }) {
    const e = t, r = n, d = o({
      get() {
        return e.modelValue || null;
      },
      set(l) {
        r("update:modelValue", l);
      }
    }), s = o(() => e.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`);
    return (l, i) => m((f(), v("textarea", {
      id: s.value,
      name: e.name || void 0,
      placeholder: e.placeholder || void 0,
      class: c([
        "field-input",
        "field-textarea",
        e.size ? `field-${e.size}` : "",
        e.validation ? `field-${e.validation}` : ""
      ]),
      disabled: a(e.disabled || !1) || typeof l.disabled == "string",
      readonly: a(e.readonly || !1) || typeof l.readonly == "string",
      required: a(e.required || !1) || typeof l.required == "string",
      invalid: e.validation == "invalid" ? !0 : void 0,
      "onUpdate:modelValue": i[0] || (i[0] = (u) => d.value = u)
    }, null, 10, g)), [
      [y, d.value]
    ]);
  }
});
export {
  h as default
};
