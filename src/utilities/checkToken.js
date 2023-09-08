import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// helper to pull & validate token
export default async function checkToken() {
  // pull token from localStorage & use it to poll for user info
  const token = window.localStorage.getItem('token');
  if (!token) throw new Error('No token found in localStorage');

  const res = await axios.get(API_URL + '/api/auth', {
    headers: { authorization: token },
  });

  const user = res.data;

  if (!user) throw new Error('Failed token validation');
  return { token, user };
}
