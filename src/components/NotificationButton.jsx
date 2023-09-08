import React from 'react'

export default function NotificationButton(props) {
  return (
     <button
      type="submit"
      className="ease-in flex justify-center text-center 6xl:py-3 duration-300 w-full button 2xl:py-2 lg:py-[.3rem]  px-4 py-[.2rem] text-xs text-white  hover:bg-red-600 active:bg-red-700 transition-all hover:shadow-lg"
      onClick={props.handleSubmit}
    >
      {props.children}
    </button>
  )
}



