# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo containing:
- `createconomy/` - Next.js 16 application (main project)
- `docs/` - Documentation and planning files

## Commands

All commands run from the `createconomy/` directory:

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **React**: 19.x with React Query for data fetching
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI Components**: shadcn/ui (new-york style) + Radix primitives
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Directory Structure (`createconomy/`)

```
app/                    # Next.js App Router pages
components/
  ├── ui/              # shadcn/ui base components
  ├── providers/       # Context providers (theme, query)
  ├── layout/          # Layout components (navbar, sidebars, three-column)
  ├── feed/            # Discussion feed components
  └── shared/          # Reusable shared components
hooks/                  # Custom React hooks
lib/                    # Utilities, constants, mock data, animations
types/                  # TypeScript type definitions
```

### Layout Architecture

The app uses a responsive three-column layout (`ThreeColumnLayout`):
- **Left sidebar** (250px): Navigation, categories, premium sections - hidden on mobile/tablet
- **Main content**: Feed with featured carousel, tabs, and discussion cards
- **Right sidebar** (320px): Trending, leaderboard, campaigns - hidden on mobile/tablet
- **Mobile nav**: Bottom navigation bar for mobile devices

### Key Patterns

- **Path aliases**: `@/` maps to `createconomy/` root
- **Providers hierarchy**: ThemeProvider → QueryProvider → TooltipProvider
- **Constants**: Categories, feed tabs, breakpoints defined in `lib/constants.ts`
- **Types**: Core domain types in `types/` (User, Discussion, Campaign)
- **Mock data**: Development data in `lib/mock-data.ts`

### Adding shadcn Components

```bash
npx shadcn@latest add <component-name>
```

## MCP Server Configuration

### Project-Level (`.claude/mcp.json`)
- `filesystem` - File system access scoped to this project directory
- `convex` - Convex backend integration

### User-Level (available globally)
- `memory` - Persistent memory across sessions
- `sequential-thinking` - Step-by-step reasoning assistance
- `shadcn` - shadcn/ui component assistance

### Plugin-Provided (global)
- `github` - GitHub API integration
- `context7` - Documentation lookup for libraries
