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

    const user = {
      name,
      email,
      password: hash,
    };

    db.addUser(user, (dbErr, dbResult) => {
      if (dbErr) return res.sendStatus(400);

      const userInfo = dbResult.rows[0];
      const { id, name, email } = userInfo;
      const userSign = { id, name, email };

      jwt.sign(userSign, secret, (jwtErr, token) => {
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

        const { id, name, email } = userInfo;
        const user = { id, name, email };

        jwt.sign(user, secret, (jwtErr, token) => {
          if (jwtErr) return res.sendStatus(500);

          res.send({ user, token });
        });
      });
  });
});

router.post('/images', (req, res) => {
  const { token, photoUrl } = req.body;

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(401);
    const { id } = user;
    // console.log('authorized user');
    // console.log('user: ', user);
    console.log('user: ', user);
    console.log('photoUrl: ', photoUrl);
    db.addUrl({ userId: id, photoUrl }, (dbErr) => {
      if (dbErr) return res.sendStatus(400);

      res.sendStatus(200);
    });
    // res.sendStatus(200);
  });
});

router.get('/images/:token', (req, res) => {
  // const { userId } = req.query;
  const { token } = req.params;

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(401);
    const { id } = user;
    db.getUrls(id, (err, result) => {
      if (err) return res.sendStatus(404);
      res.send(result);
    });
    // res.sendStatus(200);
  });

  // use db function to retrieve data from database
  // db.getUrls(userId, (err, result) => {
  //   if (err) return res.sendStatus(404);

  //   res.send(result);
  // });
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
