import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import { selectAuth } from '../../redux/slices/authSlice';
import { fetchUser, selectUser } from '../../redux/slices/userSlice';

import squaresSolid from '../../assets/icons/squares-solid.svg';
import pencil from '../../assets/icons/pencil.svg';
import getWebpUrl from '../../utilities/webpUrl';

const UserAccount = () => {
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);

  const topImageRef = useRef(null);

  const [professionalTags, setProfessionalTags] = useState([]);
  const [socialTags, setSocialTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);

  useEffect(() => {
    if (auth.user?.id && !user.id) {
      dispatch(fetchUser());
    }
  }, [auth.user?.id, user.id]);

  useEffect(() => {
    // fade bg image in only after it's downloaded

    const bgImg = new Image();
    bgImg.src = '/assets/bgImg/accView-q30.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  const tags = user.tags;

  useEffect(() => {
    // TODO: surely there's a cleaner / less repetitive way to write this
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

  // TODO: can we thin these down a bit (if not get rid of them altogether)?
  if (auth.user.isLoading) return <p>Loading user info...</p>;
  if (!auth.user?.id || !user.id) return <p>User login check failed...</p>;

  if (!user?.tags?.length > 0) return <p>Loading tag information...</p>;

  return (
    <div
      id="user-container"
      className=" flex flex-row-reverse flex-nowrap w-screen justify-center  overflow-hidden text-primary-gray dark:text-white bg-fixed landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)]"
    >
      <div className="lg:basis-1/2 portrait:lg:basis-auto flex flex-col items-center h-full relative ">
        {/* MD landscape */}
        <header className="hidden sticky px-[10%] z-10 bg-white dark:bg-[#0a0908] w-full h-40 top-0  landscape:md:flex portrait:flex flex-col justify-start  items-center">
          <h1 className="pt-10 text-xl text-headers ">
            {user.fullName?.toUpperCase()}
          </h1>

          <div id="user-avatar" className=" flex justify-center relative">
            <Link
              to="/edituser"
              className="w-14 h-14 rounded-full bg-primary-gray/20 dark:bg-white/90 absolute -right-5 top-7 z-0"
            >
              <img
                src={pencil}
                alt="edit user account"
                className="h-[16px] w-6 m-auto relative top-[11px] rotate-3 left-2"
              />
            </Link>
            <picture>
              <source srcSet={getWebpUrl(user.avatarUrl)} type="image/webp" />
              <img
                src={user.avatarUrl}
                alt="your avatar image"
                className="object-cover aspect-square w-28 h-28 rounded-[100%] z-10 bg-white p-1  drop-shadow-lg relative translate-y-[30%] place-self-end"
              />
            </picture>
          </div>
        </header>

        <main className="px-8 py-7 overflow-auto scrollbar-hide bg-label/40 dark:bg-primary-gray/10 h-full 3xl:px-20 5xl:px-48 6xl:px-80 portrait:lg:px-20">
          {/* XXS landscape */}
          <section className="landscape:md:hidden portrait:hidden flex justify-center items-center mx-auto">
            <div className=" gap-4 flex landscape:md:hidden">
              <img
                src={user.avatarUrl}
                alt="your avatar image"
                className="object-cover aspect-square w-24 bg-white dark:bg-slate-800 rounded-[100%] p-1 drop-shadow-lg"
              />
              <div className="flex flex-col">
                <h1 className="text-lg text-headers">
                  {user.fullName.toUpperCase()}
                </h1>
                <p className="text-sm portrait:md:text-base">
                  {user.city.toUpperCase()}, {user.state}
                </p>
                <Link to="/edituser" className="text-sm underline">
                  Edit Profile
                </Link>
              </div>
            </div>
          </section>
          <p className="pt-12 hidden landscape:md:flex portrait:flex items-center justify-center text-sm portrait:md:text-base">
            {user.city.toUpperCase()}, {user.state}
          </p>
          <div
            id="about-me"
            className="pt-7 text-justify text-primary-gray text-sm portrait:md:text-base dark:text-white md:px-4"
          >
            <p>{user.aboutMe}</p>
          </div>

          <div
            id="tags-container"
            className="flex flex-wrap my-8 font-regular "
          >
            {/* TODO: lots of repetition here -- prime candidate for componentization */}
            <h2
              id="social-tags"
              className="text-headers portrait:md:text-[2.5vw]"
            >
              {socialTags[0]?.category.categoryName.toUpperCase()}
            </h2>
            <div className="w-full flex gap-x-5 gap-y-2 my-6">
              <img
                className="w-2 relative rotate-45 top-[8px] self-start"
                src={squaresSolid}
                alt=""
              />
              <div className="flex flex-row flex-wrap gap-3">
                {socialTags.map((social) => {
                  return (
                    <p
                      key={social.id}
                      className="border portrait:md:text-[2.1vw] 3xl:h-6 6xl:h-8 border-white rounded-full px-4 h-7 portrait:lg:h-8  flex dark:bg-[#0a0908] text-white gap-4 items-center justify-center grow text-xs test"
                    >
                      {social.tagName}
                    </p>
                  );
                })}
              </div>
            </div>

            <h2
              id="professional-tags"
              className="text-headers portrait:md:text-[2.5vw]"
            >
              {professionalTags[0]?.category.categoryName.toUpperCase()}
            </h2>
            <div className=" w-full flex gap-x-5 gap-y-2 my-6">
              <img
                className="w-2 relative rotate-45 bottom-[-30%] top-[8px] self-start"
                src={squaresSolid}
                alt=""
              />
              <div className="flex flex-row flex-wrap gap-3">
                {professionalTags.map((professional) => {
                  return (
                    <p
                      key={professional.id}
                      className="border portrait:md:text-[2.1vw] 3xl:h-6 6xl:h-8  portrait:lg:h-8 border-white rounded-full px-4 h-7  flex  gap-4 items-center text-sm dark:bg-[#0a0908] test text-white grow justify-center"
                    >
                      {professional.tagName}
                    </p>
                  );
                })}
              </div>
            </div>

            <h2
              id="cuisine-tags"
              className="text-headers portrait:md:text-[2.5vw]"
            >
              {cuisineTags[0]?.category.categoryName.toUpperCase()}
            </h2>
            <div className="w-full flex gap-x-5 gap-y-2 my-6">
              <img
                className="w-2 relative rotate-45 top-[8px] self-start"
                src={squaresSolid}
                alt=""
              />
              <div className="flex flex-row flex-wrap gap-3">
                {cuisineTags.map((cuisine) => {
                  return (
                    <p
                      key={cuisine.id}
                      className="border portrait:lg:h-8 portrait:md:text-[2.1vw] 3xl:h-6 6xl:h-8 border-white rounded-full px-4 h-7  flex gap-4 items-center text-sm capitalize test text-white grow justify-center"
                    >
                      {cuisine.tagName}
                    </p>
                  );
                })}
              </div>
            </div>
            {dietaryTags.length > 0 && (
              <div>
                <h2
                  id="dietary-tags"
                  className="text-headers portrait:md:text-[2.5vw]"
                >
                  DIETARY RESTRICTIONS
                </h2>

                <div className="w-full flex gap-x-5 gap-y-2 my-6">
                  <img
                    className="w-2 relative rotate-45 top-[8px] self-start"
                    src={squaresSolid}
                    alt=""
                  />
                  <div className="flex flex-wrap gap-3">
                    {dietaryTags.map((dietary) => {
                      return (
                        <p
                          key={dietary.id}
                          className="border portrait:lg:h-8 portrait:md:text-[2.1vw] 3xl:h-6 6xl:h-8 border-white capitalize test text-white rounded-full px-4 h-7  flex gap-4 items-center text-sm dark:bg-[#0a0908] bg-white grow justify-center"
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
        </main>
      </div>
      <div
        ref={topImageRef}
        id="bg-img"
        className="bg-cover bg-center landscape:4xl:basis-full
          bg-[url('/assets/bgImg/accView.jpg')] supports-[background-image:_url('/assets/bgImg/test19-lq_10.webp')]:bg-[url('/assets/bgImg/test19-lq_10.webp')] basis-1/2 hidden lg:block h-full portrait:lg:hidden"
      ></div>
    </div>
  );
};

export default UserAccount;
