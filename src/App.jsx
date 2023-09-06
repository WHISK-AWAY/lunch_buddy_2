import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatBox from './components/ChatBox';

import {
  MeetingSetup,
  BuddyList,
  MeetingRecap,
  RestaurantSuggestions,
  NavBar,
  AboutForm,
  SignInForm,
  RegisterForm,
  EditUserForm,
  EditUserBioAndTags,
  Feedback,
  UserAccount,
  Homepage,
  CurrentMeeting,
  PageNotFound,
} from './pages';

function App() {
  return (
    <div className="font-tenor">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/meeting/:meetingId/chat" element={<ChatBox />}></Route>
        <Route path="/login" element={<SignInForm />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/register/aboutyourself" element={<AboutForm />} />
        <Route path="/match" element={<MeetingSetup />}></Route>
        <Route path="/match/results" element={<BuddyList />}></Route>
        <Route
          path="/match/restaurants"
          element={<RestaurantSuggestions />}
        ></Route>
        <Route path="/match/confirm" element={<MeetingRecap />}></Route>
        <Route path="/meeting/:meetingId/chat" element={<ChatBox />}></Route>
        <Route path="meeting/:meetingId/feedback" element={<Feedback />} />
        {/* THESE ROUTE NAMES WILL BE CHANGED JUST A PLACEHOLDER */}
        <Route path="edituser" element={<EditUserForm />} />
        <Route path="edituser/tags" element={<EditUserBioAndTags />} />
        <Route path="meeting/:meetingId/feedback" element={<Feedback />} />
        <Route path="meeting/current" element={<CurrentMeeting />} />

        {/* Page not found */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
