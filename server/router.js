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
    if (error) {
      res.send(error);
    }

    const userInfo = {
      name,
      email,
      password: hash,
    };

    db.addUser(userInfo, (err, result) => {
      if (err) {
        res.send('error');
      } else {
        res.send(result);
      }
    });
  });
});

router.post('/login', (req, res) => {
  const user = {
    id: 1,
    name: 'miguel',
  };
  const { name , password } = req.body;

  jwt.sign({ user }, secret, (err, token) => {
    res.send(token);
  });
});

router.post('/save', (req, res) => {
  const token = req.body.token;

  jwt.verify(token, secret, (err) => {
    if (err) {
      res.sendStatus(401);
    }

    console.log('authorized user');
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
