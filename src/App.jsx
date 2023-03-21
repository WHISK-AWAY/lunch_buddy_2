import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';

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
