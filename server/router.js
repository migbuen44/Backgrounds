const router = require('express').Router();
const controller = require('./controllers/index');

router.post('/signup', controller.addUser);

router.post('/login', controller.getUser);

router.post('/images', controller.addUrl);

router.get('/images/:token', controller.getUrls);

router.post('/spotifyLogin', controller.getSpotifyCode);

module.exports = router;
