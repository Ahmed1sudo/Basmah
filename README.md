# Basma — Women Future Cities Summit & Awards

Premium, RTL-first, multi-page event website built as a high-profile summit and awards platform.

## Included Deliverables

1. Design system implementation in code
- [`design-system.html`](./design-system.html)
- Global style tokens in [`assets/css/styles.css`](./assets/css/styles.css)

2. Full UI screens (desktop + mobile responsive)
- Home: [`index.html`](./index.html)
- About: [`about.html`](./about.html)
- Basma 1 Archive: [`archive.html`](./archive.html)
- Agenda: [`agenda.html`](./agenda.html)
- Speakers: [`speakers.html`](./speakers.html)
- Awards: [`awards.html`](./awards.html)
- Tickets: [`tickets.html`](./tickets.html)
- Sponsors: [`sponsors.html`](./sponsors.html)
- Gallery: [`gallery.html`](./gallery.html)
- Team: [`team.html`](./team.html)
- Contact: [`contact.html`](./contact.html)
- FAQ: [`faq.html`](./faq.html)

3. Front-end interactions
- Smooth scrolling
- Reveal animations
- Animated counters
- Agenda filtering
- Speaker modal
- Ticket tier selection highlight
- Sponsor carousel
- Gallery lightbox
- FAQ accordion

4. Figma-ready handoff
- Token file: [`figma/tokens.json`](./figma/tokens.json)
- Screen/spec guide: [`figma/README.md`](./figma/README.md)

5. Components breakdown
- [`COMPONENTS.md`](./COMPONENTS.md)

## Accessibility and SEO

- RTL support by default (`dir="rtl"`)
- Keyboard focus states and skip link
- Reduced-motion support
- Semantic landmarks and heading structure
- OpenGraph tags and JSON-LD (`Event` + `Organization`) on home page

## Run Locally

Because this is clean HTML/CSS/JS, open `index.html` directly or run a lightweight local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
