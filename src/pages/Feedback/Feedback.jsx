import React, { useState } from 'react';
import Rating from './Rating';
import FormButton from '../../components/FormButton';
import ReportForm from './ReportForm';

const Feedback = () => {
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mt-10 font-tenor text-center max-w-lg mx-auto">
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
  );
};

export default Feedback;
