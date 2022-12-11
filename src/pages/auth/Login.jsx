import { login } from '../../actions/auth/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// Bootstrap
import { toast } from 'react-toastify';

import { Formik } from 'formik';
import * as yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await login({ email, password });
      setTimeout(() => {
        navigate('/dashboard/bookings');
      }, 1000);
      if (response.data) {
        window.localStorage.setItem('auth', JSON.stringify(response.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: response.data,
        });
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('').required('must be string'),
    password: yup
      .string()
      .typeError('must be string')
      .required('must be string'),
  });

  return (
    <div className="container border border-red-400 p-8 text-base regular-font">
      <div>
        <div>
          <div className="header-font text-4xl pb-6">Welcome Back!</div>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validateOnBlur
            onSubmit={(values) => {
              loginHandler;
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleBlur }) => (
              <div>
                <p className="pb-4 ">
                  <label className="mr-4" htmlFor={`mail`}>
                    Mail
                  </label>
                  <input
                    className="border border-gray-400"
                    type="text"
                    name={`email`}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleBlur}
                    values={values.name}
                  />
                </p>

                <p>
                  <label className="mr-4" htmlFor={`password`}>
                    Password
                  </label>
                  <input
                    className="border border-gray-400"
                    type="password"
                    name={`password`}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleBlur}
                    values={values.name}
                  />
                </p>

                <button
                  className=" my-4 h-12 w-50 px-6 py-0 flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
                  type="submit"
                  disabled={loading}
                  onClick={loginHandler}
                >
                  Sign in
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
