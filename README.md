I now have all the information needed to write the README.

# FeedIndia Healthcare & Consultancy

## Overview

FeedIndia Healthcare & Consultancy is a production-ready, single-page marketing website built with Next.js 14 (App Router). It serves as the digital presence for India's leading healthcare consultancy firm, offering NABH accreditation guidance, hospital licensing, medical equipment procurement, healthcare recruitment, medical tourism facilitation, and a broad range of ancillary advisory services. The site is fully responsive, supports dark mode, and is optimised for SEO and Core Web Vitals.

## Features

- **Hero section** — Full-viewport dark-teal gradient hero with animated blob backgrounds, particle dots, floating glassmorphic achievement cards, a priority-loaded doctor image, and three CTA buttons (Book Free Consultation, Explore Services, Chat on WhatsApp).
- **Stats strip** — Animated counter cards surfacing key social-proof numbers (15+ years, 500+ projects, 1 000+ doctors, 200+ hospitals, 98% success rate).
- **About section** — Company story, values, and key differentiators.
- **Services section** — Grid of all 12 service cards (Hospital Consultancy, NABH Accreditation, Hospital Licensing, Medical Equipment Procurement, Healthcare Recruitment, Medical Tourism, Hospital Management, Digital Healthcare, Business Strategy, Government Projects, NGO Consultancy, Startup Advisory) with features list per service.
- **Process section** — Six-step visual workflow (Initial Consultation → Strategic Planning → Documentation → Approvals → Execution → Post-Project Support).
- **Industries section** — Cards for six target verticals (Hospitals, Clinics & Polyclinics, Diagnostic Centers, NGOs & Trusts, Healthcare Startups, Medical Colleges).
- **Testimonials section** — Six client testimonials with star ratings, names, roles, and company details.
- **Team section** — Six leadership profiles with headshots, roles, bios, and specialisations.
- **Gallery section** — Nine filterable gallery items across Consultancy, Hospital, Team, Accreditation, Technology, Office, Government, Recruitment, and Procurement categories.
- **FAQ section** — Ten accordion-style questions covering NABH, licensing, costs, recruitment, telemedicine, and international services.
- **Blog section** — Six article cards with category badges, read-time estimates, author names, and slugs.
- **Contact section** — Dual-tab panel combining a validated contact form (name, email, phone, organisation, service, message) and an appointment booking form (adds preferred date and time-slot picker); inline Zod validation; toast notifications via Sonner; office address, phone, email, WhatsApp link, working hours, five social-media links, and a Google Maps deep-link.
- **Sticky navbar** — Transparent-to-frosted-glass on scroll, scroll-progress indicator bar, animated dark-mode toggle, mega-dropdown for Services with 12 child links, animated hamburger mobile menu.
- **Floating action buttons** — Persistent WhatsApp and phone call buttons with pulse rings and tooltip labels.
- **Back-to-top button** — Appears after scrolling 400 px; smooth scroll to top.
- **Loading screen** — Full-screen branded splash shown on first load.
- **Scroll progress bar** — Thin teal gradient bar at the very top of the viewport tracking reading progress.
- **Lenis smooth scroll** — Butter-smooth inertia scrolling via `@studio-freight/lenis`.
- **Dark mode** — Full light/dark theming powered by `next-themes`; CSS custom properties for every colour token.
- **SEO metadata** — Per-page `<title>`, `<meta description>`, keywords, OpenGraph (title, description, image, locale `en_IN`, url), Twitter Card, and `<Viewport>` configuration including `themeColor` for light and dark schemes.
- **Accessibility** — ARIA labels, `role` attributes, `aria-expanded`/`aria-haspopup` on interactive controls, `focus-visible` ring styles, `useReducedMotion` guard on heavy animations, `sr-only` current-page indicators.
- **Form validation** — `react-hook-form` + `@hookform/resolvers/zod` with three typed Zod schemas (contact, appointment, newsletter).
- **TypeScript** — Strict types for all data models (Service, TeamMember, Testimonial, BlogPost, FAQ, GalleryItem, Stat, ProcessStep, Industry, NavItem, Theme).

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Animation | Framer Motion | 11.x |
| Smooth scroll | @studio-freight/lenis | latest |
| Icons | lucide-react | latest |
| Forms | react-hook-form | 7.x |
| Validation | Zod + @hookform/resolvers | 3.x |
| Toasts | Sonner | latest |
| Theme | next-themes | latest |
| Fonts | next/font/google — Inter, Bricolage Grotesque | — |
| Utility | clsx + tailwind-merge | latest |
| Runtime | Node.js | 18+ |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other available scripts:

```bash
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
```

## Project Structure

