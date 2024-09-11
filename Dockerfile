FROM node:18-alpine AS build

WORKDIR /app
COPY . .

RUN npm i kaven-utils && npm i -g @vercel/ncc
RUN ncc build proxy.js -o dist


FROM node:lts-alpine

WORKDIR /app

# COPY --from=build /app/dist .
COPY --from=build /app/dist/index.js ./proxy.js

RUN mkdir config

# Install OpenSSL
RUN apk add --no-cache openssl
RUN openssl version

LABEL name="kaven-proxy" \
    author="Kaven" \
    email="kaven@wuwenkai.com" \
    version="latest" \
    description=""

EXPOSE 8558 8765
CMD [ "node", "proxy.js", "/app/config" ]
