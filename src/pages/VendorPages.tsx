import { useState } from 'react'
import type { NavProps, MenuItem } from '../types'
import { VENDOR_ORDERS, MENUS, DAILY_CHART_DATA, formatRupiah } from '../data'
import { Logo, VendorSidebar, StatusBadge, SimpleBarChart } from '../components/shared'

// ─── Vendor Layout ────────────────────────────────────────────────────────────

function VendorLayout({ children, page, nav }: { children: React.ReactNode; page: NavProps['state']['page']; nav: NavProps['nav'] }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <VendorSidebar active={page} nav={nav} />
      <main className="flex-1 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  )
}

// ─── Vendor Login Page ────────────────────────────────────────────────────────

export function VendorLoginPage({ nav }: NavProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    nav('vendor-dashboard')
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={52} />
          </div>
          <h1 className="text-2xl font-extrabold text-text-base font-brand">Portal Penjual</h1>
          <p className="text-sm text-text-muted font-brand mt-1">Kelola kantin dan pesanan dengan mudah</p>
        </div>

        <div className="bg-white rounded-3xl p-7 card-shadow">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold font-brand text-text-base mb-1.5">
                Username / Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kantinbusari@sman1.sch.id"
                className="w-full px-4 py-3 border border-border-soft rounded-xl text-sm bg-surface"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold font-brand text-text-base mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 border border-border-soft rounded-xl text-sm bg-surface"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand text-white font-bold font-brand rounded-xl hover:bg-brand-dark transition-all shadow-md mt-2"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-border-soft">
            <p className="text-xs text-text-muted font-brand text-center">
              Belum terdaftar?{' '}
              <a href="#" className="text-brand font-bold">
                Hubungi admin sekolah
              </a>
            </p>
          </div>
        </div>

        <button
          onClick={() => nav('login')}
          className="mt-5 w-full text-sm text-text-muted font-brand flex items-center justify-center gap-1 hover:text-text-base transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Masuk sebagai Siswa
        </button>
      </div>
    </div>
  )
}

// ─── Vendor Dashboard ─────────────────────────────────────────────────────────

