+++
title = "Welcome to XOtheme"
description = "A minimal, accessible Zola theme for portfolios and blogs with Material Symbols Rounded icons"

[extra]
hero.title = "XOtheme"
hero.subtitle = "Zola SSG Theme for XOstack"
hero.description = "This is a demonstration of the XOtheme, a minimal and accessible Zola theme designed for portfolios and blogs. It prioritizes accessibility, performance, and semantic HTML."

# Hero background configuration
hero.background.type = "gradient"  # Options: "gradient", "solid", "image"
hero.background.gradient.direction = "180deg"  # Top to bottom gradient
hero.background.gradient.colors = [
  "hsl(205, 85%, 65%)",  # Light blue at top
  "hsl(205, 80%, 55%)",  # Primary blue
  "hsl(205, 75%, 50%)"   # Deeper blue at bottom
]

# Hero text colors
hero.colors.title = "hsl(45, 100%, 85%)"      # Bright yellow
hero.colors.subtitle = "hsla(210, 30%, 100%, 0.95)"  # Almost white
hero.colors.description = "hsla(210, 30%, 100%, 0.9)" # Slightly transparent white
+++

## About This Theme

The theme uses Atkinson Hyperlegible as the primary font (designed specifically for improved legibility), Merriweather for serif text, Victor Mono for code, and Material Icons for beautiful iconography.

## Icons

XOtheme includes icon via Google's Material Icons with both outlined and filled variants. The system supports multiple sizes, weights, and grades for maximum flexibility.

{{ icon(name="palette") }} **[View the complete icon reference →](/about/icons/)**

Quick examples: {{ icon(name="home") }} {{ icon(name="star", fill=true) }} {{ icon(name="settings", size="lg") }}

## Features

- {{ icon(name="smartphone") }} Responsive design that works on all devices
- {{ icon(name="dark_mode") }} Dark/light theme support
- {{ icon(name="design_services") }} Clean, minimal design focused on content
- {{ icon(name="keyboard") }} Full keyboard navigation
- {{ icon(name="accessibility") }} Screen reader friendly and WCAG AA compliant
- {{ icon(name="speed") }} Optimized for performance
- {{ icon(name="palette") }} Customizable color schemes
