import React, { useState } from 'react';
import Rating from './Rating';
import FormButton from '../../components/FormButton';
import ReportForm from './ReportForm';
import { useParams } from 'react-router-dom';

const Feedback = () => {
  const [showReport, setShowReport] = useState(false);

  // ADD IN USEPARAMS TO DISPATCH THE RATING TO THE CORRECT MEETING

  return (
    <div className="flex">
      <div className="flex flex-col items-center mt-12 font-tenor text-center max-w-lg mx-auto lg:w-1/2">
        <Rating />
        {!showReport && (
          <div className="w-4/5">
            <FormButton>SUBMIT REVIEW</FormButton>
          </div>
        )}
        <button
          onClick={() => setShowReport((prev) => !prev)}
          className="rounded-full border border-black px-10 py-1 mt-4 mb-8"
        >
          {showReport ? 'Cancel Report' : 'Report'}
        </button>
        {showReport && <ReportForm />}
      </div>
      <img
        src="/src/assets/bgImg/rating&report.jpg"
        alt="Man and woman at a restaurant sharing a pizza, smiling"
        className="hidden lg:block h-full w-1/2"
      />
    </div>
  );
};

export default Feedback;
