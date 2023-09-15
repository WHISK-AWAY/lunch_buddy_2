import { updateLocation } from '../redux/slices';
import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

/**
 * Must pass in dispatch function from react component in order to get around
 * "the rules of Hooks"...otherwise, pull token & make the call to axios directly
 */
export default function getLocation(dispatch, userId) {
  if (!dispatch) throw new Error('No dispatch function provided.');
  if (!userId) throw new Error('No user id provided.');

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
      // console.log('not called from dispatch -- updating loc in api directly');
      // we should never wind up here -- TODO: remove 'if' construct & throw error if dispatch === undefined
      // const { user, token } = await checkToken();

      const token = window.localStorage.getItem('token');
      if (!token) throw new Error('No token found in localStorage.');

      await axios.put(
        VITE_API_URL + `/api/user/${userId}/location`,
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

export async function generateGeoDemo(userState, navigate) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      const center = {
        latitude,
        longitude,
      };
      axios
        .post(
          VITE_API_URL + '/api/user/generate/demo',
          {
            center,
            radius: 0.5,
            city: userState.city,
            state: userState.state,
            id: userState.id,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem('token'),
            },
          }
        )
        .then(() => {
          window.localStorage.setItem('demoMode', 'true');
          navigate('/match');
        });
    },
    function (err) {
      console.log('error setting up demo mode:', err);
    }
  );
}
