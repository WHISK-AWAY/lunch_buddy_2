import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';

import {
  MeetingSetup,
  BuddyList,
  MeetingRecap,
  RestaurantSuggestions,
  NavBar,
  AboutForm,
  SignInForm,
  RegisterForm,
  UserAccount,
  Homepage
} from './pages';

function App() {
  return (
    <div className="font-tenor">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
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
      </Routes>
    </div>
  );
}

export default App;
