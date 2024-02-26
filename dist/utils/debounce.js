function n(e, i) {
  let t;
  return function() {
    window.clearTimeout(t), t = window.setTimeout(e.bind(this, ...arguments), i);
  };
}
export {
  n as default
};
