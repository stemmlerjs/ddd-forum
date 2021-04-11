#/bin/bash

cp .env projects/backend && docker-compose up -d --build
docker-compose up