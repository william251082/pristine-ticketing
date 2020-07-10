FROM node:lts-alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY src .

CMD ["npm", "start"]
