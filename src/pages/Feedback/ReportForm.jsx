import React from 'react';
import FormButton from '../../components/FormButton';

const ReportForm = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <textarea
        name="report"
        id=""
        cols="30"
        rows="3"
        className="border border-black rounded-3xl w-11/12 p-4"
      />
      <div className="w-4/5">
        <FormButton>SUBMIT REPORT</FormButton>
      </div>
    </div>
  );
};

export default ReportForm;
