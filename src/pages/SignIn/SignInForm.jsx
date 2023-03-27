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

const inputs = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState(inputs);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(requestLogin(formInputs));
    const authState = await dispatch(successfulLogin());
    if (authState.payload.error) {
      alert(authState.payload.error);
    } else {
      dispatch(tryToken());
      navigate('/');
    }
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
                className="w-full px-4 py-2 rounded-lg focus:outline-none border border-primary-gray"
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
                className="text-label font-semibold block text-sm absolute -top-3 left-3 bg-white px-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg focus:outline-none border border-primary-gray"
                type="password"
                name="password"
                value={formInputs.password}
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
