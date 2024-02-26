function r(B, n = !1, e = 1) {
  const i = n ? 1e3 : 1024;
  if (Math.abs(B) < i)
    return B + " B";
  const a = n ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let t = -1;
  const o = 10 ** e;
  do
    B /= i, ++t;
  while (Math.round(Math.abs(B) * o) / o >= i && t < a.length - 1);
  return B.toFixed(e) + " " + a[t];
}
export {
  r as default
};
