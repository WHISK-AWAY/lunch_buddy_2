import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../components/FormButton';
import { listOfStates } from '../../utilities/registerHelpers';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkUserCreated,
  fetchUser,
  updateUser,
} from '../../redux/slices/userSlice';

const inputs = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  age: '',
  gender: '',
};

const requiredFields = [
  'firstName',
  'LastName',
  'address1',
  'city',
  'state',
  'zip',
  'age',
  'gender',
];

const EditUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState(inputs);

  const authUser = useSelector((state) => state.auth.user);
  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    async function getUser() {
      await dispatch(fetchUser(authUser.id));
    }
    if (authUser.id) {
      getUser();
    }
  }, [authUser]);

  useEffect(() => {
    if (userInfo.id) {
      for (let key in formInputs) {
        setFormInputs((prev) => ({ ...prev, [key]: userInfo[key] }));
      }
    }
    // setFormInputs(userInfo);
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = [];
    for (let field of requiredFields) {
      if (formInputs[field] === '') {
        missingFields.push(field);
      }
    }
    if (missingFields.length > 0) {
      alert(`Missing required fields: ${missingFields.join(', ')}`);
    } else {
      await dispatch(updateUser(formInputs));
    }

    const asyncError = await dispatch(checkUserCreated());
    if (asyncError.payload.error) {
      console.log('async error', typeof asyncError.payload.error);
      alert(`Error: ${asyncError.payload.error}`);
    } else {
      navigate('/');
    }
  };
  return (
    <div className="h-screen flex justify-center lg:grow items-center">
      <div className="w-full xs:w-4/5 sm:w-3/5 md:w-1/2">
        <form className="bg-white grid grid-cols-6 justify-center mx-4 gap-x-2 gap-y-6 lg:px-8">
          <h1 className="text-center text-2xl mb-6 text-red-400 font-bold font-sans col-span-full">
            Edit Information
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
          {/* <div className="relative col-span-full">
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
              type="password"
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
              type="password"
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-700"
              value={formInputs.confirmPassword}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </div> */}
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
              {listOfStates.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
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
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="Other">Other</option>
              <option value="DidNotDisclose">Prefer Not To Say</option>
            </select>
          </div>
          <div className="col-span-full md:w-3/5 md:mx-auto">
            <FormButton handleSubmit={handleSubmit}>Continue</FormButton>
          </div>
        </form>
      </div>
      <img
        className="w-1/2 hidden lg:block"
        src="/assets/bgImg/signUpView.jpg"
        alt="person smearing a dip on toast, at a restaurant with wine, plates, coffee"
      />
    </div>
  );
};

export default EditUserForm;
