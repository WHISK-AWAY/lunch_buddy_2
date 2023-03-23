import { updateLocation } from '../redux/slices';
import axios from 'axios';
import checkToken from './checkToken';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Must pass in dispatch function from react component in order to get around
 * "the rules of Hooks"...otherwise, pull token & make the call to axios directly
 */
export default function getLocation(dispatch) {
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function geoSuccess(position) {
    const { coords } = position;

    const lat = coords.latitude;
    const long = coords.longitude;

    if (dispatch) {
      // dispatch updateLocation thunk, passing in location
      dispatch(updateLocation({ lat, long }));
    } else {
      console.log('not called from dispatch -- updating loc in api directly');
      const { user, token } = await checkToken();
      await axios.put(
        API_URL + `/api/user/${user.id}/location`,
        { lat, long },
        {
          headers: { authorization: token },
        }
      );
    }
  }

  function geoError(err) {
    console.warn(`Geo error: ${err.code}: ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}
