import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  const [bio, setBio] = useState('' || localStorage.getItem('aboutBio'));

  const [socialTags, setSocialTags] = useState([]);
  const [professionalTags, setProfessionalTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);

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

  console.log(minTags);

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
      console.log(minTags[category].numClicked, minTags[category].minimum);
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
      localStorage.removeItem('registerForm');
      setTimeout(() => {
        toast.custom((t) => <NewUserWelcome t={t} />);
      }, TOAST_POPUP_DELAY);

      navigate('/match');
      localStorage.removeItem('aboutBio');
      localStorage.removeItem('Social');
      localStorage.removeItem('Cuisine');
      localStorage.removeItem('Dietary');
      localStorage.removeItem('Professional');
    }
  }

  AOS.init({
    duration: 2000,
    offset: 0,
  });

  return (
    <div className=" flex flex-row items-center justify-center h-[calc(100vh_-_65px)] w-fit overflow-hidden scroll-smooth">
      <div
        id="form-container"
        className="lg:basis-1/2 flex flex-col  h-full justify-start align-middle overflow-auto scrollbar-hide"
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
          <FormButton handleSubmit={handleSubmit}>SUBMIT</FormButton>
        </div>
      </div>
      <div
        id="bg-img"
        className="basis-1/2 hidden lg:block h-full bg-cover bg-[url('/assets/bgImg/aboutMeView.jpg')]"
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="2000"
      ></div>
    </div>
  );
};

export default AboutForm;
