# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This repository contains:
- `createconomy-monorepo/` - **Primary project** - Turborepo monorepo with multiple apps and shared packages
- `createconomy/` - Legacy Next.js application (deprecated, migrated to monorepo)
- `docs/` - Legacy documentation

## Monorepo Structure (`createconomy-monorepo/`)

```
createconomy-monorepo/
├── apps/
│   ├── marketplace/     # createconomy.com (port 3000)
│   ├── forum/           # discuss.createconomy.com (port 3001)
│   ├── admin/           # console.createconomy.com (port 3002)
│   └── seller/          # seller.createconomy.com (port 3003)
├── packages/
│   ├── ui/              # @repo/ui - Shared UI components, providers, hooks
│   ├── convex/          # @repo/convex - Convex backend, schema, auth
│   ├── auth/            # @repo/auth - Auth components & hooks
│   ├── types/           # @repo/types - Shared TypeScript types
│   └── config/          # @repo/config - ESLint, TypeScript, Tailwind configs
└── docs/                # Documentation
```

## Commands

All commands run from `createconomy-monorepo/`:

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start all apps (Turborepo)
pnpm build            # Build all apps
pnpm type-check       # Type check all packages
pnpm lint             # Run ESLint

# Individual apps
pnpm dev:forum        # Start forum app (http://localhost:3001)
pnpm dev:marketplace  # Start marketplace app (http://localhost:3000)
pnpm dev:admin        # Start admin app (http://localhost:3002)
pnpm dev:seller       # Start seller app (http://localhost:3003)
```

**Convex Backend:**
```bash
cd packages/convex && npx convex dev   # Start Convex dev server
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Framework**: Next.js 15 with App Router
- **React**: 19.x with React Query
- **Backend**: Convex (real-time database + serverless functions)
- **Auth**: Convex Auth (GitHub, Google, Password)
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI**: shadcn/ui + Radix primitives
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Key Patterns

### Package Imports

```typescript
// UI components, providers, hooks
import { Button, Card, ThemeProvider, useDebounce } from "@repo/ui";

// Authentication
import { AuthProvider, ProtectedRoute, SignInForm } from "@repo/auth";

// Convex API
import { api } from "@repo/convex";
import { useCurrentUser } from "@repo/convex";

// Types
import type { User, Discussion, Product } from "@repo/types";
```

### Provider Hierarchy (in app layouts)

```tsx
<ThemeProvider>
  <QueryProvider>
    <TooltipProvider>
      {children}
    </TooltipProvider>
  </QueryProvider>
</ThemeProvider>
```

### Convex Schema

Key tables:
- `users` - User profiles with roles (user, seller, admin, superadmin)
- `userPreferences` - Per-app user settings
- Auth tables from `@convex-dev/auth`

### Adding Components

For app-specific components: Create in `apps/<app>/components/`

For shared components:
1. Create in `packages/ui/src/components/`
2. Add `"use client"` directive if using React hooks
3. Export from `packages/ui/src/index.ts`

### Adding shadcn Components

```bash
npx shadcn@latest add <component-name>
# Then move to packages/ui if it should be shared
```

## Environment Variables

Root `.env.local`:
```env
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

Each app needs `.env.local`:
```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment
```

## MCP Server Configuration

### Project-Level (`.claude/mcp.json`)

#### filesystem
File system access scoped to `E:\Github\opus-testing`
- **Use when**: Reading/writing files, exploring directory structure

#### shadcn
shadcn/ui component assistance
- **Use when**: Adding new UI components, finding component examples

### User-Level (available globally)

#### memory
Persistent knowledge graph across sessions
- **Use when**: Storing user preferences, project context

#### sequential-thinking
Step-by-step reasoning for complex problems
- **Use when**: Breaking down complex problems, multi-step analysis

### Plugin-Provided (global)

#### github
GitHub API integration
- **Use when**: Creating issues/PRs, searching code, code reviews

#### context7
Up-to-date documentation lookup for libraries
- **Use when**: Fetching current documentation for Next.js, React, Convex, etc.

## Documentation

Detailed documentation is in `createconomy-monorepo/docs/`:
- [Architecture](./createconomy-monorepo/docs/architecture.md)
- [Development Guide](./createconomy-monorepo/docs/development.md)
- [Deployment](./createconomy-monorepo/docs/deployment.md)
