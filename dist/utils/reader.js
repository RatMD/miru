function t(o) {
  return new Promise((n, a) => {
    const e = new FileReader();
    e.onload = () => {
      n(e.result);
    }, e.onerror = (r) => a(r), e.onabort = (r) => a(r), e.readAsDataURL(o);
  });
}
export {
  t as default
};
