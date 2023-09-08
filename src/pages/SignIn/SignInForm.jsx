import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormButton from '../../components/FormButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestLogin,
  successfulLogin,
  tryToken,
} from '../../redux/slices/authSlice';
import { selectAuthStatus } from '../../redux/slices/authSlice';
import { INVALID_CLASS } from '../../utilities/invalidInputClass';
import AOS from 'aos';
import 'aos/dist/aos.css';

const inputs = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInvalid, setIsInvalid] = useState(false);

  const [formInputs, setFormInputs] = useState(inputs);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

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
      console.log('tempValidator1', tempValidator);
      setIsInvalid(true);
      return;
    }

    await dispatch(requestLogin(formInputs));

    const authState = await dispatch(successfulLogin());
    if (authState.payload.error) {
      setFormInputs(inputs);
      setIsInvalid(true);
      console.log(authState.payload.error);
    } else {
      dispatch(tryToken());
      navigate('/');
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

  AOS.init({
    duration: 2000,
    offset: 0,
  });

  return (
    <div className="h-[calc(100dvh_-_9dvh)] w-screen flex justify-center items-center font-jost text-primary-gray bg-white dark:bg-[#0a0908]">
      <div
        className="form-container basis-full lg:basis-1/2 h-full flex flex-col justify-center items-center "
        // data-aos="fade-down"
        // data-aos-delay="1000"
        // duration="1000"
      >
        <div className="w-full xxs:w-4/5  sm:w-4/5 md:w-2/3 5xl:w-3/6 6xl:w-5/12  portrait:md:w-3/6 portrait:md:pb-36 portrait:lg:w-full portrait:lg:pb-56">
          <form className=" lg:w-3/4 mx-auto flex flex-col">
            <h1 className="text-center text-2xl mb-6 text-headers font-medium  6xl:text-[1.5vw] portrait:lg:text-[3vw]">
              SIGN IN
            </h1>
            <div className="relative my-6">
              <label
                className="text-label font-regular md:text-sm portrait:lg:text-[1.5vw] block text-xs absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1 6xl:text-[.5vw]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`${
                  isInvalid ? INVALID_CLASS : null
                } w-full px-4 py-1  focus:outline-none bg-white dark:bg-[#0a0908] border 2xl:py-2  border-primary-gray 6xl:text-[.7vw] rounded-sm dark:text-white portrait:xxs:py-2`}
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
                className="text-label md:text-sm font-regular block text-xs portrait:lg:text-[1.5vw] absolute -top-3 left-3 bg-white dark:bg-[#0a0908] px-1 6xl:text-[.5vw]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`${
                  isInvalid ? INVALID_CLASS : null
                } w-full px-4 py-1  dark:bg-[#0a0908]  dark:focus:bg-[#0a0908] dark:placeholder:bg-[#0a0908] focus:outline-none border rounded-sm dark:text-white border-primary-gray 2xl:py-2 6xl:text-[.7vw] portrait:xxs:py-2`}
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
              className="pt-6 "
              // data-aos="fade-in"
              // data-aos-delay="2000"
              // duration="1500"
            >
              <FormButton handleSubmit={handleSubmit}>
                <span className="text-[1.8vw] md:text-[2vw] portrait:md:text-[2vw] xl:text-[1.4vw] 5xl:text-[1vw] xxs:text-[4.2vw] sm:text-[4.8vw] portrait:lg:text-[2vw]">
                  SIGN IN
                </span>
              </FormButton>
            </div>
            <p
              className="my-4 text-center dark:text-white text-primary-gray text-[1.7vw] lg:text-[1vw] portrait:md:text-[2vw]  3xl:text-[.8vw] 5xl:text-[.6vw] xxs:text-[3vw] portrait:lg:text-[1.7vw] md:text-[1.4vw]"
              // data-aos="fade-in"
              // data-aos-delay="2500"
              // duration="1500"
            >
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
        className="image-wrapper hidden lg:block basis-1/2 h-full bg-cover bg-[url('/assets/bgImg/signInView-q30.webp')] portrait:lg:hidden"
        // data-aos="fade-left"
        // data-aos-delay="200"
        // data-aos-duration="2800"
      ></div>
    </div>
  );
};

export default SignInForm;
