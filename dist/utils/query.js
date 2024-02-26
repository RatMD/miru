function f(u, r, t) {
  let e;
  return typeof r == "function" ? (e = document, t = r) : e = r || document, typeof t == "function" ? Array.from(e.querySelectorAll(u), t) : Array.from(e.querySelectorAll(u));
}
export {
  f as default
};
