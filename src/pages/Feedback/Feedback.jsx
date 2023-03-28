import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import FormButton from '../../components/FormButton';
import ReportForm from './ReportForm';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addRating, getMeeting } from '../../redux/slices/meetingSlice';

const Feedback = () => {
  const [showReport, setShowReport] = useState(false);
  const [reportInput, setReportInput] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [noRating, setNoRating] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const meeting = useSelector((state) => state.meetings.meeting);
  console.log(meeting, 'MEEETING');
  const user = useSelector((state) => state.auth.user);

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  const { meetingId } = useParams();

  useEffect(() => {
    const userReviews = meeting?.ratings?.reduce((acc, rating) => {
      console.log('reducer rating', rating.userId);
      acc[rating.userId] = true;
      return acc;
    }, {});
    console.log('userReviews', userReviews);
    if (userReviews && user && userReviews[user?.id]) {
      console.log('they already reviewed');
    }
  }, [meeting]);

  // useEffect(() => {
  //   async function fetchMeeting() {
  //     await dispatch(getMeeting({ meetingId }));
  //   }
  //   fetchMeeting();
  // }, []);

  useEffect(() => {
    async function fetchMeeting() {
      const meetingFromDispatch = await dispatch(getMeeting({ meetingId }));
      if (user.id) {
        console.log('meeting.ratings', meetingFromDispatch.payload.ratings);

        if (meetingFromDispatch.meta.requestStatus === 'fulfilled') {
          console.log('checkuser.id', user.id);
          // console.log('user left review?', userReviews[user?.id]);
          console.log(
            'user in meeting?',
            user.id !== meetingFromDispatch.userId &&
              user.id !== meetingFromDispatch.buddyId
          );
          console.log(
            'meeting not Confirmed?',
            meetingFromDispatch.payload.meetingStatus !== 'confirmed'
          );
          console.log(
            'meetingFromDispatch.payload',
            meetingFromDispatch.payload
          );
          if (
            user.id &&
            (meetingFromDispatch.payload.meetingStatus !== 'confirmed' ||
              meetingFromDispatch.payload.isClosed ||
              (user.id !== meetingFromDispatch.userId &&
                user.id !== meetingFromDispatch.buddyId))
          ) {
            // navigate('/');
          }
        }
      }
    }
    fetchMeeting();
  }, [user]);

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
      navigate('/');
    }
  }

  const submitReport = async (e) => {
    e.preventDefault();
    const createdReport = await dispatch(
      addRating({
        meetingId,
        newRating: { rating: 1, reportComment: reportInput, isReport: true },
      })
    );
    if (createdReport.meta.requestStatus === 'rejected') {
      alert(`Error when sending report`);
    } else if (createdReport.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center mt-24 font-tenor text-center max-w-lg mx-auto lg:w-1/2">
        <Rating
          starRating={starRating}
          setStarRating={setStarRating}
          noRating={noRating}
        />
        {!showReport && (
          <div className="w-4/5">
            <FormButton handleSubmit={(e) => submitRating(e)}>
              SUBMIT REVIEW
            </FormButton>
          </div>
        )}
        <button
          onClick={() => setShowReport((prev) => !prev)}
          className="rounded-full border border-black px-10 py-1 mt-4 mb-8"
        >
          {showReport ? 'Cancel Report' : 'Report'}
        </button>
        {showReport && (
          <ReportForm
            reportInput={reportInput}
            setReportInput={setReportInput}
            submitReport={submitReport}
          />
        )}
      </div>
      <img
        src="/assets/bgImg/rating&report.jpg"
        alt="Man and woman at a restaurant sharing a pizza, smiling"
        className="hidden lg:block h-full w-1/2"
      />
    </div>
  );
};

export default Feedback;
