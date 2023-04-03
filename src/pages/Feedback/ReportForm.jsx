import React from 'react';
import FormButton from '../../components/FormButton';
import { useParams } from 'react-router-dom';

const ReportForm = ({
  reportInput,
  setReportInput,
  validationMessage,
  submitReport,
  noReportText,
  setNoReportText,
}) => {
  console.log('noReport text', noReportText);

  return (
    <div className={`w-full flex flex-col items-center`}>
      <textarea
        name="report"
        placeholder="Please give reason for reporting"
        cols="30"
        rows="3"
        value={reportInput}
        onChange={(e) => {
          setReportInput(e.target.value);
          setNoReportText((prev) => !!prev);
        }}
        className={`border border-primary-gray resize-none focus:outline-none rounded-3xl w-11/12 p-4 placeholder:text-slate-500 text-xs ${
          noReportText ? 'placeholder:text-headers' : ''
        }`}
      />

      <div className="w-4/5 mt-5">
        <FormButton handleSubmit={(e) => submitReport(e)}>
          SUBMIT REPORT
        </FormButton>
      </div>
    </div>
  );
};

export default ReportForm;
