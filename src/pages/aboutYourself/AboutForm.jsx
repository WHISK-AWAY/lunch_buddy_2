import React, { useState, useEffect, useRef } from 'react';
import Bio from './Bio';
import TagSelect from './TagSelect';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchAllTags } from '../../redux/slices/tagSlice';
import FormButton from '../../components/FormButton';
import {
  getTagsByCategory,
  shapeTagsForDB,
} from '../../utilities/registerHelpers';
import NewUserWelcome from '../NotificationCenter/ToastFeedback/NewUserWelcome';
import {
  createNewUser,
  selectUserLoading,
  selectUserError,
  checkUserCreated,
} from '../../redux/slices/userSlice';
import { requestLogin } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

import gsap from 'gsap';

// user tag minimums
const MINIMUM_SOCIAL = 10;
const MINIMUM_PROFESSIONAL = 1;
const MINIMUM_CUISINE = 5;

// delay between submit button & welcome note popup (ms)
const TOAST_POPUP_DELAY = 1000;

const AboutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoading = useSelector(selectUserLoading);
  const userError = useSelector(selectUserError);

  const [bio, setBio] = useState(localStorage.getItem('aboutBio') || '');

  const [socialTags, setSocialTags] = useState([]);
  const [professionalTags, setProfessionalTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);

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

  const [minTags, setMinTags] = useState(
    JSON.parse(localStorage.getItem('minTags')) || {
      Social: { minimum: MINIMUM_SOCIAL, show: false, numClicked: 0 },
      Professional: {
        minimum: MINIMUM_PROFESSIONAL,
        show: false,
        numClicked: 0,
      },
      Dietary: { minimum: 0, show: false, numClicked: 0 },
      Cuisine: { minimum: MINIMUM_CUISINE, show: false, numClicked: 0 },
    }
  );

  const [validBio, setValidBio] = useState(true);

  const tagsInState = useSelector((state) => state.tags.tags);

  useEffect(() => {
    const form = localStorage.getItem('registerForm');
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
    if (!form) {
      navigate('/register');
    } else {
      dispatch(fetchAllTags());
    }
  }, []);

  useEffect(() => {
    if (tagsInState.length > 0) {
      setSocialTags(
        JSON.parse(localStorage.getItem('Social')) ||
          getTagsByCategory('social', tagsInState) ||
          []
      );
      setProfessionalTags(
        JSON.parse(localStorage.getItem('Professional')) ||
          getTagsByCategory('professional', tagsInState || [])
      );
      setDietaryTags(
        JSON.parse(localStorage.getItem('Dietary')) ||
          getTagsByCategory('dietary restriction', tagsInState || [])
      );
      setCuisineTags(
        JSON.parse(localStorage.getItem('Cuisine')) ||
          getTagsByCategory('cuisine', tagsInState || [])
      );
    }
  }, [tagsInState]);

  useEffect(() => {
    localStorage.setItem('minTags', JSON.stringify(minTags));
  }, [minTags]);

  // Handles creation of new user based on user inputs
  async function handleSubmit() {
    setValidBio(!!bio);

    for (let category in minTags) {
      const minTagsCopy = { ...minTags[category] };
      setMinTags((prev) => ({
        ...prev,
        [category]: {
          minimum: minTagsCopy.minimum,
          show: minTags[category].numClicked < minTags[category].minimum,
          numClicked: minTagsCopy.numClicked,
        },
      }));
    }

    const prevPageFormData = JSON.parse(
      window.localStorage.getItem('registerForm')
    );

    prevPageFormData.tags = shapeTagsForDB(
      socialTags,
      professionalTags,
      dietaryTags,
      cuisineTags
    );

    prevPageFormData.aboutMe = bio;

    if (prevPageFormData.address2 === '') {
      delete prevPageFormData.address2;
    }

    await dispatch(createNewUser(prevPageFormData));
    const { payload: errorOnCreation } = await dispatch(checkUserCreated());
    if (errorOnCreation.error) {
      console.log(errorOnCreation.error);
    } else {
      const form = JSON.parse(localStorage.getItem('registerForm'));
      localStorage.removeItem('registerForm');

      localStorage.removeItem('aboutBio');
      localStorage.removeItem('Social');
      localStorage.removeItem('Cuisine');
      localStorage.removeItem('Dietary');
      localStorage.removeItem('Professional');

      dispatch(
        requestLogin({
          email: form.email,
          password: form.password,
        })
      );
      setTimeout(() => {
        setTimeout(() => {
          toast.custom((t) => <NewUserWelcome t={t} />);
        }, TOAST_POPUP_DELAY);
        navigate('/match');
      }, 500);
    }
  }

  return (
    <div className="h-[calc(100vh_-_56px)] sm:h-[calc(100dvh_-_80px)] xs:h-[calc(100dvh_-_71px)] portrait:md:h-[calc(100dvh_-_85px)] portrait:lg:h-[calc(100dvh_-_94px)] md:h-[calc(100dvh_-_60px)] xl:h-[calc(100dvh_-_70px)] 5xl:h-[calc(100dvh_-_80px)]  flex flex-row items-center justify-center w-fit overflow-hidden scroll-smooth bg-white dark:bg-[#0a0908] text-primary-gray dark:text-white">
      <div
        id="form-container"
        className="lg:basis-1/2 flex flex-col  h-full justify-start align-middle overflow-auto scrollbar-hide"
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
        <div className="flex self-center xxs:w-full  md:w-3/5  px-6 mb-16 pt-5 2xl:w-2/5  w-3/5 5xl:w-2/6">
          <FormButton handleSubmit={handleSubmit}>
            <span className="4xl:text-[.8vw]">SUBMIT</span>
          </FormButton>
        </div>
      </div>
      <div
        id="bg-img"
        ref={topImageRef}
        className="basis-1/2 hidden lg:block h-full bg-cover supports-[background-image:_url('/assets/bgImg/aboutMeView-q30.webp')]:bg-[url('/assets/bgImg/aboutMeView-q30.webp')] bg-[url('/assets/bgImg/aboutMeView.jpg')"
      ></div>
    </div>
  );
};

export default AboutForm;
