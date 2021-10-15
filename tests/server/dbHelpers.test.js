const db = require('../../server/dbHelpers/index');
const pool = require('../../database/index');

let testUserId;
const testUrl = 'https://test.com';

beforeAll(() => {
  const deleteUrlQueryString = `DELETE FROM image_urls WHERE url = '${testUrl}'`;
  pool.query(deleteUrlQueryString);
  const deleteUserQueryString = "DELETE FROM users WHERE name='test'";
  pool.query(deleteUserQueryString);
});

afterAll(() => {
  const deleteUrlQueryString = `DELETE FROM image_urls WHERE url = '${testUrl}'`;
  pool.query(deleteUrlQueryString);
  const deleteUserQueryString = "DELETE FROM users WHERE name='test'";
  pool.query(deleteUserQueryString);
});

describe('dbHelpers', () => {
  test('addUser calls callback function with user info', (done) => {
    const testData = {
      name: 'test',
      email: 'test@gmail.com',
      password: 'test_password',
    };

    const callback = (err, result) => {
      if (err) return done(err);

      const userInfo = result.rows[0];

      expect(userInfo.name).toBe('test');
      expect(userInfo.email).toBe('test@gmail.com');
      done();
    };

    db.addUser(testData, callback);
  });

  test('getUser calls callback function with user info', (done) => {
    const testEmail = 'test@gmail.com';

    const callback = (err, result) => {
      if (err) return done(err);

      const userInfo = result.rows[0];
      expect(userInfo.name).toBe('test');
      expect(userInfo.email).toBe('test@gmail.com');
      testUserId = userInfo.id;
      done();
    };

    db.getUser(testEmail, callback);
  });

  test('addUrl calls callback function with null', (done) => {
    const testData = {
      userId: testUserId,
      photoUrl: testUrl,
    };

    const callback = (err) => {
      if (err) return done(err);

      expect(err).toBeNull();
      done();
    };

    if (!testUserId) return done('testUserId is not defined');
    db.addUrl(testData, callback);
  });

  test('getUrls calls callback function with user urls', (done) => {
    const callback = (err, result) => {
      if (err) return done(err);

      const urls = result.rows;
      expect(urls).toEqual([{ url: testUrl }]);
      done();
    };

    db.getUrls(testUserId, callback);
  });
});
