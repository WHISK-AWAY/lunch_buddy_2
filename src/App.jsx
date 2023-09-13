import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import TransitionComponent from './components/Transition';
import ChatBox from './components/ChatBox';
// import Lenis from '@studio-freight/lenis';

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
  //LENIS smooth scroll
  // const lenis = new Lenis({
  //   duration: 2.2,
  //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //   wheelMultiplier: 1,
  //   smoothTouch: false,
  //   touchMultiplier: 2,
  //   infinite: false,
  //   smoothWheel: true,
  // });

  // function raf(time) {
  //   lenis.raf(time);
  //   requestAnimationFrame(raf);
  // }

  // requestAnimationFrame(raf);

  const location = useLocation();

  return (
    <div className="font-jost bg-white dark:bg-dark h-screen w-screen">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <TransitionComponent>
              <Homepage />
            </TransitionComponent>
          }
        />
        <Route
          path="/meeting/:meetingId/chat"
          element={
            <TransitionComponent>
              <ChatBox />
            </TransitionComponent>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <TransitionComponent>
              <SignInForm />
            </TransitionComponent>
          }
        />
        <Route
          path="/account"
          element={
            <TransitionComponent>
              <UserAccount />
            </TransitionComponent>
          }
        />
        <Route
          path="/register"
          element={
            <TransitionComponent>
              <RegisterForm />
            </TransitionComponent>
          }
        />
        <Route
          path="/register/aboutyourself"
          element={
            <TransitionComponent>
              <AboutForm />
            </TransitionComponent>
          }
        />
        <Route
          path="/match"
          element={
            <TransitionComponent>
              <MeetingSetup />
            </TransitionComponent>
          }
        ></Route>
        <Route
          path="/match/results"
          element={
            <TransitionComponent>
              <BuddyList state={location.state} />
            </TransitionComponent>
          }
        ></Route>
        <Route
          path="/match/restaurants"
          element={
            <TransitionComponent>
              <RestaurantSuggestions state={location.state} />
            </TransitionComponent>
          }
        ></Route>
        <Route
          path="/match/confirm"
          element={
            <TransitionComponent>
              <MeetingRecap state={location.state} />
            </TransitionComponent>
          }
        ></Route>
        <Route
          path="/meeting/:meetingId/chat"
          element={
            <TransitionComponent>
              <ChatBox />
            </TransitionComponent>
          }
        ></Route>
        <Route
          path="meeting/:meetingId/feedback"
          element={
            <TransitionComponent>
              <Feedback />
            </TransitionComponent>
          }
        />
        {/* THESE ROUTE NAMES WILL BE CHANGED JUST A PLACEHOLDER */}
        <Route
          path="edituser"
          element={
            <TransitionComponent>
              <EditUserForm />
            </TransitionComponent>
          }
        />
        <Route
          path="edituser/tags"
          element={
            <TransitionComponent>
              <EditUserBioAndTags />
            </TransitionComponent>
          }
        />
        <Route
          path="meeting/:meetingId/feedback"
          element={
            <TransitionComponent>
              <Feedback />
            </TransitionComponent>
          }
        />
        <Route
          path="meeting/current"
          element={
            <TransitionComponent>
              <CurrentMeeting />
            </TransitionComponent>
          }
        />

        {/* Page not found */}
        <Route
          path="/*"
          element={
            <TransitionComponent>
              <PageNotFound />
            </TransitionComponent>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
