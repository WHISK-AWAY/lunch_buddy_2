import React, { useState, useEffect } from 'react';
import Bio from './Bio';
import TagSelect from './TagSelect';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTags } from '../../redux/slices/tagSlice';
import FormButton from '../../components/FormButton';
import {
  getTagsByCategory,
  shapeTagsForDB,
} from '../../utilities/registerHelpers';
import {
  createNewUser,
  selectUserLoading,
  selectUserError,
  checkUserCreated,
} from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoading = useSelector(selectUserLoading);
  const userError = useSelector(selectUserError);

  const [bio, setBio] = useState('');

  const [socialTags, setSocialTags] = useState([]);
  const [professionalTags, setProfessionalTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);

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

  const tagsInState = useSelector((state) => state.tags.tags);
  useEffect(() => {
    if (tagsInState.length > 0) {
      setSocialTags(getTagsByCategory('social', tagsInState || []));
      setProfessionalTags(getTagsByCategory('professional', tagsInState || []));
      setDietaryTags(
        getTagsByCategory('dietary restriction', tagsInState || [])
      );
      setCuisineTags(getTagsByCategory('cuisine', tagsInState || []));
    }
  }, [tagsInState]);

  // Handles creation of new user based on user inputs
  async function handleSubmit() {
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

    console.log(prevPageFormData);
    await dispatch(createNewUser(prevPageFormData));
    const { payload: errorOnCreation } = await dispatch(checkUserCreated());
    console.log('errorOnCreation', errorOnCreation);
    if (errorOnCreation.error) {
      alert(errorOnCreation.error);
    } else {
      localStorage.removeItem('registerForm');
      navigate('/match');
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
            category="social"
          />
          <TagSelect
            tags={professionalTags}
            setter={setProfessionalTags}
            category="Professional"
          />
          <TagSelect
            tags={dietaryTags}
            setter={setDietaryTags}
            category="Dietary"
          />
          <TagSelect
            tags={cuisineTags}
            setter={setCuisineTags}
            category="Cuisine"
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
