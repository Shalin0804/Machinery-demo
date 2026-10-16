# Paliwal Machinery — website redesign concept

A **concept demo** prepared by Codefloor IT as a proposed redesign of https://paliwalmachinery.com/.
It is not the official website and has not been commissioned or approved by Paliwal Machinery.

React 19 · Vite · Tailwind CSS v4 · Framer Motion · React Router · Lucide icons. Frontend only.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # serve dist/ on http://localhost:4173
npm run lint      # oxlint
npm run check     # quote-form validation self-check
```

## Where content lives

| What | File |
| --- | --- |
| Company details, demo toggle, nav | `src/data/site.js` |
| Categories, featured product | `src/data/catalog.js` |
| 42 products (from the live site's product API) | `src/data/products.generated.js` |
| Images, alt text, licences | `src/data/images.js` (+ `public/images/`) |
| Quote form validation / submission | `src/lib/inquiry.js` |

## Going live checklist

- Set `SHOW_DEMO_DISCLOSURE = false` in `src/data/site.js` (removes every demo notice).
- Remove `<meta name="robots" content="noindex, nofollow">` in `index.html`; add a canonical URL and `og:image` for the real domain.
- Replace every illustrative photo with Paliwal Machinery's own photos (the live site's product images
  currently fail to load: its Firebase storage returns HTTP 402). Then drop the "Illustrative image" tags.
- Wire `submitInquiry()` in `src/lib/inquiry.js` to a real endpoint and replace the demo confirmation copy.
- Confirm with the company: WhatsApp number, privacy wording, capacity figures, project counts
  (the live site states both "900+" and "800+" projects, so no figures are shown here).

## Verified vs. not verified

Verified from the live site (2026-10-16): company name, Bilaspur address, email, both phone numbers,
about/description text, the four categories, all product names/descriptions/features and brands
(Fowler Westrup, Mill Master, Induss, Rakho Boilers).

Not used because unverifiable or inconsistent: project counts, impact statistics, "largest supplier"
claims, testimonials, certifications, client names.

## Hosting

It's a single-page app: deep links like `/products/huskon` need an index.html fallback.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) are included.
