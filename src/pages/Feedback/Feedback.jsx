import React, { useEffect, useState, useRef } from 'react';
import Rating from './Rating';
import FormButton from '../../components/FormButton';
import ReportForm from './ReportForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addRating, getMeeting } from '../../redux/slices/meetingSlice';
import {
  fetchAllNotifications,
  selectUnreadNotifications,
  updateNotificationStatus,
} from '../../redux/slices';
import RatingSubmitted from '../NotificationCenter/ToastFeedback/RatingSubmitted';
import ReportSubmitted from '../NotificationCenter/ToastFeedback/ReportSubmitted';
import AOS from 'aos';
import 'aos/dist/aos.css';

import gsap from 'gsap';

const TOAST_POPUP_DELAY = 1000;

const Feedback = () => {
  const [showReport, setShowReport] = useState(false);
  const [reportInput, setReportInput] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [noRating, setNoRating] = useState(false);
  const [noReportText, setNoReportText] = useState(false);
  const [notification, setNotification] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const meeting = useSelector((state) => state.meetings.meeting);
  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector(selectUnreadNotifications);

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  const { meetingId } = useParams();

  const topImageRef = useRef(null);

  useEffect(() => {
    // fade bg image in only after it's downloaded

    const bgImg = new Image();
    bgImg.src = '/assets/bgImg/rating-report-q30.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  useEffect(() => {
    if (notifications?.length > 0) {
      setNotification(
        notifications.filter(
          (notif) => notif.notificationType === 'ratingRequested'
        )[0]
      );
    }
  }, [notifications]);

  useEffect(() => {
    async function fetchMeeting() {
      const meetingFromDispatch = await dispatch(getMeeting({ meetingId }));
      if (user.id) {
        if (meetingFromDispatch.meta.requestStatus === 'fulfilled') {
          if (
            // meetingFromDispatch.payload.isClosed ||
            user.id !== meetingFromDispatch.payload.userId &&
            user.id !== meetingFromDispatch.payload.buddyId
          ) {
            navigate('/');
          }
        }
      }
    }

    fetchMeeting();
  }, [user]);

  function acknowledge() {
    dispatch(
      updateNotificationStatus({
        userId: user.id,
        notificationId: notification.id,
        updates: { isAcknowledged: true },
      })
    );

    dispatch(
      fetchAllNotifications({
        userId: notification.toUserId,
      })
    );
  }

  async function submitRating(e) {
    e.preventDefault();
    if (starRating === 0) {
      setNoRating(true);
      return;
    }
    const createdRating = await dispatch(
      addRating({ meetingId, newRating: { rating: starRating } })
    );
    if (createdRating.meta.requestStatus === 'rejected') {
      alert(`Error when sending rating`);
    } else if (createdRating.meta.requestStatus === 'fulfilled') {
      acknowledge();
      setTimeout(() => {
        toast.custom((t) => (
          <RatingSubmitted notification={notification} t={t} />
        ));
      }, TOAST_POPUP_DELAY);
      navigate('/');
    }
  }

  const submitReport = async (e) => {
    e.preventDefault();
    if (!reportInput) {
      return setNoReportText(true);
    }
    const createdReport = await dispatch(
      addRating({
        meetingId,
        newRating: { rating: 1, reportComment: reportInput, isReport: true },
      })
    );
    if (createdReport.meta.requestStatus === 'rejected') {
      alert(`Error when sending report`);
    } else if (createdReport.meta.requestStatus === 'fulfilled') {
      acknowledge();
      setTimeout(() => {
        toast.custom((t) => (
          <ReportSubmitted notification={notification} t={t} />
        ));
      }, TOAST_POPUP_DELAY);
      navigate('/');
    }
  };

  if (user.id !== meeting.userId && user.id !== meeting.buddyId) {
    return <h1>Looks like you're not in this meeting!</h1>;
  }

  const userReviews = meeting?.ratings?.reduce((acc, rating) => {
    acc[rating.userId] = true;
    return acc;
  }, {});
  if (userReviews && userReviews[user.id]) {
    return <p>You have already reviewed this meeting</p>;
  }

  AOS.init({
    duration: 2000,
    offset: 0,
  });

  return (
    <div className=" w-screen  flex justify-center items-center dark:text-white text-primary-gray landscape:overflow-y-auto overflow-hidden bg-fixed bg-white dark:bg-[#0a0908]  landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)]">
      <div
        className="flex flex-col items-center   text-center w-full mx-auto lg:basis-1/2 landscape:pt-28 landscape:md:pt-10"
        data-aos="fade-down"
        data-aos-delay="1000"
        data-aos-duration="1500"
      >
        <Rating
          starRating={starRating}
          setStarRating={setStarRating}
          noRating={noRating}
        />
        {!showReport && (
          <div className="md:w-3/5 w-4/5 5xl:w-2/5 pt-9">
            <FormButton handleSubmit={(e) => submitRating(e)}>
              <span className="text-base">SUBMIT REVIEW</span>
            </FormButton>
          </div>
        )}
        <button
          onClick={() => setShowReport((prev) => !prev)}
          className="rounded-full border border-primary-gray text-xs px-10 py-1 mt-4 mb-8"
        >
          {showReport ? 'cancel report' : 'report'}
        </button>
        {showReport && (
          <ReportForm
            reportInput={reportInput}
            setReportInput={setReportInput}
            submitReport={submitReport}
            noReportText={noReportText}
            setNoReportText={setNoReportText}
          />
        )}
      </div>
      <div
        ref={topImageRef}
        id="bg-img"
        className="hidden lg:block h-full landscape:4xl:basis-full landscape:4xl:bg-left image-wrapper basis-1/2 bg-cover bg-[url('/assets/bgImg/rating-report.jpg')] supports-[background-image:_url('/assets/bgImg/rating-report-q30.webp')]:bg-[url('/assets/bgImg/rating-report-q30.webp')]"
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="2000"
      ></div>
    </div>
  );
};

export default Feedback;
