import { Navigate, Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import { Wrapper } from '../ui/layouts/wrapper/Wrapper';

export const PrivateRoutes = () => {
  const ProductPage = lazy(
    () => import('../ui/pages/product-managament/ProductPage')
  );
  return (
    <Routes>
      {/* <Route element={<MasterLayout />}> */}
      <Route element={<Wrapper />}>
        <Route path="auth/*" element={<Navigate to="/home" />} />
        <Route path="home" element={<h1>Home Page Content</h1>} />
        <Route
          path="apps/products-management/*"
          element={
            <Suspense fallback="loading">
              <ProductPage />
            </Suspense>
          }
        />
      </Route>
      {/* </Route> */}
    </Routes>
  );
};
