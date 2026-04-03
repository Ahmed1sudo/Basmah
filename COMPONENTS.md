# Basma Components Breakdown

## Core Layout

1. `top-nav`
- Sticky blurred navigation with active link state.
- Mobile toggle with collapsible menu.

2. `container`
- Max-width content wrapper for premium spacing rhythm.

3. `section` / `section-tight`
- Reusable vertical spacing blocks for story pacing.

## Interactive Components

1. `speaker-card` + speaker modal
- Click/keyboard opens detailed modal from data attributes.
- Reused in Home and Speakers pages.

2. `filter-chip`
- Agenda filtering with active state and session visibility toggling.

3. `ticket-card`
- Selectable pricing cards with visual highlight and keyboard support.

4. Sponsor carousel
- Horizontal track with prev/next controls and auto-scroll.
- Pauses on hover and respects reduced motion.

5. Gallery lightbox
- Opens selected image and caption in overlay.
- Escape key and backdrop close support.

6. FAQ accordion
- Expand/collapse behavior with `aria-expanded`.

## Visual Components

1. Buttons
- `btn-primary`: Gold premium CTA.
- `btn-secondary`: Teal strategic CTA.
- `btn-ghost`: Subtle supporting action.

2. Cards
- `speaker-card`, `award-card`, `ticket-card`, `session-card`, `partner-card`, `highlight-card`.
- Shared border, depth, and hover motion language.

3. Metrics
- Counter-based impact cards for credibility storytelling.

4. Footer
- 3-column information block + legal/meta row.

## Accessibility Contracts

1. Keyboard support for cards used as buttons.
2. Focus-visible styles on all interactive controls.
3. Skip link to main content.
4. Reduced-motion handling for all major animations.

## Reuse Map

1. Global styles: `assets/css/styles.css`
2. Global behaviors: `assets/js/site.js`
3. Page templates: individual HTML files with shared header/footer injection.
