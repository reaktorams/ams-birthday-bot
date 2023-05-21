FROM node:16.17.1-alpine as builder

WORKDIR /tmp
COPY . ./
RUN rm -rf ./dist
RUN npm install && npm run build

FROM node:16.17.1-alpine

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY --from=builder /tmp/dist ./dist

LABEL fly_launch_runtime="nodejs"

CMD [ "npm", "run", "start" ]
