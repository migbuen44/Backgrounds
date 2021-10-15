const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = require('./secret');
const controller = require('./controllers/index');

const authenticate = (req, res, next) => {
  const { token } = req.params;
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/signup', controller.addUser);

router.post('/login', controller.getUser);

router.post('/images/:token', authenticate, controller.addUrl);

router.get('/images/:token', authenticate, controller.getUrls);

router.post('/spotifyLogin', controller.getSpotifyCode);

module.exports = router;
