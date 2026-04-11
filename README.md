# Basma Figma Handoff (Ready-to-Build)

This folder provides a Figma-ready handoff package for the **Basma — Women Future Cities Summit & Awards** website.

## 1) Import Tokens

1. Open Figma + Tokens Studio plugin.
2. Import [`tokens.json`](./tokens.json).
3. Apply `global` + `semantic` sets.
4. Use RTL frame direction for Arabic layouts.

## 2) File Structure (Desktop + Mobile)

Create pages in Figma:

1. `00 Foundations`
2. `01 Components`
3. `02 Desktop Screens`
4. `03 Mobile Screens`
5. `04 Prototype Flows`

## 3) Required Screen Frames

Desktop frame size: **1440 x Auto**
Mobile frame size: **390 x Auto**

Create both desktop and mobile for each:

1. Home
2. About Basma
3. Basma 1 Archive
4. Agenda / Sessions
5. Speakers
6. Awards
7. Tickets
8. Sponsors
9. Gallery / Media
10. Team / Organization
11. Contact
12. FAQ

## 4) Components to Build in `01 Components`

1. Navigation (sticky desktop + mobile overlay)
2. Buttons: Primary / Secondary / Ghost
3. Cards: Speaker / Award / Ticket / Session / Partner
4. Tabs / Filter chips (agenda)
5. Modal (speaker details)
6. Carousel (sponsor logos)
7. Gallery lightbox
8. Footer (3-column + meta row)

## 5) Layout Rules

1. 12-column desktop grid, 24px gutters, 96px outer margins.
2. 4-column mobile grid, 16px gutters, 20px margins.
3. Vertical rhythm 64px-144px between major sections.
4. Use generous white space to preserve luxury pacing.

## 6) Motion Specs

1. Section reveal: 600ms, ease-out, 20px translateY.
2. Counter animation: ~1400ms cubic ease.
3. Carousel auto-advance: 3.5s interval.
4. Hover lift on cards: translateY(-4px) + subtle shadow.
5. Respect reduced-motion variant in prototype.

## 7) Accessibility Rules

1. Minimum contrast target: WCAG AA.
2. Focus ring token: teal accent stroke.
3. Keyboard traversable interactive components.
4. Every image should have alt-text in handoff notes.

## 8) Content Tone

Use premium, modern, future-facing language with emotional confidence.
Avoid generic conference language and avoid clichés.
