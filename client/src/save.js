import axios from 'axios';
import config from './config';

const { url } = config;

const save = (photoUrl) => {
  const token = localStorage.getItem('access_token');
  axios.post(`${url}/images/${token}`, { photoUrl })
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
};

export default save;
