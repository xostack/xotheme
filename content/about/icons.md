+++
title = "Icons Reference"
description = "Reference for Material Icons in XOtheme"
date = 2025-07-21
+++

# Material Icons

XOtheme includes Google's Material Icons with both outlined and filled variants, optimized for performance and accessibility through easy-to-use Tera macros.

## Basic Usage

### Outlined Icons (Default)
{{ icon(name="home") }} {{ icon(name="search") }} {{ icon(name="settings") }} {{ icon(name="favorite") }} {{ icon(name="star") }} {{ icon(name="notifications") }} {{ icon(name="account_circle") }} {{ icon(name="shopping_cart") }}

### Filled Icons
{{ icon(name="home", fill=true) }} {{ icon(name="search", fill=true) }} {{ icon(name="settings", fill=true) }} {{ icon(name="favorite", fill=true) }} {{ icon(name="star", fill=true) }} {{ icon(name="notifications", fill=true) }} {{ icon(name="account_circle", fill=true) }} {{ icon(name="shopping_cart", fill=true) }}

## Size Variations

### Extra Small (0.9em)
{{ icon(name="home", size="xs") }} {{ icon(name="search", size="xs") }} {{ icon(name="settings", size="xs") }} {{ icon(name="favorite", size="xs", fill="filled") }} {{ icon(name="star", size="xs", fill="filled") }}

### Small (1em)
{{ icon(name="home", size="sm") }} {{ icon(name="search", size="sm") }} {{ icon(name="settings", size="sm") }} {{ icon(name="favorite", size="sm", fill="filled") }} {{ icon(name="star", size="sm", fill="filled") }}

### Medium (1.2em) - Default
{{ icon(name="home") }} {{ icon(name="search") }} {{ icon(name="settings") }} {{ icon(name="favorite", fill="filled") }} {{ icon(name="star", fill="filled") }}

### Large (1.5em)
{{ icon(name="home", size="lg") }} {{ icon(name="search", size="lg") }} {{ icon(name="settings", size="lg") }} {{ icon(name="favorite", size="lg", fill="filled") }} {{ icon(name="star", size="lg", fill="filled") }}

### Extra Large (2em)
{{ icon(name="home", size="xl") }} {{ icon(name="search", size="xl") }} {{ icon(name="settings", size="xl") }} {{ icon(name="favorite", size="xl", fill="filled") }} {{ icon(name="star", size="xl", fill="filled") }}

## Weight Variations

### Light Weight
{{ icon(name="settings", weight="light") }} {{ icon(name="home", weight="light") }} {{ icon(name="favorite", weight="light", fill=true) }} {{ icon(name="star", weight="light", fill=true) }}

### Normal Weight (Default)
{{ icon(name="settings") }} {{ icon(name="home") }} {{ icon(name="favorite", fill=true) }} {{ icon(name="star", fill=true) }}

### Bold Weight
{{ icon(name="settings", weight="bold") }} {{ icon(name="home", weight="bold") }} {{ icon(name="favorite", weight="bold", fill=true) }} {{ icon(name="star", weight="bold", fill=true) }}

## Grade Variations (Stroke Thickness)

### Thin Grade
{{ icon(name="home", grade="thin") }} {{ icon(name="settings", grade="thin") }} {{ icon(name="favorite", grade="thin", fill=true) }} {{ icon(name="notifications", grade="thin") }}

### Normal Grade (Default)
{{ icon(name="home") }} {{ icon(name="settings") }} {{ icon(name="favorite", fill=true) }} {{ icon(name="notifications") }}

### Thick Grade
{{ icon(name="home", grade="thick") }} {{ icon(name="settings", grade="thick") }} {{ icon(name="favorite", grade="thick", fill=true) }} {{ icon(name="notifications", grade="thick") }}

## Complex Combinations

### Large, Bold, Thick, Filled
{{ icon(name="star", fill=true, size="lg", weight="bold", grade="thick") }} {{ icon(name="favorite", fill=true, size="lg", weight="bold", grade="thick") }} {{ icon(name="home", fill=true, size="lg", weight="bold", grade="thick") }}

### Small, Light, Thin, Outlined
{{ icon(name="star", size="sm", weight="light", grade="thin") }} {{ icon(name="favorite", size="sm", weight="light", grade="thin") }} {{ icon(name="home", size="sm", weight="light", grade="thin") }}

## Common Icon Categories

### Navigation
{{ icon(name="home") }} Home 
{{ icon(name="arrow_back") }} Back 
{{ icon(name="arrow_forward") }} Forward 
{{ icon(name="menu") }} Menu 
{{ icon(name="close") }} Close 
{{ icon(name="expand_more") }} Expand 
{{ icon(name="expand_less") }} Collapse

### Actions
{{ icon(name="add") }} Add 
{{ icon(name="remove") }} Remove 
{{ icon(name="edit") }} Edit 
{{ icon(name="delete") }} Delete 
{{ icon(name="save") }} Save 
{{ icon(name="download") }} Download 
{{ icon(name="upload") }} Upload 
{{ icon(name="share") }} Share

### Communication
{{ icon(name="email") }} Email 
{{ icon(name="phone") }} Phone 
{{ icon(name="chat") }} Chat 
{{ icon(name="notifications") }} Notifications 
{{ icon(name="notifications", fill=true) }} Active Notifications

### Media
{{ icon(name="play_arrow") }} Play 
{{ icon(name="pause") }} Pause 
{{ icon(name="stop") }} Stop 
{{ icon(name="skip_next") }} Next 
{{ icon(name="skip_previous") }} Previous 
{{ icon(name="volume_up") }} Volume Up 
{{ icon(name="volume_off") }} Mute

### Status & Feedback
{{ icon(name="check") }} Success 
{{ icon(name="error") }} Error 
{{ icon(name="warning") }} Warning 
{{ icon(name="info") }} Info 
{{ icon(name="help") }} Help 
{{ icon(name="star", fill=true) }} Favorite 
{{ icon(name="thumb_up") }} Like

### System
{{ icon(name="settings") }} Settings 
{{ icon(name="account_circle") }} Account 
{{ icon(name="search") }} Search 
{{ icon(name="filter_list") }} Filter 
{{ icon(name="sort") }} Sort 
{{ icon(name="visibility") }} Show 
{{ icon(name="visibility_off") }} Hide

## Shortcode Reference

The `icon` shortcode accepts these parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | String | Required | Material Icon name (e.g., "home", "search") |
| `fill` | Boolean | `false` | `true` for filled, `false` for outlined |
| `size` | String | `"md"` | Size: "xs", "sm", "md", "lg", "xl" |

### Examples

The icon shortcode renders as HTML spans with appropriate classes:

**Copy-paste friendly examples:**

```jinja2
{{# icon(name="home") }}
{{# icon(name="favorite", fill=true) }}
{{# icon(name="star", size="lg") }}
{{# icon(name="notifications", fill=true, size="xl") }}
```

*Note: Remove the spaces between the braces when copying.*

**Live examples:**

Basic icon: {{ icon(name="home") }}

Filled icon: {{ icon(name="favorite", fill=true) }}

Large icon: {{ icon(name="star", size="lg") }}

Large filled icon: {{ icon(name="notifications", fill=true, size="xl") }}

## Technical Details

- **Font**: Material Icons (self-hosted)
- **Format**: WOFF2 optimized for web
- **Variants**: Two separate fonts (Material Icons and Material Icons Outlined)
- **Fill Options**: `false` (outlined) or `true` (filled)