export function VendorDashboardPage({ nav, state }: NavProps) {
  const todayOrders = VENDOR_ORDERS
  const activeCount = todayOrders.filter((o) => o.status !== 'selesai').length
  const completedCount = todayOrders.filter((o) => o.status === 'selesai').length
  const totalRevenue = todayOrders.filter((o) => o.status === 'selesai').reduce((s, o) => s + o.total, 0)
  const topItem = (() => {
    const freq: Record<string, number> = {}
    todayOrders.forEach((o) => o.items.forEach((i) => { freq[i.name] = (freq[i.name] || 0) + i.qty }))
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
  })()

  const statCards: { label: string; value: string; icon: string; iconBg: string }[] = [
    { label: 'Pesanan Hari Ini', value: String(todayOrders.length), icon: '📋', iconBg: 'bg-brand' },
    { label: 'Pendapatan', value: totalRevenue > 0 ? formatRupiah(totalRevenue) : 'Rp0', icon: '💰', iconBg: 'bg-accent' },
    { label: 'Pesanan Aktif', value: String(activeCount), icon: '⏳', iconBg: 'bg-info' },
    { label: 'Menu Terlaris', value: topItem, icon: '🏆', iconBg: 'bg-purple-500' },
  ]

  return (
    <VendorLayout page={state.page} nav={nav}>
      <div className="p-6 lg:p-8 max-w-6xl">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold font-brand text-text-base">Dashboard Kantin</h1>
          <p className="text-text-muted font-brand text-sm mt-1">
            Selamat datang, <strong className="text-brand">Bu Sari</strong> — Selasa, 01 September 2026
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {statCards.map((card) => (
            <div key={card.label} className="rounded-2xl p-5 card-shadow bg-white">
              <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center text-lg mb-3`}>
                {card.icon}
              </div>
              <p className="text-2xl font-extrabold font-brand text-text-base mb-0.5">{card.value}</p>
              <p className="text-xs text-text-muted font-brand">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 card-shadow">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold font-brand text-text-base">Grafik Pesanan Hari Ini</h3>
                <p className="text-xs text-text-muted font-brand">Jumlah pesanan per jam</p>
              </div>
              <span className="text-xs font-semibold font-brand text-brand bg-brand-light px-3 py-1 rounded-full">
                01 Sep 2026
              </span>
            </div>
            <SimpleBarChart data={DAILY_CHART_DATA} />
            <div className="flex items-center gap-4 mt-4 text-xs text-text-muted font-brand">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-brand" />
                Jam Istirahat
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-brand-light" />
                Jam Biasa
              </div>
            </div>
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-brand text-text-base">Pesanan Baru</h3>
              <button
                onClick={() => nav('vendor-orders')}
                className="text-xs font-semibold font-brand text-brand hover:underline"
              >
                Lihat Semua →
              </button>
            </div>
            <div className="space-y-3">
              {VENDOR_ORDERS.filter((o) => o.status !== 'selesai').slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-surface rounded-xl p-2 -mx-2 transition-all"
                  onClick={() => nav('vendor-order-detail')}
                >
                  <div className="w-9 h-9 bg-brand-light rounded-xl flex items-center justify-center font-black text-xs text-brand font-brand flex-shrink-0">
                    {order.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold font-brand text-text-base truncate">{order.student}</p>
                    <p className="text-xs text-text-muted font-brand truncate">
                      {order.items.map((i) => i.name).join(', ')}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top menu */}
        <div className="mt-6 bg-white rounded-2xl p-5 card-shadow">
          <h3 className="font-bold font-brand text-text-base mb-4">Menu Terlaris Hari Ini</h3>
          <div className="space-y-3">
            {[
              { name: 'Nasi Ayam', count: 15, pct: 100 },
              { name: 'Es Teh Manis', count: 13, pct: 87 },
              { name: 'Mie Goreng', count: 11, pct: 73 },
              { name: 'Nasi Goreng', count: 8, pct: 53 },
              { name: 'Roti Bakar', count: 6, pct: 40 },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <p className="text-sm font-semibold font-brand text-text-base w-28 flex-shrink-0">{item.name}</p>
                <div className="flex-1 bg-surface rounded-full h-2">
                  <div
                    className="bg-brand h-2 rounded-full transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="text-xs font-bold font-brand text-text-muted w-6 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VendorLayout>
  )
}

// ─── Vendor Orders Page ───────────────────────────────────────────────────────

export function VendorOrdersPage({ nav, state, setState }: NavProps) {
  const [orders, setOrders] = useState(VENDOR_ORDERS)
  const [statusFilter, setStatusFilter] = useState<'semua' | 'baru' | 'diproses' | 'siap' | 'selesai'>('semua')
  const [pickupFilter, setPickupFilter] = useState<'semua' | 'istirahat1' | 'istirahat2'>('semua')

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === 'semua' || o.status === statusFilter
    const matchPickup = pickupFilter === 'semua' || o.pickup === pickupFilter
    return matchStatus && matchPickup
  })

  const advanceStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o
        const next = { baru: 'diproses', diproses: 'siap', siap: 'selesai', selesai: 'selesai' } as const
        return { ...o, status: next[o.status] }
      })
    )
  }

  const actionLabel: Record<string, string> = {
    baru: 'Terima Pesanan',
    diproses: 'Tandai Siap',
    siap: 'Selesai',
    selesai: '',
  }

  return (
    <VendorLayout page={state.page} nav={nav}>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold font-brand text-text-base">Pesanan Masuk</h1>
            <p className="text-sm text-text-muted font-brand mt-0.5">Kelola status pesanan siswa</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-brand-light text-brand px-3 py-2 rounded-xl text-sm font-bold font-brand">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              {orders.filter((o) => o.status !== 'selesai').length} aktif
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="flex gap-2">
            {(['semua', 'baru', 'diproses', 'siap', 'selesai'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-brand capitalize transition-all ${
                  statusFilter === s
                    ? 'bg-brand text-white'
                    : 'bg-white text-text-muted border border-border-soft hover:bg-brand-light hover:text-brand'
                }`}
              >
                {s === 'semua' ? 'Semua' : s === 'baru' ? 'Baru' : s === 'diproses' ? 'Diproses' : s === 'siap' ? 'Siap' : 'Selesai'}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            {(['semua', 'istirahat1', 'istirahat2'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPickupFilter(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-brand transition-all ${
                  pickupFilter === p
                    ? 'bg-accent text-white'
                    : 'bg-white text-text-muted border border-border-soft hover:bg-accent-light'
                }`}
              >
                {p === 'semua' ? 'Semua Waktu' : p === 'istirahat1' ? 'Istirahat 1' : 'Istirahat 2'}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl card-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-soft bg-surface">
                  {['Nomor', 'Nama & Kelas', 'Pesanan', 'Total', 'Waktu', 'Pembayaran', 'Status', 'Aksi'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-bold font-brand text-text-muted uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-surface/50 transition-all"
                  >
                    <td className="px-4 py-4">
                      <span
                        className="font-black font-brand text-brand text-base cursor-pointer hover:underline"
                        onClick={() => {
                          setState({ selectedOrderId: order.id })
                          nav('vendor-order-detail')
                        }}
                      >
                        {order.id}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-bold font-brand text-text-base text-sm">{order.student}</p>
                      <p className="text-xs text-text-muted font-brand">{order.kelas}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-brand text-text-base max-w-[180px]">
                        {order.items.map((i) => `${i.name}${i.qty > 1 ? ` ×${i.qty}` : ''}`).join(', ')}
                      </p>
                      {order.notes && (
                        <p className="text-xs text-accent font-brand mt-0.5">📝 {order.notes}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-bold font-brand text-text-base">{formatRupiah(order.total)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-brand text-text-muted">
                        {order.pickup === 'istirahat1' ? '10:00' : '12:00'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {order.paymentMethod === 'qris' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold font-brand text-brand bg-brand-light px-2.5 py-1 rounded-full">
                          📱 QRIS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold font-brand text-amber-700 bg-accent-light px-2.5 py-1 rounded-full">
                          💵 Tunai
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        {order.status !== 'selesai' && (
                          <button
                            onClick={() => advanceStatus(order.id)}
                            className="px-3 py-1.5 bg-brand text-white text-xs font-bold font-brand rounded-lg hover:bg-brand-dark transition-all whitespace-nowrap"
                          >
                            {actionLabel[order.status]}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setState({ selectedOrderId: order.id })
                            nav('vendor-order-detail')
                          }}
                          className="px-3 py-1.5 bg-surface text-text-muted text-xs font-bold font-brand rounded-lg hover:bg-brand-light hover:text-brand transition-all"
                        >
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-text-muted">
                <div className="text-4xl mb-3">📭</div>
                <p className="font-brand text-sm">Tidak ada pesanan</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary row */}
        <div className="mt-5 grid grid-cols-4 gap-4">
          {(['baru', 'diproses', 'siap', 'selesai'] as const).map((s) => {
            const count = orders.filter((o) => o.status === s).length
            const labels = { baru: 'Baru', diproses: 'Diproses', siap: 'Siap Diambil', selesai: 'Selesai' }
            return (
              <div key={s} className="bg-white rounded-xl p-3 card-shadow text-center">
                <p className="text-xl font-extrabold font-brand text-text-base">{count}</p>
                <StatusBadge status={s} />
              </div>
            )
          })}
        </div>
      </div>
    </VendorLayout>
  )
}

// ─── Vendor Order Detail ──────────────────────────────────────────────────────

export function VendorOrderDetailPage({ nav, state }: NavProps) {
  const order = VENDOR_ORDERS.find((o) => o.id === state.selectedOrderId) || VENDOR_ORDERS[0]
  const [status, setStatus] = useState(order.status)

  const advance = () => {
    const next = { baru: 'diproses', diproses: 'siap', siap: 'selesai', selesai: 'selesai' } as const
    setStatus(next[status])
  }

  const actionLabel: Record<string, string> = {
    baru: 'Terima & Proses Pesanan',
    diproses: 'Tandai Siap Diambil',
    siap: 'Tandai Selesai',
    selesai: 'Pesanan Selesai',
  }

  return (
    <VendorLayout page={state.page} nav={nav}>
      <div className="p-6 lg:p-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => nav('vendor-orders')}
            className="w-9 h-9 rounded-xl bg-white border border-border-soft flex items-center justify-center hover:bg-surface transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-extrabold font-brand text-text-base">Detail Pesanan</h1>
            <p className="text-sm text-text-muted font-brand">#{order.id}</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold font-brand text-text-base">Status Pesanan</h2>
              <StatusBadge status={status} />
            </div>

            {status !== 'selesai' ? (
              <button
                onClick={advance}
                className="w-full py-3.5 bg-brand text-white font-bold font-brand rounded-xl hover:bg-brand-dark transition-all shadow-md"
              >
                {actionLabel[status]}
              </button>
            ) : (
              <div className="w-full py-3.5 bg-brand-light text-brand font-bold font-brand rounded-xl text-center">
                ✓ Pesanan Selesai
              </div>
            )}
          </div>

          {/* Student info */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h2 className="font-bold font-brand text-text-base mb-4">Informasi Pemesan</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Nama', val: order.student },
                { label: 'Kelas', val: order.kelas },
                { label: 'Nomor Pesanan', val: order.id },
                { label: 'Waktu Ambil', val: order.pickupLabel },
                { label: 'Tanggal', val: order.date },
                { label: 'Metode Bayar', val: order.paymentMethod === 'qris' ? 'QRIS' : 'Bayar di Kantin' },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-xs text-text-muted font-brand mb-0.5">{label}</p>
                  <p className="font-bold font-brand text-text-base text-sm">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order items */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h2 className="font-bold font-brand text-text-base mb-4">Item Pesanan</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-2 border-b border-border-soft last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-light rounded-lg flex items-center justify-center text-brand font-bold font-brand text-sm">
                      {item.qty}
                    </div>
                    <span className="font-semibold font-brand text-text-base">{item.name}</span>
                  </div>
                  <span className="font-bold font-brand text-text-base">{formatRupiah(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold font-brand text-text-base">Total</span>
                <span className="font-extrabold font-brand text-brand text-lg">{formatRupiah(order.total)}</span>
              </div>
            </div>

            {order.notes && (
              <div className="mt-3 p-3 bg-accent-light rounded-xl">
                <p className="text-xs font-bold font-brand text-amber-700">📝 Catatan dari Pelanggan</p>
                <p className="text-sm font-brand text-text-base mt-1">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h2 className="font-bold font-brand text-text-base mb-3">Pembayaran</h2>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{order.paymentMethod === 'qris' ? '📱' : '💵'}</span>
              <div>
                <p className="font-bold font-brand text-text-base text-sm">
                  {order.paymentMethod === 'qris' ? 'QRIS' : 'Bayar di Kantin'}
                </p>
                <p className="text-xs font-brand font-bold">
                  {order.paymentStatus === 'berhasil' ? (
                    <span className="text-brand">✓ Pembayaran Berhasil</span>
                  ) : order.paymentStatus === 'gagal' ? (
                    <span className="text-danger">✗ Pembayaran Gagal</span>
                  ) : (
                    <span className="text-amber-600">⏳ Menunggu Pembayaran</span>
                  )}
                </p>
              </div>
              <span className="ml-auto font-extrabold font-brand text-brand">{formatRupiah(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  )
}

// ─── Vendor Menu Page ─────────────────────────────────────────────────────────

export function VendorMenuPage({ nav, state }: NavProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENUS['1'])
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'makanan' as MenuItem['category'],
    available: true,
  })

  const openAdd = () => {
    setEditItem(null)
    setFormData({ name: '', description: '', price: '', stock: '', category: 'makanan', available: true })
    setShowModal(true)
  }

  const openEdit = (item: MenuItem) => {
    setEditItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: String(item.price),
      stock: String(item.stock),
      category: item.category,
      available: item.available,
    })
    setShowModal(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editItem) {
      setMenuItems((prev) =>
        prev.map((i) =>
          i.id === editItem.id
            ? {
                ...i,
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                stock: Number(formData.stock),
                category: formData.category,
                available: formData.available,
              }
            : i
        )
      )
    } else {
      const newItem: MenuItem = {
        id: `m_${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        available: formData.available,
        image: 'https://images.unsplash.com/photo-1680674814945-7945d913319c?w=400&h=300&fit=crop&auto=format',
      }
      setMenuItems((prev) => [...prev, newItem])
    }
    setShowModal(false)
  }

  const toggleAvailable = (id: string) => {
    setMenuItems((prev) => prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)))
  }

  const deleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <VendorLayout page={state.page} nav={nav}>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold font-brand text-text-base">Kelola Menu</h1>
            <p className="text-sm text-text-muted font-brand mt-0.5">Kantin Bu Sari · {menuItems.length} menu</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white font-bold font-brand rounded-xl hover:bg-brand-dark transition-all shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tambah Menu
          </button>
        </div>

        {/* Menu cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden card-shadow">
              <div className="relative h-40 bg-brand-pale overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleAvailable(item.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-brand ${
                      item.available
                        ? 'bg-brand text-white'
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    {item.available ? 'Tersedia' : 'Habis'}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold font-brand text-text-base">{item.name}</h3>
                <p className="text-xs text-text-muted font-brand mt-0.5 line-clamp-1">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="font-extrabold font-brand text-brand">{formatRupiah(item.price)}</p>
                    <p className="text-xs text-text-muted font-brand">Stok: {item.stock}</p>
                  </div>
                  <span className="text-xs font-semibold font-brand bg-surface text-text-muted px-2 py-1 rounded-lg capitalize">
                    {item.category}
                  </span>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-border-soft">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 py-2 text-xs font-bold font-brand bg-brand-light text-brand rounded-lg hover:bg-brand hover:text-white transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="flex-1 py-2 text-xs font-bold font-brand bg-danger-light text-danger rounded-lg hover:bg-danger hover:text-white transition-all"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-3xl p-6 w-full max-w-md card-shadow">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold font-brand text-text-base text-lg">
                {editItem ? 'Edit Menu' : 'Tambah Menu Baru'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-border-soft transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-semibold font-brand text-text-base block mb-1.5">Nama Menu</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Nasi Ayam Crispy"
                  className="w-full px-3 py-2.5 border border-border-soft rounded-xl text-sm bg-surface"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold font-brand text-text-base block mb-1.5">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Ayam crispy + nasi + sambal..."
                  rows={2}
                  className="w-full px-3 py-2.5 border border-border-soft rounded-xl text-sm bg-surface resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold font-brand text-text-base block mb-1.5">Harga (Rp)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                    placeholder="10000"
                    className="w-full px-3 py-2.5 border border-border-soft rounded-xl text-sm bg-surface"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold font-brand text-text-base block mb-1.5">Stok</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData((p) => ({ ...p, stock: e.target.value }))}
                    placeholder="20"
                    className="w-full px-3 py-2.5 border border-border-soft rounded-xl text-sm bg-surface"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold font-brand text-text-base block mb-1.5">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value as MenuItem['category'] }))}
                  className="w-full px-3 py-2.5 border border-border-soft rounded-xl text-sm bg-surface"
                >
                  <option value="makanan">🍽 Makanan</option>
                  <option value="minuman">🥤 Minuman</option>
                  <option value="snack">🍟 Snack</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, available: !p.available }))}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    formData.available ? 'bg-brand' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${
                      formData.available ? 'left-6' : 'left-0.5'
                    }`}
                  />
                </button>
                <span className="text-sm font-semibold font-brand text-text-base">
                  {formData.available ? 'Tersedia' : 'Tidak Tersedia'}
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border-2 border-border-soft text-text-muted font-bold font-brand rounded-xl hover:bg-surface transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand text-white font-bold font-brand rounded-xl hover:bg-brand-dark transition-all shadow-md"
                >
                  {editItem ? 'Simpan Perubahan' : 'Tambah Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </VendorLayout>
  )
}

// ─── Vendor Profile Page ──────────────────────────────────────────────────────

export function VendorProfilePage({ nav, state }: NavProps) {
  return (
    <VendorLayout page={state.page} nav={nav}>
      <div className="p-6 lg:p-8 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold font-brand text-text-base">Profil & Pengaturan</h1>
          <p className="text-sm text-text-muted font-brand mt-0.5">Kelola informasi kantin Anda</p>
        </div>

        <div className="space-y-5">
          {/* Profile card */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-2xl font-black text-brand font-brand">
                BS
              </div>
              <div>
                <h2 className="font-extrabold font-brand text-text-base">Bu Sari</h2>
                <p className="text-sm text-text-muted font-brand">Kantin Bu Sari · Penjual</p>
              </div>
              <button className="ml-auto px-4 py-2 text-sm font-bold font-brand text-brand border-2 border-brand rounded-xl hover:bg-brand-light transition-all">
                Edit Profil
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Nama Penjual', val: 'Sari Rahayu' },
                { label: 'Nama Kantin', val: 'Kantin Bu Sari' },
                { label: 'Nomor HP', val: '081234567890' },
                { label: 'Email', val: 'kantinbusari@sman1.sch.id' },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-xs text-text-muted font-brand mb-1">{label}</p>
                  <p className="text-sm font-bold font-brand text-text-base">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operating hours */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="font-bold font-brand text-text-base mb-4">Jam Operasional</h3>
            <div className="space-y-3">
              {[
                { day: 'Senin – Jumat', hours: '07:00 – 15:00', active: true },
                { day: 'Sabtu', hours: '07:00 – 12:00', active: true },
                { day: 'Minggu', hours: 'Tutup', active: false },
              ].map((h) => (
                <div key={h.day} className="flex items-center justify-between py-2 border-b border-border-soft last:border-0">
                  <span className="text-sm font-brand text-text-base">{h.day}</span>
                  <span className={`text-sm font-bold font-brand ${h.active ? 'text-brand' : 'text-danger'}`}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prep time */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h3 className="font-bold font-brand text-text-base mb-4">Pengaturan Kantin</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-brand text-text-base">Estimasi Persiapan</span>
                <select className="px-3 py-1.5 border border-border-soft rounded-xl text-sm bg-surface font-brand font-bold text-text-base">
                  <option>5–10 menit</option>
                  <option>10–15 menit</option>
                  <option>15–20 menit</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-brand text-text-base">Status Kantin</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-brand text-brand font-bold">Buka</span>
                  <div className="w-12 h-6 bg-brand rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-brand text-text-base">Notifikasi Pesanan Baru</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-brand text-brand font-bold">Aktif</span>
                  <div className="w-12 h-6 bg-brand rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => nav('landing')}
            className="w-full py-3.5 border-2 border-danger text-danger font-bold font-brand rounded-2xl hover:bg-danger-light transition-all"
          >
            Keluar dari Akun
          </button>
        </div>
      </div>
    </VendorLayout>
  )
}
