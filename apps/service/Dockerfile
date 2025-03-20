# Base 이미지 설정
FROM node:22-alpine AS base

# 빌드 단계
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

# pnpm 설치
RUN npm install -g pnpm
WORKDIR /app
# turbo CLI 설치
RUN pnpm add turbo
COPY . .
RUN pnpm turbo prune service --docker

# Dependencies 설치
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN pnpm install
RUN ls -l /app/node_modules
COPY --from=builder /app/out/full/ .

RUN rm -rf .next
RUN pnpm turbo build

# 런타임 설정
FROM base AS runner
WORKDIR /app/apps/service

COPY --from=builder /app .

# 비루트 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/service/.next/standalone ./ 
COPY --from=installer /app/apps/service/.next/static ./apps/service/.next/static 
COPY --from=installer /app/apps/service/public ./apps/service/public


# 포트 노출
EXPOSE 3002

# 환경 변수 설정
ENV PORT=3002
ENV HOST=localhost

# 실행 명령어
CMD ["node", "apps/service/server.js"]
