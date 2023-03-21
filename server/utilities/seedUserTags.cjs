const MINIMUM_SOCIAL = 10;
const MINIMUM_PROFESSIONAL = 1;
const MINIMUM_CUISINE = 5;

/**
 * categories: array of Category instances
 * tags: array of Tag instances
 * users: array of User instances
 */
async function seedUserTags(categories, tags, users) {
  //this section is for assigning minimum amount of tags for user per each category
  //categoryMap&&CategoryTags reorganize seeded tags by category
  const categoryMap = categories.reduce((accumulator, category) => {
    if (category.categoryName === 'dietary restriction')
      accumulator.dietary = category.id;
    else accumulator[category.categoryName] = category.id;
    return accumulator;
  }, {});

  const categoryTags = tags.reduce((accumulator, tag) => {
    if (accumulator.hasOwnProperty(tag.categoryId))
      accumulator[tag.categoryId].push(tag);
    else accumulator[tag.categoryId] = [tag];
    return accumulator;
  }, {});

  //iterating over users list, attaching minumum amount of unique tags (making copy of the array of tags to prevent dupes),
  // attaching it to the each user upon creation

  for (let user of users) {
    const socialTags = [...categoryTags[categoryMap.social]];
    const tagsToAdd = [];
    for (let i = 0; i < MINIMUM_SOCIAL; i++) {
      let randomSocialTag = Math.floor(Math.random() * socialTags.length);
      // await user.addTag(socialTags.splice(randomSocialTag, 1));
      tagsToAdd.push(socialTags.splice(randomSocialTag, 1)[0].id);
    }

    const professionalTags = [...categoryTags[categoryMap.professional]];
    for (let i = 0; i < MINIMUM_PROFESSIONAL; i++) {
      let randomProfessionalTag = Math.floor(
        Math.random() * professionalTags.length
      );
      // await user.addTag(professionalTags.splice(randomProfessionalTag, 1));
      tagsToAdd.push(professionalTags.splice(randomProfessionalTag, 1)[0].id);
    }

    const cuisineTags = [...categoryTags[categoryMap.cuisine]];
    for (let i = 0; i < MINIMUM_CUISINE; i++) {
      let randomCuisineTags = Math.floor(Math.random() * cuisineTags.length);
      // await user.addTag(cuisineTags.splice(randomCuisineTags, 1));
      tagsToAdd.push(cuisineTags.splice(randomCuisineTags, 1)[0].id);
    }
    await user.addTags(tagsToAdd);
  }

  return users;
}

module.exports = seedUserTags;
