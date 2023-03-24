import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';
import SliceTest from './components/sliceTest';
import {
  MeetingSetup,
  BuddyList,
  MeetingRecap,
  RestaurantSuggestions,
  AboutForm,
  SignInForm,
  RegisterForm,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MockResponsive />} />
      <Route path="/login" element={<SignInForm />} />
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
  );
}

export default App;
