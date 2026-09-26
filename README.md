# fullstackopen-part14
Next.js


App [bloglist-app](https://fullstackopen-part14.vercel.app/) is running in Vercel.


## Development

```bash
cd blog-app
npm install
npm run dev
```

Requires `blog-app/.env.local`:

```bash
DATABASE_URL="..."
AUTH_SECRET=...
AUTH_TRUST_HOST=true
```

## E2E tests

Tests are from [next-js-tests](https://github.com/fullstack-hy2020/next-js-tests) and run with Playwright.

**The tests empty the database before each test**, so they use a separate test database in `blog-app/.env.test` (not `.env.local` as in the course README):

```bash
DATABASE_URL="..."
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

```bash
cd blog-app
NODE_ENV=test npx drizzle-kit migrate
npm run test:e2e
```

Playwright starts its own dev server, so port 3000 must be free. The tests are also run in GitHub Actions (`.github/workflows/playwright.yml`) using repository secrets.