import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import DashboardRoutes from './DashboardRoutes';

import LoginPage from '@/pages/auth/Login';
import NotFoundPage from '@/pages/NotFoundPage';

const isAuth = true;

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutes isAuth={isAuth}>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoutes isAuth={isAuth}>
              <DashboardRoutes />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
