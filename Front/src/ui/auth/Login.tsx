import { useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { getUserByToken, login } from '../../services/Auth.services.request';
import { useAuth } from '../../adapters/auth/Auth';

// Validación con Yup
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.username, values.password);
        saveAuth(auth);
        const { data: user } = await getUserByToken(auth.access);
        setCurrentUser(user);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('The login details are incorrect');
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
        <h1 className="text-gray-900 text-2xl font-bold mb-3">Sign In</h1>
      </div>

      {formik.status && (
        <div className="mb-4 text-red-500 bg-red-100 p-3 rounded">
          <div>{formik.status}</div>
        </div>
      )}

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

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Password</label>
        <input
          type="password"
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

      {/* Forgot Password Link */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/auth/forgot-password" className="text-indigo-600">
          Forgot Password?
        </Link>
      </div>

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
      </div>
    </form>
  );
}
