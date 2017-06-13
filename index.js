const db = require('./database.json');
const table = require('./table.json');
const observer = require('./observer.json');
const schedule = require('node-schedule');
const DB = require('./lib/db/DB');
const MessageQueueModel = require('./lib/model/MessageQueueModel');

class TObserver {
  constructor(db, table, observer) {
    this.table = table;
    this.DB = new DB(db)

    if (observer) {
      this.formula = observer.cron_formula;
    }
  }

  observeMessageQueue(callback) {
    const formula = this.formula || '*/1 * * * *';

    schedule.scheduleJob(formula, callback);
  }
}

const tObserver = new TObserver(db, table, observer);

tObserver.DB.connect();
const messageQueueModel = new MessageQueueModel(tObserver.DB.connection, tObserver.table);
messageQueueModel.getMessageByStatusAndExpired('PUBLISHED')
  .then((results) => {
    console.log(results);
  });
