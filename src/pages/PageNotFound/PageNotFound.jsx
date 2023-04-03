import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-24">
        <h1 className="text-2xl sm:text-3xl text-headers">
          Oh no! Page not found.
        </h1>
        <div className="flex justify-center gap-7 mt-10">
          <Link>
            <h2 className="button px-4 py-1 rounded-full text-primary-white">
              New meeting
            </h2>
          </Link>
          <Link>
            <h2 className="button px-4 py-1 rounded-full text-primary-white">
              To account
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
