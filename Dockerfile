FROM node:lts AS compile

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx AS runtime

WORKDIR /usr/src/app
RUN echo "/ Alex" > /usr/src/app/CHECKS
COPY --from=compile /usr/src/app/out /usr/share/nginx/html