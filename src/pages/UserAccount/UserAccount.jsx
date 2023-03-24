import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { tryToken, selectAuth } from '../../redux/slices/authSlice';
import { fetchUser } from '../../redux/slices/userSlice';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);
  console.log('auth', auth);

  useEffect(() => {
    console.log('hello');
    dispatch(tryToken());
  }, []);
  return (
    <div>
      <h1>User Account lives here</h1>
    </div>
  );
};

export default UserAccount;
