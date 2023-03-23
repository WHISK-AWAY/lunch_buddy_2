import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';
import RegisterForm from './pages/Register/RegisterForm';
import SignInForm from './pages/SignIn/SignInForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MockResponsive />}></Route>
      </Routes>
    </div>
  );
}

export default App;
