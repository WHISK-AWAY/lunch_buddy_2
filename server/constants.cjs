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
  'meetingInvite',
  'inviteAccepted',
  'inviteRejected',
  'meetingCancelled',
  'ratingRequested',
  'currentMeeting',
  'newMessage',
];

module.exports = { SAFE_USER_FIELDS, NOTIFICATION_TYPES };
