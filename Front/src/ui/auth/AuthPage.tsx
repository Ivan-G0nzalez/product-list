import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layouts/auth/AuthLayout';
import { Login } from '../components/Login';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { ForgotPassword } from '../components/ForgotPassword';

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ForgotPasswordForm />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
