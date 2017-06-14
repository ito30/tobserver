const schedule = require('node-schedule');
const DB = require('./lib/db/DB');
const MessageQueueModel = require('./lib/model/MessageQueueModel');
const MessageQueueViewModel = require('./lib/model/MessageQueueViewModel');

class TObserver {
  constructor(db, table, observer) {
    this.table = table;
    this.DB = new DB(db)

    if (observer) {
      this.formula = observer.cron_formula;
    }

    this.init();
  }

  init() {
    this.DB.connect();
    this.messageQueueModel = new MessageQueueModel(this.DB.connection, this.table);
    this.messageQueueViewModel = new MessageQueueViewModel(this.DB.connection, this.table);
  }

  observeMessageQueue(cb) {
    const formula = this.formula || '*/1 * * * *';

    schedule.scheduleJob(formula, () => {
      this.messageQueueModel
        .getMessageByStatusAndExpired(this.table.status.values[0])
        .then((list) => {
          cb(list)
        });
    });
  }

  observeMessageQueueView(cb) {
    const formula = this.formula || '*/1 * * * *';

    schedule.scheduleJob(formula, () => {
      this.messageQueueViewModel
        .getMessageByStatusAndExpired(this.table.status.values[0])
        .then((list) => {
          cb(list)
        });
    });
  }
}

module.exports = TObserver;
