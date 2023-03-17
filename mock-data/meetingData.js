//ISO 8601 (UTC)
const meetings = [
  { lunchDate: '2022-07-30T15:55:11Z', isClosed: false },
  { lunchDate: '2023-08-30T08:36:19Z', isClosed: true },
  { lunchDate: '2022-04-28T02:56:46Z', isClosed: false },
  { lunchDate: '2023-08-19T07:12:37Z', isClosed: true },
  { lunchDate: '2022-06-13T12:55:46Z', isClosed: false },
  { lunchDate: '2023-04-25T15:00:50Z', isClosed: false },
  { lunchDate: '2023-03-07T12:31:16Z', isClosed: true },
  { lunchDate: '2022-10-26T07:09:03Z', isClosed: true },
  { lunchDate: '2023-06-20T03:38:19Z', isClosed: false },
  { lunchDate: '2022-09-30T21:08:48Z', isClosed: false },
  { lunchDate: '2023-05-04T05:24:41Z', isClosed: true },
  { lunchDate: '2022-04-02T14:58:32Z', isClosed: false },
  { lunchDate: '2023-08-13T20:05:47Z', isClosed: false },
  { lunchDate: '2022-10-01T15:43:23Z', isClosed: false },
  { lunchDate: '2023-07-30T19:18:51Z', isClosed: false },
  { lunchDate: '2023-02-25T22:56:09Z', isClosed: true },
  { lunchDate: '2022-07-31T07:55:23Z', isClosed: false },
  { lunchDate: '2023-01-24T12:56:50Z', isClosed: false },
  { lunchDate: '2022-08-13T03:53:03Z', isClosed: true },
  { lunchDate: '2023-09-24T19:40:43Z', isClosed: false },
  { lunchDate: '2022-05-24T06:02:00Z', isClosed: true },
  { lunchDate: '2022-10-05T13:02:15Z', isClosed: true },
  { lunchDate: '2022-05-06T21:10:33Z', isClosed: false },
  { lunchDate: '2022-05-25T11:40:13Z', isClosed: false },
  { lunchDate: '2023-07-15T19:25:57Z', isClosed: true },
  { lunchDate: '2023-01-27T05:42:10Z', isClosed: true },
  { lunchDate: '2022-12-10T03:18:42Z', isClosed: false },
  { lunchDate: '2023-01-31T16:53:48Z', isClosed: false },
  { lunchDate: '2023-08-14T04:15:32Z', isClosed: false },
  { lunchDate: '2022-10-09T17:51:42Z', isClosed: true },
  { lunchDate: '2022-11-02T19:33:38Z', isClosed: true },
  { lunchDate: '2022-12-21T21:18:33Z', isClosed: false },
  { lunchDate: '2022-04-13T05:09:59Z', isClosed: true },
  { lunchDate: '2022-11-15T22:51:49Z', isClosed: false },
  { lunchDate: '2023-02-20T21:43:39Z', isClosed: true },
  { lunchDate: '2023-07-03T08:48:18Z', isClosed: true },
  { lunchDate: '2023-05-20T18:02:02Z', isClosed: false },
  { lunchDate: '2022-12-03T17:05:38Z', isClosed: true },
  { lunchDate: '2022-08-04T01:33:06Z', isClosed: true },
  { lunchDate: '2023-03-17T07:23:31Z', isClosed: true },
  { lunchDate: '2022-05-29T13:09:33Z', isClosed: false },
  { lunchDate: '2023-04-13T00:44:26Z', isClosed: false },
  { lunchDate: '2022-05-18T04:07:46Z', isClosed: false },
  { lunchDate: '2022-09-20T17:52:24Z', isClosed: true },
  { lunchDate: '2023-01-09T00:03:21Z', isClosed: true },
  { lunchDate: '2023-04-27T06:53:43Z', isClosed: true },
  { lunchDate: '2023-05-27T00:42:52Z', isClosed: false },
  { lunchDate: '2023-02-07T12:09:08Z', isClosed: true },
  { lunchDate: '2023-06-20T20:50:00Z', isClosed: true },
  { lunchDate: '2023-06-07T08:35:16Z', isClosed: false },
  { lunchDate: '2023-06-05T13:12:02Z', isClosed: true },
  { lunchDate: '2022-08-30T04:26:34Z', isClosed: false },
  { lunchDate: '2023-03-27T21:24:19Z', isClosed: false },
  { lunchDate: '2023-05-15T17:58:20Z', isClosed: true },
  { lunchDate: '2022-11-11T19:02:20Z', isClosed: true },
  { lunchDate: '2023-02-03T21:28:45Z', isClosed: true },
  { lunchDate: '2023-03-14T00:08:05Z', isClosed: false },
  { lunchDate: '2022-10-12T11:52:58Z', isClosed: false },
  { lunchDate: '2023-01-18T07:36:22Z', isClosed: true },
  { lunchDate: '2023-01-22T21:31:25Z', isClosed: false },
  { lunchDate: '2022-04-27T15:22:43Z', isClosed: false },
  { lunchDate: '2023-01-12T14:29:12Z', isClosed: true },
  { lunchDate: '2023-04-15T06:47:20Z', isClosed: true },
  { lunchDate: '2023-06-05T11:42:10Z', isClosed: false },
  { lunchDate: '2022-05-18T00:36:10Z', isClosed: false },
  { lunchDate: '2023-08-01T14:46:52Z', isClosed: true },
  { lunchDate: '2022-05-01T20:55:58Z', isClosed: true },
  { lunchDate: '2023-07-20T06:50:23Z', isClosed: false },
  { lunchDate: '2022-05-10T07:37:17Z', isClosed: false },
  { lunchDate: '2022-04-09T23:15:04Z', isClosed: true },
  { lunchDate: '2023-02-21T10:10:06Z', isClosed: true },
  { lunchDate: '2023-05-27T12:58:10Z', isClosed: false },
  { lunchDate: '2022-04-02T03:03:28Z', isClosed: false },
  { lunchDate: '2023-06-17T04:17:11Z', isClosed: false },
  { lunchDate: '2022-10-11T13:03:30Z', isClosed: false },
  { lunchDate: '2023-04-09T00:11:55Z', isClosed: true },
  { lunchDate: '2023-05-25T07:22:40Z', isClosed: true },
  { lunchDate: '2023-04-16T19:47:00Z', isClosed: false },
  { lunchDate: '2023-01-19T05:20:44Z', isClosed: true },
  { lunchDate: '2023-02-05T18:17:56Z', isClosed: false },
  { lunchDate: '2023-03-17T01:20:40Z', isClosed: true },
  { lunchDate: '2022-04-20T21:22:51Z', isClosed: false },
  { lunchDate: '2022-04-19T03:51:16Z', isClosed: true },
  { lunchDate: '2022-09-15T17:06:56Z', isClosed: true },
  { lunchDate: '2023-09-08T11:58:33Z', isClosed: false },
  { lunchDate: '2023-04-24T13:35:54Z', isClosed: true },
  { lunchDate: '2022-08-28T22:36:59Z', isClosed: false },
  { lunchDate: '2023-07-22T17:44:23Z', isClosed: true },
  { lunchDate: '2023-06-22T20:54:23Z', isClosed: true },
  { lunchDate: '2023-09-01T12:08:23Z', isClosed: true },
  { lunchDate: '2022-12-17T11:57:58Z', isClosed: false },
  { lunchDate: '2023-09-05T18:01:32Z', isClosed: false },
  { lunchDate: '2022-11-20T18:47:46Z', isClosed: true },
  { lunchDate: '2022-09-05T22:53:22Z', isClosed: true },
  { lunchDate: '2022-09-02T04:42:55Z', isClosed: true },
  { lunchDate: '2023-03-28T08:33:25Z', isClosed: true },
  { lunchDate: '2023-02-11T11:56:09Z', isClosed: true },
  { lunchDate: '2022-08-19T08:16:21Z', isClosed: false },
  { lunchDate: '2023-06-15T15:24:20Z', isClosed: false },
  { lunchDate: '2022-12-26T06:34:21Z', isClosed: true },
  { lunchDate: '2023-07-09T12:07:58Z', isClosed: true },
  { lunchDate: '2022-11-09T03:41:47Z', isClosed: false },
  { lunchDate: '2023-09-11T23:47:33Z', isClosed: true },
  { lunchDate: '2023-09-16T03:04:25Z', isClosed: false },
  { lunchDate: '2023-03-10T21:50:28Z', isClosed: true },
  { lunchDate: '2023-01-13T05:03:16Z', isClosed: false },
  { lunchDate: '2022-11-15T19:05:44Z', isClosed: false },
  { lunchDate: '2023-05-16T09:06:20Z', isClosed: true },
  { lunchDate: '2022-09-14T21:53:19Z', isClosed: true },
  { lunchDate: '2022-07-11T11:26:35Z', isClosed: true },
  { lunchDate: '2022-07-04T03:20:16Z', isClosed: true },
  { lunchDate: '2023-08-14T04:46:49Z', isClosed: true },
  { lunchDate: '2022-12-25T09:41:20Z', isClosed: false },
  { lunchDate: '2022-11-01T03:53:26Z', isClosed: true },
  { lunchDate: '2022-10-17T14:03:42Z', isClosed: false },
  { lunchDate: '2022-10-10T01:14:26Z', isClosed: false },
  { lunchDate: '2023-07-04T20:01:49Z', isClosed: true },
  { lunchDate: '2023-04-14T21:49:18Z', isClosed: false },
  { lunchDate: '2023-07-10T02:11:41Z', isClosed: false },
  { lunchDate: '2023-03-03T05:25:13Z', isClosed: true },
  { lunchDate: '2022-08-15T04:00:13Z', isClosed: false },
  { lunchDate: '2022-06-15T23:55:52Z', isClosed: true },
  { lunchDate: '2023-07-30T09:21:54Z', isClosed: false },
  { lunchDate: '2022-04-16T19:02:08Z', isClosed: true },
  { lunchDate: '2022-12-29T14:44:40Z', isClosed: true },
  { lunchDate: '2022-04-07T22:37:33Z', isClosed: false },
  { lunchDate: '2022-07-24T17:15:03Z', isClosed: true },
  { lunchDate: '2022-07-28T12:11:24Z', isClosed: true },
  { lunchDate: '2023-08-12T17:03:28Z', isClosed: true },
  { lunchDate: '2023-08-30T14:53:07Z', isClosed: true },
  { lunchDate: '2023-05-08T05:50:01Z', isClosed: true },
  { lunchDate: '2022-10-28T06:06:58Z', isClosed: true },
  { lunchDate: '2022-06-27T12:36:29Z', isClosed: false },
  { lunchDate: '2022-09-09T07:34:00Z', isClosed: false },
  { lunchDate: '2022-12-04T16:46:16Z', isClosed: true },
  { lunchDate: '2022-05-28T03:26:11Z', isClosed: true },
  { lunchDate: '2023-07-09T23:10:00Z', isClosed: false },
  { lunchDate: '2022-10-16T22:36:43Z', isClosed: false },
  { lunchDate: '2023-03-20T13:52:34Z', isClosed: false },
  { lunchDate: '2023-03-14T12:46:30Z', isClosed: true },
  { lunchDate: '2023-07-10T04:07:26Z', isClosed: false },
  { lunchDate: '2023-07-14T05:39:13Z', isClosed: true },
  { lunchDate: '2023-02-26T07:21:08Z', isClosed: false },
  { lunchDate: '2023-06-11T21:13:37Z', isClosed: true },
  { lunchDate: '2022-08-10T21:39:37Z', isClosed: true },
  { lunchDate: '2023-09-06T10:11:19Z', isClosed: true },
  { lunchDate: '2022-07-17T10:03:02Z', isClosed: true },
  { lunchDate: '2022-10-02T15:34:33Z', isClosed: false },
  { lunchDate: '2022-07-06T09:44:56Z', isClosed: false },
  { lunchDate: '2023-01-26T09:44:12Z', isClosed: true },
  { lunchDate: '2023-05-28T13:30:36Z', isClosed: false },
  { lunchDate: '2023-07-05T23:00:18Z', isClosed: false },
  { lunchDate: '2022-12-13T06:23:31Z', isClosed: false },
  { lunchDate: '2022-11-18T01:09:26Z', isClosed: true },
  { lunchDate: '2022-07-31T16:19:58Z', isClosed: true },
  { lunchDate: '2023-07-20T05:18:21Z', isClosed: true },
  { lunchDate: '2023-08-25T14:21:09Z', isClosed: false },
  { lunchDate: '2022-04-20T06:27:51Z', isClosed: false },
  { lunchDate: '2022-03-26T11:47:10Z', isClosed: false },
  { lunchDate: '2022-09-22T14:19:56Z', isClosed: false },
  { lunchDate: '2022-10-24T03:58:45Z', isClosed: false },
  { lunchDate: '2023-03-18T09:09:08Z', isClosed: true },
  { lunchDate: '2023-07-05T20:25:51Z', isClosed: false },
  { lunchDate: '2022-07-28T05:46:28Z', isClosed: false },
  { lunchDate: '2022-08-04T07:15:20Z', isClosed: true },
  { lunchDate: '2022-12-19T15:27:29Z', isClosed: false },
  { lunchDate: '2022-12-03T14:57:00Z', isClosed: true },
  { lunchDate: '2023-03-01T15:43:39Z', isClosed: true },
  { lunchDate: '2023-09-21T17:37:33Z', isClosed: false },
  { lunchDate: '2022-09-22T11:25:53Z', isClosed: false },
  { lunchDate: '2022-12-18T13:16:08Z', isClosed: false },
  { lunchDate: '2022-05-15T17:02:45Z', isClosed: true },
  { lunchDate: '2023-04-18T02:00:56Z', isClosed: false },
  { lunchDate: '2023-04-13T20:02:19Z', isClosed: false },
  { lunchDate: '2022-04-10T17:42:29Z', isClosed: false },
  { lunchDate: '2022-04-26T00:05:05Z', isClosed: false },
  { lunchDate: '2023-05-30T01:44:07Z', isClosed: false },
  { lunchDate: '2022-12-27T03:07:36Z', isClosed: true },
  { lunchDate: '2022-04-02T02:03:33Z', isClosed: true },
  { lunchDate: '2023-08-13T09:00:54Z', isClosed: false },
  { lunchDate: '2023-08-28T12:22:00Z', isClosed: true },
  { lunchDate: '2022-03-24T14:41:31Z', isClosed: false },
  { lunchDate: '2023-01-10T13:25:17Z', isClosed: false },
  { lunchDate: '2023-09-15T05:52:48Z', isClosed: true },
  { lunchDate: '2022-06-04T10:20:41Z', isClosed: false },
  { lunchDate: '2023-05-02T01:58:14Z', isClosed: true },
  { lunchDate: '2023-09-08T05:58:15Z', isClosed: true },
  { lunchDate: '2023-06-02T12:39:51Z', isClosed: true },
  { lunchDate: '2023-04-26T19:47:05Z', isClosed: true },
  { lunchDate: '2022-09-23T01:02:43Z', isClosed: true },
  { lunchDate: '2023-05-24T02:45:00Z', isClosed: true },
  { lunchDate: '2023-09-23T00:20:35Z', isClosed: true },
  { lunchDate: '2023-07-25T08:08:39Z', isClosed: true },
  { lunchDate: '2022-05-31T10:42:18Z', isClosed: true },
  { lunchDate: '2023-03-16T16:04:30Z', isClosed: true },
  { lunchDate: '2022-09-16T17:25:55Z', isClosed: true },
  { lunchDate: '2023-05-28T10:49:42Z', isClosed: true },
  { lunchDate: '2023-09-06T11:33:41Z', isClosed: false },
  { lunchDate: '2023-09-01T09:25:03Z', isClosed: true },
  { lunchDate: '2023-03-17T14:28:04Z', isClosed: true },
];

