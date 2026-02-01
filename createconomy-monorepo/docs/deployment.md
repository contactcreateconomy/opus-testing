# Deployment Guide

## Overview

Each app is deployed as a separate Vercel project, sharing a single Convex backend deployment.

## Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Convex production deployment
- Domain names configured

## Convex Production Setup

### 1. Create Production Deployment

```bash
cd packages/convex
npx convex deploy --prod
```

### 2. Configure Environment Variables

In the Convex dashboard, set:

- `AUTH_GITHUB_ID` - GitHub OAuth client ID
- `AUTH_GITHUB_SECRET` - GitHub OAuth client secret
- `AUTH_GOOGLE_ID` - Google OAuth client ID
- `AUTH_GOOGLE_SECRET` - Google OAuth client secret

### 3. Get Production URL

Note your production Convex URL:
```
https://your-project.convex.cloud
```

## Vercel Deployment

### Per-App Configuration

For each app, create a Vercel project:

#### 1. Import Project

- Select "Import Git Repository"
- Choose the monorepo
- Set **Root Directory** to `apps/<app-name>`

#### 2. Build Settings

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `cd ../.. && pnpm turbo run build --filter=@apps/<app-name>` |
| Output Directory | `.next` |
| Install Command | `cd ../.. && pnpm install` |

#### 3. Environment Variables

Set for each app:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOYMENT=prod:your-project
```

### Domain Configuration

| App | Domain |
|-----|--------|
| Marketplace | createconomy.com |
| Forum | discuss.createconomy.com |
| Admin | console.createconomy.com |
| Seller | seller.createconomy.com |

Configure DNS:
- Add A/CNAME records pointing to Vercel
- Add domains in Vercel project settings
- Enable SSL (automatic with Vercel)

## Cross-Domain Authentication

### Cookie Configuration

For SSO across subdomains, configure cookie domain in Convex auth:

```typescript
// packages/convex/convex/auth.config.ts
export default {
  providers: [...],
  session: {
    cookie: {
      domain: ".createconomy.com", // Note the leading dot
      secure: true,
      sameSite: "lax",
    },
  },
};
```

### CORS Configuration

In Convex dashboard, add allowed origins:
- `https://createconomy.com`
- `https://discuss.createconomy.com`
- `https://console.createconomy.com`
- `https://seller.createconomy.com`

## CI/CD Pipeline

### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install

      - run: pnpm type-check

      - run: pnpm build
```

## Monitoring

### Vercel Analytics

Enable in each Vercel project:
- Web Analytics
- Speed Insights

### Convex Dashboard

Monitor at https://dashboard.convex.dev:
- Function logs
- Database metrics
- Error tracking

## Rollback

### Vercel

1. Go to project deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Convex

```bash
# List deployments
npx convex deployments list

# Rollback to specific deployment
npx convex deploy --deployment <deployment-id>
```

## Environment-Specific Configuration

### Development

```env
CONVEX_DEPLOYMENT=dev:your-dev-project
NEXT_PUBLIC_CONVEX_URL=https://your-dev-project.convex.cloud
```

### Staging

```env
CONVEX_DEPLOYMENT=dev:your-staging-project
NEXT_PUBLIC_CONVEX_URL=https://your-staging-project.convex.cloud
```

### Production

```env
CONVEX_DEPLOYMENT=prod:your-prod-project
NEXT_PUBLIC_CONVEX_URL=https://your-prod-project.convex.cloud
```

## Security Checklist

- [ ] Environment variables not committed to git
- [ ] OAuth credentials secured in Convex dashboard
- [ ] CORS configured for production domains only
- [ ] Cookie domain set for production
- [ ] Rate limiting enabled in Convex
- [ ] Admin routes protected with role checks
