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
} from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

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
    dispatch(fetchAllTags());
  }, []);

  const tagsInState = useSelector((state) => state.tags.tags);
  useEffect(() => {
    setSocialTags(getTagsByCategory('social', tagsInState));
    setProfessionalTags(getTagsByCategory('professional', tagsInState));
    setDietaryTags(getTagsByCategory('dietary restriction', tagsInState));
    setCuisineTags(getTagsByCategory('cuisine', tagsInState));
  }, [tagsInState]);

  // Handles creation of new user based on user inputs
  function handleSubmit() {
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
    dispatch(createNewUser(prevPageFormData));
    console.log('THUNK DISPATCHED: --> user loading?', userLoading);
    if (userError) {
      alert(userError);
    } else {
      navigate('/');
    }
  }

  return (
    <div className=" flex flex-col items-center justify-center w-screen mx-2">
      <h1 className="my-8 text-lg font-bold text-red-400">
        Tell us about yourself
      </h1>
      <Bio setBio={setBio} bio={bio} />
      <div className="lg:flex">
        <TagSelect tags={socialTags} setter={setSocialTags} category="social" />
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
      <div className="sm:max-w-lg sm:min-w-[40%] w-full px-6">
        <FormButton handleSubmit={handleSubmit}>Submit</FormButton>
      </div>
    </div>
  );
};

export default AboutForm;
