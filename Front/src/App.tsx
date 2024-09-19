import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthInit } from './adapters/auth/Auth';

const App = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <AuthInit>
        <Outlet />
      </AuthInit>
    </Suspense>
  );
};

export { App };
