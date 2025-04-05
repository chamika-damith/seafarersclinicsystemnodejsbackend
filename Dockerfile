FROM node:latest
LABEL authors="Chamika"

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]