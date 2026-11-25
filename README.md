# ALK Hospitality & Development: website

Two pages, in English, French and Arabic (EN / FR / عربي buttons in the header; the choice is remembered).

- `index.html`: home. Who we are, the story of chef Mohammad Elkhaldy, services, how to work with us. Hand-drawn table animation (zaatar, olives, hummus, koshari, baladi bread, mint tea).
- `map.html`: the world map with every place we work with, and the "Add your restaurant" flow (details, $1,000 USD file-opening fee, visit booking).
- `site.js`: all texts (EN / FR / AR), settings and the list of places.
- `site.css`: shared styles.

## Map colours

| Status | Colour / shape | Meaning |
|---|---|---|
| `done` | red, solid dot | project completed |
| `progress` | gold, ring with centre | visit done, project in progress |
| `open` | steel, dashed ring | $1,000 USD file-opening fee paid, visit to come |
| `own` | ivory diamond | our own houses (Jouri, Les Secrets, 80%) |
| `confirm:true` | grey dot | status still to confirm: shown as "Status to confirm", not counted as completed |

To add a restaurant, add a line to `PLACES` in `site.js`: name, `lat` / `lng` (from Google Maps), area, type and status. The map is a world map (Natural Earth outlines, loaded with d3 from cdn.jsdelivr.net). It opens on the whole planet, then zooms onto Egypt. Points that are too close together are grouped; clicking a group zooms in. Zoom with the + / − buttons, a trackpad pinch, Ctrl/⌘ + scroll, or two fingers on a phone. To highlight a new country, add its ISO numeric code to `HAS_PLACES` in `map.html`.

## Before going live

1. Sign-ups: create a form endpoint that accepts JSON (for example Formspree) and paste it in `SETTINGS.FORM_ENDPOINT`. Each file is sent twice: once with the details (`stage: "file"`) and once with the visit (`stage: "visit"`). Each has a reference like `ALK-7Q2XK`, shown to the client on the fee step, to match the Revolut payment.
2. Revolut Business: create a Merchant account, then a Payment Link for 1,000 USD. Paste it in `SETTINGS.REVOLUT_PAYMENT_LINK`.
3. Booking (optional): paste a Calendly or Google Calendar booking page in `SETTINGS.CALENDAR_LINK`. Without it, the client picks a date and time on the site.
4. Confirm the status and the work done for the 7 Cairo places, then remove `confirm:true` (they turn red), and add the addresses of Jouri, Les Secrets and 80% (`noPin:true`).
5. Have the story checked by Mohammad Elkhaldy.

Until 1 and 2 are both set, the join flow runs in a clearly labelled demo mode: nothing is paid or sent, and the demo point is only shown in that browser. Once live, payments are not checked by the site: confirm each one in Revolut, then add the restaurant to `PLACES` with status `open`.

The public page displays a $1,000 USD file-opening fee. The form endpoint and payment link are currently blank, so no payments are collected by this static site.

## Team demo access

`login.html` provides local demonstration dashboards for three roles:

- administrator: objectives and rewards
- restaurant manager: restaurant updates
- accountant: manual payment tracking

The demo credentials are listed on the login page and are intentionally public.

**Security limitation:** this static implementation does not provide real authentication or protected data. Do not store customer, bank or payment secrets in browser local storage. Before public use, replace it with a hosted authentication provider and a server/database for role-based access, objectives, publications and payment records.
