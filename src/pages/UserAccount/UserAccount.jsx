import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { tryToken, selectAuth } from '../../redux/slices/authSlice';
import { fetchUser, selectUser } from '../../redux/slices/userSlice';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  console.log('auth', auth);

  useEffect(() => {
    console.log('hello');
    dispatch(tryToken());
  }, []);

  const token = window.localStorage.getItem('token');
  if (!token) navigate('/login');

  useEffect(() => {
    // use token to keep track of logged-in user (id)
    // once that's known we can pull down user data
    if (auth.error) {
      navigate('/login');
    } else if (!auth.user?.id) {
      dispatch(tryToken());
    } else dispatch(fetchUser(auth.user.id));

    // if inactive, flip status & pull location
    if (auth.user?.status === 'inactive') {
      getLocation(dispatch);
      dispatch(updateUser({ status: 'active' }));
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (token && auth.user.id) {
      dispatch(fetchUser(auth.user.id));
    }
    // console.log('tags', auth.user.user?.tags);
  }, [dispatch, auth]);

  console.log('user', user.tags);

  return (
    <div>
      <h1>{auth.user.fullName}</h1>
      <img src={auth.user.avatarUrl}></img>
      {/*Link to edit page */}
      <p>{auth.user.aboutMe}</p>
      
    </div>
  );
};

export default UserAccount;
