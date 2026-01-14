# ---- build stage
FROM node:20-alpine AS build
WORKDIR /app

# pnpm
RUN corepack enable

# deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
# si packages/shared existe, copie son package.json aussi
RUN pnpm install --frozen-lockfile

# sources
COPY . .

# build web then api
RUN pnpm --filter web build
RUN pnpm --filter api build

# copy web build into api public
RUN rm -rf apps/api/public && mkdir -p apps/api/public \
  && cp -r apps/web/dist/* apps/api/public/

# ---- runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable

# only what we need at runtime
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --frozen-lockfile --prod --filter api...

# built api + public + prisma
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/apps/api/public apps/api/public
COPY --from=build /app/apps/api/prisma apps/api/prisma

EXPOSE 3000
CMD ["node", "apps/api/dist/main.js"]
