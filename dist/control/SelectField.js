import { defineComponent as v, computed as s, withDirectives as f, openBlock as d, createElementBlock as i, normalizeClass as y, toValue as t, toDisplayString as n, createCommentVNode as _, Fragment as g, renderList as b, vModelSelect as V } from "vue";
const h = ["id", "name", "disabled", "readonly", "required", "invalid"], q = {
  key: 0,
  value: null,
  disabled: ""
}, z = ["value"], A = {
  name: "SelectField"
}, D = /* @__PURE__ */ v({
  ...A,
  props: {
    id: {},
    name: {},
    options: {},
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
  setup(u, { emit: m }) {
    const e = u, c = m, r = s({
      get() {
        return e.modelValue || null;
      },
      set(a) {
        c("update:modelValue", a);
      }
    }), p = s(() => e.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`);
    return (a, o) => f((d(), i("select", {
      id: p.value,
      name: e.name || void 0,
      class: y([
        "field-input",
        "field-select",
        e.size ? `field-${e.size}` : "",
        e.validation ? `field-${e.validation}` : ""
      ]),
      disabled: t(e.disabled || !1) || typeof a.disabled == "string",
      readonly: t(e.readonly || !1) || typeof a.readonly == "string",
      required: t(e.required || !1) || typeof a.required == "string",
      invalid: e.validation == "invalid" ? !0 : void 0,
      "onUpdate:modelValue": o[0] || (o[0] = (l) => r.value = l)
    }, [
      e.placeholder ? (d(), i("option", q, n(e.placeholder), 1)) : _("", !0),
      (d(!0), i(g, null, b(e.options, (l, k) => (d(), i("option", {
        value: Array.isArray(l) ? l[0] : l.value
      }, n(Array.isArray(l) ? l[1] || l[0] : l.label), 9, z))), 256))
    ], 10, h)), [
      [V, r.value]
    ]);
  }
});
export {
  D as default
};
