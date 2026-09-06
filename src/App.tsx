import { useState } from 'react'
import type { AppState } from './types'
import {
  LandingPage,
  LoginPage,
  DashboardPage,
  CanteenListPage,
  MenuPage,
  CartPage,
  CheckoutPage,
  OrderSuccessPage,
  OrderTrackingPage,
  OrderHistoryPage,
  ProfilePage,
} from './pages/StudentPages'
import {
  VendorLoginPage,
  VendorDashboardPage,
  VendorOrdersPage,
  VendorOrderDetailPage,
  VendorMenuPage,
  VendorProfilePage,
} from './pages/VendorPages'

const INITIAL_STATE: AppState = {
  page: 'landing',
  userRole: null,
  studentName: '',
  studentKelas: '',
  cart: [],
  selectedCanteenId: '1',
  currentOrder: null,
  orderHistory: [],
  pickupTime: 'istirahat1',
  selectedOrderId: 'A001',
  paymentMethod: 'kantin',
}

export default function App() {
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE)

  const nav = (page: AppState['page']) => {
    setAppState((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const setState = (updates: Partial<AppState>) => {
    setAppState((prev) => ({ ...prev, ...updates }))
  }

  const navProps = { nav, state: appState, setState }

  const pages: Record<AppState['page'], React.ReactNode> = {
    landing: <LandingPage {...navProps} />,
    login: <LoginPage {...navProps} />,
    dashboard: <DashboardPage {...navProps} />,
    canteens: <CanteenListPage {...navProps} />,
    menu: <MenuPage {...navProps} />,
    cart: <CartPage {...navProps} />,
    checkout: <CheckoutPage {...navProps} />,
    success: <OrderSuccessPage {...navProps} />,
    tracking: <OrderTrackingPage {...navProps} />,
    history: <OrderHistoryPage {...navProps} />,
    profile: <ProfilePage {...navProps} />,
    'vendor-login': <VendorLoginPage {...navProps} />,
    'vendor-dashboard': <VendorDashboardPage {...navProps} />,
    'vendor-orders': <VendorOrdersPage {...navProps} />,
    'vendor-order-detail': <VendorOrderDetailPage {...navProps} />,
    'vendor-menu': <VendorMenuPage {...navProps} />,
    'vendor-profile': <VendorProfilePage {...navProps} />,
  }

  return <div className="h-full">{pages[appState.page]}</div>
}
