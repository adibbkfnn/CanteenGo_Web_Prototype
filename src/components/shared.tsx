import type { PageName } from '../types'

// ─── Logo ─────────────────────────────────────────────────────────────────────

export function Logo({ size = 36, showText = true, textDark = true }: { size?: number; showText?: boolean; textDark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#27AE60" />
        {/* Plate */}
        <rect x="8" y="27" width="24" height="4" rx="2" fill="white" />
        {/* Cloche dome */}
        <path d="M8 26C8 15.5 12 11 20 11C28 11 32 15.5 32 26H8Z" fill="white" />
        {/* Arrow - speed indicator */}
        <path d="M22 18.5H27M25 16.5L27 18.5L25 20.5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Steam dots */}
        <circle cx="15" cy="8" r="1.2" fill="white" opacity="0.6" />
        <circle cx="20" cy="7" r="1.2" fill="white" opacity="0.6" />
        <circle cx="25" cy="8" r="1.2" fill="white" opacity="0.6" />
      </svg>
      {showText && (
        <span
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: 'Poppins, system-ui, sans-serif', color: textDark ? '#1A2B22' : 'white' }}
        >
          Canteen<span style={{ color: '#27AE60' }}>Go</span>
        </span>
      )}
    </div>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  baru: { label: 'Baru', bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-400' },
  diproses: { label: 'Diproses', bg: 'bg-accent-light', text: 'text-amber-600', dot: 'bg-accent' },
  siap: { label: 'Siap Diambil', bg: 'bg-brand-light', text: 'text-brand-dark', dot: 'bg-brand' },
  selesai: { label: 'Selesai', bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' },
}

export function StatusBadge({ status }: { status: 'baru' | 'diproses' | 'siap' | 'selesai' }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-brand ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

// ─── Bottom Navigation (Student Mobile) ───────────────────────────────────────

interface BottomNavProps {
  active: PageName
  nav: (page: PageName) => void
}

export function BottomNav({ active, nav }: BottomNavProps) {
  const items: { page: PageName; label: string; icon: React.ReactNode }[] = [
    {
      page: 'dashboard',
      label: 'Beranda',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      page: 'canteens',
      label: 'Kantin',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2h18l-2 7H5L3 2z" />
          <path d="M7 9v12M17 9v12" />
          <path d="M3 2l1 7M21 2l-1 7" />
        </svg>
      ),
    },
    {
      page: 'history',
      label: 'Pesanan',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="13" y2="16" />
        </svg>
      ),
    },
    {
      page: 'profile',
      label: 'Profil',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[430px] bg-white border-t border-border-soft bottom-nav-safe">
        <div className="flex items-center justify-around px-2 pt-2 pb-3">
          {items.map((item) => {
            const isActive =
              active === item.page ||
              (item.page === 'canteens' && active === 'menu') ||
              (item.page === 'history' && (active === 'tracking' || active === 'success'))
            return (
              <button
                key={item.page}
                onClick={() => nav(item.page)}
                className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${
                  isActive ? 'text-brand' : 'text-text-muted hover:text-brand'
                }`}
              >
                <span className={isActive ? 'opacity-100' : 'opacity-50'}>{item.icon}</span>
                <span
                  className={`text-[10px] font-semibold tracking-wide font-brand ${isActive ? 'text-brand' : 'text-text-muted'}`}
                >
                  {item.label}
                </span>
                {isActive && <span className="absolute -top-0 w-6 h-0.5 bg-brand rounded-full" />}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

// ─── Mobile Layout Wrapper ─────────────────────────────────────────────────────

export function MobileLayout({
  children,
  showNav = true,
  active,
  nav,
}: {
  children: React.ReactNode
  showNav?: boolean
  active: PageName
  nav: (page: PageName) => void
}) {
  return (
    <div className="min-h-full bg-surface flex justify-center">
      <div className="w-full max-w-[430px] bg-white min-h-screen relative flex flex-col shadow-lg">
        <div className={`flex-1 overflow-y-auto ${showNav ? 'pb-20' : ''}`}>{children}</div>
        {showNav && <BottomNav active={active} nav={nav} />}
      </div>
    </div>
  )
}

// ─── Page Header ─────────────────────────────────────────────────────────────

export function PageHeader({
  title,
  onBack,
  rightElement,
  transparent = false,
}: {
  title: string
  onBack?: () => void
  rightElement?: React.ReactNode
  transparent?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 pt-12 pb-4 ${
        transparent ? 'bg-transparent' : 'bg-white border-b border-border-soft'
      }`}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-light text-brand-dark hover:bg-brand/20 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
      )}
      <h1 className="flex-1 text-lg font-bold text-text-base font-brand">{title}</h1>
      {rightElement}
    </div>
  )
}

// ─── Vendor Sidebar ───────────────────────────────────────────────────────────

interface VendorSidebarProps {
  active: PageName
  nav: (page: PageName) => void
}

export function VendorSidebar({ active, nav }: VendorSidebarProps) {
  const items: { page: PageName; label: string; icon: React.ReactNode }[] = [
    {
      page: 'vendor-dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      page: 'vendor-orders',
      label: 'Pesanan',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="13" y2="16" />
        </svg>
      ),
    },
    {
      page: 'vendor-menu',
      label: 'Menu',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
    {
      page: 'vendor-profile',
      label: 'Profil',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-border-soft flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-border-soft">
        <Logo size={32} />
        <p className="text-xs text-text-muted mt-1 font-brand">Dapur Vendor</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const isActive = active === item.page || (item.page === 'vendor-orders' && active === 'vendor-order-detail')
          return (
            <button
              key={item.page}
              onClick={() => nav(item.page)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold font-brand transition-all text-left ${
                isActive
                  ? 'bg-brand-light text-brand-dark'
                  : 'text-text-muted hover:bg-surface hover:text-text-base'
              }`}
            >
              <span className={isActive ? 'text-brand' : ''}>{item.icon}</span>
              {item.label}
              {item.page === 'vendor-orders' && (
                <span className="ml-auto bg-brand text-white text-xs font-bold px-2 py-0.5 rounded-full font-brand">
                  8
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border-soft">
        <button
          onClick={() => nav('landing')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold font-brand text-danger hover:bg-danger-light transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  )
}

// ─── QR Code Placeholder ──────────────────────────────────────────────────────

export function QRCodePlaceholder({ orderId }: { orderId: string }) {
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
  ]

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-4 rounded-2xl shadow-md border border-border-soft">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(21, 8px)`,
            gap: '1px',
          }}
        >
          {pattern.map((row, ri) =>
            row.map((cell, ci) => (
              <div
                key={`${ri}-${ci}`}
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: cell ? '#1A2B22' : 'transparent',
                  borderRadius: cell ? '1px' : 0,
                }}
              />
            ))
          )}
        </div>
      </div>
      <p className="text-xs text-text-muted text-center font-brand">
        ID Pesanan: <strong className="text-text-base">{orderId}</strong>
      </p>
    </div>
  )
}

// ─── Simple Bar Chart ─────────────────────────────────────────────────────────

export function SimpleBarChart({ data }: { data: { hour: string; orders: number }[] }) {
  const max = Math.max(...data.map((d) => d.orders))
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d) => {
        const height = Math.max(4, (d.orders / max) * 100)
        const isBreak = d.hour === '10:00' || d.hour === '12:00'
        return (
          <div key={d.hour} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[9px] text-text-muted font-brand">{d.orders}</span>
            <div
              className={`w-full rounded-t-md transition-all ${isBreak ? 'bg-brand' : 'bg-brand-light'}`}
              style={{ height: `${height}%` }}
            />
            <span className="text-[9px] text-text-muted font-brand whitespace-nowrap">{d.hour.replace(':00', '')}</span>
          </div>
        )
      })}
    </div>
  )
}
