import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layouts/auth/AuthLayout';
import { Login } from './Login';

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
