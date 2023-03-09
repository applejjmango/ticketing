FROM node:16-bullseye-slim AS build

ARG NPM_TOKEN

WORKDIR /app

COPY package.json .

# RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
#   npm install --only=prod && \
#   rm -rf .npmrc

RUN npm install --omit=dev

COPY . .

CMD ["npm", "start"]