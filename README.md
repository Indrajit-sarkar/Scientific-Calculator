<div style="font-family: 'Times New Roman', Times, serif;">

<h1 style="font-size: 18px; font-weight: bold; text-align: center; border-bottom: 2px solid #ff375f; padding-bottom: 10px;">
🧮 Scientific Calculator — Premium Web Application
</h1>

<p style="font-size: 12px; text-align: center; color: #888;">
A feature-rich, beautifully designed scientific calculator built with pure HTML, CSS, and JavaScript.<br>
Supports <strong>Basic</strong>, <strong>Scientific</strong>, and <strong>Programmer</strong> modes with an iPhone-inspired UI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
</p>

---

<h2 style="font-size: 18px; font-weight: bold;">📋 Table of Contents</h2>

<p style="font-size: 12px;">

1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
6. [Calculator Modes](#-calculator-modes)
7. [Theme System](#-theme-system)
8. [Calculation History](#-calculation-history)
9. [Memory Functions](#-memory-functions)
10. [Keyboard Shortcuts](#-keyboard-shortcuts)
11. [Gesture Controls](#-gesture-controls)
12. [Accessibility](#-accessibility)
13. [Responsive Design](#-responsive-design)
14. [Security](#-security)
15. [Browser Compatibility](#-browser-compatibility)
16. [Contributing](#-contributing)
17. [Acknowledgements](#-acknowledgements)

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🌟 Overview</h2>

<p style="font-size: 12px;">
This is a <strong>premium scientific calculator</strong> web application that replicates the look and feel of native iOS calculator apps. It runs entirely in the browser with zero dependencies — no frameworks, no build tools, no server required. Simply open <code>calculator.html</code> in any modern browser and start calculating.
</p>

<p style="font-size: 12px;">
The application features three distinct calculation modes, a dark/light theme system, persistent calculation history, memory functions, full keyboard support, swipe gestures for mobile users, and comprehensive accessibility support through ARIA labels.
</p>

---

<h2 style="font-size: 18px; font-weight: bold;">✨ Key Features</h2>

<h3 style="font-size: 14px; font-weight: bold;">Core Functionality</h3>

<p style="font-size: 12px;">

| Feature | Description |
|---------|-------------|
| **Three Calculation Modes** | Basic, Scientific, and Programmer modes for different use cases |
| **Safe Expression Parser** | Custom recursive-descent parser — no `eval()` or `Function()` used |
| **Dark / Light Theme** | Toggle between themes with one click; preference saved automatically |
| **Calculation History** | Stores last 20 calculations; click any entry to reload it |
| **Memory Functions** | M+, M−, MR, MC for storing and recalling values |
| **Live Status Bar Clock** | Real-time system clock in the iPhone-style status bar |
| **Copy to Clipboard** | Tap the display to copy the current result instantly |
| **Backspace / Delete** | On-screen ⌫ button + swipe-left gesture + keyboard Backspace |
| **Active Operator Highlight** | Currently selected operator button glows for visual feedback |
| **Haptic Feedback** | Subtle vibration on button press (supported Android devices) |
| **Full Keyboard Support** | Type numbers, operators, Enter, Backspace, Escape — all mapped |
| **Responsive Design** | Adapts from desktop (iPhone frame) to mobile (full-screen) |
| **Accessibility (A11y)** | ARIA labels, `aria-live` display, `:focus-visible` outlines |

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🛠️ Technology Stack</h2>

<p style="font-size: 12px;">

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure with ARIA roles and labels |
| **CSS3** | Custom properties for theming, Flexbox/Grid layouts, animations |
| **Vanilla JavaScript (ES6+)** | Expression parser, state management, event delegation |
| **Google Fonts** | DM Sans (UI) and DM Mono (display) typography |

</p>

<h3 style="font-size: 14px; font-weight: bold;">Architecture Highlights</h3>

<p style="font-size: 12px;">

- **No external dependencies** — zero npm packages, frameworks, or libraries
- **No `eval()` or `Function()`** — all expressions are parsed by a custom recursive-descent parser that enforces strict syntax rules
- **Single state object** — all application state is consolidated into one `state` object for predictability
- **Event delegation** — a single click listener on `document` handles all button interactions via `data-*` attributes, replacing 40+ inline `onclick` handlers
- **CSS Custom Properties** — 30+ theme variables enable instant dark/light switching with zero JavaScript DOM manipulation of individual elements

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">📁 Project Structure</h2>

<p style="font-size: 12px;">

```
Calculator/
├── calculator.html     # Main HTML file — open this in your browser
├── calculator.css      # All styles, theme variables, responsive rules
├── calculator.js       # Expression parser, state, event handlers, features
└── README.md           # This documentation file
```

</p>

<h3 style="font-size: 14px; font-weight: bold;">File Breakdown</h3>

<p style="font-size: 12px;">

| File | Lines | Size | Description |
|------|-------|------|-------------|
| `calculator.html` | ~330 | ~15 KB | Semantic HTML with ARIA labels, data attributes, and component structure |
| `calculator.css` | ~222 | ~9 KB | CSS custom properties, responsive breakpoints, animations, all component styles |
| `calculator.js` | ~422 | ~17 KB | Recursive-descent expression parser, state management, history, memory, gestures |

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🚀 Getting Started</h2>

<h3 style="font-size: 14px; font-weight: bold;">Prerequisites</h3>

<p style="font-size: 12px;">
No installation, build tools, or server required. You only need a modern web browser:
</p>

<p style="font-size: 12px;">

- Google Chrome 90+
- Mozilla Firefox 88+
- Microsoft Edge 90+
- Apple Safari 14+

</p>

<h3 style="font-size: 14px; font-weight: bold;">Installation & Launch</h3>

<p style="font-size: 12px;">

**Option 1 — Direct Download:**

1. Download or clone this repository:
   ```bash
   git clone https://github.com/yourusername/Calculator.git
   ```
2. Navigate to the project folder:
   ```bash
   cd Calculator
   ```
3. Open `calculator.html` in your browser:
   ```bash
   # Windows
   start calculator.html

   # macOS
   open calculator.html

   # Linux
   xdg-open calculator.html
   ```

**Option 2 — Double Click:**

Simply double-click on `calculator.html` in your file explorer. That's it!

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🔢 Calculator Modes</h2>

<h3 style="font-size: 14px; font-weight: bold;">1. Basic Mode</h3>

<p style="font-size: 12px;">
The default mode provides standard arithmetic operations for everyday calculations.
</p>

<p style="font-size: 12px;">

| Button | Function | Example |
|--------|----------|---------|
| `0-9` | Number input | Type any number |
| `.` | Decimal point | `3.14` |
| `+` | Addition | `5 + 3 = 8` |
| `−` | Subtraction | `10 − 4 = 6` |
| `×` | Multiplication | `7 × 6 = 42` |
| `÷` | Division | `15 ÷ 3 = 5` |
| `=` | Evaluate expression | Shows result |
| `AC` | All Clear | Resets everything |
| `+/−` | Toggle sign | `5` → `−5` |
| `%` | Percentage | `50` → `0.5` |
| `⌫` | Backspace | Deletes last character |

</p>

<h3 style="font-size: 14px; font-weight: bold;">2. Scientific Mode</h3>

<p style="font-size: 12px;">
Activate by tapping the <strong>"Scientific"</strong> tab. Provides 20 scientific functions plus 4 memory operations. Toggle between <strong>DEG</strong> (degrees) and <strong>RAD</strong> (radians) for trigonometric functions using the angle pills at the top.
</p>

<p style="font-size: 12px;">

| Category | Functions | Description |
|----------|-----------|-------------|
| **Trigonometry** | `sin`, `cos`, `tan`, `sin⁻¹`, `cos⁻¹`, `tan⁻¹` | Standard and inverse trig functions; respects DEG/RAD toggle |
| **Logarithms** | `log`, `ln`, `log₂`, `eˣ` | Base-10, natural, binary logarithms, and exponential |
| **Powers & Roots** | `x²`, `xʸ`, `√x`, `∛x` | Square, arbitrary power, square root, cube root |
| **Factorial** | `n!` | Computes n × (n−1) × … × 1; supports up to 170! |
| **Constants** | `π`, `e` | Pi (3.14159…) and Euler's number (2.71828…) |
| **Utilities** | `\|x\|`, `1/x`, `mod` | Absolute value, reciprocal, modulo operation |
| **Memory** | `MC`, `MR`, `M+`, `M−` | Clear, recall, add to, subtract from memory |

</p>

<p style="font-size: 12px;">

**How to use powers:** Enter the base → tap `xʸ` → enter the exponent → tap `=`
<br>
**Example:** `2 xʸ 10 = 1024`

</p>

<h3 style="font-size: 14px; font-weight: bold;">3. Programmer Mode</h3>

<p style="font-size: 12px;">
Activate by tapping the <strong>"Programmer"</strong> tab. Designed for developers and computer science students.
</p>

<p style="font-size: 12px;">

| Category | Functions | Description |
|----------|-----------|-------------|
| **Base Conversion** | `HEX`, `BIN`, `OCT`, `DEC` | Convert integers between bases (e.g., `255` → `0xFF`) |
| **Bitwise Logic** | `AND`, `OR`, `XOR`, `NOT` | Bitwise operations on integers |
| **Bit Shifting** | `LSH`, `RSH` | Left shift (×2ⁿ) and right shift (÷2ⁿ) |

</p>

<p style="font-size: 12px;">

**Example — Base Conversion:**
<br>Enter `255` → tap `HEX` → displays `0xFF`
<br>Enter `255` → tap `BIN` → displays `0b11111111`

**Example — Bitwise:**
<br>Enter `12` → tap `AND` → enter `10` → tap `=` → displays `8`

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🎨 Theme System</h2>

<p style="font-size: 12px;">
The calculator supports <strong>Dark</strong> and <strong>Light</strong> themes, switchable with a single tap on the theme button (☀️ / 🌙) in the top-right corner.
</p>

<p style="font-size: 12px;">

| Feature | Details |
|---------|---------|
| **Toggle Button** | ☀️ (switch to light) / 🌙 (switch to dark) in the app topbar |
| **Persistence** | Theme preference is saved to `localStorage` and restored on next visit |
| **Implementation** | 30+ CSS custom properties on `:root` / `[data-theme="light"]` |
| **Scope** | All UI elements adapt — buttons, display, overlays, status bar, background |

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">📜 Calculation History</h2>

<p style="font-size: 12px;">

| Feature | Details |
|---------|---------|
| **Access** | Tap the 🕐 clock icon in the top-right corner |
| **Capacity** | Stores the last 20 calculations (FIFO) |
| **Format** | Each entry shows the expression and result |
| **Reload** | Tap any history entry to load its result back into the calculator |
| **Clear** | Tap "Clear All" to wipe the entire history |
| **Session** | History is stored in-memory (resets on page refresh) |

</p>

<p style="font-size: 12px;">

**How to use:**
1. Perform any calculation (e.g., `42 × 3 = 126`)
2. Tap the 🕐 icon in the topbar
3. Your calculation appears in the history panel
4. Tap the entry to load `126` back into the display
5. Continue calculating from there

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">💾 Memory Functions</h2>

<p style="font-size: 12px;">
Memory buttons appear in <strong>Scientific mode</strong>. When memory holds a value, an orange <strong>"M"</strong> indicator badge appears on the display.
</p>

<p style="font-size: 12px;">

| Button | Function | Description |
|--------|----------|-------------|
| `M+` | Memory Add | Adds the current display value to memory |
| `M−` | Memory Subtract | Subtracts the current display value from memory |
| `MR` | Memory Recall | Loads the stored memory value into the display |
| `MC` | Memory Clear | Resets memory to zero and hides the "M" indicator |

</p>

<p style="font-size: 12px;">

**Example workflow:**
1. Enter `100` → tap `M+` (memory = 100, "M" badge appears)
2. Enter `25` → tap `M+` (memory = 125)
3. Clear display → tap `MR` → display shows `125`
4. Tap `MC` to reset memory

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">⌨️ Keyboard Shortcuts</h2>

<p style="font-size: 12px;">
Full keyboard support is available at all times. No need to click — just type.
</p>

<p style="font-size: 12px;">

| Key | Action |
|-----|--------|
| `0` – `9` | Enter digits |
| `.` | Decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo |
| `^` | Power (e.g., `2^10`) |
| `(` `)` | Parentheses for grouping |
| `Enter` or `=` | Evaluate the expression |
| `Backspace` | Delete the last character |
| `Escape` | Clear all (same as AC) |

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">👆 Gesture Controls</h2>

<p style="font-size: 12px;">
Touch gestures enhance the mobile experience:
</p>

<p style="font-size: 12px;">

| Gesture | Action | Details |
|---------|--------|---------|
| **Swipe left** on display | Delete last character | Swipe distance > 50px triggers delete |
| **Tap** display | Copy result to clipboard | Shows a "Copied!" toast notification |
| **Tap** any button | Haptic feedback | Subtle 10ms vibration (Android devices) |

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">♿ Accessibility</h2>

<p style="font-size: 12px;">
The calculator is designed to be accessible to users of all abilities:
</p>

<p style="font-size: 12px;">

| Feature | Implementation |
|---------|---------------|
| **ARIA Labels** | Every interactive button has a descriptive `aria-label` attribute |
| **Live Region** | The display uses `role="status"` and `aria-live="polite"` so screen readers announce results |
| **Focus Indicators** | `:focus-visible` adds a blue outline ring for keyboard navigation |
| **Semantic Roles** | Mode selector uses `role="tablist"`, button groups use `role="group"` |
| **No Motion Sensitivity** | Critical animations are purely decorative and don't affect usability |

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">📱 Responsive Design</h2>

<p style="font-size: 12px;">
The layout intelligently adapts to screen size:
</p>

<p style="font-size: 12px;">

| Screen Width | Behavior |
|-------------|----------|
| **> 430px** | Full iPhone shell frame with decorative background orbs and rounded corners |
| **≤ 430px** | iPhone frame removed; calculator fills the entire viewport; background decorations hidden |
| **Short screens (≤ 750px height)** | Button heights and display area reduced to fit without scrolling |

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🔒 Security</h2>

<p style="font-size: 12px;">

The calculator uses a <strong>custom recursive-descent expression parser</strong> instead of JavaScript's `eval()` or `Function()` constructor. This eliminates the risk of code injection entirely.

**Parser Architecture:**

```
Expression → BitOr
BitOr      → BitXor ( "|" BitXor )*
BitXor     → BitAnd ( "⊕" BitAnd )*
BitAnd     → Shift ( "&" Shift )*
Shift      → AddSub ( ("<<" | ">>") AddSub )*
AddSub     → MulDiv ( ("+" | "-") MulDiv )*
MulDiv     → Power ( ("*" | "/" | "%") Power )*
Power      → Unary ( "^" Power )?          ← right-associative
Unary      → ("-")? Atom
Atom       → NUMBER | "(" Expression ")"
```

The tokenizer rejects any unrecognized characters, and the parser enforces strict grammar rules. Only valid mathematical expressions can be evaluated.

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🌐 Browser Compatibility</h2>

<p style="font-size: 12px;">

| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Google Chrome | 90+ | ✅ Fully Supported |
| Mozilla Firefox | 88+ | ✅ Fully Supported |
| Microsoft Edge | 90+ | ✅ Fully Supported |
| Apple Safari | 14+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |
| Samsung Internet | 14+ | ✅ Fully Supported |

> **Note:** Haptic feedback (`navigator.vibrate`) is only available on Android browsers. On iOS and desktop, the vibration call is safely ignored.

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🤝 Contributing</h2>

<p style="font-size: 12px;">
Contributions are welcome! Here's how to get started:
</p>

<p style="font-size: 12px;">

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes and test thoroughly
4. **Commit** with a descriptive message:
   ```bash
   git commit -m "Add: description of your change"
   ```
5. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open** a Pull Request with a clear description of what you changed and why

</p>

<h3 style="font-size: 14px; font-weight: bold;">Development Guidelines</h3>

<p style="font-size: 12px;">

- Keep all code in the three existing files (`calculator.html`, `.css`, `.js`)
- Use CSS custom properties for any new theme-dependent colors
- Use `data-*` attributes for new button actions (never inline `onclick`)
- Add `aria-label` to all new interactive elements
- Test in both dark and light themes
- Test responsive behavior at narrow widths

</p>

---

<h2 style="font-size: 18px; font-weight: bold;">🙏 Acknowledgements</h2>

<p style="font-size: 12px;">

- **Design Inspiration** — Apple iOS Calculator app and its iconic minimalist design language
- **Typography** — [DM Sans](https://fonts.google.com/specimen/DM+Sans) and [DM Mono](https://fonts.google.com/specimen/DM+Mono) by Colophon Foundry via Google Fonts
- **Color Palette** — Inspired by Apple's Human Interface Guidelines color system
- **Expression Parser** — Custom implementation based on recursive-descent parsing techniques

</p>

---

<p style="font-size: 12px; text-align: center; color: #888;">
Made with ❤️ | Built with pure HTML, CSS, and JavaScript — zero dependencies
</p>

</div>
