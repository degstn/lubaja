# Lehigh Baja website

The website for Lehigh University's Baja SAE team, at [lehighbaja.org](https://lehighbaja.org).

It's built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com) and hosted on [Vercel](https://vercel.com). Every page is static: there's no database, no logins, and no forms, so the site keeps running on its own. Most updates are edits to a few data files in `lib/`.

## Run it locally

You need [Node.js](https://nodejs.org) 20.9 or newer.

```bash
npm install   # first time only
npm run dev
```

Then open [http://localhost:6767](http://localhost:6767). The page updates as you save files.

**Testing on your phone:** put your phone on the same Wi-Fi and open `http://<your computer's IP>:6767`. During development, Next.js blocks the site's scripts when it's opened from another address, so first add your computer's IP to `allowedDevOrigins` in `next.config.ts`. On a Mac, `ipconfig getifaddr en0` prints the IP.

## Before you push

```bash
npm run lint
npx tsc --noEmit
npm run build
```

If all three pass, the site will build on Vercel too.

## Deploying

Vercel builds the site from this GitHub repo. Pushing to `main` updates the live site in a minute or two. Pushing any other branch gets you a preview link, which is a good way to show changes before they go live.

## What's where

```
app/          One folder per page (team, car, competitions, gallery, contact, sponsor).
              app/page.tsx is the homepage, app/layout.tsx wraps every page, and
              app/globals.css has the colors, fonts, and animations.
components/   Pieces used across pages: header, footer, intro animation, course maps.
lib/          The site's content. See "Updating content".
assets/       Photos and logos the pages use: team leads, gallery, sponsors.
public/       Files served as-is, like the sponsorship guide PDF and app icons.
scripts/      npm run logo rebuilds the favicon, app icons, and lib/logo-paths.ts
              from public/lubajalogov1.svg.
```

## Updating content

Most of the site is generated from lists in `lib/`. To add something, copy an existing entry and edit it.

| To update | Edit |
| --- | --- |
| Email, social links, donate link, tagline, season | `site` in `lib/site.ts` |
| Navigation menu | `nav` in `lib/site.ts` |
| Crowdfunding bar | `campaign` in `lib/site.ts`. It hides itself after `endsAt`. |
| Team leads | `leads` in `lib/content.ts`, photos in `assets/leads/` |
| Races | `competitions` in `lib/content.ts`, newest first |
| Cars | `cars` in `lib/content.ts`, newest first. The first one is the car on the CC11 page. |
| Sponsors | `sponsors` in `lib/sponsors.ts`, logos in `assets/sponsors/` |
| Gallery | `albums` in `lib/gallery.ts`, photos in `assets/gallery/` |

**Photos and logos** are imported at the top of the file, then used in an entry:

```ts
import jamesKimble from "@/assets/leads/james-kimble.jpg";
// ...
{ name: "James Kimble", roles: ["Team Captain"], linkedin: "https://...", photo: jamesKimble },
```

Next.js resizes images for you, so full-size photos are fine.

**Sponsors** need either a `logo` or, if there's no logo file, a `wordmark` (their name set in type). Add `dark: true` for logos meant for a black background, and a `url` to link the tile to their site.

**Gallery albums** are grouped by race, and each album's `competition` has to match a race `name` in `lib/content.ts`. That's where the album gets its dates.

### New season checklist

- Update `leads`, and add the new car to the top of `cars`.
- Change `season` in `lib/site.ts`.
- Search the project for last year (for example `2026`) to catch labels like "2026 season sponsors" and "2026–27 team leads".
- Update `campaign` in `lib/site.ts` if there's a crowdfunding campaign.

## Good to know

- **Colors** live in two places: `app/globals.css` for the site, and `colors` in `lib/site.ts` for the share image and the browser's theme color. Keep them in sync.
- **Fonts:** Saira for headlines, Geist for body text, Chakra Petch for small labels. They're set up in `app/layout.tsx`.
- **Course maps** on the Competitions page are outlines stored in `lib/tracks.ts`, traced from official event maps and the team's own drawing of the testing grounds. A race shows one when its entry has a `track`, like `track: "hogbackHill"`. Without one, the card says "Course map coming soon".
- **Old links** from the previous WordPress site redirect to the right pages. The redirects are in `next.config.ts`.
- **Upgrades:** nothing has to be updated to keep the site online. Every few years Vercel drops support for old Node.js versions, and new deploys fail until Node and Next.js are updated. The Next.js upgrade guides cover it.
- This project uses Next.js 16, which differs from many older tutorials. Its docs come with it in `node_modules/next/dist/docs/`.
