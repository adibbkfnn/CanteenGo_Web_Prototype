export type PageName =
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'canteens'
  | 'menu'
  | 'cart'
  | 'checkout'
  | 'success'
  | 'tracking'
  | 'history'
  | 'profile'
  | 'vendor-login'
  | 'vendor-dashboard'
  | 'vendor-orders'
  | 'vendor-order-detail'
  | 'vendor-menu'
  | 'vendor-profile'

export type UserRole = 'student' | 'vendor' | null

export interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  image: string
  canteenId: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'makanan' | 'minuman' | 'snack'
  available: boolean
  stock: number
}

export interface Canteen {
  id: string
  name: string
  owner: string
  image: string
  status: 'buka' | 'tutup'
  menuCount: number
  estimasi: string
  description: string
}

export interface OrderItem {
  name: string
  qty: number
  price: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  canteen: string
  canteenId: string
  pickup: string
  pickupLabel: string
  status: 'baru' | 'diproses' | 'siap' | 'selesai'
  date: string
  student: string
  kelas: string
  paymentMethod: 'kantin' | 'qris'
  paymentStatus: 'menunggu' | 'berhasil' | 'gagal'
  notes?: string
}

export interface AppState {
  page: PageName
  userRole: UserRole
  studentName: string
  studentKelas: string
  cart: CartItem[]
  selectedCanteenId: string
  currentOrder: Order | null
  orderHistory: Order[]
  pickupTime: string
  selectedOrderId: string
  paymentMethod: 'kantin' | 'qris'
}

export interface NavProps {
  nav: (page: PageName) => void
  state: AppState
  setState: (updates: Partial<AppState>) => void
}
