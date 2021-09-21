import axios from 'axios';
import info from './info';

const { url } = info;

const save = (photoUrl) => {
  const token = localStorage.getItem('access_token');
  axios.post(`${url}/images`, { token, photoUrl })
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
};

export default save;
