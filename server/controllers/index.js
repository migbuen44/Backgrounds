const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SpotifyWebApi = require('spotify-web-api-node');
const secret = require('../secret');
const db = require('../models/index');
const config = require('../config');

const controller = {
  addUser: (req, res) => {
    const { name, password, email } = req.body;

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) return res.sendStatus(500);

      const userInput = {
        name,
        email,
        password: hash,
      };

      db.addUser(userInput, (dbErr, dbResult) => {
        if (dbErr) return res.sendStatus(400);

        const userInfo = dbResult.rows[0];
        const { id, name, email } = userInfo;
        const user = { id, name, email };

        jwt.sign(user, secret, (jwtErr, token) => {
          if (jwtErr) return res.sendStatus(500);

          res.send({ user, token });
        });
      });
    });
  },
  getUser: (req, res) => {
    console.log('req body: ', req.body);
    const { email, password } = req.body;

    db.getUser(email, (dbErr, dbResult) => {
      if (dbErr || !dbResult.rows.length) return res.sendStatus(404);

      const userInfo = dbResult.rows[0];
      const hashedPassword = userInfo.password;

      bcrypt.compare(password, hashedPassword)
        .then((passwordResult) => {
          if (!passwordResult) return res.sendStatus(401);

          const { id, name, email } = userInfo;
          const user = { id, name, email };

          jwt.sign(user, secret, (jwtErr, token) => {
            if (jwtErr) return res.sendStatus(500);

            res.send({ user, token });
          });
        });
    });
  },
  addUrl: (req, res) => {
    const { token, photoUrl } = req.body;

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(401);
      const { id } = user;
      db.addUrl({ userId: id, photoUrl }, (dbErr) => {
        if (dbErr) return res.sendStatus(400);

        res.sendStatus(200);
      });
    });
  },
  getUrls: (req, res) => {
    const { token } = req.params;

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(401);
      const { id } = user;
      db.getUrls(id, (err, result) => {
        if (err) return res.sendStatus(404);
        res.send(result);
      });
    });
  },
  getSpotifyCode: (req, res) => {
    const { code } = req.body;
    const spotifyApi = new SpotifyWebApi(config.spotifyWebAPIconfig);
    console.log('code:', code);

    spotifyApi.authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};

module.exports = controller;
