import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const DashboardRoutes = () => {
  return (
    <>
      <Route index element={<MainLayout />} />
    </>
  );
};

export default DashboardRoutes;
