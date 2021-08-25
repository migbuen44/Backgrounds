const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const SpotifyWebApi = require('spotify-web-api-node');
const config = require('./config');
const jwt = require('jsonwebtoken');

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.render();
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const user = {
    id: 1,
    name: 'miguel',
  };
  jwt.sign({ user }, 'secret', (err, token) => {
    res.send(token);
  });
});

app.post('/spotifyLogin', (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
