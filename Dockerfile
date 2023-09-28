FROM --platform=linux/amd64 node:18

WORKDIR /usr/src/app/

COPY package.json yarn.lock /usr/src/app/

RUN yarn install && yarn cache clean

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "run", "dev"]
