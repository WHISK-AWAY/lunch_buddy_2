import React from 'react';

const FormButton = (props) => {
  return (
    <button
      type="submit"
      className="w-full mt-6 bg-gradient-to-r from-orange-300 to-red-400 rounded-full px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans hover:bg-red-600 active:bg-red-700 transition-all"
      onClick={props.handleSubmit}
    >
      {props.children}
    </button>
  );
};

export default FormButton;