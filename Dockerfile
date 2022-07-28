FROM node:16-alpine3.15 As Builder

WORKDIR /app


COPY package*.json ./

RUN npm install --force

COPY . .


EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]