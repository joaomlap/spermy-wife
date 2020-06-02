ARG NODE_VERSION=12
FROM node:${NODE_VERSION}-alpine AS base

RUN apk add --no-cache yarn

COPY packages/client /client

WORKDIR /client

RUN npm install


# Builds the final version
FROM node:${NODE_VERSION}-alpine as builder

COPY --from=base /client /client

WORKDIR /client

RUN npm run build


FROM nginx:alpine

COPY --from=builder /client/build/ /var/www/

COPY docker/client/default.conf /etc/nginx/conf.d/default.conf
