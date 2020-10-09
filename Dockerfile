FROM node

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install --production

EXPOSE 8080

CMD [ "npm", "start" ]