//SQL datetime

// const meetings = [
//   { lunchDate: '2022-09-08 18:12:41', isClosed: true },
//   { lunchDate: '2022-11-13 10:18:04', isClosed: true },
//   { lunchDate: '2022-06-06 20:19:36', isClosed: true },
//   { lunchDate: '2023-02-08 06:45:26', isClosed: false },
//   { lunchDate: '2023-02-17 12:26:00', isClosed: true },
//   { lunchDate: '2023-06-05 17:36:37', isClosed: false },
//   { lunchDate: '2023-09-14 12:59:40', isClosed: true },
//   { lunchDate: '2022-08-28 11:47:30', isClosed: true },
//   { lunchDate: '2022-06-05 15:35:56', isClosed: false },
//   { lunchDate: '2023-08-05 17:10:34', isClosed: true },
//   { lunchDate: '2023-04-30 22:07:51', isClosed: false },
//   { lunchDate: '2022-12-25 15:05:53', isClosed: true },
//   { lunchDate: '2023-06-09 08:46:43', isClosed: false },
//   { lunchDate: '2023-06-15 06:39:31', isClosed: true },
//   { lunchDate: '2022-08-18 20:02:22', isClosed: false },
//   { lunchDate: '2022-07-04 01:26:47', isClosed: false },
//   { lunchDate: '2022-06-28 05:28:22', isClosed: false },
//   { lunchDate: '2022-05-27 05:04:35', isClosed: false },
//   { lunchDate: '2023-03-12 12:57:45', isClosed: true },
//   { lunchDate: '2022-08-20 08:38:02', isClosed: true },
//   { lunchDate: '2023-07-23 22:06:46', isClosed: true },
//   { lunchDate: '2022-07-19 00:50:58', isClosed: true },
//   { lunchDate: '2023-09-06 03:52:25', isClosed: false },
//   { lunchDate: '2022-10-29 22:31:44', isClosed: false },
//   { lunchDate: '2023-02-28 08:55:26', isClosed: false },
//   { lunchDate: '2022-12-01 04:09:43', isClosed: true },
//   { lunchDate: '2023-03-13 12:36:54', isClosed: false },
//   { lunchDate: '2022-06-21 23:02:50', isClosed: true },
//   { lunchDate: '2023-09-25 00:23:25', isClosed: false },
//   { lunchDate: '2022-08-04 12:34:59', isClosed: true },
//   { lunchDate: '2022-08-18 05:33:18', isClosed: true },
//   { lunchDate: '2023-07-19 20:43:26', isClosed: false },
//   { lunchDate: '2022-08-04 13:28:08', isClosed: true },
//   { lunchDate: '2022-06-17 05:20:35', isClosed: true },
//   { lunchDate: '2023-03-09 23:53:13', isClosed: false },
//   { lunchDate: '2022-12-02 03:17:12', isClosed: false },
//   { lunchDate: '2022-05-24 00:49:49', isClosed: false },
//   { lunchDate: '2022-08-25 12:37:56', isClosed: true },
//   { lunchDate: '2022-12-22 19:41:31', isClosed: true },
//   { lunchDate: '2023-07-30 03:03:17', isClosed: true },
//   { lunchDate: '2022-10-21 05:29:45', isClosed: false },
//   { lunchDate: '2023-09-25 20:04:21', isClosed: true },
//   { lunchDate: '2023-09-08 05:03:56', isClosed: false },
//   { lunchDate: '2022-12-21 18:10:15', isClosed: false },
//   { lunchDate: '2022-04-26 15:31:32', isClosed: false },
//   { lunchDate: '2022-08-01 05:18:24', isClosed: true },
//   { lunchDate: '2022-08-17 05:18:26', isClosed: false },
//   { lunchDate: '2022-06-11 04:43:15', isClosed: true },
//   { lunchDate: '2023-07-05 06:10:05', isClosed: false },
//   { lunchDate: '2022-06-15 11:48:46', isClosed: true },
//   { lunchDate: '2022-08-03 00:11:56', isClosed: false },
//   { lunchDate: '2023-09-26 20:46:13', isClosed: true },
//   { lunchDate: '2022-05-05 22:44:07', isClosed: true },
//   { lunchDate: '2022-09-04 11:00:35', isClosed: false },
//   { lunchDate: '2023-01-31 15:04:55', isClosed: false },
//   { lunchDate: '2022-08-06 14:25:33', isClosed: false },
//   { lunchDate: '2022-05-04 04:49:08', isClosed: false },
//   { lunchDate: '2022-08-21 23:18:59', isClosed: true },
//   { lunchDate: '2022-04-14 22:49:28', isClosed: false },
//   { lunchDate: '2022-05-17 21:03:06', isClosed: false },
//   { lunchDate: '2022-10-19 23:57:06', isClosed: true },
//   { lunchDate: '2022-06-07 19:02:52', isClosed: true },
//   { lunchDate: '2023-08-21 10:34:30', isClosed: true },
//   { lunchDate: '2022-12-09 16:41:48', isClosed: false },
//   { lunchDate: '2022-08-11 09:08:10', isClosed: true },
//   { lunchDate: '2022-11-18 10:56:31', isClosed: false },
//   { lunchDate: '2023-03-02 11:22:05', isClosed: false },
//   { lunchDate: '2022-06-10 04:28:11', isClosed: true },
//   { lunchDate: '2023-01-29 03:14:08', isClosed: true },
//   { lunchDate: '2023-01-08 20:29:01', isClosed: true },
//   { lunchDate: '2022-07-27 16:37:27', isClosed: true },
//   { lunchDate: '2022-05-09 11:30:16', isClosed: false },
//   { lunchDate: '2023-05-21 13:23:34', isClosed: false },
//   { lunchDate: '2022-07-16 01:52:42', isClosed: false },
//   { lunchDate: '2023-06-04 02:26:26', isClosed: true },
//   { lunchDate: '2023-08-28 20:01:54', isClosed: true },
//   { lunchDate: '2022-08-26 13:00:57', isClosed: true },
//   { lunchDate: '2023-02-18 01:42:07', isClosed: true },
//   { lunchDate: '2022-11-02 11:26:30', isClosed: true },
//   { lunchDate: '2022-06-16 22:59:01', isClosed: false },
//   { lunchDate: '2023-09-12 18:59:27', isClosed: false },
//   { lunchDate: '2023-08-26 22:29:39', isClosed: false },
//   { lunchDate: '2022-03-17 08:09:57', isClosed: false },
//   { lunchDate: '2023-05-16 19:46:46', isClosed: false },
//   { lunchDate: '2022-11-14 04:22:32', isClosed: true },
//   { lunchDate: '2022-04-16 15:24:52', isClosed: false },
//   { lunchDate: '2023-03-23 13:44:56', isClosed: false },
//   { lunchDate: '2023-05-21 20:55:08', isClosed: false },
//   { lunchDate: '2023-06-09 09:07:30', isClosed: true },
//   { lunchDate: '2023-06-12 01:08:25', isClosed: true },
//   { lunchDate: '2022-11-25 02:04:53', isClosed: false },
//   { lunchDate: '2022-07-16 06:19:16', isClosed: true },
//   { lunchDate: '2023-08-26 02:26:42', isClosed: true },
//   { lunchDate: '2022-04-07 05:13:55', isClosed: false },
//   { lunchDate: '2023-03-25 22:26:22', isClosed: false },
//   { lunchDate: '2023-08-30 10:45:25', isClosed: false },
//   { lunchDate: '2023-03-20 21:02:01', isClosed: true },
//   { lunchDate: '2022-04-06 16:26:23', isClosed: false },
//   { lunchDate: '2022-06-09 08:32:24', isClosed: true },
//   { lunchDate: '2022-07-05 01:20:38', isClosed: false },
//   { lunchDate: '2022-11-01 21:55:45', isClosed: false },
//   { lunchDate: '2022-05-15 10:36:43', isClosed: true },
//   { lunchDate: '2023-08-13 06:39:00', isClosed: false },
//   { lunchDate: '2022-12-29 07:18:01', isClosed: true },
//   { lunchDate: '2022-05-01 19:07:46', isClosed: true },
//   { lunchDate: '2023-05-10 08:01:50', isClosed: true },
//   { lunchDate: '2023-01-19 01:05:17', isClosed: true },
//   { lunchDate: '2023-08-03 21:03:51', isClosed: true },
//   { lunchDate: '2023-05-08 13:00:20', isClosed: false },
//   { lunchDate: '2023-09-04 13:00:01', isClosed: false },
//   { lunchDate: '2022-11-01 06:49:54', isClosed: false },
//   { lunchDate: '2023-05-04 19:35:06', isClosed: true },
//   { lunchDate: '2022-09-07 05:21:40', isClosed: true },
//   { lunchDate: '2022-12-07 06:43:31', isClosed: true },
//   { lunchDate: '2023-09-11 15:08:05', isClosed: true },
//   { lunchDate: '2022-08-02 12:10:38', isClosed: false },
//   { lunchDate: '2023-09-09 22:22:47', isClosed: true },
//   { lunchDate: '2023-06-30 18:46:46', isClosed: false },
//   { lunchDate: '2022-11-04 13:28:55', isClosed: true },
//   { lunchDate: '2023-08-06 06:52:02', isClosed: true },
//   { lunchDate: '2023-02-01 06:22:07', isClosed: true },
//   { lunchDate: '2022-05-09 15:47:48', isClosed: true },
//   { lunchDate: '2022-06-29 05:05:30', isClosed: true },
//   { lunchDate: '2023-05-18 11:14:07', isClosed: false },
//   { lunchDate: '2023-04-19 17:00:47', isClosed: false },
//   { lunchDate: '2022-03-31 11:51:28', isClosed: true },
//   { lunchDate: '2022-07-01 20:15:59', isClosed: true },
//   { lunchDate: '2022-10-10 10:12:33', isClosed: true },
//   { lunchDate: '2022-11-12 22:38:00', isClosed: true },
//   { lunchDate: '2023-01-30 10:40:48', isClosed: false },
//   { lunchDate: '2023-06-01 06:34:29', isClosed: false },
//   { lunchDate: '2023-03-11 02:17:50', isClosed: false },
//   { lunchDate: '2023-06-25 04:33:13', isClosed: false },
//   { lunchDate: '2022-07-01 07:48:28', isClosed: true },
//   { lunchDate: '2022-11-19 06:01:19', isClosed: false },
//   { lunchDate: '2023-04-13 23:47:58', isClosed: false },
//   { lunchDate: '2023-08-31 13:14:44', isClosed: false },
//   { lunchDate: '2022-08-12 05:44:19', isClosed: false },
//   { lunchDate: '2022-10-12 09:27:10', isClosed: true },
//   { lunchDate: '2022-05-24 11:21:08', isClosed: false },
//   { lunchDate: '2023-04-15 06:48:21', isClosed: true },
//   { lunchDate: '2023-08-20 16:38:39', isClosed: false },
//   { lunchDate: '2022-11-17 07:58:14', isClosed: true },
//   { lunchDate: '2022-03-25 22:23:40', isClosed: false },
//   { lunchDate: '2022-04-10 12:48:56', isClosed: true },
//   { lunchDate: '2023-02-06 06:35:00', isClosed: false },
//   { lunchDate: '2023-03-25 22:19:51', isClosed: false },
//   { lunchDate: '2023-03-12 03:15:07', isClosed: false },
//   { lunchDate: '2022-04-20 22:09:03', isClosed: false },
//   { lunchDate: '2022-07-17 14:31:34', isClosed: false },
//   { lunchDate: '2022-04-30 16:37:26', isClosed: false },
//   { lunchDate: '2022-11-24 04:31:47', isClosed: false },
//   { lunchDate: '2023-05-05 23:35:27', isClosed: true },
//   { lunchDate: '2023-03-23 03:00:15', isClosed: false },
//   { lunchDate: '2023-01-27 16:09:43', isClosed: true },
//   { lunchDate: '2022-06-05 13:51:18', isClosed: false },
//   { lunchDate: '2023-02-06 13:26:14', isClosed: true },
//   { lunchDate: '2023-03-03 19:25:03', isClosed: true },
//   { lunchDate: '2022-11-23 16:15:23', isClosed: true },
//   { lunchDate: '2022-04-28 10:42:17', isClosed: false },
//   { lunchDate: '2023-06-21 01:55:25', isClosed: false },
//   { lunchDate: '2022-04-05 22:28:16', isClosed: false },
//   { lunchDate: '2023-08-22 15:28:23', isClosed: false },
//   { lunchDate: '2022-08-26 18:21:10', isClosed: false },
//   { lunchDate: '2022-04-08 06:55:52', isClosed: false },
//   { lunchDate: '2023-04-28 11:56:30', isClosed: true },
//   { lunchDate: '2022-09-21 02:34:25', isClosed: false },
//   { lunchDate: '2022-04-27 07:52:12', isClosed: false },
//   { lunchDate: '2022-08-18 17:53:37', isClosed: true },
//   { lunchDate: '2022-12-27 05:39:31', isClosed: true },
//   { lunchDate: '2023-03-01 08:21:38', isClosed: false },
//   { lunchDate: '2022-11-17 07:38:27', isClosed: true },
//   { lunchDate: '2022-04-28 03:51:23', isClosed: false },
//   { lunchDate: '2023-04-22 23:49:17', isClosed: false },
//   { lunchDate: '2023-06-18 07:52:29', isClosed: true },
//   { lunchDate: '2022-09-03 07:39:24', isClosed: false },
//   { lunchDate: '2022-06-15 11:32:32', isClosed: false },
//   { lunchDate: '2022-09-21 22:21:08', isClosed: true },
//   { lunchDate: '2022-09-12 23:08:40', isClosed: false },
//   { lunchDate: '2023-05-30 05:22:04', isClosed: true },
//   { lunchDate: '2023-02-28 06:33:42', isClosed: true },
//   { lunchDate: '2023-03-25 08:42:55', isClosed: false },
//   { lunchDate: '2023-05-01 02:52:11', isClosed: false },
//   { lunchDate: '2022-06-14 12:58:29', isClosed: true },
//   { lunchDate: '2023-03-24 12:43:57', isClosed: true },
//   { lunchDate: '2023-01-13 11:52:00', isClosed: true },
//   { lunchDate: '2022-12-01 13:44:45', isClosed: false },
//   { lunchDate: '2023-07-26 09:25:31', isClosed: false },
//   { lunchDate: '2022-08-18 00:40:56', isClosed: false },
//   { lunchDate: '2022-06-05 00:31:15', isClosed: false },
//   { lunchDate: '2023-04-07 04:02:32', isClosed: false },
//   { lunchDate: '2022-06-28 03:44:09', isClosed: true },
//   { lunchDate: '2022-12-31 03:13:56', isClosed: true },
//   { lunchDate: '2022-09-21 02:36:21', isClosed: false },
//   { lunchDate: '2022-06-07 16:42:33', isClosed: true },
//   { lunchDate: '2022-07-28 19:23:34', isClosed: false },
//   { lunchDate: '2023-09-29 13:37:47', isClosed: true },
//   { lunchDate: '2022-03-24 10:37:43', isClosed: true },
//   { lunchDate: '2023-04-12 20:51:04', isClosed: false },
//   { lunchDate: '2022-05-24 00:31:13', isClosed: true },
// ];


module.exports = meetings;