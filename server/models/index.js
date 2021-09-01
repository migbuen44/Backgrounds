const pool = require('../../database/index');

const db = {
  addUser: ({ name, email, password }, callback) => {
    const queryString = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;

    console.log(queryString);

    pool.query(queryString, (err) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null);
      }
    });
  },
  getUser: (email, callback) => {
    console.log('email: ', email);
    const queryString = `SELECT * FROM users WHERE email = '${email}'`;

    pool.query(queryString, (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
};

module.exports = db;
