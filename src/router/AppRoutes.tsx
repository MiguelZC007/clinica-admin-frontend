import { isLogin } from '@/atoms/Auth.atom'
import LoginPage from '@/pages/auth/Login'
import NotFoundPage from '@/pages/NotFoundPage'
import { useAtomValue } from 'jotai'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardRoutes from './DashboardRoutes'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const AppRoutes = () => {
  const isAuth = useAtomValue(isLogin)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes isAuth={!isAuth}>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes isAuth={isAuth}>
              <DashboardRoutes />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
