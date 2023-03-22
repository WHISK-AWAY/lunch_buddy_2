import React, { useState, useEffect } from 'react';
import Bio from './Bio';

const AboutForm = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="my-8 text-lg font-bold text-red-400">
        TELL US ABOUT YOURSELF
      </h1>
      <Bio />
    </div>
  );
};

export default AboutForm;
