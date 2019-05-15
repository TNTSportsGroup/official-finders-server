FROM node:10.15.3-alpine
WORKDIR "./app"
RUN apk add --no-cache bash
RUN apk add zip
COPY package.json wait-for-it.sh ./
COPY .env  ./
COPY build ./build
RUN npm install --only=production
CMD [ "npm", "run", "start:prod" ]
