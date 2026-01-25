FROM node:lts AS compile

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx AS runtime

WORKDIR /usr/src/app
COPY --from=compile /usr/src/app/out /usr/share/nginx/html