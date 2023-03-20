import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Testing</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
