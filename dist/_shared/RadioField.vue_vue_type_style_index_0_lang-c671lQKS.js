import { defineComponent as v, computed as t, openBlock as n, createElementBlock as s, normalizeClass as f, withDirectives as y, createElementVNode as r, toValue as i, vModelRadio as _, toDisplayString as b, createCommentVNode as g } from "vue";
const V = ["id"], q = ["id", "name", "value", "disabled", "readonly", "required"], $ = ["for"], h = { key: 0 }, z = {
  name: "RadioField"
}, B = /* @__PURE__ */ v({
  ...z,
  props: {
    id: {},
    label: {},
    name: {},
    value: {},
    modelValue: { type: [null, Boolean, Number, String] },
    size: {},
    disabled: {},
    readonly: {},
    required: {},
    validation: {},
    validationMessage: {}
  },
  emits: ["update:modelValue"],
  setup(u, { emit: p }) {
    const e = u, m = p, d = t({
      get() {
        return e.modelValue || null;
      },
      set(l) {
        m("update:modelValue", l);
      }
    }), a = t(() => e.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`);
    return (l, o) => (n(), s("div", {
      id: a.value,
      class: f([
        "field-input",
        "field-radio",
        e.size ? `field-${e.size}` : "",
        e.validation ? `field-${e.validation}` : ""
      ])
    }, [
      y(r("input", {
        id: `${a.value}-input`,
        type: "radio",
        class: "radio-input",
        name: e.name || a.value,
        value: e.value ? e.value : !0,
        disabled: i(e.disabled || !1) || typeof l.disabled == "string",
        readonly: i(e.readonly || !1) || typeof l.readonly == "string",
        required: i(e.required || !1) || typeof l.required == "string",
        "onUpdate:modelValue": o[0] || (o[0] = (c) => d.value = c)
      }, null, 8, q), [
        [_, d.value]
      ]),
      r("label", {
        for: `${a.value}-input`,
        class: "radio-label"
      }, [
        e.label ? (n(), s("span", h, b(e.label), 1)) : g("", !0)
      ], 8, $)
    ], 10, V));
  }
});
export {
  B as _
};
