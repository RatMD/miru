import { defineComponent as f, computed as o, openBlock as n, createElementBlock as s, normalizeClass as v, withDirectives as y, createElementVNode as r, toValue as t, vModelCheckbox as b, toDisplayString as _, createCommentVNode as h } from "vue";
const V = ["id"], g = ["id", "name", "disabled", "readonly", "required"], k = ["for"], q = { key: 0 }, w = {
  name: "SwitchField"
}, z = /* @__PURE__ */ f({
  ...w,
  props: {
    id: {},
    label: {},
    name: {},
    modelValue: { type: [null, Boolean] },
    size: {},
    disabled: {},
    readonly: {},
    required: {},
    validation: {},
    validationMessage: {}
  },
  emits: ["update:modelValue"],
  setup(u, { emit: p }) {
    const e = u, c = p, i = o({
      get() {
        return e.modelValue || null;
      },
      set(l) {
        c("update:modelValue", l);
      }
    }), a = o(() => e.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`);
    return (l, d) => (n(), s("div", {
      id: a.value,
      class: v([
        "field-input",
        "field-switch",
        e.size ? `field-${e.size}` : "",
        e.validation ? `field-${e.validation}` : ""
      ])
    }, [
      y(r("input", {
        id: `${a.value}-input`,
        type: "checkbox",
        class: "switch-input",
        name: e.name || a.value,
        value: !0,
        disabled: t(e.disabled || !1) || typeof l.disabled == "string",
        readonly: t(e.readonly || !1) || typeof l.readonly == "string",
        required: t(e.required || !1) || typeof l.required == "string",
        "onUpdate:modelValue": d[0] || (d[0] = (m) => i.value = m)
      }, null, 8, g), [
        [b, i.value]
      ]),
      r("label", {
        for: `${a.value}-input`,
        class: "switch-label"
      }, [
        e.label ? (n(), s("span", q, _(e.label), 1)) : h("", !0)
      ], 8, k)
    ], 10, V));
  }
});
export {
  z as default
};
