<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:6C63FF,100:FF6B8A&height=200&section=header&text=Prism%20Gradient%20Lab&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Linear%20%C2%B7%20Radial%20%C2%B7%20Conic%20%C2%B7%20CSS%20%26%20Tailwind&descAlignY=58&descSize=16" width="100%" alt="Prism Gradient Lab" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=6C63FF&center=true&vCenter=true&width=680&lines=Drag+stops.+Copy+CSS.;Linear%2C+radial+and+conic;Tailwind+classes+included;Share+a+gradient+with+one+link" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-gradient-lab/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-gradient-lab/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-gradient-lab/"><img src="https://img.shields.io/badge/Live_Demo-Open-6C63FF?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-6C63FF?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-gradient-lab?style=for-the-badge&color=FF6B8A" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Gradient Lab screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="" />

## ⚡ Overview

**Prism Gradient Lab** is a visual editor for CSS gradients. Click the bar to add stops, drag them to reposition, change colors, and switch between linear, radial and conic modes. Copy plain CSS or Tailwind classes, or share the exact gradient with a link.

## ✨ Features

- **Drag-and-drop stops** on a live gradient bar (click to add)
- **Linear, radial and conic** with angle and center controls
- **8 presets** including Prism, Aurora and Nebula
- **CSS and Tailwind** output
- **Share links** that encode the gradient in the URL
- `Space` for a random gradient, state saved locally

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Gradient Lab on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Gradient Lab on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-gradient-lab/](https://krishyaa06.github.io/prism-gradient-lab/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-gradient-lab.git
cd prism-gradient-lab
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Pick a preset or press `Space` for a random gradient.
2. Click the bar to add a stop; drag handles to move them.
3. Choose **Linear**, **Radial** or **Conic** and adjust the angle or center.
4. Copy CSS / Tailwind, or **Share link** to send it to a teammate.

## 📁 Project Structure

```text
prism-gradient-lab/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # editor UI
│   ├── core.js   # CSS/Tailwind output, share encoding — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Gradient Lab is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" alt="Soumya Bhandare" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF6B8A,50:6C63FF,100:07060f&height=110&section=footer" width="100%" alt="" />
