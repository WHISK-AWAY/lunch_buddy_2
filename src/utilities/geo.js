import { updateLocation } from '../redux/slices';

/**
 * Must pass in dispatch function from react component in order to get around
 * "the rules of Hooks"
 */
export default function getLocation(dispatch) {
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function geoSuccess(position) {
    const { coords } = position;

    const lat = coords.latitude;
    const long = coords.longitude;

    // dispatch updateLocation thunk, passing in location
    dispatch(updateLocation({ lat, long }));
  }

  function geoError(err) {
    console.warn(`Geo error: ${err.code}: ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}
