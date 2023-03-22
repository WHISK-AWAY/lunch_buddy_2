import { Route, Routes } from 'react-router-dom';
import './App.css';
import MockResponsive from './components/MockResponsive';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ChatBox />}></Route>
      </Routes>
    </div>
  );
}

export default App;
