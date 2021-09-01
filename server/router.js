const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
const secret = require('./secret');
const db = require('./models/index');

router.post('/signup', (req, res) => {
  const { name, password, email } = req.body;

  bcrypt.hash(password, 10, (error, hash) => {
    // console.log('hashed password: ', hash);
    if (error) return res.sendStatus(500);

    const userInfo = {
      name,
      email,
      password: hash,
    };

    db.addUser(userInfo, (err) => {
      if (err) return res.sendStatus(400);

      const user = { name, email };

      jwt.sign(user, secret, (jwtErr, token) => {
        if (jwtErr) return res.sendStatus(500);

        res.send({ user, token });
      });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.getUser(email, (dbErr, dbResult) => {
    if (dbErr) return res.sendStatus(404);

    const userInfo = dbResult.rows[0];
    const hashedPassword = userInfo.password;

    bcrypt.compare(password, hashedPassword)
      .then((passwordResult) => {
        if (!passwordResult) return res.sendStatus(401);

        const { name, email } = userInfo;
        const user = { name, email };

        jwt.sign(user, secret, (jwtErr, token) => {
          if (jwtErr) return res.sendStatus(500);

          res.send({ user, token });
        });
      });
  });
});

router.post('/save', (req, res) => {
  const token = req.body.token;

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(401);

    console.log('authorized user');
    console.log('user: ', user);
  });
});

router.post('/spotifyLogin', (req, res) => {
  const { code } = req.body;
  const spotifyApi = new SpotifyWebApi(config.spotifyWebAPIconfig);

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
});

module.exports = router;
