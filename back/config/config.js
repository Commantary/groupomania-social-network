const fs = require("fs");
require('dotenv').config();

module.exports = {
   "development": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_DATABASE,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "dialect": "postgres",
      "dialectOptions": {
         "bigNumberStrings": true,
         "ssl": {
            "ca": fs.readFileSync(__dirname + '/ca-certificate.crt').toString()
         }
      }
   },
   "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "postgres"
   },
   "production": {
      "username": process.env.DB_USERNAME_PROD,
      "password": process.env.DB_PASSWORD_PROD,
      "database": process.env.DB_DATABASE_PROD,
      "host": process.env.DB_HOST_PROD,
      "port": process.env.DB_PORT_PROD,
      "dialect": "postgres",
      "dialectOptions": {
         "bigNumberStrings": true,
         "ssl": {
            "ca": fs.readFileSync(__dirname + '/ca-certificate.crt').toString()
         }
      }
   }
};
