ARG NODE_VERSION=12
FROM node:${NODE_VERSION} AS base

COPY packages/server /server

WORKDIR /server

RUN npm install


FROM node:${NODE_VERSION} as builder

COPY --from=base /server /server

WORKDIR /server

RUN npm run build
CMD npm start