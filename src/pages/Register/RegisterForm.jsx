import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import FormButton from '../../components/FormButton';
import { listOfStates } from '../../utilities/registerHelpers';
import { INVALID_CLASS } from '../../utilities/invalidInputClass';

import gsap from 'gsap';
import { fetchAllTags } from '../../redux/slices/tagSlice';
import { useDispatch } from 'react-redux';

// setting a couple defaults here so we keep the starting value if we proceed without changing
const inputs = JSON.parse(localStorage.getItem('registerForm')) || {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  address1: '',
  address2: '',
  city: '',
  state: 'NY',
  zip: '',
  age: '18',
  gender: 'DidNotDisclose',
};

const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'password',
  'confirmPassword',
  'address1',
  'city',
  'state',
  'zip',
  'age',
  'gender',
];

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState(inputs);
  const [emailIsUnavailable, setEmailIsUnavailable] = useState(false);

  const [inputValidator, setInputValidator] = useState(
    requiredFields.reduce((accumulator, field) => {
      accumulator[field] = false;
      return accumulator;
    }, {})
  );

  const topImageRef = useRef(null);

  useEffect(() => {
    // fade bg image in only after it's downloaded

    const bgImg = new Image();
    bgImg.src = '/assets/bgImg/registerForm-lq_10.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    // prefetch tags for use in next screen
    dispatch(fetchAllTags());
  }, []);

  useEffect(() => {
    // Set error status (and therefore styling / feedback) according to email availability check
    if (emailIsUnavailable) {
      setFormInputs((prev) => ({ ...prev, email: '' }));
    }
  }, [emailIsUnavailable]);

  const handleSubmit = (e) => {
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
      if (formInputs[field] !== '' && field === 'age' && !validateAge()) {
        tempFields.age = 18;
        missingFields.push(field);
        tempValidator[field] = true;
      }
    }
    setInputValidator(tempValidator);
    setFormInputs(tempFields);

    if (
      missingFields.length > 0 &&
      Object.values(tempValidator).some((field) => field)
    ) {
      // console.log(missingFields.join(','));
      // alert(`Missing required fields: ${missingFields.join(', ')}`);
    } else {
      const inputsCopy = { ...formInputs };
      localStorage.setItem('registerForm', JSON.stringify(inputsCopy));
      navigate('/register/aboutyourself');
    }
  };

  const validateZip = (zip) => {
    const valid = /^\d+$/;
    return valid.test(zip) && zip.length === 5;
  };

  const validateEmail = (email) => {
    // from https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return valid.test(email);
  };

  const checkEmailAvailability = async (email) => {
    // Early uniqueness validation on email
    if (email === '') return;

    if (!validateEmail(email)) {
      // no need to check for uniqueness if format is invalid
      setInputValidator((prev) => ({ ...prev, email: true }));
    }

    const queryParams = new URLSearchParams({ email });

    const fullUrl =
      import.meta.env.VITE_API_URL + '/api/auth/check-email?' + queryParams;

    const res = await fetch(fullUrl);
    const { emailExists } = await res.json();

    setEmailIsUnavailable(emailExists);
  };

  const validatePassword = () => {
    return (
      formInputs.password.length >= 8 &&
      formInputs.password === formInputs.confirmPassword
    );
  };

  const validateAge = () => {
    return +formInputs.age >= 18 && +formInputs.age < 120;
  };

  return (
    <div className="flex justify-center  lg:grow items-center  dark:bg-[#0a0908] bg-white  text-primary-gray landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)]  ">
      <div
        id="form-container"
        className="lg:basis-8/12 lg:px-5 xl:px-0 flex flex-col justify-center items-center  basis-full overflow-auto md:h-full xl:h-fit portrait:lg:pt-44 scrollbar-hide pt-20 lg:pt-5 landscape:pt-72 landscape:xs:pt-10"
      >
        <div className="h-full w-4/5 pb-20 sm:w-4/5 lg:w-full md:w-2/3  6xl:w-5/12 2xl:w-3/5 5xl:w-2/5 portrait:md:w-3/6 portrait:md:pb-36 portrait:lg:w-full portrait:lg:pb-56 ">
          <form className=" grid grid-cols-6 justify-center gap-x-2 gap-y-6 lg:px-8 pb-3 xl:px-12 2xl:px-1">
            <h1 className="text-center text-2xl mb-6 text-headers font-regular lg:text-[1.6vw] xl:text-[1.4vw] 3xl:text-[1.3vw]  portrait:lg:text-[3vw] col-span-full 4xl:text-[1.1vw] 5xl:text-[1vw]">
              SIGN UP
            </h1>
            <div className="relative col-span-3 w-full">
              <label className="text-label portrait:lg:text-[1.5vw] font-regular block text-xs  absolute -top-3 left-3 dark:bg-[#0a0908] bg-white px-1 6xl:text-[.5vw]">
                First Name
              </label>
              <input
                className={`${
                  inputValidator.firstName ? INVALID_CLASS : null
                } autofill:bg-none w-full px-4 py-1 focus:outline-none bg-white dark:bg-[#0a0908] dark:text-white md:py-2  rounded-sm border border-primary-gray text-xs 6xl:text-sm 6xl:py-4`}
                placeholder={
                  inputValidator.firstName ? 'Enter first name' : null
                }
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
              <label className="text-label portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 left-3 dark:bg-[#0a0908] bg-white px-1 6xl:text-[.5vw]">
                Last Name
              </label>
              <input
                className={`${
                  inputValidator.lastName ? INVALID_CLASS : null
                } autofill:bg-none w-full px-4 py-1 rounded-sm focus:outline-none  bg-white dark:text-white dark:bg-[#0a0908] border md:py-2  border-primary-gray text-xs 6xl:text-sm 6xl:py-4`}
                placeholder={inputValidator.lastName ? 'Enter last name' : null}
                value={formInputs.lastName}
                onChange={(e) =>
                  setFormInputs((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative col-span-full">
              <label className="text-label portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 left-3 dark:bg-[#0a0908] 6xl:text-[.5vw] bg-white px-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required={true}
                className={`${
                  inputValidator.email || emailIsUnavailable
                    ? INVALID_CLASS
                    : null
                }  w-full px-4 py-1 autofill:bg-none rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2  border-primary-gray dark:text-white text-xs 6xl:text-sm 6xl:py-4`}
                placeholder={
                  emailIsUnavailable
                    ? 'Sorry, that email is already registered.'
                    : inputValidator.email
                    ? 'Enter email'
                    : null
                }
                value={formInputs.email}
                onChange={(e) => {
                  setFormInputs((prev) => ({ ...prev, email: e.target.value }));
                  setEmailIsUnavailable(false);
                }}
                onBlur={(e) => checkEmailAvailability(e.target.value)}
              />
            </div>
            <div className="relative col-span-full">
              <label className="text-label portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 6xl:text-[.5vw] left-3 dark:bg-[#0a0908] bg-white px-1">
                Password
              </label>
              <input
                type="password"
                className={`${
                  inputValidator.password ? INVALID_CLASS : null
                } autofill:bg-none w-full px-4 py-1 rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2  border-primary-gray dark:text-white text-xs 6xl:text-sm 6xl:py-4`}
                placeholder={inputValidator.password ? 'Enter password' : null}
                value={formInputs.password}
                onChange={(e) =>
                  setFormInputs((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative col-span-full">
              <label className="text-label portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 6xl:text-[.5vw] left-3 dark:bg-[#0a0908] bg-white px-1">
                Confirm Password
              </label>
              <input
                type="password"
                className={`${
                  inputValidator.confirmPassword ? INVALID_CLASS : null
                }  w-full px-4 py-1 autofill:bg-none rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2  border-primary-gray dark:text-white text-xs 6xl:text-sm 6xl:py-4`}
                placeholder={
                  inputValidator.confirmPassword ? 'Confirm password' : null
                }
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
              <label className="text-label portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 6xl:text-[.5vw] left-3 dark:bg-[#0a0908] bg-white px-1">
                Address 1
              </label>
              <input
                className={`${
                  inputValidator.address1 ? INVALID_CLASS : null
                }  w-full px-4 py-1 autofill:bg-none rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2  border-primary-gray dark:text-white text-xs 6xl:text-sm 6xl:py-4`}
                placeholder={inputValidator.address1 ? 'Enter address' : null}
                value={formInputs.address1}
                onChange={(e) =>
                  setFormInputs((prev) => ({
                    ...prev,
                    address1: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative col-span-2">
              <label className="text-label 6xl:text-[.5vw] portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 left-3 dark:bg-[#0a0908] bg-white px-1">
                Address 2
              </label>
              <input
                className="w-full px-4 py-1 autofill:bg-none rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2  border-primary-gray dark:text-white text-xs 6xl:text-sm 6xl:py-4"
                value={formInputs.address2}
                onChange={(e) =>
                  setFormInputs((prev) => ({
                    ...prev,
                    address2: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative col-span-4">
              <label className="text-label 6xl:text-[.5vw] portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 left-3 dark:bg-[#0a0908] bg-white px-1">
                City
              </label>
              <input
                className={`${
                  inputValidator.city ? INVALID_CLASS : null
                }  w-full px-4 py-1 autofill:bg-none rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2  border-primary-gray dark:text-white text-xs 6xl:text-sm 6xl:py-4`}
                placeholder={inputValidator.city ? 'Enter city' : null}
                value={formInputs.city}
                onChange={(e) =>
                  setFormInputs((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
            <div className="relative col-span-2">
              <label className="text-label 6xl:text-[.5vw] portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 left-3 dark:bg-[#0a0908] bg-white px-1">
                State
              </label>
              <select
                className="w-full px-4 py-1   rounded-sm focus:outline-none  border md:py-[.35rem]  border-primary-gray dark:text-white text-xs dark:bg-[#0a0908] bg-white 6xl:text-sm 6xl:py-4"
                onChange={(e) =>
                  setFormInputs((prev) => ({ ...prev, state: e.target.value }))
                }
                defaultValue={inputs.state}
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
              <label className="text-label 6xl:text-[.5vw] portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 left-3 dark:bg-[#0a0908] bg-white px-1">
                Zip
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                name="zip"
                minLength="5"
                maxLength="9"
                className={`${
                  inputValidator.zip ? INVALID_CLASS : null
                }  w-full px-4 py-1 autofill:bg-none rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2  border-primary-gray dark:text-white text-xs 6xl:text-sm 6xl:py-4`}
                placeholder={inputValidator.zip ? 'Enter zip' : null}
                value={formInputs.zip}
                onChange={(e) =>
                  setFormInputs((prev) => ({ ...prev, zip: e.target.value }))
                }
              />
            </div>
            <div className="relative col-span-2">
              <label className="text-label 6xl:text-[.5vw] portrait:lg:text-[1.5vw]  font-regular block text-xs absolute -top-3 left-3 dark:bg-[#0a0908] bg-white px-1">
                Age
              </label>
              <input
                type="text"
                placeholder="18+"
                className={`${
                  inputValidator.age ? INVALID_CLASS : null
                }  w-full px-4 py-1 autofill:bg-none rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2  border-primary-gray dark:text-white text-xs focus:border-primary-gray active:border-primary-gray active:ring-primary-gray focus:ring-primary-gray outline-0 focus:bg-white 6xl:text-sm 6xl:py-4`}
                value={+formInputs.age}
                onChange={(e) =>
                  setFormInputs((prev) => ({ ...prev, age: e.target.value }))
                }
              />
            </div>
            <div className="relative col-span-2">
              <label className="text-label 6xl:text-[.5vw] portrait:lg:text-[1.5vw] font-regular block text-xs absolute -top-3 left-3 dark:bg-[#0a0908] bg-white px-1">
                Gender
              </label>
              <select
                className="w-full px-4 py-1  rounded-sm focus:outline-none  md:py-[.37rem]  border-primary-gray dark:text-white  text-xs 6xl:text-sm 6xl:py-4 border   dark:bg-[#0a0908] bg-white"
                onChange={(e) =>
                  setFormInputs((prev) => ({ ...prev, gender: e.target.value }))
                }
                defaultValue={inputs.gender}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
                <option value="DidNotDisclose">Prefer Not To Say</option>
              </select>
            </div>

            <div className="col-span-full   w-full">
              <FormButton handleSubmit={handleSubmit}>
                <span className="md:text-[2vw] portrait:md:text-[2vw] xl:text-[1.2vw] 5xl:text-[.6vw] text-[4.2vw] sm:text-[4.8vw] portrait:lg:text-[2vw] lg:text-[1.4vw] 3xl:text-[1vw] 4xl:text-[.8vw]">
                  CONTINUE
                </span>
              </FormButton>
            </div>
          </form>
          <p className=" text-center dark:text-white text-primary-gray lg:text-[1vw] portrait:md:text-[2vw] pb-4 3xl:text-[.7vw] 5xl:text-[.6vw] text-[3vw] portrait:lg:text-[1.7vw] md:text-[1.4vw] 6xl:text-[.4vw]">
            already have an account?{' '}
            <Link to="/login">
              <span className="text-headers hover:underline underline-offset-2 ">
                sign in
              </span>
            </Link>
          </p>
        </div>
      </div>
      <div
        ref={topImageRef}
        id="bg-img"
        className="bg-cover 
        bg-[url('/assets/bgImg/registerForm.jpg')] supports-[background-image:_url('/assets/bgImg/registerForm-lq_10.webp')]:bg-[url('/assets/bgImg/registerForm-lq_10.webp')] basis-full hidden lg:block portrait:lg:hidden h-full"
        alt="large company sitting at the dining table"
      ></div>
    </div>
  );
};

export default RegisterForm;
