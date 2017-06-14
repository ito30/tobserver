const TObserver = require('../index');

jest.mock('mysql');
jest.mock('node-schedule');

let tObserver = null;
let obs = null;
let table = null;
let db = null;

const mockGetMessageByStatusAndExpired = jest.fn((status) => {
  return Promise.resolve([1,2]);
});

describe('TObserver', () => {
  beforeEach((done) => {
    obs = {"development":{"cron_formula":"*/20 * * * * *","expiration_time":"10","expiration_type":"seconds"}};
    table = {"queue":{"column":"queue"},"uuid":{"column":"uuid"},"payload":{"column":"payload"},"status":{"column":"status","values":["NEW","PUBLISHED"]},"expired_at":{"column":"expired_at"}};
    db = {"database":"dbcar_admin_tiket","host":"127.0.0.1","username":"root","password":"terserah","timezone":"UTC+07","logging":false};

    tObserver = new TObserver(db, table, obs);
    tObserver.messageQueueModel.getMessageByStatusAndExpired = mockGetMessageByStatusAndExpired;
    tObserver.messageQueueViewModel.getMessageByStatusAndExpired = mockGetMessageByStatusAndExpired;
    done();
  });

  describe('init()', () => {
    it('should succeed doing initialization', (done) => {
      tObserver.init();
      expect(tObserver.messageQueueModel).toBeDefined();
      done();
    });
  });

  describe('observeMessageQueue()', () => {
    it('should succeed observing \'message_queue\' table', (done) => {
      tObserver.observeMessageQueue((list) => {
        expect(list).toBeInstanceOf(Array);
        done();
      });
    });
  });

  describe('observeMessageQueueView()', () => {
    it('should succeed observing \'message_queue_view\' table', (done) => {
      tObserver.observeMessageQueueView((list) => {
        expect(list).toBeInstanceOf(Array);
        done();
      });
    });
  });
});
