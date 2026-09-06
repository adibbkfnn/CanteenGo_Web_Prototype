import { useState } from 'react'
import type { NavProps, CartItem, MenuItem, Order } from '../types'
import { CANTEENS, MENUS, formatRupiah } from '../data'
import { Logo, MobileLayout, PageHeader, StatusBadge, QRCodePlaceholder } from '../components/shared'

// ─── Landing Page ─────────────────────────────────────────────────────────────

export function LandingPage({ nav }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Logo size={36} />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {['Beranda', 'Menu', 'Cara Kerja'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-semibold text-text-muted hover:text-brand transition-all font-brand"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => nav('login')}
              className="px-4 py-2 text-sm font-semibold font-brand text-brand hover:bg-brand-light rounded-xl transition-all"
            >
              Masuk
            </button>
            <button
              onClick={() => nav('login')}
              className="px-4 py-2 text-sm font-bold font-brand bg-brand text-white rounded-xl hover:bg-brand-dark transition-all shadow-sm"
            >
              Daftar
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-surface transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-soft px-4 py-4 space-y-3 bg-white">
            {['Beranda', 'Menu', 'Cara Kerja'].map((item) => (
              <a key={item} href="#" className="block text-sm font-semibold text-text-muted font-brand py-2">
                {item}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => nav('login')}
                className="flex-1 py-2.5 text-sm font-bold font-brand border-2 border-brand text-brand rounded-xl"
              >
                Masuk
              </button>
              <button
                onClick={() => nav('login')}
                className="flex-1 py-2.5 text-sm font-bold font-brand bg-brand text-white rounded-xl"
              >
                Daftar
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: text */}
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 bg-brand-light text-brand-dark text-xs font-bold font-brand px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              Pre-order Kantin Sekolah
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-base leading-tight mb-3 font-brand">
              Pesan, Bayar,{' '}
              <span className="text-brand">Ambil.</span>
            </h1>
            <p className="text-lg font-semibold font-brand text-text-muted mb-3">Istirahat Lebih Bermakna.</p>
            <p className="text-base text-text-muted leading-relaxed mb-8">
              Pesan makanan dari kantin sekolah sebelum waktu istirahat dan ambil pesanan tanpa harus mengantre lama. Hemat waktu, nikmati istirahatmu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => nav('login')}
                className="px-7 py-3.5 bg-brand text-white font-bold font-brand rounded-xl hover:bg-brand-dark transition-all shadow-md text-base"
              >
                Pesan Sekarang
              </button>
              <a
                href="#cara-kerja"
                className="px-7 py-3.5 border-2 border-brand-light text-brand font-bold font-brand rounded-xl hover:bg-brand-light transition-all text-base text-center"
              >
                Cara Kerja
              </a>
            </div>

            {/* Stats — dynamic values from database in production */}
            <div className="flex gap-8 mt-10">
              {[
                { num: '0', label: 'Pesanan Hari Ini' },
                { num: '5', label: 'Kantin Aktif' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-brand font-brand">{s.num}</p>
                  <p className="text-xs text-text-muted font-brand">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden bg-brand-light aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1780536301160-5acf9fce398d?w=800&h=600&fit=crop&auto=format"
                alt="Siswa menggunakan CanteenGo di smartphone"
                className="w-full h-full object-cover"
              />
              {/* Floating order card */}
              <div className="absolute bottom-4 left-4 bg-white rounded-2xl p-3 shadow-lg border border-border-soft max-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-brand-light rounded-lg flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold font-brand text-text-base">Pesanan Siap!</p>
                    <p className="text-[10px] text-text-muted font-brand">Kantin Bu Sari</p>
                  </div>
                </div>
                <p className="text-[11px] text-brand font-bold font-brand">Nasi Ayam · Rp10.000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold font-brand text-text-base mb-2">Kenapa Pilih CanteenGo?</h2>
            <p className="text-text-muted text-sm">Solusi cerdas untuk istirahat yang lebih bermakna</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                emoji: '⚡',
                title: 'Tanpa Antre',
                desc: 'Pesan sebelum istirahat. Pesananmu sudah disiapkan saat kamu tiba di kantin.',
                color: 'bg-accent-light',
              },
              {
                emoji: '🚀',
                title: 'Ambil Lebih Cepat',
                desc: 'Pesanan sudah siap saat kamu datang. Tidak perlu menunggu dan buang waktu.',
                color: 'bg-brand-light',
              },
              {
                emoji: '🌿',
                title: 'Kurangi Food Waste',
                desc: 'Kantin menyiapkan makanan berdasarkan jumlah pesanan nyata. Lebih efisien.',
                color: 'bg-info-light',
              },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all">
                <div className={`w-12 h-12 ${b.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                  {b.emoji}
                </div>
                <h3 className="font-bold font-brand text-text-base mb-2">{b.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="cara-kerja" className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold font-brand text-text-base mb-2">Cara Kerja</h2>
          <p className="text-text-muted text-sm">Hanya 4 langkah mudah untuk memesan makananmu</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '01', title: 'Pilih Kantin', desc: 'Pilih kantin yang tersedia di sekolahmu', icon: '🏪' },
            { num: '02', title: 'Pilih Menu', desc: 'Jelajahi menu dan tambahkan ke keranjang', icon: '🍽️' },
            { num: '03', title: 'Pesan', desc: 'Konfirmasi pesanan dan pilih waktu ambil', icon: '📱' },
            { num: '04', title: 'Ambil Pesanan', desc: 'Tunjukkan nomor pesanan, langsung ambil!', icon: '✅' },
          ].map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              {i < 3 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] right-[calc(-50%+32px)] border-t-2 border-dashed border-border-soft" />
              )}
              <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-2xl mb-4 relative z-10">
                {step.icon}
              </div>
              <span className="text-xs font-black text-brand/40 font-brand mb-1">{step.num}</span>
              <h3 className="font-bold font-brand text-text-base mb-1">{step.title}</h3>
              <p className="text-sm text-text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-brand rounded-3xl px-8 py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="w-64 h-64 bg-white rounded-full absolute -top-16 -right-16" />
              <div className="w-40 h-40 bg-white rounded-full absolute -bottom-8 -left-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-brand mb-3 relative z-10">
              Siap Memesan Sekarang?
            </h2>
            <p className="text-white/80 text-sm mb-7 relative z-10">
              Bergabung dengan ribuan siswa yang sudah menggunakan CanteenGo
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <button
                onClick={() => nav('login')}
                className="px-8 py-3.5 bg-white text-brand font-bold font-brand rounded-xl hover:bg-brand-pale transition-all shadow-md"
              >
                Mulai Pesan Gratis
              </button>
              <button
                onClick={() => nav('vendor-login')}
                className="px-8 py-3.5 border-2 border-white/50 text-white font-bold font-brand rounded-xl hover:bg-white/10 transition-all"
              >
                Daftar sebagai Penjual
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-soft py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={28} />
          <p className="text-xs text-text-muted font-brand">
            © 2026 CanteenGo. Dibuat dengan ❤️ untuk siswa Indonesia.
          </p>
          <button
            onClick={() => nav('vendor-login')}
            className="text-xs font-semibold font-brand text-brand hover:underline"
          >
            Masuk sebagai Penjual →
          </button>
        </div>
      </footer>
    </div>
  )
}

// ─── Registration / Onboarding Page ──────────────────────────────────────────

export function LoginPage({ nav, setState }: NavProps) {
  const [name, setName] = useState('')
  const [kelas, setKelas] = useState('')
  const [step, setStep] = useState<1 | 2>(1)

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !kelas) return
    setState({ studentName: name.trim(), studentKelas: kelas, userRole: 'student' })
    nav('dashboard')
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <Logo size={60} showText={false} />
          </div>
          <h1 className="text-2xl font-extrabold text-text-base font-brand">Selamat Datang!</h1>
          <p className="text-sm text-text-muted mt-1.5 font-brand">
            Masukkan namamu untuk mulai memesan
          </p>
        </div>

        {/* Onboarding card */}
        <div className="bg-white rounded-3xl p-6 card-shadow">
          <form onSubmit={handleStart} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold font-brand text-text-base mb-2">
                Nama Lengkap / Nama Panggilan
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Adib, Raka, Fina..."
                className="w-full px-4 py-3.5 border border-border-soft rounded-xl text-sm bg-surface focus:bg-white transition-all text-base"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold font-brand text-text-base mb-2">
                Kelas
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['X', 'XI', 'XII'].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKelas(k)}
                    className={`py-3.5 rounded-xl text-base font-extrabold font-brand transition-all border-2 ${
                      kelas === k
                        ? 'bg-brand text-white border-brand shadow-md'
                        : 'bg-surface text-text-muted border-border-soft hover:border-brand/40 hover:text-brand'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !kelas}
              className="w-full py-4 bg-brand text-white font-extrabold font-brand rounded-xl hover:bg-brand-dark transition-all shadow-md text-base disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
              Mulai →
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => nav('vendor-login')}
            className="text-sm font-semibold font-brand text-text-muted hover:text-brand transition-all"
          >
            Masuk sebagai Penjual →
          </button>
        </div>

        <button
          onClick={() => nav('landing')}
          className="mt-4 w-full text-sm text-text-muted font-brand flex items-center justify-center gap-1 hover:text-text-base transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Kembali ke Beranda
        </button>
      </div>
    </div>
  )
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export function DashboardPage({ nav, state }: NavProps) {
  const activeOrder = state.currentOrder
  const displayName = state.studentName || 'Siswa'

  return (
    <MobileLayout showNav active="dashboard" nav={nav}>
      {/* Header */}
      <div className="bg-brand pt-12 pb-16 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-48 h-48 bg-white rounded-full absolute -top-8 -right-8" />
          <div className="w-32 h-32 bg-white rounded-full absolute bottom-0 left-4" />
        </div>
        <div className="relative z-10 flex items-center justify-between mb-5">
          <Logo size={30} showText textDark={false} />
          <button className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
        </div>
        <div className="relative z-10">
          <p className="text-white/80 text-sm font-brand">Kelas {state.studentKelas || '—'}</p>
          <h1 className="text-2xl font-extrabold text-white font-brand mt-0.5">
            Selamat datang, {displayName} 👋
          </h1>
        </div>
      </div>

      {/* Break time card */}
      <div className="px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl p-4 card-shadow flex items-center justify-between">
          <div>
            <p className="text-xs text-text-muted font-brand">Istirahat Berikutnya</p>
            <p className="text-2xl font-extrabold text-text-base font-brand">10:00</p>
            <p className="text-xs text-text-muted font-brand">Istirahat 1 · 30 menit</p>
          </div>
          <button
            onClick={() => nav('canteens')}
            className="px-5 py-3 bg-brand text-white font-bold font-brand rounded-xl text-sm shadow-md hover:bg-brand-dark transition-all"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-6 pb-4">
        {/* Active order */}
        {activeOrder && (
          <div>
            <h2 className="font-bold font-brand text-text-base mb-3">Pesanan Aktif</h2>
            <div
              className="bg-white rounded-2xl p-4 card-shadow border-l-4 border-brand cursor-pointer"
              onClick={() => nav('tracking')}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold font-brand text-text-base">#{activeOrder.id}</p>
                  <p className="text-xs text-text-muted font-brand">{activeOrder.canteen}</p>
                </div>
                <StatusBadge status={activeOrder.status} />
              </div>
              <p className="text-sm text-text-muted font-brand">
                {activeOrder.items.map((i) => i.name).join(' + ')}
              </p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-soft">
                <p className="text-sm font-bold font-brand text-brand">{formatRupiah(activeOrder.total)}</p>
                <p className="text-xs text-text-muted font-brand">
                  {activeOrder.pickupLabel.split('—')[1]?.trim()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Canteens */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold font-brand text-text-base">Kantin Tersedia</h2>
            <button onClick={() => nav('canteens')} className="text-xs text-brand font-semibold font-brand">
              Lihat Semua ({CANTEENS.filter(c => c.status === 'buka').length}) →
            </button>
          </div>
          <div className="space-y-3">
            {CANTEENS.filter((c) => c.status === 'buka')
              .slice(0, 3)
              .map((canteen) => (
                <div
                  key={canteen.id}
                  className="bg-white rounded-2xl p-4 card-shadow flex items-center gap-3 cursor-pointer hover:card-shadow-hover transition-all"
                  onClick={() => {
                    nav('menu')
                  }}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-brand-pale">
                    <img src={canteen.image} alt={canteen.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold font-brand text-text-base text-sm truncate">{canteen.name}</p>
                    <p className="text-xs text-text-muted font-brand">{canteen.menuCount} menu tersedia</p>
                    <p className="text-xs text-text-muted font-brand">Estimasi: {canteen.estimasi}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="flex items-center gap-1 text-xs font-semibold font-brand text-brand">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      Buka
                    </span>
                    <span className="text-xs text-text-muted font-brand">→</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Favorites */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold font-brand text-text-base">Menu Favorit</h2>
            <button onClick={() => nav('canteens')} className="text-xs text-brand font-semibold font-brand">
              Lihat Menu →
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {MENUS['1'].slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-36 bg-white rounded-2xl overflow-hidden card-shadow cursor-pointer"
                onClick={() => nav('menu')}
              >
                <div className="h-24 bg-brand-pale overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold font-brand text-text-base truncate">{item.name}</p>
                  <p className="text-xs text-brand font-bold font-brand mt-0.5">{formatRupiah(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

// ─── Canteen List Page ────────────────────────────────────────────────────────

export function CanteenListPage({ nav, setState }: NavProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'semua' | 'buka' | 'tutup'>('semua')

  const filtered = CANTEENS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'semua' || c.status === filter
    return matchSearch && matchFilter
  })

  return (
    <MobileLayout showNav active="canteens" nav={nav}>
      <PageHeader title="Pilih Kantin" />

      <div className="px-4 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kantin..."
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border-soft rounded-xl text-sm"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-5">
          {(['semua', 'buka', 'tutup'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-brand capitalize transition-all ${
                filter === f
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-white text-text-muted border border-border-soft hover:bg-brand-light hover:text-brand'
              }`}
            >
              {f === 'semua' ? 'Semua' : f === 'buka' ? '● Buka' : '○ Tutup'}
            </button>
          ))}
        </div>

        {/* Canteen cards */}
        <div className="space-y-4">
          {filtered.map((canteen) => (
            <div
              key={canteen.id}
              className={`bg-white rounded-2xl overflow-hidden card-shadow transition-all ${
                canteen.status === 'buka' ? 'hover:card-shadow-hover cursor-pointer' : 'opacity-70'
              }`}
              onClick={() => {
                if (canteen.status === 'buka') {
                  setState({ selectedCanteenId: canteen.id })
                  nav('menu')
                }
              }}
            >
              <div className="h-40 bg-brand-pale relative overflow-hidden">
                <img src={canteen.image} alt={canteen.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-brand ${
                      canteen.status === 'buka' ? 'bg-brand text-white' : 'bg-gray-500 text-white'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${canteen.status === 'buka' ? 'bg-white' : 'bg-gray-300'}`} />
                    {canteen.status === 'buka' ? 'Buka' : 'Tutup'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold font-brand text-text-base text-base mb-1">{canteen.name}</h3>
                <p className="text-xs text-text-muted font-brand mb-3">{canteen.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-text-muted font-brand">
                    <span>🍽 {canteen.menuCount} menu</span>
                    {canteen.status === 'buka' && <span>⏱ {canteen.estimasi}</span>}
                  </div>
                  {canteen.status === 'buka' ? (
                    <button
                      className="px-4 py-2 bg-brand text-white text-xs font-bold font-brand rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation()
                        setState({ selectedCanteenId: canteen.id })
                        nav('menu')
                      }}
                    >
                      Lihat Menu
                    </button>
                  ) : (
                    <span className="px-4 py-2 bg-gray-100 text-gray-400 text-xs font-bold font-brand rounded-xl">
                      Tidak Tersedia
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}

// ─── Menu Page ────────────────────────────────────────────────────────────────

export function MenuPage({ nav, state, setState }: NavProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'semua' | 'makanan' | 'minuman' | 'snack'>('semua')
  const [localCart, setLocalCart] = useState<Record<string, number>>({})

  const canteen = CANTEENS.find((c) => c.id === state.selectedCanteenId) || CANTEENS[0]
  const allItems = MENUS[canteen.id] || []

  const filtered = allItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'semua' || item.category === category
    return matchSearch && matchCat
  })

  const cartTotal = Object.entries(localCart).reduce((sum, [id, qty]) => {
    const item = allItems.find((i) => i.id === id)
    return sum + (item ? item.price * qty : 0)
  }, 0)

  const cartCount = Object.values(localCart).reduce((s, q) => s + q, 0)

  const addToCart = (item: MenuItem) => {
    setLocalCart((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }))
  }
  const removeFromCart = (item: MenuItem) => {
    setLocalCart((prev) => {
      const next = { ...prev }
      if (next[item.id] > 1) next[item.id]--
      else delete next[item.id]
      return next
    })
  }

  const goToCart = () => {
    const cartItems: CartItem[] = Object.entries(localCart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = allItems.find((i) => i.id === id)!
        return { id: item.id, name: item.name, price: item.price, qty, image: item.image, canteenId: canteen.id }
      })
    setState({ cart: cartItems })
    nav('cart')
  }

  const categories: { key: typeof category; label: string }[] = [
    { key: 'semua', label: 'Semua' },
    { key: 'makanan', label: '🍽 Makanan' },
    { key: 'minuman', label: '🥤 Minuman' },
    { key: 'snack', label: '🍟 Snack' },
  ]

  return (
    <MobileLayout showNav active="canteens" nav={nav}>
      {/* Header */}
      <div className="bg-white border-b border-border-soft">
        <div className="flex items-center gap-3 px-4 pt-12 pb-3">
          <button
            onClick={() => nav('canteens')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-light text-brand hover:bg-brand/20 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="font-bold font-brand text-text-base text-base leading-tight">{canteen.name}</h1>
            <div className="flex items-center gap-2 text-xs text-text-muted font-brand">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                Buka
              </span>
              <span>·</span>
              <span>⏱ {canteen.estimasi}</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari menu..."
              className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border-soft rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold font-brand transition-all ${
                category === cat.key
                  ? 'bg-brand text-white'
                  : 'bg-surface text-text-muted border border-border-soft hover:bg-brand-light hover:text-brand'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 py-4 space-y-3 pb-28">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden card-shadow flex">
            <div className="w-28 h-28 flex-shrink-0 bg-brand-pale overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold font-brand text-text-base text-sm">{item.name}</h3>
                  {!item.available && (
                    <span className="flex-shrink-0 text-[10px] font-bold font-brand text-danger bg-danger-light px-2 py-0.5 rounded-full">
                      Habis
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-muted font-brand mt-0.5 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-extrabold text-brand font-brand">{formatRupiah(item.price)}</p>
                {item.available ? (
                  <div className="flex items-center gap-2">
                    {localCart[item.id] ? (
                      <>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="w-7 h-7 bg-brand-light text-brand rounded-full flex items-center justify-center font-bold"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold font-brand text-text-base w-4 text-center">
                          {localCart[item.id]}
                        </span>
                      </>
                    ) : null}
                    <button
                      onClick={() => addToCart(item)}
                      className="w-7 h-7 bg-brand text-white rounded-full flex items-center justify-center font-bold shadow-sm"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-text-muted font-brand">Tidak tersedia</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center z-40 px-4">
          <button
            onClick={goToCart}
            className="w-full max-w-[390px] bg-brand text-white font-bold font-brand rounded-2xl px-5 py-4 flex items-center justify-between shadow-lg hover:bg-brand-dark transition-all"
          >
            <span className="bg-white/20 text-white text-sm font-bold font-brand px-2.5 py-1 rounded-lg">
              {cartCount} item
            </span>
            <span>Lihat Keranjang</span>
            <span className="font-bold">{formatRupiah(cartTotal)}</span>
          </button>
        </div>
      )}
    </MobileLayout>
  )
}

// ─── Cart Page ────────────────────────────────────────────────────────────────

export function CartPage({ nav, state, setState }: NavProps) {
  const { cart, pickupTime } = state

  const updateQty = (id: string, delta: number) => {
    setState({
      cart: cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    })
  }

  const total = cart.reduce((s, item) => s + item.price * item.qty, 0)
  const itemCount = cart.reduce((s, item) => s + item.qty, 0)

  if (cart.length === 0) {
    return (
      <MobileLayout showNav active="canteens" nav={nav}>
        <PageHeader title="Keranjang" onBack={() => nav('menu')} />
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="font-bold font-brand text-text-base mb-2">Keranjang Kosong</h3>
          <p className="text-sm text-text-muted font-brand mb-6">Tambahkan menu dari kantin pilihanmu</p>
          <button
            onClick={() => nav('canteens')}
            className="px-6 py-3 bg-brand text-white font-bold font-brand rounded-xl"
          >
            Pilih Menu
          </button>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout showNav active="canteens" nav={nav}>
      <PageHeader title="Keranjang" onBack={() => nav('menu')} />

      <div className="px-4 py-4 space-y-4 pb-32">
        {/* Items */}
        <div className="bg-white rounded-2xl overflow-hidden card-shadow divide-y divide-border-soft">
          {cart.map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-brand-pale flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold font-brand text-sm text-text-base truncate">{item.name}</p>
                <p className="text-xs font-bold font-brand text-brand mt-0.5">{formatRupiah(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="w-7 h-7 bg-brand-light text-brand rounded-full flex items-center justify-center font-bold text-sm"
                >
                  −
                </button>
                <span className="text-sm font-bold font-brand text-text-base w-5 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-7 h-7 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-muted font-brand">{itemCount} item</p>
            <p className="font-extrabold font-brand text-text-base text-base">{formatRupiah(total)}</p>
          </div>
        </div>

        {/* Pickup time */}
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <h3 className="font-bold font-brand text-text-base mb-3">Pilih Waktu Pengambilan</h3>
          <div className="space-y-2">
            {[
              { id: 'istirahat1', label: 'Istirahat 1', time: '10:00–10:30' },
              { id: 'istirahat2', label: 'Istirahat 2', time: '12:00–12:30' },
            ].map((slot) => (
              <label
                key={slot.id}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  pickupTime === slot.id
                    ? 'border-brand bg-brand-light'
                    : 'border-border-soft hover:border-brand/30'
                }`}
              >
                <input
                  type="radio"
                  name="pickup"
                  value={slot.id}
                  checked={pickupTime === slot.id}
                  onChange={() => setState({ pickupTime: slot.id })}
                  className="accent-brand"
                />
                <div>
                  <p className="font-bold font-brand text-sm text-text-base">{slot.label}</p>
                  <p className="text-xs text-text-muted font-brand">{slot.time}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <h3 className="font-bold font-brand text-text-base mb-2">Catatan (opsional)</h3>
          <textarea
            placeholder="Misal: sambal terpisah, tidak pakai bawang..."
            rows={2}
            className="w-full text-sm border border-border-soft rounded-xl px-3 py-2.5 resize-none bg-surface"
          />
        </div>
      </div>

      {/* Bottom checkout button */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center z-40 px-4">
        <div className="w-full max-w-[390px] bg-white border-t border-border-soft pt-3 pb-3 px-0">
          <button
            onClick={() => nav('checkout')}
            className="w-full py-4 bg-brand text-white font-bold font-brand rounded-2xl shadow-lg hover:bg-brand-dark transition-all"
          >
            Lanjut Checkout · {formatRupiah(total)}
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}

// ─── Checkout Page ────────────────────────────────────────────────────────────

export function CheckoutPage({ nav, state, setState }: NavProps) {
  const { cart, pickupTime, paymentMethod } = state
  const canteen = CANTEENS.find((c) => c.id === state.selectedCanteenId) || CANTEENS[0]
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0)
  const pickupLabel = pickupTime === 'istirahat1' ? 'Istirahat 1 — 10:00–10:30' : 'Istirahat 2 — 12:00–12:30'
  const [qrisConfirmed, setQrisConfirmed] = useState(false)

  const handleOrder = () => {
    const today = new Date()
    const dateStr = today.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    const newOrder = {
      id: `A${String(Math.floor(Math.random() * 900) + 100)}`,
      items: cart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total,
      canteen: canteen.name,
      canteenId: canteen.id,
      pickup: pickupTime,
      pickupLabel,
      status: 'baru' as const,
      date: dateStr,
      student: state.studentName,
      kelas: state.studentKelas,
      paymentMethod,
      paymentStatus: paymentMethod === 'qris' ? ('berhasil' as const) : ('menunggu' as const),
    }
    setState({
      currentOrder: newOrder,
      cart: [],
      paymentMethod: 'kantin',
      orderHistory: [newOrder, ...state.orderHistory],
    })
    nav('success')
  }

  return (
    <MobileLayout showNav={false} active="dashboard" nav={nav}>
      <PageHeader title="Checkout" onBack={() => nav('cart')} />

      <div className="px-4 py-4 space-y-4">
        {/* Student info — pulled from registration */}
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <h3 className="font-bold font-brand text-text-base mb-3">Informasi Pemesan</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center font-bold text-brand font-brand">
              {(state.studentName?.[0] || 'S').toUpperCase()}
            </div>
            <div>
              <p className="font-bold font-brand text-text-base">{state.studentName || 'Siswa'}</p>
              <p className="text-xs text-text-muted font-brand">Kelas {state.studentKelas || '—'}</p>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <h3 className="font-bold font-brand text-text-base mb-3">Ringkasan Pesanan</h3>
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border-soft">
            <div className="w-8 h-8 bg-brand-light rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="font-bold font-brand text-sm text-text-base">{canteen.name}</p>
              <p className="text-xs text-text-muted font-brand">{pickupLabel}</p>
            </div>
          </div>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-text-muted font-brand">
                  {item.name} <span className="font-bold text-text-base">×{item.qty}</span>
                </span>
                <span className="font-bold font-brand text-text-base">{formatRupiah(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-border-soft">
              <span className="font-bold font-brand text-text-base">Total</span>
              <span className="font-extrabold font-brand text-brand text-lg">{formatRupiah(total)}</span>
            </div>
          </div>
        </div>

        {/* Payment method selection */}
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <h3 className="font-bold font-brand text-text-base mb-3">Metode Pembayaran</h3>
          <div className="space-y-2">
            {[
              { id: 'kantin' as const, label: 'Bayar di Kantin', desc: 'Bayar tunai saat mengambil pesanan', icon: '💵' },
              { id: 'qris' as const, label: 'QRIS', desc: 'Scan QRIS dan bayar sekarang', icon: '📱' },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === method.id
                    ? 'border-brand bg-brand-light'
                    : 'border-border-soft hover:border-brand/30'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => { setState({ paymentMethod: method.id }); setQrisConfirmed(false) }}
                  className="accent-brand"
                />
                <span className="text-xl">{method.icon}</span>
                <div>
                  <p className="font-bold font-brand text-sm text-text-base">{method.label}</p>
                  <p className="text-xs text-text-muted font-brand">{method.desc}</p>
                </div>
              </label>
            ))}
          </div>

          {/* QRIS flow */}
          {paymentMethod === 'qris' && (
            <div className="mt-4 p-4 bg-surface rounded-xl border border-border-soft">
              <p className="text-xs font-bold font-brand text-text-muted mb-3 text-center">TOTAL PEMBAYARAN</p>
              <p className="text-3xl font-extrabold font-brand text-brand text-center mb-4">{formatRupiah(total)}</p>
              {/* QRIS placeholder */}
              <div className="flex justify-center mb-4">
                <div className="bg-white border-4 border-brand rounded-2xl p-3 w-40 h-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-1">▦</div>
                    <p className="text-[10px] font-brand text-text-muted font-bold">QRIS</p>
                    <p className="text-[9px] font-brand text-brand">CanteenGo</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-text-muted font-brand text-center mb-3">
                Scan QR code di atas dengan aplikasi e-wallet atau m-banking kamu
              </p>
              {!qrisConfirmed ? (
                <button
                  onClick={() => setQrisConfirmed(true)}
                  className="w-full py-3 bg-brand text-white font-bold font-brand rounded-xl text-sm"
                >
                  Saya Sudah Bayar dengan QRIS
                </button>
              ) : (
                <div className="flex items-center gap-2 justify-center bg-brand-light text-brand p-3 rounded-xl">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-bold font-brand">Pembayaran Dikonfirmasi</span>
                </div>
              )}
            </div>
          )}

          {paymentMethod === 'kantin' && (
            <p className="text-xs text-text-muted font-brand mt-3 text-center">
              ⚠️ Siapkan uang tunai saat mengambil pesanan di kantin.
            </p>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleOrder}
          disabled={paymentMethod === 'qris' && !qrisConfirmed}
          className="w-full py-4 bg-brand text-white font-extrabold font-brand rounded-2xl shadow-lg hover:bg-brand-dark transition-all text-base disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {paymentMethod === 'qris' && !qrisConfirmed ? 'Selesaikan Pembayaran QRIS Dulu' : 'Buat Pesanan'}
        </button>
      </div>
    </MobileLayout>
  )
}

// ─── Order Success Page ───────────────────────────────────────────────────────

export function OrderSuccessPage({ nav, state }: NavProps) {
  const order = state.currentOrder
  if (!order) return null

  return (
    <MobileLayout showNav={false} active="dashboard" nav={nav}>
      <div className="flex flex-col items-center px-5 pt-16 pb-8 min-h-screen">
        {/* Success icon */}
        <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center mb-5 shadow-lg">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold font-brand text-text-base mb-1">Pesanan Berhasil!</h1>
        <p className="text-sm text-text-muted font-brand mb-6 text-center">
          Pesananmu sudah diterima oleh {order.canteen}
        </p>

        {/* Order number */}
        <div className="bg-brand rounded-2xl px-10 py-5 mb-5 text-center shadow-lg">
          <p className="text-white/70 text-xs font-brand mb-1">Nomor Pesanan</p>
          <p className="text-5xl font-black text-white font-brand tracking-widest">{order.id}</p>
        </div>

        {/* Details */}
        <div className="w-full bg-white rounded-2xl p-4 card-shadow mb-5">
          <div className="space-y-2">
            {[
              { label: 'Kantin', val: order.canteen },
              { label: 'Siswa', val: `${order.student} · Kelas ${order.kelas}` },
              { label: 'Waktu Ambil', val: order.pickupLabel },
              { label: 'Pembayaran', val: order.paymentMethod === 'qris' ? '✓ QRIS Berhasil' : 'Bayar di Kantin' },
              { label: 'Total', val: formatRupiah(order.total) },
              { label: 'Status', val: 'Menunggu Diproses' },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-border-soft last:border-0">
                <span className="text-xs text-text-muted font-brand">{label}</span>
                <span className={`text-sm font-bold font-brand ${
                  label === 'Status' ? 'text-accent' :
                  label === 'Pembayaran' && val.startsWith('✓') ? 'text-brand' :
                  'text-text-base'
                }`}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code */}
        <QRCodePlaceholder orderId={order.id} />

        <p className="text-xs text-text-muted font-brand text-center mt-3 mb-7 max-w-xs">
          Tunjukkan nomor pesanan atau QR code kepada penjual saat mengambil makanan.
        </p>

        {/* CTAs */}
        <div className="w-full space-y-3">
          <button
            onClick={() => nav('tracking')}
            className="w-full py-3.5 bg-brand text-white font-bold font-brand rounded-2xl shadow-md"
          >
            Lihat Status Pesanan
          </button>
          <button
            onClick={() => nav('dashboard')}
            className="w-full py-3.5 border-2 border-border-soft text-text-muted font-bold font-brand rounded-2xl"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}

// ─── Order Tracking Page ──────────────────────────────────────────────────────

export function OrderTrackingPage({ nav, state }: NavProps) {
  const order: Order | null = state.currentOrder || state.orderHistory[0] || null
  if (!order) {
    return (
      <MobileLayout showNav active="history" nav={nav}>
        <PageHeader title="Lacak Pesanan" onBack={() => nav('history')} />
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="text-5xl mb-3">📦</div>
          <p className="font-bold font-brand text-text-base mb-1">Belum ada pesanan aktif</p>
          <p className="text-sm text-text-muted font-brand mb-5">Buat pesanan dulu untuk melihat status</p>
          <button onClick={() => nav('canteens')} className="px-6 py-3 bg-brand text-white font-bold font-brand rounded-xl">
            Pesan Sekarang
          </button>
        </div>
      </MobileLayout>
    )
  }

  const steps = [
    { key: 'baru', label: 'Pesanan Diterima', desc: 'Kantin telah menerima pesananmu' },
    { key: 'diproses', label: 'Sedang Disiapkan', desc: 'Makananmu sedang dimasak' },
    { key: 'siap', label: 'Siap Diambil', desc: 'Pesanan sudah siap di konter kantin' },
    { key: 'selesai', label: 'Selesai', desc: 'Pesanan telah diambil' },
  ]

  const statusOrder = ['baru', 'diproses', 'siap', 'selesai']
  const currentIdx = statusOrder.indexOf(order.status)

  const statusMessages: Record<string, string> = {
    baru: 'Pesanan kamu baru diterima oleh kantin. Mohon tunggu sebentar.',
    diproses: `Pesanan sedang disiapkan oleh ${order.canteen}. Sebentar lagi selesai!`,
    siap: `Pesananmu sudah siap diambil di ${order.canteen}. Segera ke kantin ya!`,
    selesai: 'Pesanan telah selesai. Terima kasih sudah menggunakan CanteenGo! 🎉',
  }

  return (
    <MobileLayout showNav active="history" nav={nav}>
      <PageHeader title={`Pesanan ${order.id}`} onBack={() => nav('history')} />

      <div className="px-4 py-4 space-y-4">
        {/* Status banner */}
        <div className={`rounded-2xl p-4 ${order.status === 'siap' ? 'bg-brand' : 'bg-brand-light'}`}>
          <p className={`text-sm font-brand font-bold ${order.status === 'siap' ? 'text-white' : 'text-brand-dark'}`}>
            {statusMessages[order.status]}
          </p>
          {order.status === 'siap' && (
            <p className="text-white/80 text-xs font-brand mt-1">
              ⏰ Waktu Ambil: {order.pickupLabel}
            </p>
          )}
        </div>

        {/* Order info */}
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-black font-brand text-2xl text-brand">{order.id}</p>
              <p className="text-xs text-text-muted font-brand">{order.canteen}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <div className="space-y-1 py-3 border-y border-border-soft">
            {order.items.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="text-text-muted font-brand">
                  {item.name} ×{item.qty}
                </span>
                <span className="font-bold font-brand text-text-base">{formatRupiah(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-3">
            <span className="font-bold font-brand text-text-base">Total</span>
            <span className="font-extrabold font-brand text-brand">{formatRupiah(order.total)}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-4 card-shadow">
          <h3 className="font-bold font-brand text-text-base mb-4">Status Pesanan</h3>
          <div className="space-y-0">
            {steps.map((step, i) => {
              const isDone = i <= currentIdx
              const isCurrent = i === currentIdx
              const isLast = i === steps.length - 1

              return (
                <div key={step.key} className="flex gap-3">
                  {/* Indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCurrent
                          ? 'bg-brand border-brand'
                          : isDone
                          ? 'bg-brand border-brand'
                          : 'bg-white border-border-soft'
                      }`}
                    >
                      {isDone ? (
                        isCurrent ? (
                          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )
                      ) : (
                        <div className="w-2 h-2 bg-gray-200 rounded-full" />
                      )}
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 h-8 my-1 ${isDone && !isCurrent ? 'bg-brand' : 'bg-border-soft'}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                    <p className={`text-sm font-bold font-brand ${isDone ? 'text-text-base' : 'text-text-muted'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-text-muted font-brand">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pickup info */}
        <div className="bg-accent-light rounded-2xl p-4">
          <h3 className="font-bold font-brand text-text-base mb-2 flex items-center gap-2">
            <span>📍</span> Cara Pengambilan
          </h3>
          <p className="text-sm text-text-muted font-brand">
            Tunjukkan kode pesanan <strong className="text-text-base">{order.id}</strong> atau QR code kepada penjual di{' '}
            <strong className="text-text-base">{order.canteen}</strong> saat pengambilan.
          </p>
        </div>

        <QRCodePlaceholder orderId={order.id} />
      </div>
    </MobileLayout>
  )
}

// ─── Order History Page ───────────────────────────────────────────────────────

export function OrderHistoryPage({ nav, state, setState }: NavProps) {
  const [tab, setTab] = useState<'semua' | 'aktif' | 'selesai'>('semua')

  const filtered = state.orderHistory.filter((o: Order) => {
    if (tab === 'aktif') return o.status !== 'selesai'
    if (tab === 'selesai') return o.status === 'selesai'
    return true
  })

  return (
    <MobileLayout showNav active="history" nav={nav}>
      <PageHeader title="Pesanan Saya" />

      {/* Tabs */}
      <div className="px-4 pt-2 pb-3 flex gap-2 border-b border-border-soft">
        {(['semua', 'aktif', 'selesai'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold font-brand capitalize transition-all ${
              tab === t ? 'bg-brand text-white' : 'bg-surface text-text-muted hover:bg-brand-light hover:text-brand'
            }`}
          >
            {t === 'semua' ? 'Semua' : t === 'aktif' ? 'Aktif' : 'Selesai'}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 space-y-3">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-4 card-shadow cursor-pointer hover:card-shadow-hover transition-all"
            onClick={() => {
              setState({ selectedOrderId: order.id })
              nav('tracking')
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-black font-brand text-brand text-lg">{order.id}</span>
                <StatusBadge status={order.status} />
              </div>
              <span className="text-xs text-text-muted font-brand">{order.date}</span>
            </div>
            <p className="text-sm text-text-muted font-brand mb-1">{order.canteen}</p>
            <p className="text-sm font-brand text-text-base mb-3">
              {order.items.map((i) => `${i.name}${i.qty > 1 ? ` ×${i.qty}` : ''}`).join(' + ')}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-border-soft">
              <span className="font-extrabold font-brand text-brand">{formatRupiah(order.total)}</span>
              {order.status === 'selesai' ? (
                <button
                  className="px-4 py-1.5 bg-brand-light text-brand font-bold font-brand text-xs rounded-xl hover:bg-brand hover:text-white transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    nav('canteens')
                  }}
                >
                  Pesan Lagi
                </button>
              ) : (
                <span className="text-xs text-brand font-semibold font-brand">Lihat Detail →</span>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">📋</div>
            <p className="text-sm text-text-muted font-brand">Belum ada pesanan</p>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

export function ProfilePage({ nav, state }: NavProps) {
  const menuItems = [
    { icon: '📋', label: 'Pesanan Saya', action: () => nav('history') },
    { icon: '❤️', label: 'Menu Favorit', action: () => nav('canteens') },
    { icon: '⚙️', label: 'Pengaturan Akun', action: () => {} },
    { icon: '❓', label: 'Bantuan & FAQ', action: () => {} },
    { icon: '📄', label: 'Syarat & Ketentuan', action: () => {} },
  ]

  return (
    <MobileLayout showNav active="profile" nav={nav}>
      {/* Header */}
      <div className="bg-brand pt-12 pb-16 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-48 h-48 bg-white rounded-full absolute -top-8 -right-8" />
        </div>
        <h1 className="text-xl font-bold text-white font-brand relative z-10">Profil Saya</h1>
      </div>

      {/* Avatar card */}
      <div className="px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl p-5 card-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-2xl font-black text-brand font-brand flex-shrink-0">
              {(state.studentName?.[0] || 'S').toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="font-extrabold font-brand text-text-base text-base">{state.studentName || 'Siswa'}</h2>
              <p className="text-sm text-text-muted font-brand">Kelas {state.studentKelas || '—'}</p>
              <p className="text-xs text-text-muted font-brand">Siswa CanteenGo</p>
            </div>
            <button className="px-3 py-1.5 text-xs font-bold font-brand text-brand border border-brand rounded-lg hover:bg-brand-light transition-all">
              Edit
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border-soft">
            {[
              { num: '4', label: 'Pesanan' },
              { num: 'Rp52rb', label: 'Total Belanja' },
              { num: 'Nasi Ayam', label: 'Favorit' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-extrabold font-brand text-brand text-sm">{s.num}</p>
                <p className="text-[10px] text-text-muted font-brand">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu list */}
      <div className="px-4 mt-5 mb-4">
        <div className="bg-white rounded-2xl overflow-hidden card-shadow divide-y divide-border-soft">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-surface transition-all text-left"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-sm font-semibold font-brand text-text-base">{item.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C7266" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mb-8">
        <button
          onClick={() => nav('landing')}
          className="w-full py-3.5 border-2 border-danger text-danger font-bold font-brand rounded-2xl hover:bg-danger-light transition-all"
        >
          Keluar
        </button>
      </div>
    </MobileLayout>
  )
}
