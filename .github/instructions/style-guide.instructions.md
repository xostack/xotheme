---
description: "Copilot: The Minimalist Designer"
applyTo: "**/*"
---

# XOstack Style Guide

This document is your comprehensive guide to architecting and implementing the front end for a solo developer's portfolio. Our work will be a direct reflection of the developer's craft: it must be **accessible**, **performant**, and **thoughtfully designed**.

Read this guide carefully. Every technical choice is deliberate and serves our core philosophy.

## 1. Core Philosophy

Every decision you make must be weighed against these four principles:

1.  **Accessibility First:** Our goal is a WCAG AA-compliant site that is flawlessly usable with screen readers, keyboards, and other assistive devices. Accessibility is a non-negotiable requirement, not an enhancement.
2.  **Hyper-Performance:** We are targeting a total page size of **under 100kb** (gzipped, excluding images). This dictates our choice of a static site generator, minimal JavaScript, and efficient assets.
3.  **Minimalist Aesthetic:** The design is clean and content-focused. We use typography, space, and a deliberate color palette to create hierarchy and delight. We avoid extraneous elements.
4.  **Modular & Themeable:** The site uses a global design system, but individual project pages can easily override core styles (like color) to be given a unique personality, inspired by the CSS Zen Garden concept.

## 2. Technical Stack & Project Setup

Our stack is chosen for speed, simplicity, and modernity.

