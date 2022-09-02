import MainLayout from '@/layouts/MainLayout'
import { CategoryPage } from '@/pages/categories'
import NotFoundPage from '@/pages/NotFoundPage'
import { ProductPage } from '@/pages/products'
import { Route, Routes } from 'react-router-dom'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="products" element={<ProductPage />} />
      </Route>
    </Routes>
  )
}

export default DashboardRoutes
