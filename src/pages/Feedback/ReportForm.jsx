import React from 'react';
import FormButton from '../../components/FormButton';
import { useParams } from 'react-router-dom';

const ReportForm = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <textarea
        name="report"
        placeholder="Please give reason for reporting"
        id=""
        cols="30"
        rows="3"
        className="border border-black rounded-3xl w-11/12 p-4 placeholder:text-slate-500"
      />
      {/* PASS IN CLICK HANDLER TO SUBMIT REPORT BUTTON THAT TAKES IN PARAMS AS ARG */}
      <div className="w-4/5">
        <FormButton>SUBMIT REPORT</FormButton>
      </div>
    </div>
  );
};

export default ReportForm;