*   **Static Site Generator:** [Zola](https://www.getzola.org/) - For its speed and minimal setup.
*   **Templating:** [Tera](https://tera.netlify.app/) - A powerful templating engine built into Zola.
*   **Styling:** [SCSS](https://sass-lang.com/) - For modular and maintainable stylesheets.
*   **JavaScript:** [TypeScript](https://www.typescriptlang.org/) - For robust, type-safe interactive components.
*   **Build Tool:** [esbuild](https://esbuild.github.io/) - For lightning-fast compilation of TS and bundling of assets.
*   **Package Manager:** [npm](https://www.npmjs.com/) - To manage our development dependencies, including fonts.

### Initial Setup

1.  **Initialize npm:** `npm init -y`
2.  **Install Dependencies:** `npm install --save-dev esbuild @fontsource/atkinson-hyperlegible @fontsource/victor-mono`
3.  **Configure `package.json` scripts:**

    ```json
    "scripts": {
      "build:js": "esbuild ts/main.ts --bundle --minify --outfile=static/js/main.js",
      "build:css": "sass sass/main.scss static/css/main.css --style=compressed",
      "copy:fonts": "mkdir -p static/fonts && cp -r node_modules/@fontsource/atkinson-hyperlegible/files/*-400-normal.* node_modules/@fontsource/atkinson-hyperlegible/files/*-700-normal.* node_modules/@fontsource/victor-mono/files/*-400-normal.* static/fonts/",
      "build": "npm run copy:fonts && npm run build:css && npm run build:js && zola build",
      "dev": "zola serve"
    }
    ```

## 3. Layout & Spacing System

We are designing **mobile-first**. The layout will be fluid and responsive, using `rem` units for all spacing, padding, and font sizes to respect user-defined font settings.

*   **Root Font Size:** `16px` (`100%`).
*   **Spacing Scale:** We use a harmonious scale based on the golden ratio (1.618). Define this in `sass/_variables.scss`.

    ```scss
    /* sass/_variables.scss */
    :root {
      --space-xs: 0.5rem;    // 8px
      --space-s: 1rem;       // 16px
      --space-m: 1.618rem;   // ~26px
      --space-l: 2.618rem;   // ~42px
      --space-xl: 4.236rem;  // ~68px
    }
    ```
*   **Readable Content:** On larger screens, the main content column must be constrained for readability: `max-width: 75ch;`.

## 4. Color System

Our palette is derived from a "blue sky just before noon." It's defined using HSL values, which makes creating variations intuitive. The site must support both light and dark themes, auto-detecting the user's OS preference, with a manual JS override.

*   **HSL Base:** `hsl(205, 80%, ...)` is our starting point for the sky blue.

### Color Variable Definitions

Place this in `sass/_color.scss`.

```scss
/* sass/_color.scss */
:root {
  /* Light Theme (Default) */
  --color-primary: hsl(205, 80%, 55%);      /* Bright Sky Blue */
  --color-secondary: hsl(210, 30%, 65%);     /* Muted Slate Blue */
  --color-highlight: hsl(45, 100%, 60%);     /* Sunny Yellow Accent */
  --color-text-body: hsl(215, 25%, 20%);     /* Dark Slate */
  --color-text-heading: hsl(215, 35%, 15%);  /* Deeper Slate */
  --color-bg-1: hsl(210, 30%, 98%);          /* Almost White */
  --color-bg-2: hsl(210, 30%, 94%);          /* Light Gray */
  --color-bg-3: hsl(210, 30%, 88%);          /* Border Color */
  --color-bg-toolbar: hsla(210, 30%, 98%, 0.85); /* Translucent for Toolbar */
}

/* Dark Theme */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-primary: hsl(205, 85%, 70%);      /* Lighter, vibrant blue */
    --color-secondary: hsl(210, 20%, 55%);     /* Muted Slate */
    --color-highlight: hsl(45, 100%, 65%);     /* Bright Yellow */
    --color-text-body: hsl(210, 25%, 88%);     /* Light Gray Text */
    --color-text-heading: hsl(210, 30%, 98%);  /* Off-white Heading */
    --color-bg-1: hsl(215, 25%, 12%);          /* Near Black */
    --color-bg-2: hsl(215, 22%, 18%);          /* Dark Gray */
    --color-bg-3: hsl(215, 20%, 28%);          /* Border Color */
    --color-bg-toolbar: hsla(215, 25%, 12%, 0.85); /* Translucent for Toolbar */
  }
}

/* JS Override for Dark Theme */
[data-theme="dark"] {
  /* Paste all dark theme variables here */
}

/* JS Override for Light Theme */
[data-theme="light"] {
  /* Paste all light theme variables here */
}
```

## 5. Typography System

Typography is the foundation of our design. We use fonts chosen specifically for on-screen readability. All fonts will be self-hosted.

*   **Body Font:** [Atkinson Hyperlegible](https://brailleinstitute.org/freefont). Its design is research-backed to increase legibility by differentiating similar characters.
*   **Heading Font:** Use the bold weight (`700`) of Atkinson Hyperlegible.
*   **Monospace Font:** [Victor Mono](https://rubjo.github.io/victor-mono/). Known for its clarity and cursive italics.

### Font Implementation

1.  **Get Fonts:** Use the `npm run copy:fonts` script to move the required `.woff2` files into your `static/fonts` directory.
2.  **Define `@font-face` rules:** Add these to `sass/_typography.scss`.

    ```scss
    /* sass/_typography.scss */
    @font-face {
      font-family: 'Atkinson Hyperlegible';
      src: url('/fonts/atkinson-hyperlegible-latin-400-normal.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    /* ... define for 700 weight ... */

    @font-face {
      font-family: 'Victor Mono';
      src: url('/fonts/victor-mono-latin-400-normal.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    ```
3.  **Define CSS Variables:**

    ```scss
    :root {
      --font-body: 'Atkinson Hyperlegible', sans-serif;
      --font-mono: 'Victor Mono', monospace;
      --font-size-base: 1.05rem; /* Slightly larger base for readability */
      --font-size-h1: 2.618rem;
      /* ... define the rest of the type scale ... */
      --line-height-body: 1.6;
      --line-height-heading: 1.2;
    }
    ```

## 6. Core Components

### 6.1. Sticky Toolbar

This is our primary navigation element. It adapts significantly between mobile and desktop.

*   **Functionality:**
    *   Logo links home.
    *   Navigation to main site sections.
    *   Theme toggle button.
    *   Help button (`?`) to open the shortcuts overlay.
*   **Mobile View (`< 900px`):**
    *   A simple, thin bar at the top of the screen.
    *   Contains the square SVG logo on the left and a button labeled "Menu" on the right.
    *   Tapping "Menu" opens a full-screen overlay with navigation links. Deeper nested links (if any) overlay the previous menu. The browser's back action should feel natural for closing menus.
*   **Desktop View (`>= 900px`):**
    *   The bar becomes a floating, rounded "macOS-style" toolbar, fixed to the top of the viewport with some margin.
    *   It uses a translucent `backdrop-filter: blur(10px);` for a modern feel.
    *   The "Menu" button is replaced with the full navigation links, centered in the bar.
*   **Tera Template (`templates/partials/toolbar.html`):**

    ```html
    <header class="sticky-toolbar">
      <a href="/" class="logo" aria-label="Navigate to Home">
        <img src="/logo.svg" alt="Site Logo" />
      </a>
      <nav class="main-nav">
        <button id="menu-toggle" class="mobile-only" aria-haspopup="true" aria-expanded="false">Menu</button>
        <ul id="menu-items">
          <!-- Tera loop for nav items -->
        </ul>
      </nav>
      <div class="toolbar-actions">
        <button id="theme-toggle" aria-label="Toggle light/dark theme">T</button>
        <button id="help-toggle" aria-label="Show keyboard shortcuts">?</button>
      </div>
    </header>
    ```

### 6.2. Keyboard Shortcuts

*   **Trigger:** The `?` key or the help button in the toolbar.
*   **UI:** An overlay/modal (`role="dialog"`) that appears centered on the screen. It will contain a definition list (`<dl>`) of available shortcuts.
*   **Shortcuts to Implement:**
    *   `?`: Toggle help overlay.
    *   `t`: Toggle theme.
    *   `g` then `h`: Go Home.
    *   `g` then `a`: Go to About.
    *   `g` then `p`: Go to Projects.
    *   `g` then `j`: Go to Journal.
*   **TypeScript (`ts/main.ts`):** You will write the event listeners for key presses and the logic to show/hide this modal. Ensure focus is trapped within the modal when it is open for accessibility.

## 7. JavaScript & Interactivity (`ts/main.ts`)

Write your TypeScript in modules and have a single `main.ts` entry point for esbuild.

*   **Theme Toggle:** Create a `ThemeManager` class that:
    *   Checks `localStorage` for a user preference on load.
    *   If no preference, checks `window.matchMedia('(prefers-color-scheme: dark)')`.
    *   Applies the correct `data-theme` attribute to the `<html>` element.
    *   Binds a `click` event to the `#theme-toggle` button to switch the theme and save the preference to `localStorage`.
*   **Shortcut Navigation:** Create a `ShortcutManager` class that:
    *   Listens for `keydown` events.
    *   Uses a state variable to check for the `g` key, then waits for the next key (`h`, `a`, etc.) to navigate.
    *   Implements the `?` toggle for the help modal.

## 8. Final Checklist

Before considering a feature complete, verify it against this list.

*   [ ] **Valid HTML:** The page passes the W3C validator.
*   [ ] **Semantic Elements:** Correct use of `<main>`, `<article>`, `<nav>`, etc.
*   [ ] **Keyboard navigable:** Every interactive element is reachable and usable with `Tab` and `Enter`. Focus states are highly visible.
*   [ ] **ARIA Roles:** Correct ARIA attributes are used where needed (e.g., `aria-expanded` on menu toggles).
*   [ ] **Color Contrast:** All text passes a WCAG AA contrast check in both light and dark themes.
*   [ ] **Lighthouse Audit:** Achieves **100** in Accessibility and **95+** in Performance.
*   [ ] **No Console Errors:** The developer console is clean.