This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1. Duplicate `.env.example`, supply PlanetScale and NextAuth credentials, then run `npm run check:vercel-env` to confirm required secrets are present.
2. Connect the repository to [Vercel](https://vercel.com/import), link the project (Hobby plan, region `fra1`), and keep the default Next.js build command (`npm run build`).
3. Add the environment variables from your `.env` file to the Vercel project using `vercel env add` (the detailed steps live in the deployment guide CLI reference).
4. Run `npx prisma migrate deploy --schema=prisma/schema.prisma` against the production database before the first deploy and re-run when schema changes.

Refer to [`docs/deployment/vercel.md`](docs/deployment/vercel.md) for the end-to-end rollout flow and [`docs/operations/vercel-rollback.md`](docs/operations/vercel-rollback.md) for manual rollback instructions.