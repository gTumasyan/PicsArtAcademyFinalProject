import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { register } from '../../actions/auth/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const registerHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await register({ name, email, password });
      toast.success('successfully registered');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  const validationSchema = yup.object().shape({
    name: yup.string().typeError('must be string').required('must be string'),
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
              registerHandler;
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleBlur }) => (
              <div>
                <p className="pb-4 ">
                  <label className="mr-4" htmlFor={`name`}>
                    Name
                  </label>
                  <input
                    className="border border-gray-400"
                    type="text"
                    name={`name`}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleBlur}
                    values={values.name}
                  />
                </p>
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
                  onClick={registerHandler}
                >
                  Sign up
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
      {/* <div>
        <div className="header-font text-4xl pb-6">Create account</div>
        <Form onSubmit={registerHandler}>
          <Form.Group className="pb-2">
            <Form.Label className="pr-2">Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pb-2">
            <Form.Label className="pr-2">Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pb-2">
            <Form.Label className="pr-2">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <button
            className=" my-4 h-12 w-50 px-6 py-0 flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-500 ease-in-out"
            type="submit"
            disabled={loading}
          >
            Sign up
          </button>
        </Form>
      </div> */}
    </div>
  );
};

export default Register;
