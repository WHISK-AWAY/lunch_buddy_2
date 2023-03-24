import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';
import AboutForm from './pages/aboutYourself/AboutForm';
import RegisterForm from './pages/register/RegisterForm';
import SignInForm from './pages/signIn/SignInForm';
import {
  MeetingSetup,
  BuddyList,
  MeetingRecap,
  RestaurantSuggestions,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MockResponsive />} />
      <Route path="/login" element={<SignInForm />} />
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
  );
}

export default App;
