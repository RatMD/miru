function d(a, n, r) {
  return new Promise((s, l) => {
    const t = document.createElement("IMG");
    t.onload = () => {
      let c = t.naturalWidth, o = t.naturalHeight;
      c <= n && o <= r && s(a), n > r && c < o && ([n, r] = [r, n]);
      const i = Math.min(n / c, r / o), e = document.createElement("canvas");
      e.width = c * i, e.height = o * i, e.getContext("2d").drawImage(t, 0, 0, e.width, e.height), s(e.toDataURL());
    }, t.onerror = l, t.src = a;
  });
}
export {
  d as default
};
