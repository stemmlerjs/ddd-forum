const mysql = require('mysql2');  

require('dotenv').config();

const { 
  DDD_FORUM_DB_USER, 
  DDD_FORUM_DB_PASS, 
  DDD_FORUM_DB_HOST,
  DDD_FORUM_DB_DEV_DB_NAME,
  DDD_FORUM_DB_TEST_DB_NAME,
  NODE_ENV
} = process.env;

const dbName = NODE_ENV === "development" 
  ? DDD_FORUM_DB_DEV_DB_NAME 
  : DDD_FORUM_DB_TEST_DB_NAME

const connection = mysql.createConnection({  
  host: DDD_FORUM_DB_HOST,  
  user: DDD_FORUM_DB_USER,  
  password: DDD_FORUM_DB_PASS  
});  

connection.connect((err) => {
  if (err) throw err;
  connection.query(`CREATE DATABASE ${dbName}`, (err, result) => {
    
    if (err && err.code === "ER_DB_CREATE_EXISTS") {
      console.log('Db already created');
      process.exit(0);
    } 
    
    if (err) {
      throw err;
    }

    console.log('Created db');
    process.exit(0);
  })
})