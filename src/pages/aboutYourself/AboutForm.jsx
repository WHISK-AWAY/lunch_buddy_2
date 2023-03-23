import React, { useState, useEffect } from 'react';
import Bio from './Bio';
import TagSelect from './TagSelect';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTags } from '../../redux/slices/tagSlice';
import FormButton from '../../components/FormButton';

// Helper Functions
function getTagsByCategory(category, tags) {
  tags = tags
    .filter((tag) => tag.category.categoryName === category)
    .map((tag) => {
      return { ...tag, clicked: false };
    })
    .sort((a, b) => (a.tagName > b.tagName ? 1 : -1));
  return tags;
}

function filterSelectedTags(tags) {
  return tags.filter(({ clicked }) => clicked);
}

const AboutForm = () => {
  const dispatch = useDispatch();

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

  function handleSubmit() {
    console.log(filterSelectedTags(socialTags));
    console.log(filterSelectedTags(professionalTags));
  }

  return (
    <div className=" flex flex-col items-center justify-center w-screen mx-2">
      <h1 className="my-8 text-lg font-bold text-red-400">
        Tell us about yourself
      </h1>
      <Bio setBio={setBio} bio={bio} />
      <TagSelect
        tags={socialTags}
        setter={setSocialTags}
        height={'h-[715px]'}
        category="social"
      />
      <TagSelect
        tags={professionalTags}
        setter={setProfessionalTags}
        height={'h-[425px]'}
        category="Professional"
      />
      <TagSelect
        tags={dietaryTags}
        setter={setDietaryTags}
        height={'h-[285px]'}
        category="Dietary"
      />
      <TagSelect
        tags={cuisineTags}
        setter={setCuisineTags}
        height={'h-[400px]'}
        category="Cuisine"
      />
      <div className="sm:max-w-lg sm:min-w-[40%] w-full px-6">
        <FormButton handleSubmit={handleSubmit}>Submit</FormButton>
      </div>
    </div>
  );
};

export default AboutForm;
