# Portfolio

Cyber-terminal inspired developer portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Overview

This project is my personal portfolio website showcasing:

- Interactive hero and UI effects
- Skills and experience timeline
- Project cards with video previews and modal playback
- Contact form with server-side email sending via SMTP

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Framer Motion
- Nodemailer (for contact form email delivery)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the root:

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password
SMTP_FROM=you@domain.com
SMTP_TO=you@domain.com
```

Notes:

- `SMTP_FROM` and `SMTP_TO` are optional; they default to `SMTP_USER` when not set.
- Use port `465` for secure SMTP (SSL), or `587` for STARTTLS.

### 3) Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start local development server (Turbopack)
- `npm run build` - Create production build
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

## Project Structure

- `src/app` - App Router pages and API routes
- `src/components` - Reusable and section UI components
- `src/data` - Portfolio content data (skills, projects, timeline)
- `public/images/projects` - Project media assets (videos/images)

## Updating Project Videos

Project media is configured in `src/data/portfolio.ts` via each project's `video` path.

Example:

```ts
video: "/images/projects/abide/abide-demo.mp4"
```

Recommended media folder convention:

- `public/images/projects/<project-slug>/<file>.mp4`

## Deployment

This app can be deployed on Vercel or any Node.js host that supports Next.js.

For production contact form support, make sure all SMTP environment variables are set on the hosting platform.
