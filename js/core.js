/* Prism Gradient Lab · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const sortStops = (stops) => [...stops].sort((a, b) => a.pos - b.pos);
  function css(g) {
    const stops = sortStops(g.stops).map((s) => `${s.color} ${Math.round(s.pos)}%`).join(", ");
    if (g.type === "radial") return `radial-gradient(${g.shape || "circle"} at ${g.x ?? 50}% ${g.y ?? 50}%, ${stops})`;
    if (g.type === "conic") return `conic-gradient(from ${g.angle}deg at ${g.x ?? 50}% ${g.y ?? 50}%, ${stops})`;
    return `linear-gradient(${g.angle}deg, ${stops})`;
  }
  function tailwind(g) {
    const s = sortStops(g.stops);
    if (g.type !== "linear" || s.length > 3) return `bg-[${css(g).replace(/\s+/g, "_")}]`;
    const dirs = { 0: "t", 45: "tr", 90: "r", 135: "br", 180: "b", 225: "bl", 270: "l", 315: "tl" };
    const dir = dirs[((Math.round(g.angle / 45) * 45) % 360 + 360) % 360];
    const c = (x) => `[${x.color}]`;
    return [`bg-gradient-to-${dir}`, `from-${c(s[0])}`, s.length === 3 ? `via-${c(s[1])}` : "", `to-${c(s[s.length - 1])}`].filter(Boolean).join(" ");
  }
  function encode(g) { return [g.type, g.angle, g.x ?? 50, g.y ?? 50, ...g.stops.map((s) => s.color.replace("#", "") + "@" + Math.round(s.pos))].join("~"); }
  function decode(str) {
    try {
      const [type, angle, x, y, ...st] = decodeURIComponent(str).split("~");
      if (!["linear", "radial", "conic"].includes(type) || st.length < 2) return null;
      return { type, angle: +angle, x: +x, y: +y, stops: st.map((s) => { const [c, p] = s.split("@"); return { color: "#" + c, pos: +p }; }) };
    } catch { return null; }
  }
  function hexToRgb(h) { h = h.replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join(""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); }
  function colorAt(stops, pos) {
    const s = sortStops(stops);
    if (pos <= s[0].pos) return s[0].color;
    for (let i = 1; i < s.length; i++) if (pos <= s[i].pos) {
      const a = hexToRgb(s[i - 1].color), b = hexToRgb(s[i].color), t = (pos - s[i - 1].pos) / (s[i].pos - s[i - 1].pos || 1);
      return "#" + a.map((v, j) => Math.round(v + (b[j] - v) * t).toString(16).padStart(2, "0")).join("");
    }
    return s[s.length - 1].color;
  }
  function random() {
    const h = Math.random() * 360, n = 2 + Math.floor(Math.random() * 2);
    const hsl = (hh, s, l) => { s /= 100; l /= 100; const k = (m) => (m + hh / 30) % 12, a = s * Math.min(l, 1 - l); const f = (m) => Math.round((l - a * Math.max(-1, Math.min(k(m) - 3, 9 - k(m), 1))) * 255).toString(16).padStart(2, "0"); return "#" + f(0) + f(8) + f(4); };
    return { type: "linear", angle: [45, 90, 120, 135, 160][Math.floor(Math.random() * 5)], x: 50, y: 50, stops: Array.from({ length: n }, (_, i) => ({ color: hsl((h + i * (40 + Math.random() * 60)) % 360, 75 + Math.random() * 25, 50 + Math.random() * 12), pos: Math.round((i / (n - 1)) * 100) })) };
  }
  const PRESETS = [
    { name: "Prism", g: { type: "linear", angle: 120, stops: [{ color: "#00d2ff", pos: 0 }, { color: "#6c63ff", pos: 100 }] } },
    { name: "Sunset", g: { type: "linear", angle: 135, stops: [{ color: "#ff6b8a", pos: 0 }, { color: "#f5c561", pos: 100 }] } },
    { name: "Aurora", g: { type: "linear", angle: 160, stops: [{ color: "#3ee69a", pos: 0 }, { color: "#00d2ff", pos: 50 }, { color: "#6c63ff", pos: 100 }] } },
    { name: "Nebula", g: { type: "radial", angle: 0, x: 30, y: 20, stops: [{ color: "#d7a8ff", pos: 0 }, { color: "#6c63ff", pos: 45 }, { color: "#07080f", pos: 100 }] } },
    { name: "Mango", g: { type: "linear", angle: 90, stops: [{ color: "#ffe259", pos: 0 }, { color: "#ffa751", pos: 100 }] } },
    { name: "Hyper", g: { type: "conic", angle: 0, stops: [{ color: "#ff6b8a", pos: 0 }, { color: "#6c63ff", pos: 33 }, { color: "#00d2ff", pos: 66 }, { color: "#ff6b8a", pos: 100 }] } },
    { name: "Midnight", g: { type: "linear", angle: 180, stops: [{ color: "#232526", pos: 0 }, { color: "#414345", pos: 100 }] } },
    { name: "Lagoon", g: { type: "linear", angle: 45, stops: [{ color: "#43cea2", pos: 0 }, { color: "#185a9d", pos: 100 }] } },
  ];
  return { css, tailwind, encode, decode, colorAt, random, PRESETS, sortStops };
});
