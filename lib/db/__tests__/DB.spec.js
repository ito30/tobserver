const DB = require('../DB');

jest.mock('mysql');

let db = null;

describe('DB', () => {
  beforeEach((done) => {
    db = new DB({
      host: '',
      username: '',
      password: '',
      database: '',
    });

    done();
  });

  it('should be succeed creating connection', (done) => {
    expect(db.connection).toBeDefined();
    done();
  });

  describe('connect()', () => {
    it('should be connected', (done) => {
      db.connect();

      done();
    });

    it('should be failed to connect', (done) => {
      db.connection = null;
      db.connect();
      done();
    });
  });

  describe('disconnect()', () => {
    it('should be disconnected', (done) => {
      db.disconnect();

      done();
    });

    it('should be failed to disconnect', (done) => {
      db.connection = null;
      db.disconnect();
      done();
    });
  });
});
