import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';
import ChatBox from './components/ChatBox';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<ChatBox />}></Route>
      </Routes>
    </div>
  );
}

export default App;
