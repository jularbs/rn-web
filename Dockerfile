FROM node:24.14.0-slim AS base

  ENV PNPM_HOME=/pnpm
  ENV PATH="$PNPM_HOME:$PATH"


FROM base AS build

  WORKDIR /build
  ENV NEXT_PUBLIC_DOMAIN=https://www.radyonatin.com.ph
  ENV NEXT_PUBLIC_API_BASE_URL=https://www.radyonatin.com.ph/api
  ENV NEXT_PUBLIC_MANAGE_DOMAIN=https://cms.radyonatin.com.ph
  ENV NEXT_PUBLIC_ENV=production

  RUN npm i -g pnpm

  COPY pnpm-lock.yaml .
  RUN pnpm fetch

  COPY package.json .
  RUN pnpm i --offline

  COPY components.json next.config.ts postcss.config.mjs tsconfig.json ./
  COPY src src
  COPY public public

  RUN pnpm run build && rm -rf .next/cache && pnpm prune --prod


FROM base

  WORKDIR /app

  COPY --from=build /build/node_modules node_modules
  COPY --from=build /build/public public
  COPY --from=build /build/.next .next

  CMD [ "npx", "next", "start" ]
