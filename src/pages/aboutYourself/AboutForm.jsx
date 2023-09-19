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
import { createNewUser, checkUserCreated } from '../../redux/slices/userSlice';
import { tryToken } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

import gsap from 'gsap';

// user tag minimums
const MINIMUM_SOCIAL = 10;
const MINIMUM_PROFESSIONAL = 1;
const MINIMUM_CUISINE = 5;

const initialMinTags = {
  Social: { minimum: MINIMUM_SOCIAL, show: false, numClicked: 0 },
  Professional: {
    minimum: MINIMUM_PROFESSIONAL,
    show: false,
    numClicked: 0,
  },
  Dietary: { minimum: 0, show: false, numClicked: 0 },
  Cuisine: { minimum: MINIMUM_CUISINE, show: false, numClicked: 0 },
};

// delay between submit button & welcome note popup (ms)
const TOAST_POPUP_DELAY = 1000;

const AboutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.user.user);

  const [bio, setBio] = useState(localStorage.getItem('aboutBio') || '');
  const [baseImage, setBaseImage] = useState('');

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

  useEffect(() => {
    if (user.id && !authUser.id) {
      // attempt signin once user has been created
      // (user creation places token in localstorage)
      dispatch(tryToken());
    }
  }, [user.id]);

  useEffect(() => {
    // clean up form-related localstorage upon successful signin
    if (authUser.id) {
      [
        'registerForm',
        'aboutBio',
        'Social',
        'Cuisine',
        'Dietary',
        'Professional',
        'minTags',
      ].forEach((item) => localStorage.removeItem(item));

      toast.custom((t) => <NewUserWelcome t={t} />);

      // automatically go to home screen upon successful login
      navigate('/');
    }
  }, [authUser.id]);

  // const [minTags, setMinTags] = useState(
  //   JSON.parse(localStorage.getItem('minTags')) || {
  //     Social: { minimum: MINIMUM_SOCIAL, show: false, numClicked: 0 },
  //     Professional: {
  //       minimum: MINIMUM_PROFESSIONAL,
  //       show: false,
  //       numClicked: 0,
  //     },
  //     Dietary: { minimum: 0, show: false, numClicked: 0 },
  //     Cuisine: { minimum: MINIMUM_CUISINE, show: false, numClicked: 0 },
  //   }
  // );

  const [minTags, setMinTags] = useState(initialMinTags);

  useEffect(() => {
    // pull tag selections from local storage if they're there
    // e.g., if the user stops in the middle of registration
    const localMinTags = localStorage.getItem('minTags');

    if (localMinTags) {
      setMinTags(JSON.parse(localMinTags));
    }
  }, []);

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
      const social =
        JSON.parse(localStorage.getItem('Social')) ||
        getTagsByCategory('social', tagsInState) ||
        [];

      const professional =
        JSON.parse(localStorage.getItem('Professional')) ||
        getTagsByCategory('professional', tagsInState || []);

      const dietary =
        JSON.parse(localStorage.getItem('Dietary')) ||
        getTagsByCategory('dietary restriction', tagsInState || []);

      const cuisine =
        JSON.parse(localStorage.getItem('Cuisine')) ||
        getTagsByCategory('cuisine', tagsInState || []);

      social.groupName = 'Social';
      professional.groupName = 'Professional';
      dietary.groupName = 'Dietary';
      cuisine.groupName = 'Cuisine';

      [social, professional, dietary, cuisine].forEach((group) => {
        let groupClickedCount = 0;
        let { groupName } = group;

        group.forEach((tag) => {
          if (tag.clicked)
            // increment "clicked" count on minTags object
            groupClickedCount += 1;
        });

        // add the new click count to the existing object
        // sorry that this is ugly
        setMinTags((prev) => ({
          ...initialMinTags,
          ...prev,
          [groupName]: {
            ...prev[groupName],
            numClicked: groupClickedCount,
          },
        }));
      });

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
    let validationError = false;

    for (let category in minTags) {
      const minTagsCopy = { ...minTags[category] };

      let show = minTags[category].numClicked < minTags[category].minimum;

      if (show) validationError = true;

      setMinTags((prev) => ({
        ...prev,
        [category]: {
          minimum: minTagsCopy.minimum,
          show,
          numClicked: minTagsCopy.numClicked,
        },
      }));
    }

    if (validationError) return;

    // create form data from info stored in localstorage from previous page
    // then add current page data to it
    const formData = JSON.parse(localStorage.getItem('registerForm'));

    formData.tags = shapeTagsForDB(
      socialTags,
      professionalTags,
      dietaryTags,
      cuisineTags
    );

    formData.aboutMe = bio;
    formData.avatarUrl = baseImage;

    if (formData.address2 === '') {
      delete formData.address2;
    }
    if (formData.avatarUrl === '') {
      delete formData.avatarUrl;
    }

    dispatch(createNewUser(formData));
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)]  flex flex-row items-center justify-center w-fit overflow-hidden scroll-smooth bg-white dark:bg-[#0a0908] text-primary-gray dark:text-white">
      <div
        id="form-container"
        className="landscape:lg:basis-1/2 flex flex-col  h-full justify-start align-middle overflow-auto scrollbar-hide landscape:3xl:px-12 landscape:5xl:px-36 landscape:6xl:px-56"
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

        <div className="relative pl-6">
          <label
            className="text-label text-center px-4 py-2 cursor-pointer hover:border border-primary-gray rounded-sm text-sm"
            htmlFor="file-import"
          >
            UPLOAD IMAGE
            <input
              className="hidden"
              id="file-import"
              type="file"
              accept="image/*"
              onChange={(e) => {
                uploadImage(e);
              }}
            />
          </label>
        </div>
        <div className="flex self-center w-full  md:w-3/5  px-6 mb-16 pt-5 2xl:w-2/5 5xl:w-2/6">
          <FormButton handleSubmit={handleSubmit}>
            <span className="4xl:text-[.8vw] portrait:lg:text-[1.2rem]">
              SUBMIT
            </span>
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