```
/
├── app/
│   ├── globals.css          # Tailwind directives + CSS custom properties (light & dark tokens)
│   ├── layout.tsx           # Root layout — ThemeProvider, LenisProvider, Navbar, Footer, Toaster
│   ├── loading.tsx          # Route-level loading UI
│   ├── not-found.tsx        # 404 page
│   └── page.tsx             # Home page — assembles all 12 page sections
│
├── components/
│   ├── common/
│   │   ├── BackToTop.tsx        # Scroll-to-top FAB
│   │   ├── FloatingButtons.tsx  # Persistent WhatsApp + phone CTAs
│   │   ├── LoadingScreen.tsx    # Full-screen branded splash
│   │   ├── LenisProvider.tsx    # Lenis smooth-scroll context (SSR-safe, dynamically imported)
│   │   ├── ScrollProgress.tsx   # Reading-progress bar (SSR-safe, dynamically imported)
│   │   └── SearchModal.tsx      # Search overlay
│   ├── layout/
│   │   ├── Footer.tsx           # Site footer with nav links and contact info
│   │   ├── Navbar.tsx           # Sticky navbar with mega-menu and mobile drawer
│   │   └── ThemeProvider.tsx    # next-themes wrapper
│   ├── sections/
│   │   └── IndustriesSection.tsx
│   └── index.ts             # Barrel export
│
├── sections/                # Page section components (used directly in app/page.tsx)
│   ├── AboutSection.tsx
│   ├── BlogSection.tsx
│   ├── ContactSection.tsx
│   ├── HeroSection.tsx
│   ├── ProcessSection.tsx
│   ├── ServicesSection.tsx
│   ├── TeamSection.tsx
│   └── TestimonialsSection.tsx
│   # (StatsSection, GallerySection, FAQSection also referenced from app/page.tsx)
│
├── constants/
│   └── index.ts             # All static data: SERVICES, TEAM_MEMBERS, TESTIMONIALS,
│                            #   BLOG_POSTS, FAQS, GALLERY_ITEMS, STATS, PROCESS_STEPS,
│                            #   INDUSTRIES, NAV_ITEMS, CONTACT_INFO, SOCIAL_LINKS
│
├── lib/
│   ├── utils.ts             # cn(), formatDate(), truncateText(), generateSlug(),
│   │                        #   getInitials(), formatPhoneNumber(), scrollToSection()
│   └── validations.ts       # Zod schemas: contactSchema, appointmentSchema, newsletterSchema
│
├── types/
│   └── index.ts             # TypeScript interfaces for all domain models
│
├── public/
│   └── og-image.jpg         # OpenGraph / Twitter Card share image (1200 × 630)
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Environment Variables

No environment variables are required for the default static build. If you integrate a backend API or third-party services, create a `.env.local` file at the project root:

```bash
# Example — add only variables you actually use

# Contact / appointment form API endpoint (if replacing the mock setTimeout handler)
NEXT_PUBLIC_API_URL=https://api.yourbackend.com

# Google Maps Embed API key (optional — current implementation uses a deep-link, not an embedded map)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Analytics (e.g. Google Analytics measurement ID)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser bundle. Never prefix secret keys with `NEXT_PUBLIC_`.

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — leave the build and output settings at their defaults:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
   - **Install command**: `npm install`
4. Add any environment variables from the section above in the Vercel dashboard under **Settings → Environment Variables**.
5. Click **Deploy**.

Subsequent pushes to the default branch trigger automatic redeployments.

### Custom domain

In the Vercel dashboard, go to **Settings → Domains** and add `feedindiahealthcare.com`. Update your DNS provider's records as instructed by Vercel (typically an `A` record pointing to `76.76.21.21` and a `CNAME` for `www`).

### Self-hosted (Node.js server)

```bash
npm run build
npm run start        # Starts on port 3000 by default
```

Use a reverse proxy (nginx or Caddy) in front of Node and configure TLS with Let's Encrypt.

### Docker (optional)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json .
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance

Target Lighthouse scores on a production Vercel deployment:

| Metric | Score |
|---|---|
| Performance | 95 – 100 |
| Accessibility | 95 – 100 |
| Best Practices | 100 |
| SEO | 100 |

Key optimisations that contribute to these scores:

- `next/image` with `priority` on the above-the-fold hero image, explicit `sizes`, and automatic WebP/AVIF conversion.
- Google Fonts loaded via `next/font` with `display: swap` and subsets limited to `latin`, eliminating render-blocking font requests.
- `LenisProvider` and `ScrollProgress` are dynamically imported with `{ ssr: false }` to keep the server bundle lean and avoid hydration mismatches.
- `useReducedMotion` from Framer Motion respects the OS accessibility preference and disables heavy animations where requested.
- All Framer Motion animations use `will-change: transform, opacity` only on actively animating elements.
- Tailwind CSS PurgeCSS removes unused styles at build time, keeping the CSS payload minimal.
- Static data (services, team, blog posts, etc.) lives in `constants/index.ts` and is compiled into the JS bundle — no runtime data-fetching waterfalls on the home page.

## License

MIT
