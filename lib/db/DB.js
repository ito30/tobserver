const mysql = require('mysql');
const logger = require('tlogger');

class DB {
  constructor(config) {
    this.connection = mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    });
  }

  connect() {
    try {
      this.connection.connect();
    } catch (error) {
      logger.error(error);
    }
  }

  disconnect() {
    try {
      this.connection.end();
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = DB;
