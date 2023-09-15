import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormButton from '../../../components/FormButton';
import xIcon from '../../../assets/icons/x-icon.svg';
import xIconWhite from '../../../assets/icons/x-icon-white.svg';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../../../redux/slices/darkModeSlice';
import { generateGeoDemo } from '../../../utilities/geo';
import DemoMode from './DemoMode';

export default function NewUserWelcome({ t }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const darkModeSelector = useSelector(selectDarkMode);
  const userState = useSelector((state) => state.user.user);
  const [xMenuIcon, setXMenuIcon] = useState(xIconWhite);

  const demoModeAvailable = ['false', undefined].includes(
    localStorage.getItem('demoMode')
  );

  function toAccount() {
    toast.remove(t.id);
    navigate('/account');
  }

  async function handleDemoMode() {
    toast.remove(t.id);

    generateGeoDemo(userState, navigate, dispatch);

    toast.custom((t) => <DemoMode t={t} />, { duration: 6000 });
  }

  useEffect(() => {
    if (!darkModeSelector) {
      setXMenuIcon(xIcon);
    } else {
      setXMenuIcon(xIconWhite);
    }
  }, [darkModeSelector]);

  return (
    <div
      id="meeting-card"
      className="flex  text-xs py-3 px-3  text-primary-gray  rounded-sm shadow-md items-center justify-between sticky 3xl:w-[30vw] md:w-[40vw] 5xl:w-[20vw] w-[80vw] portrait:md:w-[60vw] bg-neutral-100/90 dark:bg-neutral-800/90 dark:text-white landscape:mt-10 portrait:mt-10 landscape:3xl:mt-12 -mr-4"
    >
      <div
        id="notification-details"
        className="flex flex-col self-center text-center  portrait:lg:text-lg md:text-xs 2xl:text-sm text-xs w-full py-2"
      >
        <p className="p-4">WELCOME, BUDDY!</p>
        <p className="">
          It's great to have you with us! Select a search radius and timeslot to
          begin, or click below to view your account!
        </p>

        <div
          id="btn-container"
          className="flex gap-4 h-full w-full px-7 self-center text-xs space-5 justify-center items-center pt-5"
        >
          <FormButton handleSubmit={toAccount}>YOUR ACCOUNT</FormButton>
          {demoModeAvailable && (
            <FormButton handleSubmit={handleDemoMode}>DEMO MODE</FormButton>
          )}
          <div
            id="x-icon"
            className="absolute top-3 w-5 right-3 cursor-pointer"
            onClick={() => toast.remove(t.id)}
          >
            <img src={xMenuIcon} alt="close this notification" />
          </div>
        </div>
      </div>
    </div>
  );
}
