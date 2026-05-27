<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# RoyalHorse Equestrian Club Platform Guidelines

## 1. Project Overview & Branching
- **Current branch:** `main` (tracks `origin/main` on GitHub).
- **Core Stack:** Next.js, React, Tailwind CSS, TypeScript, PostgreSQL (queried via `@/lib/db`).

## 2. Brand Identity & Design System
- **Theme Palette:**
  - Cream/Champagne Sand: `#E8D1A7` (main highlights, light backgrounds, header).
  - Dark Brown: `#442D1C` (primary branding text, premium buttons font color).
  - Accent Gold/Brown: `#84592B` (borders, branding highlights, light opacities).
  - Light Sand Theme (Admin): Light gray/white layout with clean shadows and elegant border tints.

## 3. Styling Guidelines
- **Buttons (Selected & Active States in Admin):**
  - **Do NOT use solid dark brown** for active buttons, language switchers, or filter tabs in the admin panel.
  - **Always use the light sand theme:** `bg-[#E8D1A7] text-[#442D1C] border border-[#84592B]/25 font-bold` (or `/35` for borders) for premium visibility.
- **Branding Logos:**
  - The horse logo is located at `/images/horse_logo.png`.
  - On the articles page, render the horse logo directly next to the author text (without circular container wrappers or backgrounds) styled with `w-12 h-12 object-contain`.

## 4. Multi-language Support
- Localization uses `lang` state from `LanguageContext` switcher.
  - Languages supported: `bg` (Bulgarian), `ru` (Russian), `en` (English).
  - Translation tokens are loaded from `@/lib/translations.ts`.
