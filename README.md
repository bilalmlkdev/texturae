# <a href="https://asciiara.vercel.app" target="_blank">Asciiara - Text to Hand-Made Fonts Converter</a>

**Asciiara** is a modern, interactive web application that transforms standard text into stunning hand-crafted ASCII & Unicode fonts. Browse through 35+ custom fonts across 5 style groups, apply creative filters, test them all in a responsive gallery, and export your creations directly to high-quality PNGs.

Built for **creativity, speed, and precision** — all running entirely in the browser.

<p align="left">
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-9B72FF.svg?style=flat" />
  </a>
  <img src="https://img.shields.io/badge/Repository%20Status-Maintained-9B72FF.svg?style=flat" />
  <img src="https://img.shields.io/badge/Website%20Status-Online-9B72FF.svg?style=flat" />
  <a href="https://github.com/byllzz">
    <img src="https://img.shields.io/badge/Author-Bilal%20Malik-9B72FF.svg?style=flat" />
  </a>
  <a href="https://github.com/byllzz/asciiara/releases">
     <img src="https://img.shields.io/badge/Latest%20Release-01%20April%202026-9B72FF.svg" />
  </a>
</p>
<br />

[![Visit Asciiara](https://img.shields.io/badge/View-Asciiara-9B72FF?style=flat)](https://asciiara.vercel.app)

<img width="100%" alt="Asciiara Preview" src="./src/assets/preview.png" />

⭐ **Star the repo if you like it — it really helps!**

---

# Features

<p align="left">
✔️ 35+ Custom Hand-Crafted ASCII & Unicode Fonts<br>
✔️ 5 Font Groups — Artistic, Classic ASCII, Stylized, Structured, Text Styles<br>
✔️ 28+ Filters — Color, Flip, Style & Code Comment filters<br>
✔️ Instant Text-to-ASCII (Hand Made Fonts) Transformation<br>
✔️ High-Fidelity PNG Export with Loading States<br>
✔️ 'Test All' Gallery View for Quick Font Comparisons<br>
✔️ Persistent Local Storage (Remembers settings & text drafts)<br>
✔️ Light & Dark Theme Support with seamless UI transitions<br>
✔️ 1-Click Copy to Clipboard & Native Browser Sharing<br>
✔️ Responsive Layout (Keyboard, Mouse & Touch friendly)<br>
✔️ No Accounts, No Tracking, No Backend Required<br>
✔️ Built with React & Tailwind CSS
</p>

---

## Font Groups

| Group | Fonts |
|---|---|
| **Artistic** | Epic, Graffiti, Isometric, Ogre, Calvin S, Chunky, Fire, Retrowave, Glitch, Matrix, Pyramid, Mirror |
| **Classic ASCII** | Big, Blocky, Slant, Shadow, Block, Bubble, Digital, Wave, Scanline |
| **Stylized** | Script, Mini, Small, Ivrit, Gothic, Banner, Braille |
| **Structured** | Circuit, Neon, Stencil, Typewriter |
| **Text Styles** | Standard, Uppercase, Lowercase, Capitalize |

---

## Filters

| Category | Filters |
|---|---|
| **Color** | Chromostereopsis 1 & 2, Rainbow 1–3, Gold, Fire, Cyan Magenta, Matrix |
| **Flip** | Flip Vertically, Flip Horizontally, Flip Both |
| **Style** | Sleek, Bold, Italic, Strikethrough, Underline |
| **Code Comments** | Bash, C, C++, Fortran, MySQL, Shell Echo, Visual Basic, Python Docstring, HTML, YAML, JSON Wrap, SQL Print, Lua, Ruby |

---

## How It Works

- Uses a **custom font mapping engine** (O(1) lookups) for instantaneous text transformation without relying on heavy external libraries.
- Every font is **hand-authored** — multi-line 3×3 character grids, box-drawing matrices, unicode glyph maps, and pattern-based effects, all written by hand with no figlet or ASCII library involved.
- Renders complex multi-line string matrices perfectly using responsive whitespace handling.
- State is managed and persisted globally via **custom LocalStorage hooks**, ensuring you never lose your work on refresh.
- Image generation is handled dynamically, injecting theme-aware backgrounds before capturing the DOM node for perfect PNG exports.
- All processing happens **100% client-side**, ensuring maximum privacy and zero network latency.

---

## Installation & Setup

### Requirements
- Node.js installed on your machine
- A modern Web Browser (Chrome / Edge / Firefox)
- *Note: No API keys are required as Asciiara runs entirely locally!*

### Clone the Repository
```bash
git clone https://github.com/byllzz/asciiara.git
cd asciiara
```

# License 

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.

# Feedback

Reach out at **bilalmlkdev@gmail.com**. If you like this project, please ⭐ star the repo - it motivates future updates!
