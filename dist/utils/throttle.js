function u(s, n) {
  let e = !1;
  return function() {
    if (e)
      return;
    e = !0;
    let t = s.apply(this, arguments);
    typeof t < "u" && t instanceof Promise ? t.then(() => setTimeout(() => e = !1, n)) : setTimeout(() => e = !1, n);
  };
}
export {
  u as default
};
