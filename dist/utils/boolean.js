const t = [!0, "true", 1, "1", "yes", "on"], e = [!1, "false", 0, "0", "no", "off", null, void 0];
function f(n) {
  return typeof n == "string" && (n = n.toLowerCase()), t.indexOf(n) >= 0 ? !0 : e.indexOf(n) >= 0 ? !1 : null;
}
function o(n) {
  return typeof n == "string" && (n = n.toLowerCase()), t.indexOf(n) >= 0;
}
function r(n) {
  return typeof n == "string" && (n = n.toLowerCase()), e.indexOf(n) >= 0;
}
export {
  f as boolean,
  f as default,
  r as falsy,
  o as truly
};
