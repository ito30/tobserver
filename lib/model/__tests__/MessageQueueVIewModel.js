const MessageQueueViewModel = require('../MessageQueueViewModel');

let mqViewModel = null;
let connection = null;
let table = null;

describe('MessageQueueViewModel', () => {
  beforeEach((done) => {
    connection = {
      query: (args, cb) => {
        cb(null, [1, 2], ['a', 'b']);
      }
    };
    table = { "queue": { "column": "queue" }, "uuid": { "column": "uuid" }, "payload": { "column": "payload" }, "status": { "column": "status", "values": ["NEW", "PUBLISHED"] }, "expired_at": { "column": "expired_at" } }

    mqViewModel = new MessageQueueViewModel(connection, table);
    done();
  });

  describe('getMessageByStatus()', () => {
    it('should succeed getting record', (done) => {
      mqViewModel.getMessageByStatus('NEW')
        .then((results) => {
          expect(results).toEqual([1, 2]);
          done();
        });
    });

    it('should be failed to get record', (done) => {
      const expectedResult = [];
      mqViewModel.connection = {
        query: (args, cb) => {
          cb("error", [], []);
        }
      };

      mqViewModel.getMessageByStatus('NEW')
        .then((results) => {
          expect(results).toEqual([]);
          done();
        });
    });
  });

  describe('getMessageByStatusAndExpired()', () => {
    it('should succeed getting record', (done) => {
      mqViewModel.getMessageByStatusAndExpired('NEW')
        .then((results) => {
          expect(results).toEqual([1, 2]);
          done();
        });
    });

    it('should be failed to get record', (done) => {
      const expectedResult = [];
      mqViewModel.connection = {
        query: (args, cb) => {
          cb("error", [], []);
        }
      };

      mqViewModel.getMessageByStatusAndExpired('NEW')
        .then((results) => {
          expect(results).toEqual([]);
          done();
        });
    });
  });

  describe('getMessageByUuid()', () => {
    it('should succeed getting record', (done) => {
      mqViewModel.getMessageByUuid('uuid-here')
        .then((results) => {
          expect(results).toEqual([1, 2]);
          done();
        });
    });

    it('should be failed to get record', (done) => {
      const expectedResult = [];
      mqViewModel.connection = {
        query: (args, cb) => {
          cb("error", [], []);
        }
      };

      mqViewModel.getMessageByUuid('uuid-here')
        .then((results) => {
          expect(results).toEqual([]);
          done();
        });
    });
  });
});
