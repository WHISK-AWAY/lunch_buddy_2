import React, { useState } from 'react';
import FormButton from '../../components/FormButton';

const inputs = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  age: '',
  gender: '',
};

const RegisterForm = () => {
  const [formInputs, setFormInputs] = useState(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInputs);
  };
  return (
    <div className="flex justify-center items-center md:h-screen">
      <div className="w-full my-12 max-w-4xl">
        <form className="bg-white grid grid-cols-6 justify-center mx-4 gap-x-2 gap-y-6">
          <h1 className="text-center text-2xl mb-6 text-red-400 font-bold font-sans col-span-full">
            Sign Up
          </h1>
          <div className="relative col-span-3 w-full">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              First Name
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.firstName}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </div>
          <div className="relative col-span-3 w-full">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Last Name
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.lastName}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-full">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.email}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-full">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.password}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-full">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.confirmPassword}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </div>
          <div className="relative col-span-4">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Address 1
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.address1}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, address1: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Address 2
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.address2}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, address2: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-4">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              City
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.city}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              State
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700 text-sm"
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, state: e.target.value }))
              }
            >
              <option disabled selected value>
                {''}
              </option>
              <option>Test</option>
              <option>Test2</option>
              <option>Test3</option>
              <option>Test4</option>
              <option>Test5</option>
              <option>Test6</option>
            </select>
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Zip
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.zip}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Age
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.age}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, age: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-sm sm:text-base absolute -top-3 left-3 bg-white px-1">
              Gender
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option disabled selected value>
                {''}
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
              <option>Other</option>
              <option>Prefer Not To Say</option>
            </select>
          </div>
          <div className="col-span-full md:w-3/5 md:mx-auto">
            <FormButton handleSubmit={handleSubmit}>Create Account</FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
