import { shallowRef as r, ref as W, onMounted as O, onUnmounted as v } from "vue";
function m() {
  const e = r(), t = r(), i = r(), n = r(), u = r(), l = r(), x = r(), w = r(), f = r(), a = r(), g = r(), p = W(0), c = W(0), b = W(), d = W(window.navigator.onLine);
  function o() {
    p.value = document.documentElement.clientWidth || window.outerWidth, c.value = document.documentElement.clientHeight || window.outerHeight, d.value = window.navigator.onLine;
    let s = !1;
    typeof window.screen < "u" && typeof window.screen.orientation < "u" ? s = window.screen.orientation.type.startsWith("portrait") : s = window.innerHeight > window.innerWidth, b.value = s ? "portrait" : "landscape";
  }
  return O(() => {
    let s = S();
    e.value = s.agent, t.value = s.browser, i.value = s.browserVersion, n.value = s.browserMajorVersion, u.value = s.cookies, l.value = s.os, x.value = s.osVersion, w.value = s.isApple, f.value = s.isLinux, a.value = s.isWindows, g.value = s.isMobile, window.addEventListener("resize", o), window.addEventListener("online", o), window.addEventListener("offline", o), typeof window.screen < "u" && typeof window.screen.orientation < "u" ? window.screen.orientation.addEventListener("change", o) : window.addEventListener("orientationchange", o), o();
  }), v(() => {
    window.removeEventListener("resize", o), window.removeEventListener("online", o), window.removeEventListener("offline", o), typeof window.screen < "u" && typeof window.screen.orientation < "u" ? window.screen.orientation.removeEventListener("change", o) : window.removeEventListener("orientationchange", o);
  }), {
    width: p,
    height: c,
    orientation: b,
    online: d,
    agent: e,
    browser: t,
    browserVersion: i,
    browserMajorVersion: n,
    cookies: u,
    os: l,
    osVersion: x,
    isApple: w,
    isLinux: f,
    isWindows: a,
    isMobile: g
  };
}
function S() {
  let e = navigator.userAgent, t = navigator.appName, i = parseFloat(navigator.appVersion).toString(), n, u;
  (n = e.indexOf("YaBrowser")) >= 0 ? (t = "Yandex", i = e.substring(n + 10)) : (n = e.indexOf("SamsungBrowser")) >= 0 ? (t = "Samsung", i = e.substring(n + 15)) : (n = e.indexOf("UCBrowser")) >= 0 ? (t = "UC Browser", i = e.substring(n + 10)) : (n = e.indexOf("OPR")) >= 0 ? (t = "Opera", i = e.substring(n + 4)) : (n = e.indexOf("Opera")) >= 0 ? (t = "Opera", (n = e.indexOf("Version")) >= 0 ? i = e.substring(n + 8) : i = e.substring(n + 6)) : (n = e.indexOf("Edge")) >= 0 ? (t = "Microsoft Legacy Edge", i = e.substring(n + 5)) : (n = e.indexOf("Edg")) >= 0 ? (t = "Microsoft Edge", i = e.substring(n + 4)) : (n = e.indexOf("MSIE")) >= 0 ? (t = "Microsoft Internet Explorer", i = e.substring(n + 5)) : (n = e.indexOf("Chrome")) >= 0 ? (t = "Chrome", i = e.substring(n + 7)) : (n = e.indexOf("Safari")) >= 0 ? (t = "Safari", (n = e.indexOf("Version")) >= 0 ? i = e.substring(n + 8) : i = e.substring(n + 7)) : (n = e.indexOf("Firefox")) != -1 ? (t = "Firefox", i = e.substring(n + 8)) : e.indexOf("Trident/") != -1 ? (t = "Microsoft Internet Explorer", i = e.substring(e.indexOf("rv:") + 3)) : (u = e.lastIndexOf(" ") + 1) < (n = e.lastIndexOf("/")) && (t.toLowerCase() == t.toUpperCase() ? t = navigator.appName : t = e.substring(u, n), i = e.substring(n + 1));
  let l;
  (l = i.indexOf(";")) >= 0 && (i = i.substring(0, l)), (l = i.indexOf(" ")) >= 0 && (i = i.substring(0, l)), (l = i.indexOf(")")) >= 0 && (i = i.substring(0, l));
  let x = parseFloat(i).toString(), w = parseInt(i, 10);
  isNaN(w) && (w = parseInt(i, 10));
  let f = !!navigator.cookieEnabled;
  typeof navigator.cookieEnabled > "u" && (f = null);
  let a = null, g = !1, p = !1, c = !1, b = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(e);
  for (const o of M)
    if (o.regexp.test(e)) {
      a = o.label, g = o.apple || !1, p = o.linux || !1, c = o.windows || !1;
      break;
    }
  let d = null;
  if (typeof a == "string" && /Windows/.test(a)) {
    let o = /Windows (.*)/.exec(a);
    d = o && o.length > 1 ? o[1] : null;
  }
  switch (a) {
    case "Mac OS":
    case "Mac OS X":
    case "Android":
      let o = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(e);
      d = o && o.length > 1 ? o[1] : null;
      break;
    case "iOS":
      let s = /OS (\d+)_(\d+)_?(\d+)?/.exec(e);
      d = s && s.length > 1 ? `${s[1]}.${s[2] || 0}.${s[3] || 0}` : null;
      break;
  }
  return {
    agent: e,
    browser: t,
    browserVersion: x,
    browserMajorVersion: w,
    cookies: f,
    os: a,
    osVersion: d,
    isApple: g,
    isLinux: p,
    isWindows: c,
    isMobile: b
  };
}
const M = [
  {
    label: "Windows 10",
    regexp: /(Windows 10.0|Windows NT 10.0)/,
    windows: !0
  },
  {
    label: "Windows 8.1",
    regexp: /(Windows 8.1|Windows NT 6.3)/,
    windows: !0
  },
  {
    label: "Windows 8",
    regexp: /(Windows 8|Windows NT 6.2)/,
    windows: !0
  },
  {
    label: "Windows 7",
    regexp: /(Windows 7|Windows NT 6.1)/,
    windows: !0
  },
  {
    label: "Windows Vista",
    regexp: /Windows NT 6.0/,
    windows: !0
  },
  {
    label: "Windows Server 2003",
    regexp: /Windows NT 5.2/,
    windows: !0
  },
  {
    label: "Windows XP",
    regexp: /(Windows NT 5.1|Windows XP)/,
    windows: !0
  },
  {
    label: "Windows 2000",
    regexp: /(Windows NT 5.0|Windows 2000)/,
    windows: !0
  },
  {
    label: "Windows ME",
    regexp: /(Win 9x 4.90|Windows ME)/,
    windows: !0
  },
  {
    label: "Windows 98",
    regexp: /(Windows 98|Win98)/,
    windows: !0
  },
  {
    label: "Windows 95",
    regexp: /(Windows 95|Win95|Windows_95)/,
    windows: !0
  },
  {
    label: "Windows NT 4.0",
    regexp: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
    windows: !0
  },
  {
    label: "Windows CE",
    regexp: /Windows CE/,
    windows: !0
  },
  {
    label: "Windows 3.11",
    regexp: /Win16/,
    windows: !0
  },
  {
    label: "Android",
    regexp: /Android/,
    linux: !0
  },
  {
    label: "Open BSD",
    regexp: /OpenBSD/,
    linux: !0
  },
  {
    label: "Sun OS",
    regexp: /SunOS/,
    linux: !0
  },
  {
    label: "Chrome OS",
    regexp: /CrOS/,
    linux: !0
  },
  {
    label: "Linux",
    regexp: /(Linux|X11(?!.*CrOS))/,
    linux: !0
  },
  {
    label: "iOS",
    regexp: /(iPhone|iPad|iPod)/,
    apple: !0
  },
  {
    label: "Mac OS X",
    regexp: /Mac OS X/,
    apple: !0
  },
  {
    label: "Mac OS",
    regexp: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
    apple: !0
  },
  {
    label: "QNX",
    regexp: /QNX/
  },
  {
    label: "UNIX",
    regexp: /UNIX/
  },
  {
    label: "BeOS",
    regexp: /BeOS/
  },
  {
    label: "OS/2",
    regexp: /OS\/2/
  },
  {
    label: "Search Bot",
    regexp: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
  }
];
export {
  m as useClient
};
