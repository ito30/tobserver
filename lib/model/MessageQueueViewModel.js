const logger = require('tlogger');

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
    return new Promise((resolve) => {
      this.connection.query({
        sql: `SELECT * FROM message_queue_view WHERE 
          ${this.table.status.column} = ? AND ${this.table.expired_at.column} < NOW()`,
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
