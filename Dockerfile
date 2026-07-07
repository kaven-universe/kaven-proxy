FROM node:lts-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache dumb-init openssl

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install pnpm and only production dependencies
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod

# Copy source files
COPY proxy.js ./

# Prepare runtime config directory
RUN mkdir -p /app/config

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app
USER appuser

LABEL name="kaven-proxy" \
    author="Kaven" \
    email="kaven@wuwenkai.com" \
    version="1.0.0" \
    description="TLS-based client-server proxy with a local HTTP entry point"

EXPOSE 8558 8765

# Use dumb-init as entrypoint
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "proxy.js", "/app/config"]
