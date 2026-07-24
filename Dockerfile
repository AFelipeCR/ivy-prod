FROM node:22-alpine AS build

ARG NPM_TOKEN

WORKDIR /app

RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc && \
    echo "@ivy-eco:registry=https://npm.pkg.github.com/" >> .npmrc

COPY package*.json ./
COPY sdk/javascript ./sdk/javascript

RUN cd sdk/javascript && npm install && npm run build

RUN npm install

COPY . .
RUN npm run build

RUN cd dashboard && npm install && npm run build

RUN rm -f .npmrc

FROM node:22-alpine

RUN apk add --no-cache chromium

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/dashboard/dist ./dashboard/dist

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

RUN rm -rf /app/node_modules/@ivy-eco/sdk
RUN mkdir -p /app/node_modules/@ivy-eco/sdk
COPY --from=build /app/sdk/javascript/dist /app/node_modules/@ivy-eco/sdk/dist
COPY --from=build /app/sdk/javascript/package.json /app/node_modules/@ivy-eco/sdk/package.json

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

EXPOSE 3000

CMD ["node", "dist/src/main"]