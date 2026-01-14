# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Decide is a pnpm monorepo with a NestJS API backend and React frontend. Authentication is via Google OAuth.

## Commands

```bash
# Install dependencies (at root)
pnpm install

# Start development (all apps in watch mode)
pnpm dev

# Build all apps
pnpm build

# Start local PostgreSQL
docker-compose -f infra/docker-compose.yml up -d db

# API-specific commands (run from apps/api/)
pnpm dev              # Start NestJS in watch mode
pnpm build            # Compile TypeScript
pnpm start:prod       # Run compiled API

# Frontend commands (run from apps/web/)
pnpm dev              # Start Vite dev server (port 5173)
pnpm build            # Build for production

# Prisma commands (run from apps/api/)
pnpm prisma generate --config prisma/prisma.config.ts
pnpm prisma db push --config prisma/prisma.config.ts
```

## Architecture

### Monorepo Structure
- `apps/api/` - NestJS backend
- `apps/web/` - React + Vite frontend
- `infra/` - Docker compose for local development

### API Module Organization
The API follows NestJS modular architecture with feature-based modules:
- **Auth Module** - Google OAuth via Passport.js, JWT in HTTP-only cookies
- **Users Module** - User CRUD operations via Prisma
- **Health Module** - Health check endpoint
- **Prisma Module** - Database connectivity wrapper

### API Configuration
- All routes prefixed with `/api/v1/`
- Rate limiting: 120 requests/minute per IP
- Validation: Global pipes with whitelist, transform, and forbidNonWhitelisted
- Static files served from `apps/api/public`

### Database
- PostgreSQL 16 with Prisma 7
- Schema location: `apps/api/prisma/schema.prisma`
- User model: id, email, password (optional), name, googleId

### Authentication Flow
1. User clicks "Sign in with Google" on frontend
2. `GET /api/v1/auth/google` redirects to Google consent
3. Google callback at `/api/v1/auth/google/callback` creates/links user
4. JWT set in `session` cookie, user redirected to frontend
5. Protected routes use `CookieAuthGuard` to verify JWT
6. `GET /api/v1/auth/me` returns current user info

### Frontend Structure
- `src/api/auth.ts` - API client for auth endpoints
- `src/hooks/useAuth.ts` - Auth state management hook
- `src/pages/LoginPage.tsx` - Login with Google button
- `src/pages/HomePage.tsx` - Shows "Hello, [name]!"
- `src/components/ProtectedRoute.tsx` - Route guard

## Environment Variables

Required in `apps/api/.env`:
```
DATABASE_URL=postgresql://app:app@localhost:5432/app
JWT_SECRET=your_secret_here
PORT=3000

# Google OAuth - from https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

## Tech Stack

- **Runtime:** Node 20, TypeScript (ES2021, strict mode)
- **Backend:** NestJS 11, Express 5, Passport.js
- **Frontend:** React 19, Vite 7, react-router-dom
- **Database:** PostgreSQL 16, Prisma 7
- **Auth:** @nestjs/passport, passport-google-oauth20, @nestjs/jwt
