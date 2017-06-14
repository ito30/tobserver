const MessageQueueModel = require('../MessageQueueModel');

let mqModel = null;
let connection = null;
let table = null;

describe('MessageQueueModel', () => {
  beforeEach((done) => {
    connection = {
      query: (args, cb) => {
        cb(null, [1, 2], ['a', 'b']);
      }
    };
    table = { "queue": { "column": "queue" }, "uuid": { "column": "uuid" }, "payload": { "column": "payload" }, "status": { "column": "status", "values": ["NEW", "PUBLISHED"] }, "expired_at": { "column": "expired_at" } }

    mqModel = new MessageQueueModel(connection, table);
    done();
  });

  describe('getMessageByStatusAndExpired()', () => {
    it('should succeed getting record', (done) => {
      mqModel.getMessageByStatusAndExpired('NEW')
        .then((results) => {
          expect(results).toEqual([1, 2]);
          done();
        });
    });

    it('should be failed to get record', (done) => {
      const expectedResult = [];
      mqModel.connection = {
        query: (args, cb) => {
          cb("error", [], []);
        }
      };

      mqModel.getMessageByStatusAndExpired('NEW')
        .then((results) => {
          expect(results).toEqual([]);
          done();
        });
    });
  });

  describe('getMessageByUuid()', () => {
    it('should succeed getting record', (done) => {
      mqModel.getMessageByUuid('uuid-here')
        .then((results) => {
          expect(results).toEqual([1, 2]);
          done();
        });
    });

    it('should be failed to get record', (done) => {
      const expectedResult = [];
      mqModel.connection = {
        query: (args, cb) => {
          cb("error", [], []);
        }
      };

      mqModel.getMessageByUuid('uuid-here')
        .then((results) => {
          expect(results).toEqual([]);
          done();
        });
    });
  });
});
