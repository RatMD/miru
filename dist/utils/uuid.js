const t = /* @__PURE__ */ new Map();
function n(e) {
  if (e) {
    if (t.has(e))
      return t.get(e);
    {
      let r = crypto.randomUUID();
      return t.set(e, r), r;
    }
  } else
    return crypto.randomUUID();
}
export {
  n as default
};
