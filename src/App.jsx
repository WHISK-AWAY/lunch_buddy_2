import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';
import RegisterForm from './pages/register/RegisterForm';
import SignInForm from './pages/signIn/SignInForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MockResponsive />} />
      <Route path="login" element={<SignInForm />} />
      <Route path="register" element={<RegisterForm />} />
    </Routes>
  );
}

export default App;
