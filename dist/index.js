import n from "./utils/filesize.js";
const r = {
  mounted(e, i) {
    const t = n(i.value);
    e.innerText = t;
  }
}, o = {
  /**
   * Install Miru Plugin
   * @param app 
   * @param options 
   */
  install(e, ...i) {
    e.directive("filesize", r);
  }
};
function c() {
  return o;
}
export {
  o as MiruPlugin,
  c as createMiru
};
