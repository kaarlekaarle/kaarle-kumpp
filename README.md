# Kaarle & Kumpp. Portfolio

A minimalist portfolio website built with Next.js, TypeScript, and TailwindCSS.

## Project Goals

- **Minimalist Design**: Large whitespace, clean typography, blue accent links
- **Interactive Works Page**: Fields ⇄ Clients mapping with hover connections (SVG lines)
- **Client Detail Pages**: Keyboard-accessible image carousels with summaries
- **About Page**: Bio, contact info, and CV download
- **Accessibility**: Semantic HTML, keyboard navigation, focus states

## Routes

- `/` - Intro hub with problem-solving messaging
- `/works` - Interactive "Fields ⇄ Clients" mapping
- `/works/[slug]` - Client detail pages with image carousels
- `/about` - Bio, contact information, and CV download

## Design Tokens

- **Paper**: `#F4F4F4` (light background)
- **Ink**: `#111111` (dark text)
- **Accent**: `#1F37FF` (blue links)

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- TailwindCSS
- next/image for optimization

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Next Steps

1. **Data Structure** - TypeScript interfaces + JSON for many-to-many field-client relationships
2. **Works MVP** - Two-column layout with hover connections
3. **Carousel MVP** - Client detail pages with keyboard navigation
4. **Polish** - Real content, responsive refinements, deploy

## Deploy

Ready for Vercel deployment with static site generation (SSG).
