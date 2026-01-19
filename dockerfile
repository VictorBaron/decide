FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install 

# Copy source code
COPY . .

# Generate Prisma client
RUN cd apps/api && pnpm prisma generate --config prisma/prisma.config.ts

# Build the API
RUN cd apps/api && pnpm exec nest build

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
