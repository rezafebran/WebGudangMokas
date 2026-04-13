// --- Client Page Sections ---
import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Send, MapPin, Calendar, X, Plus } from 'lucide-react';
import { CarData, Testimonial, FAQ, BrandingData, ServiceBusiness } from '../types';
import { CarCard, CreditCalculator } from '../components/ClientComponents';

// Hero Section
export const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
      <motion.img 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2 }}
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    
    <div className="relative z-20 text-center space-y-8 max-w-5xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Since 2021 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-white/90 text-xs md:text-sm font-black uppercase tracking-[0.3em]">Trade Used Car Since 2021</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </motion.div>

        <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4">
          Karawang • Jabodetabek • Jawa Barat
        </p>
        <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-none uppercase">
          JUAL BELI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">MOBIL BEKAS</span>
        </h1>
        <p className="text-white/60 text-sm md:text-base mt-6 max-w-3xl mx-auto leading-relaxed">
          Gudang Mokas membantu pembelian, penjualan, trade-in, dan pembiayaan mobil bekas dari Karawang untuk Jabodetabek, Jawa Barat, dan seluruh Indonesia.
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col md:flex-row justify-center gap-4"
      >
        <a href="#inventory" className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all rounded-full">
          View Inventory
        </a>
        <a href="#location" className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all rounded-full">
          Our Showroom
        </a>
      </motion.div>
    </div>
  </section>
);

