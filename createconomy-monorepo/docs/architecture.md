# Architecture

## Overview

Createconomy is a multi-app platform built as a Turborepo monorepo with shared packages and a unified Convex backend.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Apps                              │
├────────────────┬────────────────┬────────────────┬──────────────┤
│   Marketplace  │     Forum      │     Admin      │    Seller    │
│   (Next.js)    │   (Next.js)    │   (Next.js)    │  (Next.js)   │
│   Port 3000    │   Port 3001    │   Port 3002    │  Port 3003   │
└───────┬────────┴───────┬────────┴───────┬────────┴──────┬───────┘
        │                │                │               │
        └────────────────┴────────────────┴───────────────┘
                                │
                    ┌───────────┴───────────┐
                    │    Shared Packages    │
                    ├───────────────────────┤
                    │  @repo/ui             │
                    │  @repo/auth           │
                    │  @repo/convex         │
                    │  @repo/types          │
                    │  @repo/config         │
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │   Convex Backend      │
                    ├───────────────────────┤
                    │  Real-time Database   │
                    │  Serverless Functions │
                    │  Authentication       │
                    └───────────────────────┘
```

## Package Dependencies

```
apps/forum ─────────────┐
apps/marketplace ───────┼──► @repo/ui ──────► @repo/config
apps/admin ─────────────┤        │
apps/seller ────────────┘        ▼
        │               @repo/auth ──────► @repo/convex
        │                                       │
        └───────────────────────────────────────┘
                        │
                        ▼
                  @repo/types
```

## Convex Backend

### Schema

The Convex schema defines the data model:

```typescript
// Core tables
users           # User profiles with roles
userPreferences # Per-app user settings

// Auth tables (from @convex-dev/auth)
authAccounts    # OAuth/credential accounts
authSessions    # Active sessions
authRefreshTokens
authVerificationCodes
authVerifiers
authRateLimits
```

### User Roles

| Role | Description |
|------|-------------|
| `user` | Standard user (default) |
| `seller` | Can list products and manage store |
| `admin` | Platform administration access |
| `superadmin` | Full system access |

### Authentication Flow

1. User visits any app
2. App wraps content in `AuthProvider` from `@repo/auth`
3. `AuthProvider` connects to Convex and manages session
4. Protected routes use `ProtectedRoute` component
5. Session cookies are shared across subdomains (`.createconomy.com`)

## Shared UI Package (@repo/ui)

### Components

- **UI Components**: Button, Card, Avatar, Badge, Input, Tabs, etc.
- **Shared Components**: GlassCard, GlowButton, DotBackground
- **Providers**: ThemeProvider, QueryProvider, TooltipProvider

### Hooks

- `useDebounce` - Debounced value updates
- `useMediaQuery` - Responsive breakpoint detection
- `useInfiniteScroll` - Infinite scrolling pagination

### Utilities

- `cn()` - Tailwind class merging (clsx + tailwind-merge)
- Animation variants for Framer Motion

## Styling Architecture

### CSS Variables

Shared CSS variables are defined in `@repo/tailwind-config/base.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* ... */
}
```

### Tailwind Configuration

Each app imports the shared base styles:

```css
/* app/globals.css */
@import "@repo/tailwind-config/base.css";
```

## Build Pipeline

Turborepo manages the build pipeline:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

## Deployment Strategy

### Production Domains

| App | Domain |
|-----|--------|
| Marketplace | createconomy.com |
| Forum | discuss.createconomy.com |
| Admin | console.createconomy.com |
| Seller | seller.createconomy.com |

### Vercel Configuration

Each app is deployed as a separate Vercel project:

1. Connect GitHub repository
2. Set root directory to `apps/<app-name>`
3. Configure build command: `cd ../.. && pnpm turbo run build --filter=@apps/<app-name>`
4. Set environment variables

### Cross-Domain Authentication

For SSO across subdomains:

1. Set cookie domain to `.createconomy.com`
2. Configure CORS for Convex backend
3. Use shared Convex deployment URL
