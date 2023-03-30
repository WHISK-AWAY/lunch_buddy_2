/**
 * FIELD LIST CONSTANTS
 */

const SAFE_USER_FIELDS = [
  'fullName',
  'id',
  'firstName',
  'lastName',
  'gender',
  'aboutMe',
  'city',
  'state',
  'avatarUrl',
];

const NOTIFICATION_TYPES = [
  'meetingInvite', // done (Meeting.afterCreate)
  'inviteAccepted', // done, but refactor needed
  'inviteRejected', // done (in user meeting cancel route)
  'meetingCancelled', // done (in user meeting cancel route)
  'ratingRequested', // done (Meeting.afterCreate)
  'currentMeeting', //  not done - this will provide a link to chat & cancel functions. need to make sure to acknowledge this for both users upon cancellation or after meeting end time
  'newMessage', // not done -- if this is still needed, can do this as Message.afterCreate()
];

module.exports = { SAFE_USER_FIELDS, NOTIFICATION_TYPES };
