import { defineComponent as m, computed as l, withDirectives as c, openBlock as v, createElementBlock as f, normalizeClass as y, toValue as d, vModelDynamic as V } from "vue";
const g = ["id", "type", "name", "placeholder", "inputmode", "autocomplete", "step", "disabled", "readonly", "required", "invalid"], h = {
  name: "InputField"
}, b = /* @__PURE__ */ m({
  ...h,
  props: {
    id: {},
    type: { default: "text" },
    name: {},
    modelValue: {},
    placeholder: {},
    inputmode: {},
    autocomplete: {},
    size: {},
    validation: {},
    validationMessage: {},
    disabled: {},
    readonly: {},
    required: {}
  },
  emits: ["update:modelValue"],
  setup(o, { emit: n }) {
    const e = o, r = n, i = l({
      get() {
        return e.modelValue || e.modelValue === 0 ? e.modelValue : null;
      },
      set(t) {
        r("update:modelValue", t);
      }
    }), u = l(() => e.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`), p = l(() => ["date", "month", "week", "time", "datetime", "datetime-local"].indexOf(e.type) >= 0);
    return (t, a) => c((v(), f("input", {
      id: u.value,
      type: e.type,
      name: e.name || void 0,
      placeholder: e.placeholder || void 0,
      inputmode: e.inputmode || void 0,
      autocomplete: e.autocomplete || void 0,
      step: p.value ? "1" : void 0,
      class: y([
        "field-input",
        `field-${e.type}`,
        e.size ? `field-${e.size}` : "",
        e.validation ? `field-${e.validation}` : ""
      ]),
      disabled: d(e.disabled || !1) || typeof t.disabled == "string",
      readonly: d(e.readonly || !1) || typeof t.readonly == "string",
      required: d(e.required || !1) || typeof t.required == "string",
      invalid: e.validation == "invalid" ? !0 : void 0,
      "onUpdate:modelValue": a[0] || (a[0] = (s) => i.value = s)
    }, null, 10, g)), [
      [V, i.value]
    ]);
  }
});
export {
  b as _
};
