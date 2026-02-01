# Createconomy Monorepo

A Turborepo-powered monorepo for the Createconomy platform - a premium AI creator community with marketplace, forum, admin dashboard, and seller portal.

## Architecture

```
createconomy-monorepo/
├── apps/
│   ├── marketplace/     # createconomy.com - E-commerce & product listings
│   ├── forum/           # discuss.createconomy.com - Community discussions
│   ├── admin/           # console.createconomy.com - Admin dashboard
│   └── seller/          # seller.createconomy.com - Seller portal
├── packages/
│   ├── ui/              # @repo/ui - Shared UI components, providers, hooks
│   ├── convex/          # @repo/convex - Convex backend, schema, auth
│   ├── auth/            # @repo/auth - Auth components & hooks
│   ├── types/           # @repo/types - Shared TypeScript types
│   └── config/          # @repo/config - ESLint, TypeScript, Tailwind configs
└── docs/                # Documentation
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Framework**: Next.js 15 with App Router
- **React**: 19.x with React Query
- **Backend**: Convex (real-time database + serverless functions)
- **Auth**: Convex Auth (GitHub, Google, Password providers)
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI**: shadcn/ui + Radix primitives
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd createconomy-monorepo

# Install dependencies
pnpm install
```

### Development

```bash
# Start Convex backend (in one terminal)
cd packages/convex && npx convex dev

# Start all apps (in another terminal)
pnpm dev

# Or start individual apps
pnpm dev:forum        # http://localhost:3001
pnpm dev:marketplace  # http://localhost:3000
pnpm dev:admin        # http://localhost:3002
pnpm dev:seller       # http://localhost:3003
```

### Build

```bash
# Build all apps
pnpm build

# Type check all packages
pnpm type-check
```

## Environment Variables

Copy `.env.example` to `.env.local` in the root and configure:

```env
# Convex
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# OAuth Providers (optional)
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

Each app also needs a `.env.local` with the Convex URL:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment
```

## Packages

### @repo/ui

Shared UI components, providers, and hooks.

```tsx
import { Button, Card, ThemeProvider, useDebounce } from "@repo/ui";
```

### @repo/convex

Convex backend with schema, auth, and server functions.

```tsx
import { api } from "@repo/convex";
import { useCurrentUser } from "@repo/convex";
```

### @repo/auth

Authentication components and hooks.

```tsx
import { AuthProvider, ProtectedRoute, SignInForm } from "@repo/auth";
```

### @repo/types

Shared TypeScript type definitions.

```tsx
import type { User, Discussion, Product, Order } from "@repo/types";
```

### @repo/config

Shared configuration for ESLint, TypeScript, and Tailwind.

## Apps

| App | Port | Domain (Production) | Description |
|-----|------|---------------------|-------------|
| marketplace | 3000 | createconomy.com | Main e-commerce platform |
| forum | 3001 | discuss.createconomy.com | Community discussions |
| admin | 3002 | console.createconomy.com | Admin dashboard |
| seller | 3003 | seller.createconomy.com | Seller management portal |

## Documentation

See the [docs/](./docs/) folder for detailed documentation:

- [Architecture](./docs/architecture.md)
- [Development Guide](./docs/development.md)
- [Deployment](./docs/deployment.md)

## License

Private - All rights reserved.
