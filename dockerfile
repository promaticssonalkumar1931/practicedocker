FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]