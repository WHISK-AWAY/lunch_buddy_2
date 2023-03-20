import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center text-white text-xl gap-4">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((prev) => prev + 2)}>Increase</button>
    </div>
  );
}

export default App;
