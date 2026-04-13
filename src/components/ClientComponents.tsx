// --- Client-Side Components ---
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  ChevronRight, 
  ChevronLeft, 
  Calculator, 
  MapPin, 
  MessageSquare, 
  X, 
  Send, 
  LogOut,
  Gauge,
  Fuel,
  Settings2,
  Calendar
} from 'lucide-react';
import { CarData, Testimonial, FAQ, BrandingData, ServiceBusiness } from '../types';
import { generateAIResponse } from '../ai-logic';

// Brand Logos Marquee
export const BrandLogos = ({ brands }: { brands: BrandingData[] }) => {
  const brandLogos = brands.filter(b => b.type === 'brand').sort((a, b) => a.display_order - b.display_order);
  if (brandLogos.length === 0) return null;

  return (
    <div className="py-20 border-y border-white/5 overflow-hidden">
      <div className="flex gap-20 animate-marquee whitespace-nowrap">
        {[...brandLogos, ...brandLogos].map((b, i) => (
          <div key={i} className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
            <img src={b.logo_url} alt={b.name} className="h-8 object-contain" referrerPolicy="no-referrer" />
            <span className="text-white font-bold tracking-tighter text-sm uppercase">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Credit Partners Section
export const CreditPartners = ({ partners }: { partners: BrandingData[] }) => {
  const financingLogos = partners.filter(b => b.type === 'financing').sort((a, b) => a.display_order - b.display_order);
  if (financingLogos.length === 0) return null;

  return (
    <div className="py-20 bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Financing Partners</span>
          <h2 className="text-3xl font-bold tracking-tighter uppercase mt-2">Trusted Credit Solutions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
          {financingLogos.map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
              <img src={p.logo_url} alt={p.name} className="h-12 object-contain" referrerPolicy="no-referrer" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Service Popup Modal
export const ServicePopup = ({ service, onClose }: { service: ServiceBusiness, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[180] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-black border border-white/20 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl"
    >
      <div className={`relative p-12 bg-gradient-to-br ${service.color} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center p-6 border border-white/20">
            <img src={service.logo} alt={service.name} className="w-full h-full object-contain" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-white">{service.name}</h3>
            <p className="text-white/60 text-xs uppercase tracking-widest">Part of Gudang Mokas Ecosystem</p>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-8">
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Layanan Kami</h4>
          <p className="text-white/80 text-base leading-relaxed">{service.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {service.name === 'Urusmen' ? (
            <>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-500 text-lg">📄</span>
                </div>
                <p className="text-xs font-bold">Perpanjangan STNK</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-500 text-lg">🔄</span>
                </div>
                <p className="text-xs font-bold">Balik Nama</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-500 text-lg">🚗</span>
                </div>
                <p className="text-xs font-bold">Mutasi Kendaraan</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-500 text-lg">✅</span>
                </div>
                <p className="text-xs font-bold">Cepat & Terpercaya</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-lg">🏠</span>
                </div>
                <p className="text-xs font-bold">Datang ke Rumah</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-lg">✨</span>
                </div>
                <p className="text-xs font-bold">Premium Quality</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-lg">⚡</span>
                </div>
                <p className="text-xs font-bold">Fast Service</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-lg">💧</span>
                </div>
                <p className="text-xs font-bold">Eco-Friendly</p>
              </div>
            </>
          )}
        </div>

        <a 
          href={`https://wa.me/${service.whatsapp}?text=Halo ${service.name}, saya tertarik dengan layanan Anda. Bisa minta info lebih lanjut?`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full py-5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black uppercase tracking-[0.3em] text-[11px] overflow-hidden rounded-2xl flex items-center justify-center gap-4 transition-all duration-500 shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:shadow-[0_20px_60px_rgba(37,211,102,0.5)] hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <div className="relative z-10 flex items-center gap-3">
            <MessageSquare size={20} />
            <span>Hubungi via WhatsApp</span>
          </div>
        </a>

        <button 
          onClick={onClose}
          className="w-full py-4 text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
        >
          Tutup
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// Navbar Component
export const Navbar = ({ onAdminClick, isAdmin, onServiceClick, onSellClick, onTradeClick }: { 
  onAdminClick: () => void, 
  isAdmin: boolean,
  onServiceClick: (service: ServiceBusiness) => void,
  onSellClick: () => void,
  onTradeClick: () => void
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10 px-3 md:px-6 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white flex items-center justify-center rounded-sm">
              <span className="text-black font-black text-base md:text-xl">GM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tighter text-xs md:text-lg leading-none">GUDANG_MOKAS</span>
              <span className="text-white/50 text-[7px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em]">Traders Used Car Since 2021</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#inventory" className="text-white/70 hover:text-white transition-colors text-xs lg:text-sm uppercase tracking-widest">Inventory</a>
            <a href="#testimonials" className="text-white/70 hover:text-white transition-colors text-xs lg:text-sm uppercase tracking-widest">Testimonials</a>
            
            {/* Layanan Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowServicesDropdown(true)}
              onMouseLeave={() => setShowServicesDropdown(false)}
            >
              <button className="text-white/70 hover:text-white transition-colors text-xs lg:text-sm uppercase tracking-widest flex items-center gap-1">
                Layanan
                <ChevronRight size={14} className={`transition-transform ${showServicesDropdown ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showServicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-4 w-80 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="p-2">
                      <a 
                        href="#sell-trade"
                        onClick={() => setShowServicesDropdown(false)}
                        className="group flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-all"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-800">
                          <img 
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=200" 
                            alt="Jual Mobil"
                            className="w-full h-full object-cover opacity-60"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-black text-sm uppercase tracking-tight">Jual Mobil</h4>
                          <p className="text-white/50 text-[10px] leading-relaxed mt-1">Dapatkan harga terbaik untuk mobil Anda</p>
                        </div>
                        <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </a>
                      
                      <a 
                        href="#sell-trade"
                        onClick={() => setShowServicesDropdown(false)}
                        className="group flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-all"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-emerald-600 to-emerald-800">
                          <img 
                            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=200" 
                            alt="Tukar Tambah"
                            className="w-full h-full object-cover opacity-60"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-black text-sm uppercase tracking-tight">Tukar Tambah</h4>
                          <p className="text-white/50 text-[10px] leading-relaxed mt-1">Tukar mobil lama dengan unit pilihan</p>
                        </div>
                        <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <a href="#ecosystem" className="text-white/70 hover:text-white transition-colors text-xs lg:text-sm uppercase tracking-widest">Ecosystem</a>
            <a href="#faq" className="text-white/70 hover:text-white transition-colors text-xs lg:text-sm uppercase tracking-widest">FAQ</a>
            <a href="#location" className="text-white/70 hover:text-white transition-colors text-xs lg:text-sm uppercase tracking-widest">Location</a>
            
            {isAdmin && (
              <button 
                onClick={onAdminClick}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>

          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          >
            {showMobileMenu ? <X size={20} /> : (
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-white rounded-full"></div>
                <div className="w-5 h-0.5 bg-white rounded-full"></div>
                <div className="w-5 h-0.5 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-xl md:hidden"
          >
            <button 
              onClick={() => setShowMobileMenu(false)}
              className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white z-10"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col h-full pt-20 pb-6 px-4">
              <div className="flex-1 space-y-1">
                <a 
                  href="#inventory" 
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-4 px-5 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all text-base uppercase tracking-wider font-bold"
                >
                  Inventory
                </a>
                
                {/* Mobile Layanan Section */}
                <div className="py-2">
                  <div className="px-5 py-2 text-white/40 text-xs uppercase tracking-widest font-bold">Layanan</div>
                  <button 
                    onClick={() => {
                      onSellClick();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center gap-3 py-3 px-5 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all ml-4 w-full text-left"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100" 
                        alt="Jual"
                        className="w-full h-full object-cover opacity-60"
                      />
                    </div>
                    <span className="text-sm uppercase tracking-wider font-bold">Jual Mobil</span>
                  </button>
                  <button 
                    onClick={() => {
                      onTradeClick();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center gap-3 py-3 px-5 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all ml-4 w-full text-left"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=100" 
                        alt="Tukar"
                        className="w-full h-full object-cover opacity-60"
                      />
                    </div>
                    <span className="text-sm uppercase tracking-wider font-bold">Tukar Tambah</span>
                  </button>
                </div>
                
                {['ecosystem', 'testimonials', 'faq', 'location'].map(link => (
                  <a 
                    key={link}
                    href={`#${link}`} 
                    onClick={() => setShowMobileMenu(false)}
                    className="block py-4 px-5 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all text-base uppercase tracking-wider font-bold capitalize"
                  >
                    {link}
                  </a>
                ))}
              </div>
              
              {isAdmin && (
                <div className="border-t border-white/10 pt-4">
                  <button 
                    onClick={() => {
                      onAdminClick();
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all text-red-500 border border-red-500/20"
                  >
                    <LogOut size={18} />
                    <span className="text-sm uppercase tracking-widest font-bold">Logout Admin</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Credit Calculator Component
export const CreditCalculator = ({ car }: { car: CarData }) => {
  const [tenor, setTenor] = useState(3);
  const [dpPercent, setDpPercent] = useState(car.min_dp_percent);

  const calculation = useMemo(() => {
    const dpAmount = (dpPercent / 100) * car.price;
    const loanAmount = car.price - dpAmount;
    const totalInterest = loanAmount * car.interest_rate * tenor;
    const totalLoan = loanAmount + totalInterest;
    const monthly = totalLoan / (tenor * 12);
    return { dpAmount, monthly };
  }, [car, tenor, dpPercent]);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl space-y-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors duration-700" />
      
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
          <Calculator className="text-emerald-500" size={18} />
        </div>
        <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Credit Simulation</h3>
      </div>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">Down Payment ({dpPercent}%)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] text-white/20 font-black">IDR</span>
              <span className="text-lg font-black text-white tracking-tighter tabular-nums">
                {calculation.dpAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-emerald-500 transition-all duration-500"
              style={{ width: `${((dpPercent - car.min_dp_percent) / (car.max_dp_percent - car.min_dp_percent)) * 100}%` }}
            />
            <input 
              type="range" 
              min={car.min_dp_percent} 
              max={car.max_dp_percent || 90} 
              value={dpPercent} 
              onChange={(e) => setDpPercent(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">Tenor Period</span>
            <span className="text-xs font-black text-white tracking-tighter">{tenor * 12} Months</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((t) => (
              <button
                key={t}
                onClick={() => setTenor(t)}
                className={`py-3 text-[9px] font-black rounded-xl border transition-all duration-300 ${
                  tenor === t 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {t}Y
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
        <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">Estimated Monthly</span>
        <div className="flex flex-col gap-2">
          <div className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Rp</span>
          </div>
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight tabular-nums">
            {Math.round(calculation.monthly).toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
};

// Car Card Component
export const CarCard = ({ car, onClick }: { car: CarData; onClick: () => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onClick={onClick}
    className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img 
        src={car.images[0]} 
        alt={car.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[10px] text-white font-bold uppercase tracking-widest">{car.year}</span>
        </div>
        {car.stock > 0 && (
          <div className="bg-emerald-500/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/20">
            <span className="text-[10px] text-white font-bold uppercase tracking-widest">Ready Stock</span>
          </div>
        )}
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-bold text-xl tracking-tight group-hover:text-white/90 transition-colors">{car.name}</h3>
          <p className="text-white/40 text-xs uppercase tracking-widest">{car.brand}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-black text-lg tracking-tighter">Rp {(car.price / 1000000).toFixed(0)}M</p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest">Cash: Rp {(car.cash_price / 1000000).toFixed(0)}M</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
        <div className="flex flex-col items-center gap-1">
          <Gauge size={14} className="text-white/40" />
          <span className="text-[10px] text-white/60 uppercase font-medium">{car.km.toLocaleString()} KM</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Settings2 size={14} className="text-white/40" />
          <span className="text-[10px] text-white/60 uppercase font-medium">{car.transmission}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Fuel size={14} className="text-white/40" />
          <span className="text-[10px] text-white/60 uppercase font-medium">{car.fuel}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

// Chat Agent Component
export const ChatAgent = ({ cars, faqs }: { cars: CarData[], faqs: FAQ[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Halo! Saya asisten virtual Gudang Mokas. Ada yang bisa saya bantu mengenai stok mobil premium kami hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    setTimeout(() => {
      const response = generateAIResponse(userMsg, cars, faqs);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="mb-4 w-80 md:w-96 h-[500px] bg-black/90 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden"
          >
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute inset-0" />
                  <div className="w-3 h-3 bg-emerald-500 rounded-full relative" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">GM_NEURAL_AGENT</span>
                  <span className="text-[8px] text-white/40 uppercase tracking-widest">Online & Ready</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    m.role === 'user' 
                      ? 'bg-white text-black font-medium rounded-tr-none' 
                      : 'bg-white/10 text-white border border-white/5 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  Processing Query
                </div>
              )}
            </div>

            <div className="p-5 border-t border-white/10 bg-white/5 flex gap-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya harga atau stok..."
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="p-3 bg-white text-black rounded-xl hover:bg-white/80 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className="absolute inset-0 bg-white blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
        <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl relative z-10">
          <MessageSquare size={28} />
        </div>
        {!isOpen && (
          <div className="absolute -top-2 -right-2 bg-emerald-500 text-[8px] font-bold px-2 py-1 rounded-full text-white animate-bounce shadow-lg">
            AI ONLINE
          </div>
        )}
      </motion.button>
    </div>
  );
};
