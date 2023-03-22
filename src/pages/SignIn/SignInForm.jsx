import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormButton from '../../components/FormButton';

const inputs = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formInputs, setFormInputs] = useState(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInputs);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full xs:w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5">
        <form className="bg-white p-10 rounded-lg min-w-full">
          <h1 className="text-center text-2xl mb-6 text-red-400 font-bold font-sans">
            Sign In
          </h1>
          <div className="relative my-6">
            <label
              className="text-red-400 font-semibold block text-md absolute -top-3 left-3 bg-white px-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border border-gray-800"
              type="text"
              name="email"
              value={formInputs.email}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="relative mt-6">
            <label
              className="text-red-400 font-semibold block text-md absolute -top-3 left-3 bg-white px-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none border border-gray-800"
              type="password"
              name="password"
              value={formInputs.password}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <FormButton handleSubmit={handleSubmit}>Sign In</FormButton>
          <p className="my-4 text-xs sm:text-base text-center">
            Don't have an account? Create one{' '}
            <Link to={'/register'}>
              <span className="text-red-400 hover:underline">here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
