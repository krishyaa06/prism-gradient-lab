const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
const g = { type: "linear", angle: 90, x: 50, y: 50, stops: [{ color: "#6c63ff", pos: 100 }, { color: "#00d2ff", pos: 0 }] };

test("css output sorts stops", () => {
  assert.equal(C.css(g), "linear-gradient(90deg, #00d2ff 0%, #6c63ff 100%)");
  assert.match(C.css({ ...g, type: "radial", x: 20, y: 30 }), /^radial-gradient\(circle at 20% 30%/);
  assert.match(C.css({ ...g, type: "conic", angle: 45 }), /^conic-gradient\(from 45deg/);
});
test("tailwind classes", () => {
  assert.equal(C.tailwind(g), "bg-gradient-to-r from-[#00d2ff] to-[#6c63ff]");
});
test("share encoding round trips", () => {
  const back = C.decode(C.encode(g));
  assert.equal(C.css(back), C.css(g));
  assert.equal(C.decode("garbage"), null);
});
test("colorAt interpolates", () => {
  assert.equal(C.colorAt([{ color: "#000000", pos: 0 }, { color: "#ffffff", pos: 100 }], 50), "#808080");
});
test("random gradients are valid", () => {
  for (let i = 0; i < 20; i++) { const r = C.random(); assert.ok(r.stops.length >= 2); r.stops.forEach((s) => assert.match(s.color, /^#[0-9a-f]{6}$/)); }
});
