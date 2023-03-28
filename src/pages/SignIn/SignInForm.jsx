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
import { INVALID_CLASS } from '../../utilities/InvalidInputClass';

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

    console.log('tempValidator', tempValidator);
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

  return (
    <div className="h-[calc(100vh_-_75px)] w-screen flex justify-center items-center text-primary-gray">
      <div className="form-container basis-full lg:basis-1/2 h-full flex flex-col justify-center items-center">
        <div className="w-full xs:w-4/5 sm:w-3/5 md:w-2/3">
          <form className="bg-transparent p-10 rounded-lg lg:w-3/4 mx-auto flex flex-col">
            <h1 className="text-center text-2xl mb-6 text-headers font-bold font-sans">
              SIGN IN
            </h1>
            <div className="relative my-6">
              <label
                className="text-label font-semibold block text-sm absolute -top-3 left-3 bg-white px-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`${
                  isInvalid ? INVALID_CLASS : null
                } w-full px-4 py-2 rounded-lg focus:outline-none border border-primary-gray`}
                type="text"
                name="email"
                value={formInputs.email}
                placeholder={isInvalid ? 'Invalid credentials' : null}
                onChange={(e) =>
                  setFormInputs((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="relative mt-6">
              <label
                className="text-label font-semibold block text-sm absolute -top-3 left-3 bg-white px-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`${
                  isInvalid ? INVALID_CLASS : null
                } w-full px-4 py-2 rounded-lg focus:outline-none border border-primary-gray`}
                type="password"
                name="password"
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
            <FormButton handleSubmit={handleSubmit}>SIGN IN</FormButton>
            <p className="my-4 text-xs text-center">
              don't have an account? create one{' '}
              <Link to={'/register'}>
                <span className="text-headers hover:underline">here</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="image-wrapper hidden lg:block basis-1/2 h-full bg-cover bg-[url('/assets/bgImg/signInView.jpg')]"></div>
    </div>
  );
};

export default SignInForm;
