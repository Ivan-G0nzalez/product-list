import { useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerUser } from '../../services/Auth.services.request';

// Validación con Yup
const loginSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  username: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Username is required'),
  email: Yup.string()
    .email('text@example.com')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'maximo 50'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  password2: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

const initialValues = {
  username: '',
  password: '',
  password2: '',
  full_name: '',
  email: '',
};

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      setLoading(true);
      try {
        await registerUser(values);
        resetForm();
      } catch (error) {
        console.error(error);
        setStatus('The login details are incorrect');
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-gray-900 text-2xl font-bold mb-3">
          Registration Form
        </h1>
      </div>

      {formik.status && (
        <div className="mb-4 text-red-500 bg-red-100 p-3 rounded">
          <div>{formik.status}</div>
        </div>
      )}

      {/* FullName */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Full name</label>
        <input
          placeholder="full_name"
          {...formik.getFieldProps('full_name')}
          className={`w-full px-3 py-2 border ${
            formik.touched.full_name && formik.errors.full_name
              ? 'border-red-500'
              : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600`}
          type="text"
          name="full_name"
          autoComplete="off"
        />
        {formik.touched.full_name && formik.errors.full_name && (
          <div className="text-red-500 text-sm mt-2">
            {formik.errors.full_name}
          </div>
        )}
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Username</label>
        <input
          placeholder="Username"
          {...formik.getFieldProps('username')}
          className={`w-full px-3 py-2 border ${
            formik.touched.username && formik.errors.username
              ? 'border-red-500'
              : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600`}
          type="text"
          name="username"
          autoComplete="off"
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-500 text-sm mt-2">
            {formik.errors.username}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">email</label>
        <input
          placeholder="email"
          {...formik.getFieldProps('email')}
          className={`w-full px-3 py-2 border ${
            formik.touched.email && formik.errors.email
              ? 'border-red-500'
              : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600`}
          type="text"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-2">{formik.errors.email}</div>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Password</label>
        <input
          type="password"
          placeholder="password"
          autoComplete="off"
          {...formik.getFieldProps('password')}
          className={`w-full px-3 py-2 border ${
            formik.touched.password && formik.errors.password
              ? 'border-red-500'
              : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600`}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm mt-2">
            {formik.errors.password}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Confirm Password
        </label>

        <input
          placeholder="confirm password"
          type="password"
          autoComplete="off"
          {...formik.getFieldProps('password2')}
          className={`w-full px-3 py-2 border ${
            formik.touched.password && formik.errors.password
              ? 'border-red-500'
              : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600`}
        />
        {formik.touched.password2 && formik.errors.password2 && (
          <div className="text-red-500 text-sm mt-2">
            {formik.errors.password2}
          </div>
        )}
      </div>

      {/* Forgot Password Link */}

      {/* Submit Button */}
      <div className="mb-6">
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            formik.isSubmitting || !formik.isValid
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span>Continue</span>}
          {loading && (
            <span className="flex justify-center">
              Please wait...
              <span className="ml-2 loader"></span>
            </span>
          )}
        </button>
        <div className="text-center pt-3">
          <Link
            className="text-indigo-600 hover:text-indigo-400"
            to="/auth/login"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}
