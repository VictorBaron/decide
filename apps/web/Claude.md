# Decide - Project Context

## Purpose

This project is the front-end of Decide. It's a SaaS to help companies make decisions, and see the decisions that were taken by your coworkers or employees.

### Rich text editor

Use BlockNote, here is the [documention](https://www.blocknotejs.org/docs/getting-started/mantine)

### Frontend Structure

```
apps/web/src/
├── assets/             # All static assets
├── components/         # shared components, not business related
├── modules/            # contains all business modules
├── pages/              # Every different paged. No business code.

```

## Tech Stack

- **Runtime:** Node 20, TypeScript (ES2021, strict mode)
- **Frontend:** React 19, Vite 7, react-router-dom
- **Rich text editor:** Blocknote
- **Auth:** @nestjs/passport, passport-google-oauth20, @nestjs/jwt