// Inventory Section
export const InventorySection = ({ 
  cars, 
  onCarClick,
  filterBrand,
  setFilterBrand,
  filterYear,
  setFilterYear,
  filterStock,
  setFilterStock,
  searchQuery,
  setSearchQuery
}: {
  cars: CarData[];
  onCarClick: (car: CarData) => void;
  filterBrand: string;
  setFilterBrand: (b: string) => void;
  filterYear: string;
  setFilterYear: (y: string) => void;
  filterStock: string;
  setFilterStock: (s: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) => (
  <section id="inventory" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16 space-y-3"
    >
      <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block">Curated Stock</span>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Premium Units</h2>
    </motion.div>
    
    <div className="mb-8 space-y-3">
      <input 
        type="text" 
        placeholder="Search model..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-all"
      />
      <div className="grid grid-cols-3 gap-2">
        <select 
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[9px] md:text-[10px] uppercase tracking-wider text-white/70 focus:outline-none focus:border-white/30 transition-all"
        >
          <option value="All">Brands</option>
          {Array.from(new Set(cars.map(c => c.brand))).map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select 
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[9px] md:text-[10px] uppercase tracking-wider text-white/70 focus:outline-none focus:border-white/30 transition-all"
        >
          <option value="All">Years</option>
          {Array.from(new Set(cars.map(c => c.year))).sort((a,b) => Number(b) - Number(a)).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select 
          value={filterStock}
          onChange={(e) => setFilterStock(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[9px] md:text-[10px] uppercase tracking-wider text-white/70 focus:outline-none focus:border-white/30 transition-all"
        >
          <option value="All">Status</option>
          <option value="Ready">Ready</option>
          <option value="Sold">Sold</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <div key={car.id}>
          <CarCard car={car} onClick={() => onCarClick(car)} />
        </div>
      ))}
      {cars.length === 0 && (
        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
          <p className="text-white/20 uppercase tracking-widest text-xs">No units match your filters</p>
        </div>
      )}
    </div>
  </section>
);

// Sell & Trade Section
export const SellTradeSection = ({ onSellClick, onTradeClick }: { onSellClick: () => void, onTradeClick: () => void }) => (
  <section id="sell-trade" className="py-32 px-6 bg-gradient-to-b from-black via-white/5 to-black relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
    
    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 space-y-6"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-white/80 text-xs uppercase tracking-[0.3em] font-bold">Layanan Terbaik Kami</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
          Mau <span className="text-blue-500">Jual</span> atau<br />
          <span className="text-emerald-500">Tukar Tambah</span>?
        </h2>
        <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
          Pilih layanan yang sesuai dengan kebutuhan Anda. Kami siap membantu dengan proses yang mudah dan transparan.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Jual Mobil Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 bg-black/40 backdrop-blur-sm"
        >
          {/* Header with Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" 
              alt="Jual Mobil"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Floating Badge */}
            <div className="absolute top-6 left-6">
              <div className="px-5 py-2 bg-blue-500 rounded-full shadow-lg">
                <span className="text-white text-xs font-black uppercase tracking-widest">💰 Jual Cepat</span>
              </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                Jual Mobil<br />Anda
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <p className="text-white/70 text-sm leading-relaxed">
              Dapatkan <span className="text-blue-500 font-bold">harga terbaik</span> untuk mobil Anda. Proses cepat, transparan, dan pembayaran langsung tanpa ribet.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '💵', text: 'Harga Kompetitif' },
                { icon: '⚡', text: 'Proses 24 Jam' },
                { icon: '💰', text: 'Cash Langsung' },
                { icon: '🔍', text: 'Survey Gratis' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-white/80 text-xs font-bold">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button 
              onClick={onSellClick}
              className="group/btn relative w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center justify-center gap-3 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              <span>Jual Mobil Sekarang</span>
              <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Tukar Tambah Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-500 bg-black/40 backdrop-blur-sm"
        >
          {/* Header with Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800" 
              alt="Tukar Tambah"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Floating Badge */}
            <div className="absolute top-6 left-6">
              <div className="px-5 py-2 bg-emerald-500 rounded-full shadow-lg">
                <span className="text-white text-xs font-black uppercase tracking-widest">🔄 Trade-In</span>
              </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                Tukar Tambah<br />Mobil
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <p className="text-white/70 text-sm leading-relaxed">
              Tukar mobil lama dengan <span className="text-emerald-500 font-bold">unit pilihan</span> Anda. Proses mudah dengan penilaian harga yang adil dan transparan.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '⚖️', text: 'Harga Fair' },
                { icon: '🚗', text: 'Unit Premium' },
                { icon: '📋', text: 'Admin Dibantu' },
                { icon: '🏁', text: 'Test Drive' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-white/80 text-xs font-bold">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button 
              onClick={onTradeClick}
              className="group/btn relative w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center justify-center gap-3 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)] hover:-translate-y-1"
            >
              <span>Tukar Tambah Sekarang</span>
              <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-white/40 text-xs">💬 Butuh konsultasi?</span>
          <a href="https://wa.me/6281298661260" target="_blank" rel="noopener noreferrer" className="text-emerald-500 text-xs font-bold hover:text-emerald-400 transition-colors">
            Chat via WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// Trade-In Section
export const TradeInSection = () => (
  <section id="trade-in" className="py-32 px-6 bg-gradient-to-b from-black via-white/5 to-black relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
    
    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 space-y-4"
      >
        <span className="text-yellow-500/80 text-xs uppercase tracking-[0.3em] font-bold">Cara Jual & Beli Mobil</span>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase">Tukar Tambah</h2>
        <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed">
          Proses mudah dan transparan untuk tukar tambah mobil lama Anda dengan unit pilihan kami
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            number: '1',
            title: 'Ajukan',
            description: 'Kirimkan rincian mobil Anda secara online dan jadwalkan inspeksi untuk mengetahui harga mobil Anda.',
            icon: '📝',
            color: 'from-yellow-500 to-orange-500'
          },
          {
            number: '2',
            title: 'Cek mobil secara online',
            description: 'Temukan mobil GUDANG MOKAS Certified incaran secara online.',
            icon: '🔍',
            color: 'from-orange-500 to-red-500'
          },
          {
            number: '3',
            title: 'Test Drive',
            description: 'Jadwalkan test drive gratis, siapkan dokumen dan kami akan menangani sisanya.',
            icon: '🚗',
            color: 'from-red-500 to-pink-500'
          },
          {
            number: '4',
            title: 'Ambil mobil Anda',
            description: 'Pilih untuk mengambil secara langsung di GUDANG MOKAS Showroom atau kami antar kepada Anda.',
            icon: '🎉',
            color: 'from-pink-500 to-purple-500'
          }
        ].map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500 hover:scale-105"
          >
            {/* Number Badge */}
            <div className={`absolute top-6 right-6 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
              <span className="text-white font-black text-xl">{step.number}</span>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Icon */}
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Hover Effect Line */}
              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-500`} />
            </div>

            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <a 
          href="https://wa.me/6281298661260?text=Halo Gudang Mokas, saya tertarik untuk tukar tambah mobil saya. Bisa minta info lebih lanjut?"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:shadow-[0_20px_60px_rgba(234,179,8,0.5)]"
        >
          <span>Tertarik untuk Tukar Tambah</span>
          <ChevronRight size={16} />
        </a>
      </motion.div>
    </div>
  </section>
);

// Ecosystem Section
export const EcosystemSection = ({ onServiceClick }: { onServiceClick: (service: ServiceBusiness) => void }) => {
  const services: ServiceBusiness[] = [
    {
      name: 'Urusmen',
      description: 'Layanan profesional untuk urus surat-surat kendaraan, perpanjangan STNK, balik nama, mutasi, dan segala kebutuhan administrasi kendaraan Anda. Cepat, mudah, dan terpercaya!',
      logo: '/uploads/urusmen.png',
      whatsapp: '6281298661260',
      color: 'from-gray-600 to-gray-800'
    },
    {
      name: 'Washi Washi',
      description: 'Cuci mobil premium yang datang ke rumah Anda! Layanan car wash profesional dengan produk berkualitas tinggi. Mobil bersih tanpa perlu keluar rumah. Booking sekarang!',
      logo: '/uploads/washi washi.png',
      whatsapp: '6281298661260',
      color: 'from-blue-500 to-cyan-400'
    }
  ];

  return (
    <section id="ecosystem" className="py-32 px-6 bg-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <span className="text-white/30 text-xs uppercase tracking-[0.3em]">Beyond Cars</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase">Our Ecosystem</h2>
          <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed">
            Lebih dari sekadar showroom mobil. Kami menyediakan ekosistem lengkap untuk semua kebutuhan otomotif Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * (idx + 1) }}
              onClick={() => onServiceClick(service)}
              className={`group relative bg-gradient-to-br ${service.color} rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-white/30`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-all duration-700" />
              
              <div className="relative z-10 p-12 space-y-8">
                <div className="flex items-start justify-between">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-4 border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                    <img src={service.logo} alt={service.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/30">
                    <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">Active</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-white">{service.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {service.description.substring(0, 150)}...
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-white/10">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Click untuk info lengkap</span>
                  <ChevronRight className="text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all" size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
export const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [selectedYear, setSelectedYear] = React.useState<number>(2026);
  const scrollRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const years = [2021, 2022, 2023, 2024, 2025, 2026];
  
  // Group testimonials by year
  const testimonialsByYear = React.useMemo(() => {
    const grouped: { [key: number]: Testimonial[] } = {};
    years.forEach(year => {
      grouped[year] = testimonials.filter(t => t.year === year);
    });
    return grouped;
  }, [testimonials]);

  const scroll = (year: number, direction: 'left' | 'right') => {
    const ref = scrollRefs.current[year];
    if (ref) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 370;
      const scrollTo = direction === 'left' 
        ? ref.scrollLeft - scrollAmount 
        : ref.scrollLeft + scrollAmount;
      ref.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20 space-y-3 md:space-y-4"
        >
          <span className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.3em]">Happy Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Our Buyers</h2>
          <p className="text-white/40 text-xs md:text-sm max-w-2xl mx-auto">
            Testimoni pelanggan yang puas dengan layanan kami dari tahun ke tahun
          </p>
        </motion.div>

        {/* Year Tabs - Mobile Optimized */}
        <div className="mb-8 md:mb-12">
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {years.map((year) => {
              const count = testimonialsByYear[year]?.length || 0;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl transition-all duration-300 ${
                    selectedYear === year
                      ? 'bg-white text-black font-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm font-black uppercase tracking-wider">{year}</span>
                    {count > 0 && (
                      <span className={`text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full font-bold ${
                        selectedYear === year ? 'bg-black/20 text-black' : 'bg-white/10 text-white/40'
                      }`}>
                        {count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonials by Year */}
        <div className="space-y-12 md:space-y-16">
          {years.map((year) => {
            const yearTestimonials = testimonialsByYear[year] || [];
            if (selectedYear !== year) return null;

            return (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 md:space-y-8"
              >
                {/* Year Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-1 h-8 md:h-12 bg-gradient-to-b from-white to-white/20 rounded-full" />
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-white">{year}</h3>
                      <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest">
                        {yearTestimonials.length} {yearTestimonials.length === 1 ? 'Testimoni' : 'Testimoni'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonials Grid/Scroll */}
                {yearTestimonials.length > 0 ? (
                  <div className="relative group/scroll">
                    <div
                      ref={(el) => { scrollRefs.current[year] = el; }}
                      className="flex gap-4 md:gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
                    >
                      {yearTestimonials.map((t, idx) => (
                        <motion.div
                          key={t.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          viewport={{ once: true }}
                          className="relative flex-shrink-0 w-[280px] md:w-[350px] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden group/item snap-center bg-black/20 border border-white/10 hover:border-white/30 transition-all"
                        >
                          {/* Image */}
                          <div className="absolute inset-0">
                            <img
                              src={t.image_url}
                              alt={t.buyer_name}
                              className="w-full h-full object-cover object-center group-hover/item:scale-110 transition-transform duration-700"
                            />
                          </div>

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover/item:opacity-95 transition-opacity duration-500" />

                          {/* Content */}
                          <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
                            <div className="space-y-2 md:space-y-3 transform translate-y-2 group-hover/item:translate-y-0 transition-transform duration-500">
                              {/* Year Badge */}
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 w-fit">
                                <Calendar size={12} className="text-white/60" />
                                <span className="text-white/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{t.year}</span>
                              </div>

                              {/* Name */}
                              <p className="text-white font-black text-xl md:text-2xl tracking-tight leading-none">{t.buyer_name}</p>

                              {/* Car Name */}
                              <div className="flex items-center gap-2">
                                <div className="h-[1px] w-3 md:w-4 bg-white/30" />
                                <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-widest font-bold">{t.car_name}</p>
                              </div>

                              {/* Comment */}
                              <p className="text-white/80 text-xs md:text-sm italic line-clamp-3 leading-relaxed opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                                "{t.comment}"
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Navigation Arrows - Desktop */}
                    {yearTestimonials.length > 2 && (
                      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-4 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity">
                        <button
                          onClick={() => scroll(year, 'left')}
                          className="p-3 md:p-4 bg-black/80 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white hover:text-black transition-all shadow-lg"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => scroll(year, 'right')}
                          className="p-3 md:p-4 bg-black/80 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white hover:text-black transition-all shadow-lg"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full text-center py-16 md:py-20 border border-dashed border-white/10 rounded-2xl md:rounded-3xl bg-white/5">
                    <div className="space-y-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl md:text-3xl">📸</span>
                      </div>
                      <p className="text-white/30 text-xs md:text-sm uppercase tracking-widest">Belum ada testimoni untuk tahun {year}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
export const FaqSection = ({ faqs }: { faqs: FAQ[] }) => (
  <section id="faq" className="py-32 px-6 max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-20 space-y-4"
    >
      <span className="text-white/30 text-xs uppercase tracking-[0.3em]">Need Help?</span>
      <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase">Frequently Asked Questions</h2>
      <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed">
        Temukan jawaban untuk pertanyaan umum seputar pembelian mobil bekas di Gudang Mokas
      </p>
    </motion.div>

    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.length > 0 ? faqs.map((faq, idx) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group"
        >
          <details className="cursor-pointer">
            <summary className="p-6 md:p-8 flex justify-between items-center list-none">
              <h3 className="font-bold text-base md:text-lg tracking-tight pr-4">{faq.question}</h3>
              <ChevronRight className="text-white/40 group-hover:text-white transition-all group-open:rotate-90" size={20} />
            </summary>
            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
              <div className="pt-4 border-t border-white/5">
                <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">{faq.answer}</p>
              </div>
            </div>
          </details>
        </motion.div>
      )) : (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
          <p className="text-white/30 text-xs uppercase tracking-widest">No FAQs available yet</p>
        </div>
      )}
    </div>
  </section>
);

// Location Section
export const LocationSection = () => (
  <section id="location" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <span className="text-white/30 text-xs uppercase tracking-[0.3em]">Visit Us</span>
          <h2 className="text-5xl font-bold tracking-tighter uppercase">Showroom Location</h2>
        </div>
        <p className="text-white/60 leading-relaxed">
          Kunjungi showroom kami untuk melihat unit secara langsung dan melakukan test drive. 
          Kami berlokasi di pusat otomotif yang strategis dengan fasilitas premium.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <MapPin className="text-white mt-1" size={20} />
            <div>
              <p className="text-white font-bold uppercase text-xs tracking-widest">Address</p>
              <p className="text-white/50 text-sm">Jl. Parahiyangan, Adiarsa Bar., Kec. Karawang Bar., Karawang, Jawa Barat 41313</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Calendar className="text-white mt-1" size={20} />
            <div>
              <p className="text-white font-bold uppercase text-xs tracking-widest">Opening Hours</p>
              <p className="text-white/50 text-sm">Closed • Opens 8:00 AM</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="h-[400px] bg-white/5 rounded-3xl overflow-hidden border border-white/10 relative"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2087!2d107.2969!3d-6.3544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6977f0c2e4c5b9%3A0x5e5e5e5e5e5e5e5e!2sJl.%20Parahiyangan%2C%20Adiarsa%20Bar.%2C%20Kec.%20Karawang%20Bar.%2C%20Karawang%2C%20Jawa%20Barat%2041313!5e0!3m2!1sid!2sid!4v1647245678901!5m2!1sid!2sid" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
          allowFullScreen 
          loading="lazy"
        />
      </motion.div>
    </div>
  </section>
);

// Footer Section
export const FooterSection = ({ brandings }: { brandings: BrandingData[] }) => (
  <footer className="py-32 border-t border-white/10 px-6 bg-black relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-1 md:col-span-2 space-y-8">
        <div className="flex items-center gap-4">
          <img 
            src={brandings.find(b => b.type === 'header')?.logo_url || '/uploads/1773441577643-Screenshot_2026-03-12_at_06.40.53-removebg-preview.png'} 
            alt="Gudang Mokas Logo" 
            className="w-20 h-20 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tighter text-2xl leading-none">GUDANG_MOKAS</span>
            <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Traders Used Car Since 2021</span>
          </div>
        </div>
        <p className="text-white/40 text-sm leading-relaxed max-w-md">
          Showroom mobil bekas premium terbaik di Karawang. Kami mengkurasi setiap unit dengan standar kualitas tertinggi untuk kepuasan berkendara Anda.
        </p>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/gudang_mokas/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all">
            <span className="text-[10px] font-bold">I</span>
          </a>
          <a href="https://wa.me/6281298661260" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all">
            <span className="text-[10px] font-bold">W</span>
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Quick Links</h4>
        <ul className="space-y-4">
          {['Inventory', 'Testimonials', 'Location', 'About Us'].map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors">{l}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Newsletter</h4>
        <p className="text-white/40 text-xs leading-relaxed">Dapatkan update stok terbaru langsung di email Anda.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-white/30" />
          <button className="p-2 bg-white text-black rounded-lg hover:bg-white/80 transition-all">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-white/20 text-[10px] uppercase tracking-widest">
        © 2026 GUDANG_MOKAS. ALL RIGHTS RESERVED.
      </p>
      <div className="flex gap-8">
        <a href="#" className="text-white/20 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</a>
        <a href="#" className="text-white/20 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// Car Detail Modal
export const CarDetailModal = ({ 
  car, 
  onClose,
  activeImageIndex,
  setActiveImageIndex,
  onFullscreenClick
}: { 
  car: CarData; 
  onClose: () => void;
  activeImageIndex: number;
  setActiveImageIndex: (i: number) => void;
  onFullscreenClick: () => void;
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto"
  >
    <div className="max-w-6xl mx-auto px-6 py-20 relative">
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[110] p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"
      >
        <X size={24} />
      </button>

      <div className="space-y-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div 
            onClick={onFullscreenClick}
            className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group/slider cursor-zoom-in bg-black"
          >
            <motion.img 
              key={activeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={car.images[activeImageIndex]} 
              className="w-full h-full object-contain" 
            />
            
            {car.images.length > 1 && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(activeImageIndex === 0 ? car.images.length - 1 : activeImageIndex - 1);
                  }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/70 backdrop-blur-md rounded-full text-white md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity hover:bg-white hover:text-black z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(activeImageIndex === car.images.length - 1 ? 0 : activeImageIndex + 1);
                  }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/70 backdrop-blur-md rounded-full text-white md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity hover:bg-white hover:text-black z-10"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          
          <div className="flex justify-center">
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide px-4 md:px-0 w-full md:w-auto">
              {car.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative flex-shrink-0 w-20 h-16 md:w-24 md:h-20 rounded-xl overflow-hidden border-2 transition-all bg-black ${
                    activeImageIndex === i ? 'border-white scale-105 shadow-lg' : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/40'
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain" />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm rounded text-[8px] text-white/80 font-bold">
                    {i + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.6em] block">{car.brand}</span>
                <h2 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8] break-words bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                  {car.name}
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-white/20 text-xs font-black uppercase tracking-[0.3em] block">IDR</span>
                <p className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-none break-all">
                  {car.price.toLocaleString('id-ID')}
                </p>
              </div>
              {car.cash_price && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="w-8 h-[1px] bg-white/10" />
                  <div className="flex flex-col gap-1">
                    <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-black">Cash Price</span>
                    <span className="text-emerald-500/80 text-sm font-bold tracking-tight">Rp {car.cash_price.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/80 backdrop-blur-md">
                {car.year} Model
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/80 backdrop-blur-md">
                {car.km.toLocaleString()} KM
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/80 backdrop-blur-md">
                {car.transmission}
              </div>
            </div>
          </div>

          {car.description && (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Description</h4>
              <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{car.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Technical Specifications</h4>
                <div className="grid gap-4">
                  {[
                    { label: 'Transmission', value: car.transmission },
                    { label: 'Fuel Type', value: car.fuel },
                    { label: 'Stock Status', value: `${car.stock} Units Available` },
                    { label: 'Condition', value: 'Certified Pre-owned' }
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{spec.label}</span>
                      <span className="text-xs font-black text-white tracking-tight">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <CreditCalculator car={car} />
          </div>

          <div className="pt-8">
            <a 
              href={`https://wa.me/6281298661260?text=Halo Gudang Mokas, saya tertarik dengan unit ${car.brand} ${car.name} ${car.year}. Bisa minta info lebih lanjut?`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full py-4 md:py-5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] overflow-hidden rounded-2xl flex items-center justify-center gap-3 md:gap-4 transition-all duration-500 shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:shadow-[0_20px_60px_rgba(37,211,102,0.5)] hover:-translate-y-1"
            >
              <span className="hidden sm:inline">Inquire via WhatsApp</span>
              <span className="sm:hidden">Chat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);
