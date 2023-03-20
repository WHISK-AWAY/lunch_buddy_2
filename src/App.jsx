import { useState, useEffect } from 'react';
import './App.css';

// testing slices
// since this component is mostly throwaway anyway, I thought I'd run all the slices thru here to prove 'em out
// we should delete them all later once we get started with react buildout
import { useSelector, useDispatch } from 'react-redux';
import {
  testAuth,
  selectAuth,
  selectMeetings,
  testMeeting,
  selectMessages,
  testMessages,
  selectTags,
  testTags,
  selectUsers,
  testUser,
} from './redux/slices';

function App() {
  const [count, setCount] = useState(0);

  // testing slices
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const meeting = useSelector(selectMeetings);
  const message = useSelector(selectMessages);
  const tag = useSelector(selectTags);
  const user = useSelector(selectUsers);

  useEffect(() => {
    dispatch(testAuth());
    dispatch(testMeeting());
    dispatch(testMessages());
    dispatch(testTags());
    dispatch(testUser());
  }, []);

  console.log('testAuth', auth);
  console.log('testMeeting', meeting);
  console.log('testMessages', message);
  console.log('testTags', tag);
  console.log('testUser', user);

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center text-white text-xl gap-4">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((prev) => prev + 2)}>Increase</button>
    </div>
  );
}

export default App;
