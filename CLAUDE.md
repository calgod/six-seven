# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Six Seven is a React application built with modern tooling and best practices.

**Tech Stack:**
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite 6** - Build tool and dev server
- **Tailwind CSS v4** - Styling with utility classes
- **shadcn/ui** - Component library based on Radix UI
- **npm** - Package manager

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/       # React components
│   └── ui/          # shadcn/ui components (auto-generated)
├── lib/             # Utility functions
│   └── utils.ts     # cn() helper for className merging
├── App.tsx          # Root component
├── main.tsx         # Application entry point
└── index.css        # Global styles and Tailwind imports
```

## Architecture

### Component System

This project uses **shadcn/ui**, which differs from traditional component libraries:
- Components are copied into your codebase (not imported from node_modules)
- Full ownership and customization of components
- Uses Radix UI primitives for accessibility
- Styled with Tailwind CSS using CSS variables for theming

To add shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

Example: `npx shadcn@latest add button`

### Path Aliases

The project uses TypeScript path aliases:
- `@/*` → `./src/*`

Example: `import { cn } from '@/lib/utils'`

### Styling System

**Tailwind CSS v4** is configured with:
- CSS variables for theming (defined in `src/index.css`)
- Dark mode support via `.dark` class
- PostCSS plugin: `@tailwindcss/postcss`
- Custom color system using HSL values

Key utilities available:
- `bg-background`, `text-foreground` - Main colors
- `bg-primary`, `bg-secondary`, `bg-accent` - Semantic colors
- `bg-card`, `bg-popover` - Surface colors
- `border-border`, `ring-ring` - Border colors
- `text-muted-foreground` - Muted text

### Utility Functions

**`cn()` function** (`src/lib/utils.ts`):
- Merges className strings intelligently
- Combines `clsx` (conditional classes) + `tailwind-merge` (deduplication)
- Use for all conditional styling

Example:
```typescript
cn("base-class", condition && "conditional-class", "override-class")
```

## Configuration Files

- `vite.config.ts` - Vite configuration with path aliases
- `tsconfig.json` - TypeScript configuration with strict mode
- `tailwind.config.js` - Tailwind theme extensions
- `postcss.config.js` - PostCSS plugins for Tailwind v4
- `components.json` - shadcn/ui configuration
- `eslint.config.js` - ESLint flat config with React rules

## Future Considerations

- **Cloudflare Workers** may be added as a serverless backend in the future
- API layer will likely be added as the application grows

## License

This project is licensed under the MIT License (see LICENSE file).
