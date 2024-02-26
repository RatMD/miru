import { defineComponent as _, useSlots as b, computed as r, openBlock as o, createElementBlock as i, normalizeClass as p, renderSlot as a, mergeProps as s, toDisplayString as c, createCommentVNode as v, createElementVNode as u } from "vue";
const g = ["data-input"], h = ["for"], y = { class: "control-field" }, $ = {
  key: 0,
  class: "control-footer control-validation"
}, k = {
  key: 1,
  class: "control-footer control-description"
}, C = { class: "footer-text" }, V = {
  name: "FormControl"
}, B = /* @__PURE__ */ _({
  ...V,
  props: {
    id: {},
    name: {},
    label: {},
    description: {},
    validation: {},
    validationMessage: {},
    disabled: {},
    required: {},
    vad: { type: Boolean }
  },
  setup(f) {
    const e = f;
    b();
    const l = r(() => e.id || `field-${crypto.randomUUID().replace(/\-/g, "")}`), n = r(() => {
      let t = e.validation || "";
      if (t != "valid" && t != "invalid")
        return !1;
      {
        let d = e.validationMessage || null;
        return typeof d == "string" && d.length > 0;
      }
    }), m = r(() => {
      let t = e.description || null;
      return !t || t.length == 0 ? !1 : n.value == !1 || n.value && e.vad;
    });
    return (t, d) => (o(), i("div", {
      class: p(["form-control", {
        "is-valid": e.validation == "valid",
        "is-invalid": e.validation == "invalid",
        "is-disabled": e.disabled,
        "is-required": e.required
      }]),
      "data-input": e.name ? e.name : void 0
    }, [
      a(t.$slots, "label", s(e, { id: l.value }), () => [
        typeof e.label == "string" && e.label.length > 0 ? (o(), i("label", {
          key: 0,
          for: l.value,
          class: "control-label"
        }, c(e.label), 9, h)) : v("", !0)
      ]),
      u("div", y, [
        a(t.$slots, "default", s(e, { id: l.value }))
      ]),
      n.value ? (o(), i("div", $, [
        a(t.$slots, "validation", s(e, { id: l.value }), () => [
          u("p", {
            class: p(["footer-text", `${e.validation}-text`])
          }, c(e.validationMessage), 3)
        ])
      ])) : v("", !0),
      m.value ? (o(), i("div", k, [
        a(t.$slots, "description", s(e, { id: l.value }), () => [
          u("p", C, c(e.description), 1)
        ])
      ])) : v("", !0)
    ], 10, g));
  }
});
export {
  B as default
};
