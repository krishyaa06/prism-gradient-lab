(() => {
  const { $, $$, copy, store, esc, tabs, toast } = Prism;
  const fromHash = Core.decode(location.hash.slice(1));
  let g = fromHash || store.get("gradient:g") || structuredClone(Core.PRESETS[0].g);
  g.x ??= 50; g.y ??= 50;
  let sel = 0, out = "css";
  $("#presets").innerHTML = Core.PRESETS.map((p, i) => `<button class="pr" data-i="${i}"><i style="background:${Core.css({ x: 50, y: 50, ...p.g })}"></i>${p.name}</button>`).join("");
  $("#presets").onclick = (e) => { const b = e.target.closest(".pr"); if (b) { g = { x: 50, y: 50, ...structuredClone(Core.PRESETS[b.dataset.i].g) }; sel = 0; render(true); } };
  function render(full) {
    const value = Core.css(g);
    store.set("gradient:g", g);
    $("#stage").style.background = value;
    $("#bar").style.background = Core.css({ type: "linear", angle: 90, stops: g.stops });
    $("#handles").innerHTML = g.stops.map((s, i) => `<div class="h ${i === sel ? "sel" : ""}" data-i="${i}" style="left:${s.pos}%;background:${s.color}"></div>`).join("");
    $("#code").textContent = out === "css" ? `background: ${value};` : Core.tailwind(g);
    $("#angleV").textContent = g.angle + "°"; $("#angle").value = g.angle; $("#cx").value = g.x; $("#cy").value = g.y;
    $("#angleF").style.display = g.type === "radial" ? "none" : ""; $("#posF").style.display = g.type === "linear" ? "none" : "";
    $$("#type button").forEach((b) => b.classList.toggle("on", b.dataset.v === g.type));
    if (full !== false) $("#stops").innerHTML = g.stops.map((s, i) => `<div class="stop" data-i="${i}"><input type="color" value="${esc(s.color)}" aria-label="Stop color" /><input type="range" min="0" max="100" value="${s.pos}" aria-label="Stop position" /><input type="number" min="0" max="100" value="${Math.round(s.pos)}" aria-label="Position %" /><button class="x" title="Remove" ${g.stops.length <= 2 ? "disabled" : ""}>✕</button></div>`).join("");
  }
  $("#stops").addEventListener("input", (e) => {
    const row = e.target.closest(".stop"), i = +row.dataset.i; sel = i;
    if (e.target.type === "color") g.stops[i].color = e.target.value; else { g.stops[i].pos = Math.max(0, Math.min(100, +e.target.value)); $$("input", row).forEach((x) => x !== e.target && x.type !== "color" && (x.value = Math.round(g.stops[i].pos))); }
    render(false);
  });
  $("#stops").addEventListener("click", (e) => { if (e.target.closest(".x") && g.stops.length > 2) { g.stops.splice(+e.target.closest(".stop").dataset.i, 1); sel = 0; render(); } });
  function addAt(pos) { g.stops.push({ color: Core.colorAt(g.stops, pos), pos: Math.round(pos) }); sel = g.stops.length - 1; render(); }
  $("#add").onclick = () => { const s = Core.sortStops(g.stops); let best = 0, at = 50; for (let i = 1; i < s.length; i++) if (s[i].pos - s[i - 1].pos > best) { best = s[i].pos - s[i - 1].pos; at = (s[i].pos + s[i - 1].pos) / 2; } addAt(at); };
  $("#bar").onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); addAt(((e.clientX - r.left) / r.width) * 100); };
  $("#handles").addEventListener("pointerdown", (e) => {
    const h = e.target.closest(".h"); if (!h) return; sel = +h.dataset.i; h.setPointerCapture(e.pointerId);
    const r = $("#bar").getBoundingClientRect();
    const move = (ev) => { g.stops[sel].pos = Math.max(0, Math.min(100, ((ev.clientX - r.left) / r.width) * 100)); render(false); };
    const up = () => { h.removeEventListener("pointermove", move); render(); };
    h.addEventListener("pointermove", move); h.addEventListener("pointerup", up, { once: true }); render(false);
  });
  tabs($("#type"), (v) => { g.type = v; render(false); });
  tabs($("#out"), (v) => { out = v; render(false); });
  $("#angle").oninput = (e) => { g.angle = +e.target.value; render(false); };
  $("#cx").oninput = (e) => { g.x = +e.target.value; render(false); };
  $("#cy").oninput = (e) => { g.y = +e.target.value; render(false); };
  $("#rand").onclick = () => { g = Core.random(); sel = 0; render(); };
  $("#copy").onclick = () => copy($("#code").textContent);
  $("#share").onclick = () => { history.replaceState(null, "", "#" + Core.encode(g)); copy(location.href, "Share link copied"); };
  document.addEventListener("keydown", (e) => { if (e.code === "Space" && !/INPUT|TEXTAREA|BUTTON|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); $("#rand").click(); } });
  render();
})();
