FROM node:16-alpine

EXPOSE 4000

WORKDIR /app

COPY package*.json ./
COPY doc ./

RUN npm install --force

COPY . .

CMD [ "npm", "run", "start:dev" ]