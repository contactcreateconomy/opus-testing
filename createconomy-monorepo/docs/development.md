# Development Guide

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **pnpm**: 9.x or higher
- **Convex CLI**: Installed globally or via npx

### Initial Setup

```bash
# Clone and install
git clone <repo-url>
cd createconomy-monorepo
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Convex deployment details
```

## Development Workflow

### Starting the Development Environment

**Terminal 1 - Convex Backend:**
```bash
cd packages/convex
npx convex dev
```

**Terminal 2 - Apps:**
```bash
# All apps
pnpm dev

# Or individual apps
pnpm dev:forum        # http://localhost:3001
pnpm dev:marketplace  # http://localhost:3000
pnpm dev:admin        # http://localhost:3002
pnpm dev:seller       # http://localhost:3003
```

### Port Assignments

| App | Development Port |
|-----|------------------|
| Marketplace | 3000 |
| Forum | 3001 |
| Admin | 3002 |
| Seller | 3003 |
| Convex Dashboard | 3210 |

## Working with Packages

### Adding Dependencies

```bash
# Add to specific package
pnpm add <package> --filter @repo/ui

# Add to specific app
pnpm add <package> --filter @apps/forum

# Add to root (dev dependency)
pnpm add -D <package> -w
```

### Creating New Components in @repo/ui

1. Create component in `packages/ui/src/components/ui/`
2. Export from `packages/ui/src/components/ui/index.ts`
3. Re-export from `packages/ui/src/index.ts`

```typescript
// packages/ui/src/components/ui/my-component.tsx
"use client";

import { cn } from "../../lib/utils";

export function MyComponent({ className, ...props }) {
  return <div className={cn("...", className)} {...props} />;
}

// packages/ui/src/components/ui/index.ts
export * from "./my-component";
```

### Adding shadcn Components

```bash
# From any app directory
npx shadcn@latest add <component-name>

# Then move to packages/ui if it should be shared
```

## Convex Development

### Schema Changes

Edit `packages/convex/convex/schema.ts` and the Convex dev server will automatically sync.

### Adding Server Functions

Create files in `packages/convex/convex/`:

```typescript
// packages/convex/convex/products.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});
```

### Using Convex in Apps

```typescript
import { useQuery, useMutation } from "convex/react";
import { api } from "@repo/convex";

function MyComponent() {
  const products = useQuery(api.products.list);
  const createProduct = useMutation(api.products.create);

  // ...
}
```

## TypeScript

### Type Checking

```bash
# Check all packages
pnpm type-check

# Check specific package
pnpm type-check --filter @repo/ui
```

### Path Aliases

Apps use these path aliases:

- `@/` → App root (e.g., `apps/forum/`)
- `@repo/ui` → UI package
- `@repo/auth` → Auth package
- `@repo/convex` → Convex package
- `@repo/types` → Types package

## Testing

### Running Tests

```bash
# All tests
pnpm test

# Specific package
pnpm test --filter @repo/ui
```

## Code Style

### ESLint

```bash
pnpm lint
```

### Prettier

```bash
pnpm format
```

## Troubleshooting

### Common Issues

**"Module not found" errors:**
- Run `pnpm install` to ensure dependencies are linked
- Check that exports are properly defined in package.json

**TypeScript errors in packages:**
- Ensure `"use client"` directive is added to client-side hooks/components
- Check tsconfig.json paths are correctly configured

**Convex connection issues:**
- Verify `.env.local` has correct `NEXT_PUBLIC_CONVEX_URL`
- Ensure Convex dev server is running

**Port already in use:**
```bash
# Find and kill process on Windows
netstat -ano | findstr :3001
taskkill //F //PID <pid>
```

### Clearing Caches

```bash
# Clear all caches
pnpm clean

# Clear Turborepo cache
rm -rf .turbo

# Clear Next.js caches
rm -rf apps/*/.next
```
