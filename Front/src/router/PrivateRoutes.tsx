import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HeaderUserMenu } from '../ui/layouts/headers/menu/HeaderUserMenu';
import { AsideMenu } from '../ui/layouts/aside/AsideMenu';

export const PrivateRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<MasterLayout />}> */}
      <Route path="auth/*" element={<Navigate to="/home" />} />
      <Route path="home" element={<AsideMenu />} />
      {/* </Route> */}
    </Routes>
  );
};
