import { Route, Routes } from 'react-router-dom';
import React from 'react';
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
} from './pages';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<MockResponsive />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/register/aboutyourself" element={<AboutForm />} />
        <Route path="/test" element={<MeetingSetup />}></Route>
        <Route path="/match" element={<RestaurantSuggestions />}></Route>
        <Route path="/match/results" element={<BuddyList />}></Route>
        <Route
          path="/match/restaurants"
          element={<RestaurantSuggestions />}
        ></Route>
        <Route path="/match/confirm" element={<MeetingRecap />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
