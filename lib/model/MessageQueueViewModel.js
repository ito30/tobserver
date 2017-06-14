const logger = require('tlogger');
const moment = require('moment');

class MessageQueueViewModel {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  getMessageByStatus(status) {
    return new Promise((resolve) => {
      this.connection.query({
        sql: `SELECT * FROM message_queue_view WHERE ${this.table.status.column} = ?`,
        values: [status],
      }, (error, results, fields) => {
        if (error) {
          logger.error(error);

          return resolve([]);
        }

        return resolve(results);
      });
    });
  }

  getMessageByStatusAndExpired(status) {
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    return new Promise((resolve) => {
      this.connection.query({
        sql: `SELECT * FROM message_queue_view WHERE 
          ${this.table.status.column} = ? AND ${this.table.expired_at.column} < ?`,
        values: [status, now],
      }, (error, results, fields) => {
        if (error) {
          logger.error(error);

          return resolve([]);
        }

        return resolve(results);
      });
    });
  }

  getMessageByUuid(uuid) {
    return new Promise((resolve) => {
      this.connection.query({
        sql: `SELECT * FROM message_queue_view WHERE ${this.table.uuid.column} = ?`,
        values: [uuid],
      }, (error, results, fields) => {
        if (error) {
          logger.error(error);

          return resolve([]);
        }

        return resolve(results);
      });
    });
  }
}

module.exports = MessageQueueViewModel;
