import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormButton from '../../components/FormButton';
import { useSelector, useDispatch } from 'react-redux';
import { requestLogin, successfulLogin } from '../../redux/slices/authSlice';
import { INVALID_CLASS } from '../../utilities/invalidInputClass';

import gsap from 'gsap';

const inputs = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);

  const [isInvalid, setIsInvalid] = useState(false);
  const [formInputs, setFormInputs] = useState(inputs);

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
    // move to homepage when authUser becomes defined (either on entry or on login)
    if (authUser?.id) navigate('/');
  }, [authUser?.id]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/');
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tempFields = { ...formInputs };
    const tempValidator = Object.keys(inputs).reduce((accumulator, field) => {
      accumulator[field] = false;
      return accumulator;
    }, {});

    for (let field in inputs) {
      if (formInputs[field] === '') {
        tempValidator[field] = true;
      }
      if (
        formInputs[field] !== '' &&
        field === 'email' &&
        !validateEmail(formInputs.email)
      ) {
        tempFields.email = '';
        tempValidator[field] = true;
      }
      if (
        formInputs[field] !== '' &&
        field === 'password' &&
        !validatePassword(formInputs.password)
      ) {
        tempFields.password = '';
        tempValidator[field] = true;
      }
    }

    setFormInputs(tempFields);

    if (Object.values(tempValidator).some((field) => field)) {
      setIsInvalid(true);
      return;
    }

    await dispatch(requestLogin(formInputs));

    const authState = await dispatch(successfulLogin());
    if (authState.payload.error) {
      setFormInputs((prev) => ({ ...inputs, email: prev.email }));
      setIsInvalid(true);
    } else {
      // dispatch(tryToken());
      // navigate('/');
    }
  };

  const validateEmail = (email) => {
    // from https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return valid.test(email);
  };

  const validatePassword = (password) => {
    return formInputs.password.length >= 8;
  };

  return (
    <div className="  w-screen flex justify-center items-center font-jost text-primary-gray bg-white dark:bg-[#0a0908] landscape:h-[calc(100svh_-_56px)] portrait:h-[calc(100svh_-_56px)] landscape:3xl:h-[calc(100svh_-_64px)]">
      <div className="form-container basis-full lg:basis-7/12 h-fit flex flex-col justify-center items-center ">
        <div className="w-4/5  sm:w-4/5 landscape:lg:w-full lg:w-full  landscape:4xl:w-4/6 landscape:5xl:w-3/6 landscape:6xl:w-5/12  portrait:md:w-3/6 portrait:md:pb-36 portrait:lg:w-full portrait:lg:pb-56 landscape:w-3/5">
          <form className=" lg:w-3/4 mx-auto flex flex-col">
            <h1 className="text-center text-2xl mb-6 text-headers font-regular xl:text-[1.4vw] 3xl:text-[1.3vw] 4xl:text-[1.1vw] 5xl:text-[1vw] lg:text-[1.6vw] 6xl:text-[.8vw] portrait:lg:text-[3vw] landscape:pt-5 landscape:mb-1">
              SIGN IN
            </h1>
            <div className="relative my-6">
              <label
                className="text-label font-regular md:text-xs portrait:lg:text-[1.5vw] block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1 6xl:text-[.5vw]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                autoFocus={true}
                className={`${
                  isInvalid ? INVALID_CLASS : null
                } w-full px-4 py-1 autofill:bg-none focus:outline-none bg-white dark:bg-[#0a0908] border md:py-2 text-xs placeholder:bg-transparent  border-primary-gray 6xl:text-[.7vw] 3xl:py-3 rounded-sm dark:text-white portrait:py-2 landscape:text-[1.1rem] portrait:xs:text-sm`}
                type="text"
                name="email"
                autoComplete="email"
                value={formInputs.email}
                placeholder={isInvalid ? 'Invalid credentials' : null}
                onChange={(e) =>
                  setFormInputs((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="relative mt-6">
              <label
                className="text-label md:text-xs font-regular block text-xs portrait:lg:text-[1.5vw] absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1 6xl:text-[.5vw]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`${
                  isInvalid ? INVALID_CLASS : null
                } w-full px-4 py-1 autofill:bg-none dark:bg-[#0a0908] 3xl:py-3 dark:focus:bg-[#0a0908] dark:placeholder:bg-[#0a0908] focus:outline-none border rounded-sm dark:text-white border-primary-gray text-xs md:py-2 6xl:text-[.7vw] text-[1rem] portrait:py-2 landscape:text-[1.1rem] portrait:xs:text-sm portrait:lg:text-base`}
                type="password"
                name="password"
                autoComplete="password"
                value={formInputs.password}
                placeholder={isInvalid ? 'Invalid credentials' : null}
                onChange={(e) =>
                  setFormInputs((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <div
              id="btn-container"
              className="pt-6 landscape:pt-2 landscape:lg:pt-6"
            >
              <FormButton handleSubmit={handleSubmit}>
                <span className="md:text-[2vw] portrait:md:text-[2vw] xl:text-[1.4vw] 5xl:text-[.6vw] text-[4.2vw] sm:text-[4.8vw] portrait:lg:text-[2vw]  lg:text-[1.4vw] 3xl:text-[1vw] 4xl:text-[.8vw] landscape:text-[1rem]">
                  SIGN IN
                </span>
              </FormButton>
            </div>
            <p className="my-4 text-center dark:text-white text-primary-gray lg:text-[1vw] portrait:md:text-[2vw]  3xl:text-[.7vw] 5xl:text-[.6vw] text-[3vw] portrait:lg:text-[1.7vw] md:text-[1.4vw] 6xl:text-[.4vw] landscape:text-[.8rem] landscape:mt-1">
              don't have an account? create one{'  '}
              <Link to={'/register'}>
                <span className="text-headers hover:underline underline-offset-2 ">
                  here
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div
        ref={topImageRef}
        className="image-wrapper hidden lg:block basis-full h-full bg-cover bg-no-repeat bg-[url('/assets/bgImg/registerForm.jpg')] supports-[background-image:_url('/assets/bgImg/registerForm-lq_10.webp')]:bg-[url('/assets/bgImg/registerForm-lq_10.webp')] portrait:lg:hidden"
      ></div>
    </div>
  );
};

export default SignInForm;
