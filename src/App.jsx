import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';
import RegisterForm from './pages/Register/RegisterForm';
import SignInForm from './pages/SignIn/SignInForm';
import {
  MeetingSetup,
  BuddyList,
  MeetingRecap,
  RestaurantSuggestions,
  NavBar,
} from './pages';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MockResponsive />} />
        <Route path="login" element={<SignInForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="/test" element={<MeetingSetup />}></Route>
        <Route path="/match" element={<RestaurantSuggestions />}></Route>
        <Route path="/match/results" element={<BuddyList />}></Route>
        <Route
          path="/match/restaurants"
          element={<RestaurantSuggestions />}
        ></Route>
        <Route path="/match/confirm" element={<MeetingRecap />}></Route>
      </Routes>
    </>
  );
}

export default App;
