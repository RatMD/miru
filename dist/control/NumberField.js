import { defineComponent as I, computed as i, openBlock as M, createElementBlock as g, createVNode as u, unref as m, mergeProps as k, withModifiers as w } from "vue";
import { _ as p } from "../_shared/ActionButton.vue_vue_type_style_index_0_lang-DcTwqkW4.js";
import { _ as N } from "../_shared/InputField.vue_vue_type_style_index_0_lang-DsEEGhs5.js";
import { c as f } from "../_shared/createLucideIcon-BD57EtaP.js";
/**
 * @license lucide-vue-next v0.340.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z = f("MinusIcon", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-vue-next v0.340.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b = f("PlusIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]), x = { class: "field-group" }, D = {
  name: "NumberField"
}, A = /* @__PURE__ */ I({
  ...D,
  props: {
    id: {},
    name: {},
    modelValue: {},
    placeholder: {},
    min: {},
    max: {},
    step: {},
    integer: { type: Boolean },
    size: {},
    validation: {},
    validationMessage: {},
    disabled: {},
    readonly: {},
    required: {}
  },
  emits: ["update:modelValue"],
  setup(v, { emit: V }) {
    const n = v, y = V, t = i({
      get() {
        return n.modelValue || n.modelValue === 0 ? n.modelValue : null;
      },
      set(e) {
        y("update:modelValue", e);
      }
    }), o = i(() => {
      const e = n.integer ? parseInt(n.modelValue || "0") : parseFloat(n.modelValue || "0");
      return isNaN(e) ? 0 : e;
    }), s = i(() => o.value <= (n.min || -1 / 0)), r = i(() => o.value >= (n.max || 1 / 0));
    function _(e) {
      e.key == "ArrowUp" && (e.preventDefault(), c()), e.key == "ArrowDown" && (e.preventDefault(), d());
    }
    function h(e) {
      e.preventDefault();
      let l = e.target;
      if (!(l && l instanceof HTMLInputElement))
        return;
      let a = l.value.replace(/[^0-9,.]+/, "");
      n.integer ? a = isNaN(parseInt(a)) ? !1 : a : a = isNaN(parseFloat(a.replace(/,/, "."))) ? !1 : a, t.value = a === !1 ? 0 : a;
    }
    function d() {
      let e = o.value;
      s.value || (e -= n.step || 1), t.value = e;
    }
    function c() {
      let e = o.value;
      r.value || (e += n.step || 1), t.value = e;
    }
    return (e, l) => (M(), g("div", x, [
      u(p, {
        icon: m(z),
        size: n.size || "md",
        onClick: d,
        disabled: s.value
      }, null, 8, ["icon", "size", "disabled"]),
      u(N, k(n, {
        type: "text",
        onKeydown: _,
        onInput: w(h, ["prevent"]),
        inputmode: "numeric",
        modelValue: t.value,
        "onUpdate:modelValue": l[0] || (l[0] = (a) => t.value = a)
      }), null, 16, ["modelValue"]),
      u(p, {
        icon: m(b),
        size: n.size || "md",
        onClick: c,
        disabled: r.value
      }, null, 8, ["icon", "size", "disabled"])
    ]));
  }
});
export {
  A as default
};
