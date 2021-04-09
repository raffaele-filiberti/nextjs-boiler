FROM node:12-alpine AS deps

COPY ./package.json ./yarn.lock /root/

WORKDIR /root

ARG NPM_RC

RUN echo "$NPM_RC" > .npmrc

RUN yarn


FROM node:12-alpine AS builder

WORKDIR /root

COPY . .

COPY --from=deps /root/node_modules /root/node_modules

ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_GRAPHQL_API_KEY

RUN yarn build

CMD ["yarn", "start"]