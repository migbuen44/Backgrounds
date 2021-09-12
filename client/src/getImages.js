import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import info from './info';

const { url } = info;

const getImages = () => {
  const userInfo = useSelector((state) => state.userInfo.value);
  const { id } = userInfo;

  axios.get(`${url}/images?user_id=${id}`)
    .then((response) => {
      const savedImages = response.data;

      // set redux saved Images state to savedImages value
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getImages;
