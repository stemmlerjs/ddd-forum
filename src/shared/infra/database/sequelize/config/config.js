require('dotenv').config()
const Sequelize = require('sequelize');

const { 
  DDD_FORUM_DB_USER, 
  DDD_FORUM_DB_PASS, 
  DDD_FORUM_DB_HOST,
  DDD_FORUM_DB_DEV_DB_NAME,
  DDD_FORUM_DB_TEST_DB_NAME,
  DDD_FORUM_DB_PROD_DB_NAME,
  NODE_ENV,
  DDD_FORUM_IS_PRODUCTION,
  CLEARDB_DATABASE_URL
} = process.env;

const databaseCredentials = {
  "development": {
    "username": DDD_FORUM_DB_USER,
    "password": DDD_FORUM_DB_PASS,
    "database": DDD_FORUM_DB_DEV_DB_NAME,
    "host": DDD_FORUM_DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": DDD_FORUM_DB_USER,
    "password": DDD_FORUM_DB_PASS,
    "database": DDD_FORUM_DB_TEST_DB_NAME,
    "host": DDD_FORUM_DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": DDD_FORUM_DB_USER,
    "password": DDD_FORUM_DB_PASS,
    "database": DDD_FORUM_DB_PROD_DB_NAME,
    "host": DDD_FORUM_DB_HOST,
    "dialect": "mysql"
  }
};

const { 
  username, password, database, host, dialect 
} = databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

const mode = DDD_FORUM_IS_PRODUCTION === "true" ? 'prod' : 'dev';

console.log(`[DB]: Connecting to the database in ${mode} mode.`)

module.exports.connection = DDD_FORUM_IS_PRODUCTION === "true"
  ? new Sequelize(CLEARDB_DATABASE_URL) 
  : new Sequelize(database, username, password, {
    host,
    dialect,
    port: 3306,
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  }
);
