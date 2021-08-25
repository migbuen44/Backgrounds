import axios from 'axios';
import info from './info';

const { url } = info;

const save = (token) => {
  axios.post(`${url}/save`, { token })
    .then(() => {
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default save;
