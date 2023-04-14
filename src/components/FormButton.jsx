import React from 'react';

const FormButton = (props) => {
  return (
    <button
      type="submit"
      className="ease-in duration-500 w-full mt-6 button rounded-full px-4 py-2 text-md text-white  hover:bg-red-600 active:bg-red-700 transition-all"
      onClick={props.handleSubmit}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
