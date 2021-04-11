FROM node:12.18.4

WORKDIR /usr/src/ddd-frontend

RUN apt-get update && apt-get install -y netcat

ENV path /usr/src/ddd-frontend/node_modules/.bin:$PATH

COPY . /usr/src/ddd-frontend

RUN npm i -g dotenv-cli
RUN npm i 

CMD ["npm", "start"]