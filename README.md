# FlexPulse - Fitness & Gym Management Platform

FlexPulse is a full-stack fitness platform for members, trainers, and admins.
Members can discover classes, book sessions, save favorites, and join forum discussions. Trainers can create/manage classes and publish forum posts. Admins moderate users, classes, trainer applications, transactions, and community content.

## Live URL

- Client: https://flex-pulse-fitness-gym.vercel.app

## Project Purpose

- Provide a role-based gym management platform with a modern UX.
- Support real booking flow with Stripe payment.
- Enable a trainer and admin moderation workflow.
- Build an active fitness community through public forum content and private engagement.

## Main Features

- Better Auth based authentication with email/password and Google.
- Role-based dashboard for member, trainer, and admin.
- Protected private routes for class/forum details and dashboard pages.
- Class discovery with search by class name and category filter.
- Server-side pagination for All Classes and Community Forum pages.
- Public listing shows approved classes/posts only.
- Stripe checkout integration and transaction history view.
- Trainer application flow with admin approve/reject + feedback.
- Admin user moderation (block/unblock) and role updates.
- Forum interactions: like/dislike, comments, replies, edit/delete own comments.
- Favorites and bookings for members.
- Global loading state and custom 404 page.
- Fully responsive design across mobile, tablet, and desktop.

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS, HeroUI, Framer Motion
- Backend: Node.js, Express, MongoDB
- Auth: Better Auth + JWT
- Payment: Stripe

## Environment Variables

### Client (`flex_pulse/.env`)

- `NEXT_PUBLIC_SERVER_URL`
- `MONGODB_URI`
- `MONGODB_DATABASE_NAME`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`

### Server (`flex_pulse_backend/.env`)

- `PORT`
- `MONGODB_URI`
- `NEXT_CLIENT_URL`

## Run Locally

### Client

```bash
cd flex_pulse
npm install
npm run dev
```

### Server

```bash
cd flex_pulse_backend
npm install
npm run dev
```

## NPM Packages Used

### Client

- next
- react
- react-dom
- better-auth
- @better-auth/mongo-adapter
- mongodb
- @heroui/react
- framer-motion
- stripe
- recharts
- react-icons
- styled-components
- swiper
- lottie-react

### Server

- express
- cors
- dotenv
- mongodb
- jose-cjs

## Deployment Checklist

- Use environment variables for all secrets and credentials.
- Ensure backend CORS allows only trusted origins.
- Ensure API routes do not return 404/504 in production.
- Verify private routes are reload-safe for authenticated users.
- Verify all dynamic routes render without runtime errors.
