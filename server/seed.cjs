const db = require('./db/database.cjs');
const geolib = require('geolib');
const {
  Category,
  Meeting,
  Message,
  Rating,
  Tag,
  User,
} = require('./db/index.cjs');

const meetingList = require('../mock-data/meetingData.cjs');
const messageList = require('../mock-data/messageData.cjs');
const ratingList = require('../mock-data/ratingsData.cjs');
const tagList = require('../mock-data/tagData.cjs');
const userList = require('../mock-data/demoUsersData.cjs');

const MINIMUM_SOCIAL = 10;
const MINIMUM_PROFESSIONAL = 1;
const MINIMUM_CUISINE = 5;

const SEARCH_RADIUS = 5;
const METERS_PER_MILE = 1609.344;

const seed = async () => {
  try {
    await db.sync({ force: true });

    console.log('Syncing the database');

    /**
     * SEED CATEGORIES
     */

    console.log('Seeding categories...');

    const categoryData = [
      { categoryName: 'social' },
      { categoryName: 'professional' },
      { categoryName: 'dietary restriction' },
      { categoryName: 'cuisine' },
    ];
    const seededCategories = await Category.bulkCreate(categoryData, {
      validate: true,
    });

    console.log('Category seeding successful');

    /**
     * SEED TAGS
     */

    console.log('Seeding tags...');

    const social = await Category.findOne({
      where: { categoryName: 'social' },
    });

    const professional = await Category.findOne({
      where: { categoryName: 'professional' },
    });
    const dietaryRestriction = await Category.findOne({
      where: { categoryName: 'dietary restriction' },
    });
    const cuisinePreference = await Category.findOne({
      where: { categoryName: 'cuisine' },
    });

    const activitiesData = tagList.activities.map((activity) => {
      return { tagName: activity.title, categoryId: social.id };
    });

    const professionData = tagList.professions.map((profession) => {
      return { tagName: profession, categoryId: professional.id };
    });

    const dietaryRestrictionData = tagList.dietaryRestrictions.map(
      (restriction) => {
        return { tagName: restriction, categoryId: dietaryRestriction.id };
      }
    );

    const cuisineData = tagList.cuisines.map((cuisine) => {
      return { tagName: cuisine, categoryId: cuisinePreference.id };
    });

    const seededTags = await Tag.bulkCreate(
      [
        ...activitiesData,
        ...professionData,
        ...dietaryRestrictionData,
        ...cuisineData,
      ],
      { validate: true }
    );

    // console.log('seeded tags', seededTags);

    console.log('Tags seeding successful');

    /**
     * SEED USERS
     */

    console.log('Seeding users...');

    //*for now* picking 1 user with predefined center coords, while dynamically generating coords for buddy users in the area

    const plantUserData = userList.shift();

    const plantUser = await User.create(plantUserData);

    const center = {
      latitude: plantUserData.lastLat,
      longitude: plantUserData.lastLong,
    };

    const milesToMeters = (miles) => {
      const meters = miles * METERS_PER_MILE;
      return meters;
    };

    const userData = userList.map((user) => {
      //generate random coords within 5 miles radius of plantUser
      const randomCoordinate = geolib.computeDestinationPoint(
        center,
        Math.random() * milesToMeters(SEARCH_RADIUS),
        Math.random() * 360
      );

      user.lastLat = randomCoordinate.latitude;
      user.lastLong = randomCoordinate.longitude;

      if (user.password.length < 8)
        user.password = user.password + 'nsdjkfnsdjkfnsdkj374234';
      return user;
    });

    const seededUsers = await User.bulkCreate(userData, {
      validate: true,
      individualHooks: true,
    });
    //add plantUser back to the list of users, so he gets his tags assigned
    seededUsers.push(plantUser);

    //this section is for assigning minimum amount of tags for user per each category
    //categoryMap&&CategoryTags reorganize seeded tags by category
    const categoryMap = seededCategories.reduce((accumulator, category) => {
      if (category.categoryName === 'dietary restriction')
        accumulator.dietary = category.id;
      else accumulator[category.categoryName] = category.id;
      return accumulator;
    }, {});

    const categoryTags = seededTags.reduce((accumulator, tag) => {
      if (accumulator.hasOwnProperty(tag.categoryId))
        accumulator[tag.categoryId].push(tag);
      else accumulator[tag.categoryId] = [tag];
      return accumulator;
    }, {});

    //iterating over users list, attaching minumum amount of unique tags (making copy of the array of tags to prevent dupes), attaching it to the each user upon creation
    for (let user of seededUsers) {
      const socialTags = [...categoryTags[categoryMap.social]];
      for (let i = 0; i < MINIMUM_SOCIAL; i++) {
        let randomSocialTag = Math.floor(Math.random() * socialTags.length);
        await user.addTag(socialTags.splice(randomSocialTag, 1));
      }

      const professionalTags = [...categoryTags[categoryMap.professional]];
      for (let i = 0; i < MINIMUM_PROFESSIONAL; i++) {
        let randomProfessionalTag = Math.floor(
          Math.random() * professionalTags.length
        );
        await user.addTag(professionalTags.splice(randomProfessionalTag, 1));
      }

      const cuisineTags = [...categoryTags[categoryMap.cuisine]];
      for (let i = 0; i < MINIMUM_CUISINE; i++) {
        let randomCuisineTags = Math.floor(Math.random() * cuisineTags.length);
        await user.addTag(cuisineTags.splice(randomCuisineTags, 1));
      }
    }

    console.log('Users seeding successful');

    /**
     * SEED MEETING
     */

    console.log('Seeding meetings...');

    const meetingData = meetingList.map((meeting) => {
      meeting.userId = Math.floor(Math.random() * seededUsers.length) + 1;
      meeting.buddyId = Math.floor(Math.random() * seededUsers.length) + 1;

      return meeting;
    });

    const seededMeeting = await Meeting.bulkCreate(meetingData, {
      validate: true,
    });

    console.log('Meetings seeding successful');

    /**
     * SEED MESSAGE
     */

    console.log('Seeding messages...');

    const messageData = messageList.map((message) => {
      let randomMeeting =
        seededMeeting[Math.floor(Math.random() * seededMeeting.length)];
      if (Math.random() < 0.5) {
        message.senderId = randomMeeting.userId;
        message.recipientId = randomMeeting.buddyId;
      } else {
        message.senderId = randomMeeting.buddyId;
        message.recipientId = randomMeeting.userId;
      }
      message.meetingId = randomMeeting.id;
      return message;
    });

    const seededMessages = await Message.bulkCreate(messageData, {
      validate: true,
    });

    console.log('Messages seeding successful');

    /**
     * SEED RATINGS
     */

    console.log('Seeding ratings...');

    const ratingsData = [];

    for (let meeting of seededMeeting) {
      let ratingA = ratingList.pop();
      ratingA.userId = meeting.userId;
      ratingA.buddyId = meeting.buddyId;
      ratingA.meetingId = meeting.id;
      ratingsData.push(ratingA);

      let ratingB = ratingList.pop();
      ratingB.userId = meeting.buddyId;
      ratingB.buddyId = meeting.userId;
      ratingB.meetingId = meeting.id;
      ratingsData.push(ratingB);
    }

    const seededRatings = await Rating.bulkCreate(ratingsData, {
      validate: true,
    });

    console.log('Ratings seeding successful');

    db.close();
  } catch (err) {
    console.log('Seeding failed', err);
    db.close();
  }
};

seed();

module.exports = seed;
