import React from 'react';

const FormButton = (props) => {
  return (
    <button
      type="submit"
      className="ease-in flex justify-center text-center 6xl:py-4 5xl:py-3 duration-300 w-full button 2xl:py-2 px-4 py-[.5rem] text-xs text-white hover:bg-red-600 active:bg-red-700 transition-all hover:shadow-lg"
      onClick={props.handleSubmit}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
