import React from 'react';

const FormButton = (props) => {
  return (
    <button
      type="submit"
      className="ease-in duration-300 w-full button rounded-full px-4 py-[.4rem] text-xs text-white  hover:bg-red-600 active:bg-red-700 transition-all hover:shadow-lg"
      onClick={props.handleSubmit}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
