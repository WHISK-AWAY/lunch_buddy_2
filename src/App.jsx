import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MockResponsive from './components/MockResponsive';

import { requestLogin, tryToken, selectAuth } from './redux/slices';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(
      requestLogin({
        email: 'lshelton0@gmail.com',
        password: 'BJB6qr7fdsfsd4ee4',
      })
    );
  }, []);

  console.log('auth:', auth);

  return (
    <div>
      <Routes>
        <Route path="/" element={<MockResponsive />}></Route>
      </Routes>
    </div>
  );
}

export default App;
