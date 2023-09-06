import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { tryToken, selectAuth } from '../../redux/slices/authSlice';
import {
  fetchUser,
  selectUser,
  updateUser,
} from '../../redux/slices/userSlice';
import getLocation from '../../utilities/geo';
import squaresSolid from '../../assets/icons/squares-solid.svg';
import pencil from '../../assets/icons/pencil.svg';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);

  const [professionalTags, setProfessionalTags] = useState([]);
  const [socialTags, setSocialTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(tryToken());
    }
  }, []);

  useEffect(() => {
    // use token to keep track of logged-in user (id)
    // once that's known we can pull down user data
    // if (auth.error) {
    //   navigate('/login');
    // } else if (!auth.user?.id) {
    //   dispatch(tryToken());
    // } else dispatch(fetchUser(auth.user.id));
    // if inactive, flip status & pull location
    // if (auth.user?.status === 'inactive') {
    //   getLocation(dispatch);
    //   dispatch(updateUser({ status: 'active' }));
    // }
  }, [dispatch, auth]);

  useEffect(() => {
    if (token && auth.user.id) {
      dispatch(fetchUser(auth.user.id));
    }
  }, [dispatch, auth]);

  const tags = user.tags;

  useEffect(() => {
    const social = tags?.filter(
      (tag) => tag.category.categoryName === 'social'
    );
    const professional = tags?.filter(
      (tag) => tag.category.categoryName === 'professional'
    );
    const dietary = tags?.filter(
      (tag) => tag.category.categoryName === 'dietary restriction'
    );
    const cuisine = tags?.filter(
      (tag) => tag.category.categoryName === 'cuisine'
    );

    setSocialTags(social || []);
    setProfessionalTags(professional || []);
    setDietaryTags(dietary || []);
    setCuisineTags(cuisine || []);
  }, [user]);

  if (auth.user.isLoading) return <p>Loading user info...</p>;
  if (!auth.user?.id || !user.id) return <p>User login check failed...</p>;

  if (!user?.tags?.length > 0) return <p>Loading tag information...</p>;

  return (
    <div
      id="user-container"
      className="font-tenor flex flex-row-reverse flex-nowrap w-screen justify-center h-[calc(100vh_-_65px)] overflow-hidden text-primary-gray  bg-fixed"
    >
      <div className="lg:basis-1/2 flex flex-col items-center  h-full relative bg-pink-100/30">
        <div className="sticky px-[10%] z-10 bg-white w-full h-40 top-0  flex flex-col justify-start  items-center">
          <h1 className="pt-10 text-2xl text-headers ">
            {auth.user.fullName.toUpperCase()}
          </h1>

          <div id="user-avatar" className=" flex justify-center relative">
            <Link
              to="/edituser"
              className="w-14 h-14 rounded-full bg-primary-gray/20 absolute -right-5 top-7 z-0"
            >
              <img
                src={pencil}
                className="h-[16px] w-6 m-auto relative top-[11px] rotate-3 left-2"
              />
            </Link>
            <img
              src={auth.user.avatarUrl}
              alt="user avatar"
              className="object-cover aspect-square w-28 h-28 rounded-[100%] z-10 bg-white p-1  drop-shadow-lg relative translate-y-[30%] place-self-end"
            />
          </div>
        </div>

        <div className="px-8 py-7 overflow-auto scrollbar-hide">
          <p className="pt-12 flex items-center justify-center text-sm">
            {user.city.toUpperCase()}, {user.state}
          </p>
          <div id="about-me" className="pt-7 text-justify text-primary-gray">
            <p>{auth.user.aboutMe}</p>
          </div>

          <div id="tags-container" className="flex flex-wrap my-8">
            <h2 id="social-tags" className="text-headers">
              {socialTags[0]?.category.categoryName.toUpperCase()}
            </h2>
            <div className="w-full flex gap-x-5 gap-y-2 my-6">
              <img
                className="w-2 relative rotate-45 top-[8px] self-start"
                src={squaresSolid}
              />
              <div className="flex flex-row flex-wrap gap-3">
                {socialTags.map((social) => {
                  return (
                    <p
                      key={social.id}
                      className="border border-primary-gray rounded-full px-4 h-7 lg:h-auto flex  gap-4 items-center justify-center grow text-sm bg-white"
                    >
                      {social.tagName}
                    </p>
                  );
                })}
              </div>
            </div>

            <h2 id="professional-tags" className="text-headers">
              {professionalTags[0]?.category.categoryName.toUpperCase()}
            </h2>
            <div className=" w-full flex gap-x-5 gap-y-2 my-6">
              <img
                className="w-2 relative rotate-45 bottom-[-30%] top-[8px] self-start"
                src={squaresSolid}
              />
              <div className="flex flex-row flex-wrap gap-3">
                {professionalTags.map((professional) => {
                  return (
                    <p
                      key={professional.id}
                      className="border border-primary-gray rounded-full px-4 h-7 lg:h-auto flex  gap-4 items-center text-sm bg-white grow justify-center"
                    >
                      {professional.tagName}
                    </p>
                  );
                })}
              </div>
            </div>

            <h2 id="cuisine-tags" className="text-headers">
              {cuisineTags[0]?.category.categoryName.toUpperCase()}
            </h2>
            <div className="w-full flex gap-x-5 gap-y-2 my-6">
              <img
                className="w-2 relative rotate-45 top-[8px] self-start"
                src={squaresSolid}
              />
              <div className="flex flex-row flex-wrap gap-3">
                {cuisineTags.map((cuisine) => {
                  return (
                    <p
                      key={cuisine.id}
                      className="border border-primary-gray rounded-full px-4 h-7 lg:h-auto flex gap-4 items-center text-sm capitalize bg-white grow justify-center"
                    >
                      {cuisine.tagName}
                    </p>
                  );
                })}
              </div>
            </div>
            {dietaryTags.length > 0 && (
              <div>
                <h2 id="dietary-tags" className="text-headers">
                  DIETARY RESTRICTIONS
                </h2>

                <div className="w-full flex gap-x-5 gap-y-2 my-6">
                  <img
                    className="w-2 relative rotate-45 top-[8px] self-start"
                    src={squaresSolid}
                  />
                  <div className="flex flex-wrap gap-3">
                    {dietaryTags.map((dietary) => {
                      return (
                        <p
                          key={dietary.id}
                          className="border capitalize border-primary-gray rounded-full px-4 h-7 lg:h-auto flex gap-4 items-center text-sm bg-white grow justify-center"
                        >
                          {dietary.tagName}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        id="bg-img"
        className="bg-cover
          bg-[url('/assets/bgImg/accView.jpg')] basis-1/2 hidden lg:block h-full"
      ></div>
    </div>
  );
};

export default UserAccount;
