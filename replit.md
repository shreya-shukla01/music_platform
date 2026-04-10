# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### AI 3D Music Galaxy (`artifacts/music-galaxy`)
- **Type**: react-vite, served at `/`
- **Port**: 23796
- **Features**:
  - 3D galaxy with Three.js / React Three Fiber — each song is a planet
  - 82+ songs across 16 genres: Bollywood, Hollywood, Punjabi, Rock, Lofi, HipHop, EDM, Classical, Romantic, Sufi, Ghazal, Devotional, KPop, Latin, Jazz, Metal
  - Planet visual rules: size by popularity, color by mood/genre, spiral arm placement
  - Black Hole at center with animated ring
  - Zustand state management for player/favorites/queue/history
  - Audio player with progress, volume, next/prev controls
  - Search by title/artist, filter by genre and mood
  - Favorites, recently played, curated playlists (5 constellations)
  - AI mood-based recommendations
  - Black Hole Discovery mode (random song)
  - Orbitron font, dark neon glassmorphism aesthetic

### API Server (`artifacts/api-server`)
- **Port**: 8080, served at `/api`
- Express 5, pino logging

### Mockup Sandbox (`artifacts/mockup-sandbox`)
- **Port**: 8081, served at `/__mockup`
- Isolated UI prototyping sandbox

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
