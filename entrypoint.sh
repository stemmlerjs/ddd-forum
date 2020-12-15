#!/bin/sh

echo "Waitin for mysql to start..."

while ! nc -z ddd_forum_mysql 3306; do
  sleep 0.1
done

echo "MySQL started"

npm run db:create:dev
npm run migrate:dev
npm run start:both