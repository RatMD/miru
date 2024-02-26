import { defineComponent as x, ref as r, computed as h, watch as w, nextTick as p, openBlock as y, createBlock as B, withCtx as T, createVNode as f, mergeProps as c } from "vue";
/* empty css                                                            */
import { _ as v } from "../_shared/InputField.vue_vue_type_style_index_0_lang-DsEEGhs5.js";
import { _ as $ } from "../_shared/InputGroup.vue_vue_type_style_index_0_lang-C4DXWQfh.js";
const g = {
  name: "TimeFrameField"
}, F = /* @__PURE__ */ x({
  ...g,
  props: {
    id: {},
    name: {},
    modelValue: {},
    between: {},
    seconds: { default: 60 },
    size: {},
    validation: {},
    validationMessage: {},
    disabled: {},
    readonly: {},
    required: {}
  },
  emits: ["update:modelValue"],
  setup(_, { emit: k }) {
    const s = _, a = r(null), i = r(null), n = h(() => {
      let t = s.between || "";
      if (!t || t.length == 0 || t.indexOf(":") < 0)
        return null;
      let e = o(t);
      return {
        hours: e[0],
        minutes: e[1],
        seconds: e[2]
      };
    }), u = r(!1);
    w([a, i], async (t, e) => {
      !s.between || u.value || (t[0] && t[0] != e[0] ? (u.value = !0, i.value = b(t[0]), p(() => u.value = !1)) : t[1] && t[1] != e[1] && (u.value = !0, a.value = N(t[1]), p(() => u.value = !1)));
    });
    function o(t) {
      let e = t.split(":"), l = parseInt(e[0] || "0"), m = parseInt(e[1] || "0"), d = parseInt(e[2] || "0");
      return [
        isNaN(l) ? 0 : l,
        isNaN(m) ? 0 : m,
        isNaN(d) ? 0 : d
      ];
    }
    function b(t) {
      if (!n.value)
        return t;
      let e = o(t);
      return e[2] += n.value.seconds, e[2] > 59 && (e[1]++, e[2] = e[2] % 60), e[1] += n.value.minutes, e[1] > 59 && (e[0]++, e[1] = e[1] % 60), e[0] += n.value.hours, e[0] > 23 && (e[0] = e[0] - 24), e.map((l) => `00${l}`.slice(-2)).join(":");
    }
    function N(t) {
      if (!n.value)
        return t;
      let e = o(t);
      return e[2] -= n.value.seconds, e[2] < 0 && (e[1]--, e[2] = 60 + e[2]), e[1] -= n.value.minutes, e[1] < 0 && (e[0]--, e[1] = 60 + e[1]), e[0] -= n.value.hours, e[0] < 0 && (e[0] = 24 + e[0]), e.map((l) => `00${l}`.slice(-2)).join(":");
    }
    return (t, e) => (y(), B($, null, {
      default: T(() => [
        f(v, c(s, {
          type: "time",
          step: s.seconds,
          modelValue: a.value,
          "onUpdate:modelValue": e[0] || (e[0] = (l) => a.value = l)
        }), null, 16, ["step", "modelValue"]),
        f(v, c(s, {
          type: "time",
          step: s.seconds,
          modelValue: i.value,
          "onUpdate:modelValue": e[1] || (e[1] = (l) => i.value = l)
        }), null, 16, ["step", "modelValue"])
      ]),
      _: 1
    }));
  }
});
export {
  F as default
};
