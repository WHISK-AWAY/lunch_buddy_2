import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { tryToken, selectAuth } from '../../redux/slices/authSlice';
import { fetchUser, selectUser } from '../../redux/slices/userSlice';
import chevronRight from '../../assets/icons/chevron-right.svg';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);

  const [professionalTags, setProfessionalTags] = useState([]);
  const [socialTags, setSocialTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);
  const [tagExpand, setTagExpand] = useState(true);

  useEffect(() => {
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
    const social = tags?.filter(
      (tag) => tag.category.categoryName === 'social'
    );
    const professional = tags?.filter(
      (tag) => tag.category.categoryName === 'professional'
    );
    const dietary = tags?.filter(
      (tag) => tag.category.categoryName === 'dietary restrictions'
    );
    const cuisine = tags?.filter(
      (tag) => tag.category.categoryName === 'cuisine'
    );

    setSocialTags(social || []);
    setProfessionalTags(professional || []);
    setDietaryTags(dietary || []);
    setCuisineTags(cuisine || []);
  }, [user]);

  console.log('social', socialTags);

  if (!tags) return <p>Loading tags...</p>;

  return (
    <div
      id="user-container"
      className="font-tenor flex flex-row-reverse flex-nowrap w-screen justify-center h-[calc(100vh_-_69px)] lg:overflow-hidden"
    >
      <div className="lg:basis-1/2 basis-4/5 flex flex-col items-center mx-2 px-4 h-full lg:overflow-auto md:px-10">
        <h1 className="my-8 text-2xl text-headers">
          {auth.user.fullName.toUpperCase()}
        </h1>
        <div id="user-avatar" className=" flex justify-center ">
          <img
            src={auth.user.avatarUrl}
            alt="user avatar"
            className="object-cover aspect-square w-24 h-24 rounded-[100%]"
          />
        </div>
        {/*Link to edit page */}
        <div id="about-me" className="pt-14 text-justify text-primary-gray">
          <p>{auth.user.aboutMe}</p>
        </div>

        <div id="tags-container" className="flex flex-wrap my-8">
          <h2 className="">
            {socialTags[0]?.category.categoryName.toUpperCase()}
          </h2>

          <div id="social-tags" className="w-full flex gap-x-5 gap-y-2 my-6">
            <img
              className={`w-4 transition-all ${
                tagExpand ? '' : 'rotate-90'
              } self-start`}
              src={chevronRight}
              alt="Expand/Retract Arrow"
            />
            <div className="flex flex-row flex-wrap gap-3">
              {socialTags.map((social) => {
                return (
                  <p
                    key={social.id}
                    className="border border-primary-gray rounded-full px-4 h-7 lg:h-auto flex  gap-4 items-center justify-center grow"
                  >
                    {social.tagName}
                  </p>
                );
              })}
            </div>
          </div>

          <h2 className="">
            {professionalTags[0]?.category.categoryName.toUpperCase()}
          </h2>
          <div
            id="professional-tags"
            className=" w-full flex flex-wrap gap-x-5 gap-y-2 my-6"
          >
            <img
              className={`w-6 transition-all ${tagExpand ? '' : 'rotate-90'}`}
              src={chevronRight}
              alt="Expand/Retract Arrow"
            />
            {professionalTags.map((professional) => {
              return (
                <p
                  key={professional.id}
                  className="border border-black rounded-full px-4 h-7 lg:h-auto flex  gap-4 items-center"
                >
                  {professional.tagName}
                </p>
              );
            })}
          </div>

          <h2 className="">
            {cuisineTags[0]?.category.categoryName.toUpperCase()}
          </h2>
          <div
            id="cuisine-tags"
            className="w-full flex flex-wrap gap-x-5 gap-y-2 my-6"
          >
            <img
              className={`w-6 transition-all ${tagExpand ? '' : 'rotate-90'}`}
              // src={tagExpand ? chevronRight : chevronDown}
              src={chevronRight}
              alt="Expand/Retract Arrow"
            />
            {cuisineTags.map((cuisine) => {
              return (
                <p
                  key={cuisine.id}
                  className="border border-black rounded-full px-4 h-7 lg:h-auto flex gap-4 items-center"
                >
                  {cuisine.tagName}
                </p>
              );
            })}
          </div>

          {dietaryTags.length > 0 && (
            <div>
              <h2 className="ml-12">
                {dietaryTags[0]?.category.categoryName.toUpperCase()}
              </h2>

              <div
                id="dietary-tags"
                className="w-full flex flex-wrap gap-x-5 gap-y-2 my-6"
              >
                <img
                  className={`w-6 transition-all ${
                    tagExpand ? '' : 'rotate-90'
                  }`}
                  // src={tagExpand ? chevronRight : chevronDown}
                  src={chevronRight}
                  alt="Expand/Retract Arrow"
                />
                {dietaryTags.map((dietary) => {
                  return <p key={dietary.id}>{dietary.tagName}</p>;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="bg-cover
          bg-[url('/assets/bgImg/accView.jpg')] basis-1/2 hidden lg:block h-full"
      ></div>
    </div>
  );
};

export default UserAccount;
