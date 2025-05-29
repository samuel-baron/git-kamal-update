FROM node

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i -y

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]