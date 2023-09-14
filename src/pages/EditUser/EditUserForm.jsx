import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../components/FormButton';
import { listOfStates } from '../../utilities/registerHelpers';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkUserCreated,
  fetchUser,
  updateUser,
} from '../../redux/slices/userSlice';

import gsap from 'gsap';
import { fetchAllTags } from '../../redux/slices/tagSlice';

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

  const authUser = useSelector((state) => state.auth.user);
  const userInfo = useSelector((state) => state.user.user);

  const [formInputs, setFormInputs] = useState(inputs);
  const [baseImage, setBaseImage] = useState('');

  // TODO: convert to memo
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
    bgImg.src = '/assets/bgImg/signUpView-q30.webp';

    gsap.set(topImageRef.current, { opacity: 0 });

    bgImg.onload = () => {
      gsap.to(topImageRef.current, { opacity: 1, duration: 0.5 });
    };
  }, []);

  useEffect(() => {
    setFormInputs((prev) => ({
      ...prev,
      avatarUrl: baseImage,
    }));
  }, [baseImage]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      // fetch tags list before next view where they'll be needed
      dispatch(fetchAllTags());
    }
  }, []);

  useEffect(() => {
    if (authUser.id) {
      dispatch(fetchUser());
    } else console.log('authuser missing');
  }, [authUser.id]);

  useEffect(() => {
    if (userInfo.id) {
      for (let key in formInputs) {
        setFormInputs((prev) => ({ ...prev, [key]: userInfo[key] || '' }));
      }
    }
    // setFormInputs(userInfo);
  }, [userInfo.id]);

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
    return +formInputs.age >= 18 && +formInputs.age < 135;
  };

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
      dispatch(updateUser(formInputs));
      // const asyncError = await dispatch(checkUserCreated());
      // if (asyncError.payload.error) {
      //   console.log('async error', typeof asyncError.payload.error);
      //   console.log(`Error: ${asyncError.payload.error}`);
      // } else {
      navigate('/edituser/tags');
      // }
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="h-[calc(100vh_-_56px)] sm:h-[calc(100dvh_-_80px)] xs:h-[calc(100dvh_-_71px)] portrait:md:h-[calc(100dvh_-_85px)] portrait:lg:h-[calc(100dvh_-_94px)] md:h-[calc(100dvh_-_60px)] xl:h-[calc(100dvh_-_70px)] 5xl:h-[calc(100dvh_-_80px)]  dark:bg-[#0a0908] bg-white dark:text-white flex lg:justify-between lg:portrait:justify-center lg:grow items-center text-primary-gray justify-center ">
      <div className="flex flex-col items-center w-full  2xl:justify-center sm:w-4/5 md:w-2/3 5xl:w-3/6 6xl:w-5/12  portrait:md:w-3/6 portrait:md:pb-36 portrait:lg:w-3/5 ">
        <form className="bg-white 2xl:w-3/5 5xl:w-2/5 dark:bg-[#0a0908] grid grid-cols-6 justify-center mx-4 gap-x-2 gap-y-6 lg:px-8 mb-10 ">
          <h1 className="text-center text-2xl mb-6 text-headers font-regular lg:text-3xl col-span-full">
            EDIT
          </h1>
          <div className="relative col-span-3 w-full">
            <label className="text-label font-regular block text-xs md:text-sm absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              First Name
            </label>
            <input
              className={`${
                inputValidator.firstName ? invalidClass : null
              }  w-full px-4 py-2 rounded-sm focus:outline-none h-9 border bg-white dark:bg-[#0a0908] border-primary-gray text-[.9rem]`}
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
            <label className="text-label md:text-sm font-regular block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              Last Name
            </label>
            <input
              className={`${
                inputValidator.lastName ? invalidClass : null
              }  w-full px-4 py-2 rounded-sm focus:outline-none h-9 border bg-white dark:bg-[#0a0908] border-primary-gray text-[.9rem]`}
              value={formInputs.lastName}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-4 text-primary-gray">
            <label className="text-label md:text-sm font-regular block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              Address 1
            </label>
            <input
              className={`${
                inputValidator.address1 ? invalidClass : null
              }  w-full px-4 py-2 rounded-sm focus:outline-none h-9 border bg-white dark:bg-[#0a0908] dark:text-white border-primary-gray text-[.9rem]`}
              value={formInputs.address1}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, address1: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-label md:text-sm font-regular block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              Address 2
            </label>
            <input
              className="w-full px-4 py-2 rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] h-9 border border-primary-gray text-[.9rem]"
              value={formInputs.address2}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, address2: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-4">
            <label className="text-label md:text-sm font-regular block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              City
            </label>
            <input
              className={`${
                inputValidator.lastName ? invalidClass : null
              }  w-full px-4 py-2 rounded-sm focus:outline-none bg-white dark:bg-[#0a0908] h-9 border border-primary-gray text-[.9rem]`}
              value={formInputs.city}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-label  font-regular block text-xs md:text-sm absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              State
            </label>
            <select
              className="w-full px-4 py-2 rounded-sm focus:outline-none h-9 border border-primary-gray text-xs bg-white dark:bg-[#0a0908]"
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, state: e.target.value }))
              }
              defaultValue={userInfo.state}
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
            <label className="text-label md:text-sm font-regular block text-xs  absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              Zip
            </label>
            <input
              className={`${
                inputValidator.zip ? invalidClass : null
              }  w-full px-4 py-2 rounded-sm focus:outline-none h-9 border bg-white dark:bg-[#0a0908] border-primary-gray text-[.9rem]`}
              value={formInputs.zip}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-label md:text-sm font-regular block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              Age
            </label>
            <input
              className={`${
                inputValidator.age ? invalidClass : null
              }  w-full px-4 py-2 rounded-sm focus:outline-none h-9 border bg-white dark:bg-[#0a0908] border-primary-gray text-[.9rem]`}
              type="text"
              value={formInputs.age}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, age: e.target.value }))
              }
              placeholder="18+"
            />
          </div>
          <div className="relative col-span-2">
            <label className="text-label md:text-sm font-regular block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1">
              Gender
            </label>
            <select
              className="w-full px-4 py-2 rounded-sm focus:outline-none h-9 border border-primary-gray bg-white dark:bg-[#0a0908] text-xs"
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, gender: e.target.value }))
              }
              defaultValue={userInfo.gender}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="Other">Other</option>
              <option value="DidNotDisclose">Prefer Not To Say</option>
            </select>
          </div>
          <div className="relative col-span-2 ">
            <label className="text-label  md:text-sm text-xs bg-white dark:bg-[#0a0908] ">
              Upload Image
            </label>
            <input
              className="bg-white dark:bg-[#0a0908] max-w-screen"
              type="file"
              onChange={(e) => {
                uploadImage(e);

                setFormInputs((prev) => ({
                  ...prev,
                  avatarUrl: baseImage,
                }));
              }}
            />
          </div>
          <div className="col-span-full w-full  md:mx-auto">
            <FormButton handleSubmit={handleSubmit}>
              <span className="text-[1.8vw] md:text-[2vw] portrait:md:text-[2vw] xl:text-[1.4vw] 5xl:text-[1vw] xxs:text-[4.2vw] sm:text-[4.8vw] portrait:lg:text-[2vw]">
                CONTINUE
              </span>
            </FormButton>
          </div>
        </form>
      </div>
      <div
        ref={topImageRef}
        className="image-wrapper overflow-hidden hidden portrait:lg:hidden lg:block basis-1/2 h-full bg-cover bg-[url('/assets/bgImg/signUpView.jpg')] supports-[background-image:_url('/assets/bgImg/signUpView-q30.webp')]:bg-[url('/assets/bgImg/signUpView-q30.webp')]"
        alt="person smearing a dip on toast, at a restaurant with wine, plates, coffee"
      ></div>
    </div>
  );
};

export default EditUserForm;
