import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { atom, useAtom, useAtomValue } from 'jotai'

import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import DashboardRoutes from './DashboardRoutes'

import LoginPage from '@/pages/auth/Login'
import NotFoundPage from '@/pages/NotFoundPage'

import encryptStorage from '@/services/encrypt.storage'
import { isLogin } from '@/atoms/Auth.atom'


const AppRoutes = () => {
  const isAuth = useAtomValue(isLogin);

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
              <DashboardRoutes/>
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
