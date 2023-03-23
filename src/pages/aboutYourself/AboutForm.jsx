import React, { useState, useEffect } from 'react';
import Bio from './Bio';
import TagSelect from './TagSelect';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTags } from '../../redux/slices/tagSlice';
import FormButton from '../../components/FormButton';

function getTagsByCategory(category, tags) {
  tags = tags
    .filter((tag) => tag.category.categoryName === category)
    .map((tag) => {
      return { ...tag, clicked: false };
    });
  return tags;
}

function filterSelectedTags(tags) {
  return tags.filter(({ clicked }) => clicked);
}

const AboutForm = () => {
  const dispatch = useDispatch();

  const tagsInState = useSelector((state) => state.tags.tags);

  const [socialTags, setSocialTags] = useState([]);
  const [professionalTags, setProfessionalTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);

  useEffect(() => {
    dispatch(fetchAllTags());
  }, []);

  useEffect(() => {
    const tempSocial = getTagsByCategory('social', tagsInState);
    const tempProfessional = getTagsByCategory('professional', tagsInState);
    const tempDietary = getTagsByCategory('dietary restriction', tagsInState);
    const tempCuisine = getTagsByCategory('cuisine', tagsInState);

    setSocialTags(tempSocial);
    setProfessionalTags(tempProfessional);
    setDietaryTags(tempDietary);
    setCuisineTags(tempCuisine);
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
      <Bio />
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
      <FormButton handleSubmit={handleSubmit}>Submit</FormButton>
    </div>
  );
};

export default AboutForm;
