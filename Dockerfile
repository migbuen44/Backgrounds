FROM node:16.5.0

WORKDIR /code

ENV PORT 80

COPY package.json /code/package.json

RUN npm install --production

COPY . /code

CMD ["node", "server/index.js"]