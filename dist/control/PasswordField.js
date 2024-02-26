import { defineComponent as m, ref as p, computed as f, openBlock as y, createElementBlock as v, createVNode as n, mergeProps as _, unref as d } from "vue";
import { _ as k } from "../_shared/ActionButton.vue_vue_type_style_index_0_lang-DcTwqkW4.js";
import { _ as V } from "../_shared/InputField.vue_vue_type_style_index_0_lang-DsEEGhs5.js";
import { c as r } from "../_shared/createLucideIcon-BD57EtaP.js";
/**
 * @license lucide-vue-next v0.340.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x = r("EyeOffIcon", [
  ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24", key: "1jxqfv" }],
  [
    "path",
    {
      d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",
      key: "9wicm4"
    }
  ],
  [
    "path",
    { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61", key: "1jreej" }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
]);
/**
 * @license lucide-vue-next v0.340.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z = r("EyeIcon", [
  ["path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]), E = { class: "field-group" }, M = {
  name: "PasswordField"
}, I = /* @__PURE__ */ m({
  ...M,
  props: {
    id: {},
    name: {},
    modelValue: {},
    placeholder: {},
    autocomplete: {},
    size: {},
    validation: {},
    validationMessage: {},
    disabled: {},
    readonly: {},
    required: {}
  },
  emits: ["update:modelValue"],
  setup(i, { emit: u }) {
    const a = i, c = u, e = p(!1), t = f({
      get() {
        return a.modelValue || null;
      },
      set(l) {
        c("update:modelValue", l);
      }
    });
    return (l, o) => (y(), v("div", E, [
      n(V, _(a, {
        type: e.value ? "text" : "password",
        modelValue: t.value,
        "onUpdate:modelValue": o[0] || (o[0] = (s) => t.value = s)
      }), null, 16, ["type", "modelValue"]),
      n(k, {
        icon: e.value ? d(z) : d(x),
        size: a.size || "md",
        onClick: o[1] || (o[1] = (s) => e.value = !e.value)
      }, null, 8, ["icon", "size"])
    ]));
  }
});
export {
  I as default
};
