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
    <div
      className={`w-full flex flex-col items-center lg:w-4/5 2xl:w-3/5 5xl:w-2/5`}
    >
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
        className={`border dark:bg-[#0a0908] bg-white border-primary-gray dark:border-white resize-none focus:outline-none rounded-sm w-11/12 p-4 text-slate-500 dark:placeholder:text-white text-sm ${
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
