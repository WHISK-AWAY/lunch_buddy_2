const db = require('./db/database.cjs');
const seedLocalUsers = require('./utilities/seedLocalUsers.cjs');
const seedUserTags = require('./utilities/seedUserTags.cjs');

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

const SEARCH_RADIUS = 5;

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

    const cuisineData = tagList.cuisineObjects.map((cuisine) => {
      return {
        tagName: cuisine.tagName,
        yelpAlias: cuisine.yelpAlias,
        categoryId: cuisinePreference.id,
      };
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

    const seededUsers = await seedLocalUsers(userList, center, SEARCH_RADIUS);

    //add plantUser back to the list of users, so he gets his tags assigned
    seededUsers.push(plantUser);

    await seedUserTags(seededCategories, seededTags, seededUsers);

    console.log('Users seeding successful');

    /**
     * SEED MEETING
     */

    console.log('Seeding meetings...');

    function randomUserIndex() {
      return Math.floor(Math.random() * seededUsers.length) + 1;
    }

    const meetingData = meetingList.map((meeting) => {
      meeting.userId = meeting.buddyId = randomUserIndex();

      while (meeting.userId === meeting.buddyId) {
        meeting.buddyId = randomUserIndex();
      }

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
