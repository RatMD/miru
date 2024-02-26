import { computed as u, toValue as c, ref as n, reactive as g } from "vue";
function p(e, t) {
  const r = u(() => c(e) ? c(e).getAttribute("action") : null), s = n(!1), a = n(!1), f = Object.keys(t), i = g(t), o = JSON.parse(JSON.stringify(t));
  return Object.freeze(o), {
    action: r,
    dirty: s,
    loading: a,
    original: o,
    keys: f,
    values: i
  };
}
export {
  p as useForm
};
