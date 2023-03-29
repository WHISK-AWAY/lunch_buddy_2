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
  'newMessage',
];

module.exports = { SAFE_USER_FIELDS, NOTIFICATION_TYPES };
