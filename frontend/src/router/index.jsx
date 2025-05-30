import Layout from './Layout'
import HomePage from '../pages/Home.page'
import LoginPage from '../pages/Login.page'
import CustomerRegisterPage from '../pages/CustomerRegister.page'
import TraderRegisterPage from '../pages/TraderRegister.page'
import FarmerRequestPage from '../pages/FarmerRequest.page'
import FarmerStatusPage from '../pages/FarmerStatus.page'
import DashboardPage from '../pages/Dashboard.page'
import MyCropsPage from '../pages/MyCrops.page'
import MyOrdersPage from '../pages/MyOrders.page'
import RoleBasedProducts from '../pages/product/RoleBasedProducts'

const normalRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register/customer',
      element: <CustomerRegisterPage />
    },
    {
      path: '/register/trader',
      element: <TraderRegisterPage />
    },
    {
      path: '/farmer/request',
      element: <FarmerRequestPage />
    },
    {
      path: '/farmer/status',
      element: <FarmerStatusPage />
    },    {
      path: '/profile',
      element: <DashboardPage />
    },
    {
      path: '/my-crops',
      element: <MyCropsPage />
    },
    {
      path: '/my-orders',
      element: <MyOrdersPage />
    },
    {
      path: '/products',
      element: <RoleBasedProducts />
    },
    // {
    //   path: '/bidding',
    //   element: 
    // }
  ]
}

const router = [normalRoutes]

export default router
