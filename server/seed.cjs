const db = require('./db/database.cjs');
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
const userList = require('../mock-data/userData.cjs');

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

    console.log('Tags seeding successful');

    /**
     * SEED USERS
     */

    console.log('Seeding users...');

    const userData = userList.map((user) => {
      if (user.password.length < 8)
        user.password = user.password + 'nsdjkfnsdjkfnsdkj374234';
      return user;
    });
    const seededUsers = await User.bulkCreate(userData, { validate: true });

    for (let user of seededUsers) {
      for (let i = 0; i < 5; i++) {
        let randomTag = Math.floor(Math.random() * seededTags.length);
        await user.addTag(seededTags[randomTag]);
      }
      // return user;
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

    console.log('Ratings seeding succseful');

    db.close();
  } catch (err) {
    console.log('Seeding failed', err);
    db.close();
  }
};

seed();
