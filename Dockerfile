FROM node:12.18.4

WORKDIR /usr/src/ddd

RUN apt-get update && apt-get install -y netcat

ENV path /usr/src/ddd/node_modules/.bin:$PATH

COPY . /usr/src/ddd

RUN npm i -g dotenv-cli
RUN npm i

RUN cd public/app && npm i

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]