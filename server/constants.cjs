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
  'meetingRequested',
  'meetingAccepted',
  'meetingRejected',
  'meetingCancelled',
  'ratingRequested',
];

module.exports = { SAFE_USER_FIELDS, NOTIFICATION_TYPES };
