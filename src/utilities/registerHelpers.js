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
  return tags.filter(({ clicked }) => clicked).map((tag) => tag.id);
}

function shapeTagsForDB(...tagArrays) {
  const endingTagArray = [];
  tagArrays.forEach((arr) => {
    endingTagArray.push(...filterSelectedTags(arr));
  });
  return endingTagArray;
}

const listOfStates = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'VI',
  'WA',
  'WV',
  'WI',
  'WY',
];

export { getTagsByCategory, shapeTagsForDB, filterSelectedTags, listOfStates };
