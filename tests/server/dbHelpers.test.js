const db = require('../../server/dbHelpers/index');
const pool = require('../../database/index');

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

describe('server/dbHelpers', () => {
  let testUserId;
  const userInfoAltExpected = {
    name: 'test',
    email: 'test@gmail.com',
  };
  describe('addUser is provided with name, email, and password', () => {
    test('addUser calls callback function with user info', (done) => {
      const testData = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test_password',
      };
      const callback = (err, result) => {
        expect(err).toBeNull();
        if (err) done(err);
        const userInfo = result.rows[0];
        const userInfoAlt = {
          name: userInfo.name,
          email: userInfo.email,
        };
        expect(userInfoAlt).toEqual(userInfoAltExpected);
        expect(typeof userInfo.id).toBe('number');
        done();
      };
      db.addUser(testData, callback);
    });
  });
  describe('getUser is provided with email', () => {
    test('getUser calls callback function with user info', (done) => {
      const testEmail = 'test@gmail.com';

      const callback = (err, result) => {
        expect(err).toBeNull();
        if (err) return done(err);
        const userInfo = result.rows[0];
        const userInfoAlt = {
          name: userInfo.name,
          email: userInfo.email,
        };
        expect(userInfoAlt).toEqual(userInfoAltExpected);
        expect(typeof userInfo.id).toBe('number');
        testUserId = userInfo.id;
        return done();
      };
      db.getUser(testEmail, callback);
    });
  });
  describe('addUrl is provided with userId and photoUrl', () => {
    test('addUrl calls callback function with null', (done) => { // eventually change addUrl to return info and test info match
      const testData = {
        userId: testUserId,
        photoUrl: testUrl,
      };
      const callback = (err) => {
        expect(err).toBeNull();
        if (err) return done(err);
        return done();
      };
      db.addUrl(testData, callback);
    });
  });
  describe('getUrls is provided with userId', () => {
    test('getUrls calls callback function with user urls', (done) => {
      const callback = (err, result) => {
        expect(err).toBeNull();
        if (err) return done(err);
        const urls = result.rows;
        expect(urls).toEqual([{ url: testUrl }]);
        return done();
      };
      db.getUrls(testUserId, callback);
    });
  });
});
