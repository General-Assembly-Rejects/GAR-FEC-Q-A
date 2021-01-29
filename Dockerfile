FROM node:15.7.0-alpine3.10
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

EXPOSE 8000

COPY . .

CMD ["node", "server/index.js"]
