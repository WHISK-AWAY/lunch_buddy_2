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
    <div className=" bg-orange-100 flex justify-center items-center md:h-screen">
      <div className="w-full mx-4 my-12 max-w-4xl">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full md:grid md:grid-cols-2 md:gap-x-8">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans md:col-span-2">
            Register
          </h1>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              First Name
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="Ulysses"
              value={formInputs.firstName}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Last Name
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="The Third"
              value={formInputs.lastName}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Email
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="Email"
              value={formInputs.email}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Password
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="********"
              value={formInputs.password}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Confirm Password
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="********"
              value={formInputs.confirmPassword}
              onChange={(e) =>
                setFormInputs((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Address 1
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="123 Main St"
              value={formInputs.address1}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, address1: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Address 2
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="Apt 404"
              value={formInputs.address2}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, address2: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              City
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="New York"
              value={formInputs.city}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              State
            </label>
            <select
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, state: e.target.value }))
              }
            >
              <option disabled selected value>
                - Choose One -
              </option>
              <option>Test</option>
              <option>Test2</option>
              <option>Test3</option>
              <option>Test4</option>
              <option>Test5</option>
              <option>Test6</option>
            </select>
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Zip
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              placeholder="12345"
              value={formInputs.zip}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, zip: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Age
            </label>
            <input
              type="number"
              placeholder="25"
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              value={formInputs.age}
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, age: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-2 text-sm">
              Gender
            </label>
            <select
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none h-10 border border-slate-300"
              onChange={(e) =>
                setFormInputs((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option disabled selected value>
                - Choose One -
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
              <option>Other</option>
              <option>Prefer Not To Say</option>
            </select>
          </div>
          <div className="md:col-span-2 md:w-3/5 md:mx-auto">
            <FormButton handleSubmit={handleSubmit}>Create Account</FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
