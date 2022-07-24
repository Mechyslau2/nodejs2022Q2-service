FROM node:16-alpine

EXPOSE ${PORT}

WORKDIR /app

COPY package*.json ./
COPY doc ./

RUN npm install --force

COPY . .

CMD [ "npm", "run", "start:dev" ]