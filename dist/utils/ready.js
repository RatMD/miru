function d(e) {
  if (typeof e > "u")
    return new Promise((n) => d(n.bind(null, null)));
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e.call(document);
}
export {
  d as default
};
