FROM node

RUN apt-get	update && apt-get install -y ruby-full

RUN gem install kamal

WORKDIR /app

COPY ./ ./

RUN npm i -y

RUN ls -la

RUN npm run build

CMD ["npm", "run", "start"]