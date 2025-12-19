# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /task-management-frontend

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /task-management-frontend

# Copy dependencies
COPY --from=deps /task-management-frontend/node_modules ./node_modules

# Copy source code
COPY . .

# Build application with environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /task-management-frontend

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

# Create user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /task-management-frontend/public ./public
COPY --from=builder /task-management-frontend/.next/standalone ./
COPY --from=builder /task-management-frontend/.next/static ./.next/static
COPY --from=builder /task-management-frontend/package.json ./package.json

# Set ownership
RUN chown -R nextjs:nodejs /task-management-frontend

USER nextjs

EXPOSE 3002

CMD ["node", "server.js"]
