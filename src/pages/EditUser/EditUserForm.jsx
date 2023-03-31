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
  'lastName',
  'address1',
  'city',
  'state',
  'zip',
  'age',
  'gender',
];

const invalidClass =
  'border-1 border-red-500 placeholder:text-xs placeholder:leading-tight';

const EditUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState(inputs);
  const [inputValidator, setInputValidator] = useState(
    requiredFields.reduce((accumulator, field) => {
      accumulator[field] = false;
      return accumulator;
    }, {})
  );

  const authUser = useSelector((state) => state.auth.user);
  const userInfo = useSelector((state) => state.user.user);

  const validateZip = (zip) => {
    const valid = /^\d+$/;
    return valid.test(zip);
  };

  const validateEmail = (email) => {
    // from https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return valid.test(email);
  };

  const validatePassword = (password) => {
    return (
      formInputs.password.length >= 8 &&
      formInputs.password === formInputs.confirmPassword
    );
  };

  const validateAge = () => {
    return formInputs.age >= 18;
  };

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

    const tempFields = { ...formInputs };
    const tempValidator = requiredFields.reduce((accumulator, field) => {
      accumulator[field] = false;
      return accumulator;
    }, {});

    for (let field of requiredFields) {
      if (formInputs[field] === '') {
        missingFields.push(field);
        tempValidator[field] = true;
      }
      if (
        formInputs[field] !== '' &&
        field === 'email' &&
        !validateEmail(formInputs.email)
      ) {
        tempFields.email = '';
        tempValidator[field] = true;
        missingFields.push(field);
      }
      if (
        formInputs[field] !== '' &&
        field === 'password' &&
        !validatePassword()
      ) {
        tempFields.password = '';
        tempFields.confirmPassword = '';
        missingFields.push('password', 'confirmPassword');
        tempValidator[field] = true;
        tempValidator.confirmPassword = true;
      }
      if (
        formInputs[field] !== '' &&
        field === 'zip' &&
        !validateZip(formInputs.zip)
      ) {
        tempFields.zip = '';
        missingFields.push(field);
        tempValidator[field] = true;
      }
      if (!validateAge()) {
        missingFields.push('age');
        tempValidator.age = true;
        tempFields.age = '';
      }
    }
    setInputValidator(tempValidator);
    setFormInputs(tempFields);

    if (
      missingFields.length > 0 &&
      Object.values(tempValidator).some((field) => field)
    ) {
      console.log(missingFields.join(','));
    } else {
      await dispatch(updateUser(formInputs));
      const asyncError = await dispatch(checkUserCreated());
      if (asyncError.payload.error) {
        console.log('async error', typeof asyncError.payload.error);
        console.log(`Error: ${asyncError.payload.error}`);
      } else {
        navigate('/account');
      }
    }
  };

  return (
    <div className="h-screen flex justify-center lg:grow items-center">
      <div className="w-full xs:w-4/5 sm:w-3/5 md:w-1/2">
        <form className="bg-white grid grid-cols-6 justify-center mx-4 gap-x-2 gap-y-6 lg:px-8">
          <h1 className="text-center text-2xl mb-6 text-red-400 font-bold font-sans col-span-full">
            EDIT
          </h1>
          <div className="relative col-span-3 w-full">
            <label className="text-red-400 font-semibold block text-xs absolute -top-3 left-3 bg-white px-1">
              First Name
            </label>
            <input
              className={`${
                inputValidator.firstName ? invalidClass : null
              }  w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray text-[.9rem]`}
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
            <label className="text-red-400 font-semibold block text-xs absolute -top-3 left-3 bg-white px-1">
              Last Name
            </label>
            <input
              className={`${
                inputValidator.lastName ? invalidClass : null
              }  w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray text-[.9rem]`}
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
          <div className="relative col-span-4 text-primary-gray">
            <label className="text-red-400 font-semibold block text-xs absolute -top-3 left-3 bg-white px-1">
              Address 1
            </label>
            <input
              className={`${
                inputValidator.address1 ? invalidClass : null
              }  w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray text-[.9rem]`}
              value={formInputs.address1}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, address1: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-xs absolute -top-3 left-3 bg-white px-1">
              Address 2
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray text-[.9rem]"
              value={formInputs.address2}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, address2: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-4">
            <label className="text-red-400 font-semibold block text-xs absolute -top-3 left-3 bg-white px-1">
              City
            </label>
            <input
              className={`${
                inputValidator.lastName ? invalidClass : null
              }  w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray text-[.9rem]`}
              value={formInputs.city}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-xs absolute -top-3 left-3 bg-white px-1">
              State
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray text-xs bg-white"
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
            <label className="text-red-400 font-semibold block text-xs  absolute -top-3 left-3 bg-white px-1">
              Zip
            </label>
            <input
              className={`${
                inputValidator.zip ? invalidClass : null
              }  w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray text-[.9rem]`}
              value={formInputs.zip}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-xs absolute -top-3 left-3 bg-white px-1">
              Age
            </label>
            <input
              className={`${
                inputValidator.age ? invalidClass : null
              }  w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray text-[.9rem]`}
              type="number"
              value={formInputs.age}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, age: e.target.value }))
              }
              placeholder="18+"
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-red-400 font-semibold block text-xs absolute -top-3 left-3 bg-white px-1">
              Gender
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg focus:outline-none h-10 border border-primary-gray bg-white text-xs"
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
            <FormButton handleSubmit={handleSubmit}>CONTINUE</FormButton>
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
