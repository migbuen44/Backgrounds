const db = require('../../server/models/index');
const pool = require('../../database/index');

afterAll(() => {
  const deleteUserQueryString = "DELETE FROM users WHERE name='test'";
  pool.query(deleteUserQueryString);
});

describe('addUser model', () => {
  test('addUser calls callback function with user info', (done) => {
    const testData = {
      name: 'test',
      email: 'test@gmail.com',
      password: 'test_password',
    };

    const callback = (err, result) => {
      if (err) {
        done(err);
      } else {
        const expected = {
          name: 'test',
          email: 'test@gmail.com',
        };
        expect(result).toEqual(expected);
        done();
      }
    };

    db.addUser(testData, callback);
  });
});
