import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { changePassword } from '../../services/Auth.services.request';
import toastr from '../../utils/toast/Toast-General';

const initialValues = {
  password: '',
  password2: '',
};

const forgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .matches(
      /^(?!.*\b(?:password|12345|qwerty|abc123|admin|letmein)\b).*$/,
      'La contraseña es demasiado común'
    )
    .matches(
      /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/,
      'La contraseña debe contener una combinación de letras, números y caracteres especiales'
    )
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match")
    .min(3, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
});

export const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      changePassword(values.password, token || '', email || '') // Pass the new password to the changePassword function
        .then(() => {
          toastr.success('Contraseña cambiada con éxito', 'Éxito');
          setHasErrors(false);
          setLoading(false);
          setTimeout(() => {
            navigate('/auth');
          }, 1000);
        })
        .catch(() => {
          setHasErrors(true);
          setLoading(false);
          setSubmitting(false);
          setStatus('The password detail is incorrect');
        });
    },
  });

  return (
    <form
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <div className="text-center mb-10">
        <h1 className="text-gray-900">Ingrese la nueva contraseña </h1>
      </div>
      {hasErrors === true && (
        <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="font-bold">
            Sorry, looks like there are some errors detected, please try again.
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className="mb-8 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <div>Password was changed successfully.</div>
        </div>
      )}

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
        <Link to="/auth/login">
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-teal-300 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
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
        </Link>
      </div>
    </form>
  );
};
