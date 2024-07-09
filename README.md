[![codecov](https://codecov.io/github/basdnguyen/petbook/graph/badge.svg?token=A0LEUZIB1O)](https://codecov.io/github/basdnguyen/petbook)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and deployed to Vercel.

## Technical Stacks
### Frontend
* React + SSR with NextJS
* MaterialUI for UI design system
* TailwindCSS for some CSS usecases that MaterialUI cannot satisfy
* No special state management except React Context is used currently since the app state is not yet complicated enough, will move to Jotai Atom if need be

#### Backend
* REST APIs are handled by NextJS API Routes for now, but will move to NestJS later

#### Database
* A Postgres Database is provided by Vercel
* Primsa ORM is used to easily interact with the database

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication
A guest account has been created for guests who don't want to sign up, the guest email and password will be prefilled in the login form
