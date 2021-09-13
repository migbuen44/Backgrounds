import { useSelector, useDispatch } from 'react-redux';
import { updateSavedImages } from './slices/savedImagesSlice';
import axios from 'axios';
import info from './info';

const { url } = info;

// const getImages = () => {
//   // const dispatch = useDispatch();
//   const token = localStorage.getItem('access_token');

//   axios.get(`${url}/images?token=${token}`)
//     .then((response) => {
//       const savedImages = response.data;
//       dispatch(updateSavedImages(savedImages));
//       // set redux saved Images state to savedImages value
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export default getImages;
