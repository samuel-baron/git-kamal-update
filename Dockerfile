FROM node

WORKDIR /app

COPY ./ ./

RUN npm i -y

RUN ls -la

# RUN npm run build

# CMD ["npm", "run", "start"]
CMD ["node", "server.js"]