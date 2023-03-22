import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';
import RegisterForm from './pages/Register/RegisterForm';
import SignInForm from './pages/SignIn/SignInForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<MockResponsive />} />
      <Route path="login" element={<SignInForm />} />
      <Route path="register" element={<RegisterForm />} />
    </Routes>
  );
}

export default App;
