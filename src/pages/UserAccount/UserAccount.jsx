import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { tryToken, selectAuth } from '../../redux/slices/authSlice';
import { fetchUser, selectUser } from '../../redux/slices/userSlice';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);

  const [professionalTags, setProfessionalTags] = useState([]);
  const [socialTags, setSocialTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);

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
  }, [dispatch, auth]);

  const tags = user.tags;
  useEffect(() => {
    console.log(tags);
    if (tags) {
      const social = tags.filter((tag) => tag.categoryId === 1);
      const professional = tags.filter((tag) => tag.categoryId === 2);
      const dietary = tags.filter((tag) => tag.categoryId === 3);
      const cuisine = tags.filter((tag) => tag.categoryId === 4);
      setSocialTags(social);
      setProfessionalTags(professional);
      setDietaryTags(dietary);
      setCuisineTags(cuisine);
    }
  }, [user]);

  if (!tags) return <p>Loading tags...</p>;

  return (
    <div id="user-container">
      <div className="flex flex-col items-center justify-center w-screen mx-2 font-tenor">
        <h1 className="my-8 text-lg font-bold text-headers">
          {auth.user.fullName}
        </h1>
        <img
          src={auth.user.avatarUrl}
          alt="user avatar"
          className="h-80 w-100 rounded-full"
        ></img>
        {/*Link to edit page */}
        <p>{auth.user.aboutMe}</p>
        <div>
          {socialTags.map((social) => {
            return <p key={social.id}>{social.tagName}</p>;
          })}
        </div>
        <div>
          {professionalTags.map((professional) => {
            return <p key={professional.id}>{professional.tagName}</p>;
          })}
        </div>

        <div>
          {cuisineTags.map((cuisine) => {
            return <p key={cuisine.id}>{cuisine.tagName}</p>;
          })}
        </div>
        {dietaryTags.length > 0 && (
          <div>
            {dietaryTags.map((dietary) => {
              return <p key={dietary.id}>{dietary.tagName}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
