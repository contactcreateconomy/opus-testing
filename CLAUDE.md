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

#### filesystem
File system access scoped to `E:\Github\opus-testing`
- **Tools**: `mcp__filesystem__read_text_file`, `mcp__filesystem__write_file`, `mcp__filesystem__list_directory`, `mcp__filesystem__search_files`, `mcp__filesystem__edit_file`, `mcp__filesystem__directory_tree`
- **Use when**: Reading/writing files, exploring directory structure, searching for files by pattern

#### convex
Convex backend integration (requires `CONVEX_DEPLOY_KEY` or URL configuration)
- **Status**: Pending configuration
- **Use when**: Interacting with Convex database, running queries/mutations

#### shadcn
shadcn/ui component assistance
- **Tools**: `mcp__shadcn__get_project_registries`, `mcp__shadcn__search_items_in_registries`, `mcp__shadcn__view_items_in_registries`, `mcp__shadcn__get_item_examples_from_registries`, `mcp__shadcn__get_add_command_for_items`, `mcp__shadcn__get_audit_checklist`
- **Use when**: Adding new UI components, finding component examples, checking component documentation
- **Example**: Search for button variants, get demo code, generate add commands

### User-Level (available globally)

#### memory
Persistent knowledge graph across sessions
- **Tools**: `mcp__memory__create_entities`, `mcp__memory__create_relations`, `mcp__memory__search_nodes`, `mcp__memory__read_graph`
- **Use when**: Storing user preferences, project context, or information to remember across sessions

#### sequential-thinking
Step-by-step reasoning for complex problems
- **Tools**: `mcp__sequential-thinking__sequentialthinking`
- **Use when**: Breaking down complex problems, multi-step analysis, hypothesis generation and verification

### Plugin-Provided (global)

#### github
GitHub API integration
- **Tools**: `mcp__plugin_github_github__*` (issues, PRs, commits, branches, search, etc.)
- **Use when**: Creating issues/PRs, searching code, managing repositories, code reviews

#### context7
Up-to-date documentation lookup for libraries
- **Tools**: `mcp__plugin_context7_context7__resolve-library-id`, `mcp__plugin_context7_context7__query-docs`
- **Use when**: Fetching current documentation for any library (Next.js, React, Tailwind, etc.)
- **Workflow**: First resolve library ID, then query docs with specific questions
