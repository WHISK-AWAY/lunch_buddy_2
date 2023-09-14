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

import gsap from 'gsap';

const TOAST_POPUP_DELAY = 1000;

const Feedback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showReport, setShowReport] = useState(false);
  const [reportInput, setReportInput] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [noRating, setNoRating] = useState(false);
  const [noReportText, setNoReportText] = useState(false);
  const [notification, setNotification] = useState({});

  const topImageRef = useRef(null);

  const meeting = useSelector((state) => state.meetings.meeting);
  const authUser = useSelector((state) => state.auth.user);
  const notifications = useSelector(selectUnreadNotifications);

  if (!localStorage.getItem('token')) {
    navigate('/login');
  }

  const { meetingId } = useParams();

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
      if (authUser.id) {
        if (meetingFromDispatch.meta.requestStatus === 'fulfilled') {
          if (
            // meetingFromDispatch.payload.isClosed ||
            authUser.id !== meetingFromDispatch.payload.userId &&
            authUser.id !== meetingFromDispatch.payload.buddyId
          ) {
            navigate('/');
          }
        }
      }
    }

    fetchMeeting();
  }, [authUser]);

  function acknowledge() {
    dispatch(
      updateNotificationStatus({
        userId: authUser.id,
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

  if (authUser.id !== meeting.userId && authUser.id !== meeting.buddyId) {
    return <h1>Looks like you're not in this meeting!</h1>;
  }

  const userReviews = meeting?.ratings?.reduce((acc, rating) => {
    acc[rating.userId] = true;
    return acc;
  }, {});
  if (userReviews && userReviews[authUser.id]) {
    return <p>You have already reviewed this meeting</p>;
  }

  return (
    <div className="h-[calc(100vh_-_56px)] sm:h-[calc(100dvh_-_80px)] xs:h-[calc(100dvh_-_71px)] portrait:md:h-[calc(100dvh_-_85px)] portrait:lg:h-[calc(100dvh_-_94px)] md:h-[calc(100dvh_-_60px)] xl:h-[calc(100dvh_-_70px)] 5xl:h-[calc(100dvh_-_80px)]   w-screen  flex justify-center items-center dark:text-white text-primary-gray overflow-hidden bg-fixed bg-white dark:bg-[#0a0908]">
      <div className="flex flex-col items-center   text-center w-full mx-auto lg:basis-1/2">
        <Rating
          starRating={starRating}
          setStarRating={setStarRating}
          noRating={noRating}
        />
        {!showReport && (
          <div className="md:w-3/5 xxs:w-4/5 5xl:w-2/5 pt-9">
            <FormButton handleSubmit={(e) => submitRating(e)}>
              <span className="xxs:text-base">SUBMIT REVIEW</span>
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
        className="hidden lg:block h-screen image-wrapper basis-1/2 bg-cover bg-[url('/assets/bgImg/rating-report.jpg')] supports-[background-image:_url('/assets/bgImg/rating-report-q30.webp')]:bg-[url('/assets/bgImg/rating-report-q30.webp')]"
      ></div>
    </div>
  );
};

export default Feedback;
