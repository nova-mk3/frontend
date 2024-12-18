FROM node:18-alpine AS base

# Base 이미지 설정
FROM base AS builder
# libc6-compat 설치
RUN apk update
RUN apk add --no-cache libc6-compat
# pnpm 설치
RUN npm install -g pnpm
# 작업 디렉토리 설정
WORKDIR /app
# turbo CLI 설치
RUN pnpm add turbo
# 프로젝트 복사
COPY . . 
# turbo prune 사용
RUN pnpm turbo prune admin --docker

# Dependencies 설치
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
# pnpm 설치
RUN npm install -g pnpm
WORKDIR /app
# 의존성 파일 복사
COPY --from=builder /app/out/json/ .
RUN pnpm install

# 프로젝트 전체 복사
COPY --from=builder /app/out/full/ .

# turbo build
RUN pnpm turbo build

# 런타임 설정
FROM base AS runner
WORKDIR /app/apps/admin

# 비루트 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs 
USER nextjs


# Next.js 빌드 결과 복사
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/standalone ./ 
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/.next/static ./apps/admin/.next/static 
COPY --from=installer --chown=nextjs:nodejs /app/apps/admin/public ./apps/admin/public

EXPOSE 3001
# Next.js에서 포트를 지정하는 방법은 환경 변수 PORT를 설정하는 것입니다.
ENV PORT=3001

# 실행 명령어
CMD node apps/admin/server.js
