import MainLayout from '@/layouts/MainLayout'
import { CategoryPage } from '@/pages/categories'
import NotFoundPage from '@/pages/NotFoundPage'
import { Route, Routes } from 'react-router-dom'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="categories" element={<CategoryPage />} />
      </Route>
    </Routes>
  )
}

export default DashboardRoutes
