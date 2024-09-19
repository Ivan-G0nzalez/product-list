import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { requestPassword } from '../../services/Auth.services.request';
import { useState } from 'react';
import * as Yup from 'yup';

const initialValues = {
  email: '',
};

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
});

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      try {
        await requestPassword(values.email);
        setHasErrors(false);
      } catch (err) {
        setHasErrors(true);
        setStatus('The login details is incorrect');
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div className="text-center mb-10">
        {/* begin::Title */}
        <h1 className="text-gray-900 font-bold mb-3">Forgot Password?</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className="text-gray-500 font-semibold text-base">
          Enter your email to reset your password.
        </div>
        {/* end::Link */}
      </div>

      {hasErrors === true && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="font-bold">
            Sorry, looks like there are some errors detected, please try again.
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className="mb-10 bg-blue-100 p-8 rounded">
          <div className="text-blue-600">
            Sent password reset. Please check your email
          </div>
        </div>
      )}

      <div className="mb-8">
        <label className="font-bold text-gray-900 text-lg">Email</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          {...formik.getFieldProps('email')}
          className={`w-full border border-gray-300 p-3 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : ''
          } ${
            formik.touched.email && !formik.errors.email
              ? 'border-green-500'
              : ''
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="flex justify-center space-x-4 pb-0">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="mr-2">Submit</span>
          {loading && (
            <span className="inline-flex items-center">
              Please wait...
              <span className="ml-2 animate-spin border-t-2 border-white border-solid rounded-full w-4 h-4"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};
