function a(n, h) {
  const e = Array(h.length + 1).fill(null).map(
    () => Array(n.length + 1).fill(null)
  );
  for (let l = 0; l <= n.length; l += 1)
    e[0][l] = l;
  for (let l = 0; l <= h.length; l += 1)
    e[l][0] = l;
  for (let l = 1; l <= h.length; l += 1)
    for (let t = 1; t <= n.length; t += 1) {
      const o = n[t - 1] === h[l - 1] ? 0 : 1;
      e[l][t] = Math.min(
        e[l][t - 1] + 1,
        // deletion
        e[l - 1][t] + 1,
        // insertion
        e[l - 1][t - 1] + o
        // substitution
      );
    }
  return e[h.length][n.length];
}
export {
  a as default
};
