import React, { useState, useEffect, useRef } from 'react';
import Bio from '../aboutYourself/Bio';
import TagSelect from '../aboutYourself/TagSelect';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTags } from '../../redux/slices/tagSlice';
import FormButton from '../../components/FormButton';
import {
  getTagsByCategory,
  shapeTagsForDB,
} from '../../utilities/registerHelpers';
import {
  updateUser,
  fetchUser,
  selectUser,
} from '../../redux/slices/userSlice';
import { selectAuthUser } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import gsap from 'gsap';

// user tag minimums
const MINIMUM_SOCIAL = 10;
const MINIMUM_PROFESSIONAL = 1;
const MINIMUM_CUISINE = 5;

const EditUserBioAndTags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector(selectAuthUser);
  const user = useSelector(selectUser);
  const tagsInState = useSelector((state) => state.tags.tags);

  const [bio, setBio] = useState('');

  const [socialTags, setSocialTags] = useState([]);
  const [professionalTags, setProfessionalTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [preventReset, setPreventReset] = useState(false);

  const [minTags, setMinTags] = useState({
    Social: { minimum: MINIMUM_SOCIAL, show: false, numClicked: 0 },
    Professional: {
      minimum: MINIMUM_PROFESSIONAL,
      show: false,
      numClicked: 0,
    },
    Dietary: { minimum: 0, show: false, numClicked: 0 },
    Cuisine: { minimum: MINIMUM_CUISINE, show: false, numClicked: 0 },
  });

  const [validBio, setValidBio] = useState(true);

  const topImageRef = useRef(null);

  useEffect(() => {
    // fade bg image in only after it's downloaded

    const bgImg = new Image();
    bgImg.src = '/assets/bgImg/aboutMeView-q30.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (token) {
    // dispatch(tryToken());
    dispatch(fetchAllTags());
    // }
  }, []);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(fetchUser());
    }
  }, [authUser]);

  useEffect(() => {
    if (user?.tags?.length > 0 && !preventReset) {
      setUserTags(user.tags);
    }

    if (user?.id && bio === '') setBio(user.aboutMe);
  }, [user, preventReset]);

  useEffect(() => {
    if (tagsInState.length > 0 && userTags.length > 0 && !preventReset) {
      setPreventReset(true);
      const userTagIds = userTags.map((tag) => tag.id);
      const userTagCountByCat = userTags.reduce(
        (accum, tag) => {
          accum[tag.category.categoryName] += 1;
          return accum;
        },
        { social: 0, professional: 0, 'dietary restriction': 0, cuisine: 0 }
      );

      let tempMinTags = { ...minTags };

      tempMinTags.Social.numClicked = userTagCountByCat.social || 0;
      tempMinTags.Professional.numClicked = userTagCountByCat.professional || 0;
      tempMinTags.Dietary.numClicked =
        userTagCountByCat['dietary restriction'] || 0;
      tempMinTags.Cuisine.numClicked = userTagCountByCat.cuisine || 0;

      setMinTags(tempMinTags);

      const tempSocialTags = getTagsByCategory('social', tagsInState);
      for (let tag of tempSocialTags) {
        if (userTagIds.includes(tag.id)) {
          tag.clicked = true;
        }
      }
      setSocialTags(tempSocialTags);

      const tempProfTags = getTagsByCategory('professional', tagsInState);
      for (let tag of tempProfTags) {
        if (userTagIds.includes(tag.id)) {
          tag.clicked = true;
        }
      }
      setProfessionalTags(tempProfTags);

      const tempDietTags = getTagsByCategory(
        'dietary restriction',
        tagsInState
      );
      for (let tag of tempDietTags) {
        if (userTagIds.includes(tag.id)) {
          tag.clicked = true;
        }
      }
      setDietaryTags(tempDietTags);

      const tempCuisineTags = getTagsByCategory('cuisine', tagsInState);
      for (let tag of tempCuisineTags) {
        if (userTagIds.includes(tag.id)) {
          tag.clicked = true;
        }
      }
      setCuisineTags(tempCuisineTags);
    }
  }, [tagsInState, userTags]);

  useEffect(() => {
    localStorage.setItem('minTags', JSON.stringify(minTags));
  }, [minTags]);

  // Handles creation of new user based on user inputs
  async function handleSubmit() {
    let canProceed = true;

    setValidBio(!!bio);

    for (let category in minTags) {
      let minTagsCopy = { ...minTags[category] };
      setMinTags((prev) => ({
        ...prev,
        [category]: {
          minimum: minTagsCopy.minimum,
          show: minTags[category].numClicked < minTags[category].minimum,
          numClicked: minTagsCopy.numClicked,
        },
      }));
      if (minTags[category].numClicked < minTags[category].minimum)
        canProceed = false;
    }

    if (canProceed) {
      const updateTags = shapeTagsForDB(
        socialTags,
        professionalTags,
        dietaryTags,
        cuisineTags
      );

      const updatePackage = {
        tags: updateTags,
        aboutMe: bio,
      };

      dispatch(updateUser(updatePackage));
      localStorage.removeItem('registerForm');
      localStorage.removeItem('minTags');
      localStorage.removeItem('aboutBio');
      localStorage.removeItem('Social');
      localStorage.removeItem('Cuisine');
      localStorage.removeItem('Dietary');
      localStorage.removeItem('Professional');

      setTimeout(() => navigate('/account'), 500);
    }
  }

  AOS.init({
    duration: 2000,
    offset: 0,
  });

  return (
    <div className=" flex flex-row items-center justify-center   w-fit overflow-hidden dark:bg-[#0a0908] dark:text-white portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)]  landscape:h-[calc(100svh_-_56px)] ">
      <div
        id="form-container"
        className="lg:basis-1/2 flex flex-col  h-full justify-start align-middle overflow-auto scrollbar-hide landscape:4xl:px-24 landscape:5xl:px-44"
        data-aos="fade-up"
        data-aos-delay="700"
        data-aos-duration="1800"
      >
        <h1 className="flex mt-20 mb-8 text-xl font-semibold text-headers self-center">
          TELL US ABOUT YOURSELF
        </h1>
        <Bio setBio={setBio} bio={bio} />
        <div className="lg:flex flex-col wrap mr-4">
          <TagSelect
            tags={socialTags}
            setter={setSocialTags}
            category="Social"
            minTags={minTags}
            setMinTags={setMinTags}
          />
          <TagSelect
            tags={professionalTags}
            setter={setProfessionalTags}
            category="Professional"
            minTags={minTags}
            setMinTags={setMinTags}
          />
          <TagSelect
            tags={dietaryTags}
            setter={setDietaryTags}
            category="Dietary"
            minTags={minTags}
            setMinTags={setMinTags}
          />
          <TagSelect
            tags={cuisineTags}
            setter={setCuisineTags}
            category="Cuisine"
            minTags={minTags}
            setMinTags={setMinTags}
          />
        </div>
        <div className="flex self-center sm:max-w-lg sm:min-w-[20%]  px-6 mb-16 pt-5 lg:w-2/5 w-3/5">
          <FormButton handleSubmit={handleSubmit}>SAVE CHANGES</FormButton>
        </div>
      </div>
      <div
        id="bg-img"
        ref={topImageRef}
        className="basis-1/2 hidden lg:block h-full bg-cover bg-[url('/assets/bgImg/aboutMeView.jpg')] supports-[background-image:_url('/assets/bgImg/aboutMeView-q30.webp')]:bg-[url('/assets/bgImg/aboutMeView-q30.webp')]"
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="2000"
      ></div>
    </div>
  );
};

export default EditUserBioAndTags;
