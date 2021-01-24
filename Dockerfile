FROM node:12-alpine AS dependencies
COPY ./package.json ./yarn.lock /root/
WORKDIR /root
RUN yarn

FROM node:12-alpine AS builder
COPY ./ /root/.
COPY --from=dependencies /root/node_modules /root/node_modules
WORKDIR /root
RUN yarn build

CMD ["yarn", "start"]