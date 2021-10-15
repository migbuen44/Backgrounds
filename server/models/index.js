const pool = require('../../database/index');

const db = {
  addUser: ({ name, email, password }, callback) => {
    const queryString = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}') RETURNING id, name, email`;

    pool.query(queryString, (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result);
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
  addUrl: ({ userId, photoUrl }, callback) => {
    const queryString = `INSERT INTO image_urls (url, user_id) VALUES ('${photoUrl}', ${userId})`;

    pool.query(queryString, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },
  getUrls: (userId, callback) => {
    const queryString = `SELECT url FROM image_urls WHERE user_id = ${userId}`;

    pool.query(queryString, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
};

module.exports = db;
