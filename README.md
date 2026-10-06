# Responsive Navbar

A reusable navbar component, shown in context on a demo page with a few
placeholder sections — so you can actually see the mobile menu, scroll
shadow, and scroll-spy behavior working, not just the markup in isolation.

## File structure

```
navbar/
├── index.html          # demo page — navbar + placeholder sections
├── css/
│   └── styles.css        # navbar styles, mobile breakpoint, demo content styling
├── js/
│   └── app.js               # mobile toggle, scroll shadow, dropdown, scroll-spy
├── assets/
│   └── favicon.svg
└── README.md
```

## How it's built

- **One breakpoint (860px)** decides everything: below it, the desktop
  `<nav>` and CTA button are hidden and the hamburger toggle shows up
  instead; above it, the reverse. No JavaScript decides layout — it's all
  a single `@media (min-width: 860px)` block in the CSS.
- **The hamburger-to-X animation** is three `<span>` bars whose
  `transform` changes when `.navbar__toggle` gets an `is-open` class —
  no separate icon swap needed.
- **The mobile menu** expands via `max-height` transitioning from `0` to
  a fixed value, which is what makes the slide-down animation possible
  with plain CSS (you can't transition `height: auto`).
- **The "Services" dropdown** is click-to-open (not hover-only), closes
  on an outside click, on `Escape`, or after clicking a link inside it —
  all deliberate choices for touch and keyboard accessibility, since
  hover-only dropdowns don't work on mobile at all.
- **Scroll-spy** uses `IntersectionObserver` rather than manually
  comparing `scrollY` against each section's offset — the
  `rootMargin: "-40% 0px -55% 0px"` effectively shrinks the observed
  viewport to a thin band near the vertical center, so a section is
  marked active once it's genuinely the one in focus, not just barely
  visible at the very edge of the screen.
- **The scroll shadow** toggles a single class once `window.scrollY > 4`
  — simple, but enough to give the navbar some depth once the page isn't
  at the very top.

## To reuse this navbar elsewhere

Copy the `<header class="navbar">...</header>` block, the navbar-related
CSS rules, and `js/app.js` into your project. The `data-section`
attributes and matching section `id`s are what scroll-spy depends on —
keep those in sync if you change the link labels or section order.

## Running it

Just open `index.html` directly in a browser — no server needed.

## Deploying it

Fully static — no API key, no functions. Same `netlify init` /
`netlify deploy --prod` flow as the other static projects.

## Ideas to extend it

- Keyboard arrow-key navigation within the open dropdown menu
- A second-level nested dropdown (submenu within a submenu)
- Dark mode toggle built into the navbar itself
- Auto-closing the mobile menu if the viewport is resized past the
  breakpoint while it's open