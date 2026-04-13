// --- Admin-Side Components ---
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3,
  Gauge,
  MessageSquare,
  X,
  Image
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { CarData, Testimonial, FAQ, SaleData, BrandingData } from '../types';

interface AdminDashboardProps {
  activeTab: 'inventory' | 'testimonials' | 'faq' | 'sales' | 'branding' | 'settings';
  setActiveTab: (tab: any) => void;
  onClose: () => void;
  onLogout: () => void;
  cars: CarData[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  salesData: SaleData[];
  brandings: BrandingData[];
  onEditCar: (car: Partial<CarData>) => void;
  onDeleteCar: (id: number) => void;
  onEditFaq: (faq: Partial<FAQ>) => void;
  onDeleteFaq: (id: number) => void;
  onEditTestimonial: (t: Partial<Testimonial>) => void;
  onDeleteTestimonial: (id: number) => void;
  onEditBranding: (b: Partial<BrandingData>) => void;
  onDeleteBranding: (id: number) => void;
  adminSettings: { newUsername: string; newPassword: string };
  setAdminSettings: (s: any) => void;
  onUpdateSettings: () => void;
  loginData: { user: string; pass: string };
}

export const AdminDashboard = ({
  activeTab,
  setActiveTab,
  onClose,
  onLogout,
  cars,
  testimonials,
  faqs,
  salesData,
  brandings,
  onEditCar,
  onDeleteCar,
  onEditFaq,
  onDeleteFaq,
  onEditTestimonial,
  onDeleteTestimonial,
  onEditBranding,
  onDeleteBranding,
  adminSettings,
  setAdminSettings,
  onUpdateSettings,
  loginData
}: AdminDashboardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black overflow-hidden flex flex-col md:flex-row"
    >
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
            <span className="text-black font-black text-sm">GM</span>
          </div>
          <span className="text-white font-bold tracking-tighter text-sm uppercase">Admin_OS</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex-col">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
              <span className="text-black font-black text-sm">GM</span>
            </div>
            <span className="text-white font-bold tracking-tighter text-sm uppercase">Admin_OS</span>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-2">
          {[
            { id: 'inventory', label: 'Inventory', icon: Car },
            { id: 'sales', label: 'Analytics', icon: Gauge },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
            { id: 'faq', label: 'AI FAQ', icon: MessageSquare },
            { id: 'branding', label: 'Branding', icon: Image },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                activeTab === item.id 
                  ? 'bg-white text-black font-bold' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
          >
            <LogOut size={18} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Terminate Session</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden flex overflow-x-auto gap-2 p-3 bg-black/50 border-b border-white/10 no-scrollbar">
        {[
          { id: 'inventory', label: 'Inventory', icon: Car },
          { id: 'sales', label: 'Analytics', icon: Gauge },
          { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
          { id: 'faq', label: 'FAQ', icon: MessageSquare },
          { id: 'branding', label: 'Branding', icon: Image },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === item.id 
                ? 'bg-white text-black font-bold' 
                : 'bg-white/5 text-white/60'
            }`}
          >
            <item.icon size={14} />
            <span className="text-[9px] uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-black/20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="flex justify-between items-center mb-8 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">{activeTab}</h2>
              <p className="text-white/40 text-[9px] md:text-xs uppercase tracking-widest hidden md:block">System Management Interface</p>
            </div>
            <button 
              onClick={onClose}
              className="hidden md:block p-4 border border-white/10 rounded-full hover:bg-white/5 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 md:space-y-8">
              <div className="flex justify-end">
                <button 
                  onClick={() => onEditCar({ 
                    images: [], 
                    min_dp_percent: 20, 
                    max_dp_percent: 90,
                    interest_rate: 0.05, 
                    stock: 1,
                    transmission: 'AT',
                    fuel: 'Bensin',
                    km: 0,
                    year: new Date().getFullYear()
                  })}
                  className="flex items-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  <Plus size={14} /> Add New Unit
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {cars.map(car => (
                  <div key={car.id} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-3xl group hover:border-white/30 transition-all">
                    <div className="md:hidden space-y-4">
                      <div className="flex gap-4">
                        <img src={car.images[0]} className="w-24 h-16 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="flex-1">
                          <h4 className="font-bold text-base tracking-tight">{car.name}</h4>
                          <p className="text-white/40 text-[9px] uppercase tracking-wider">{car.brand} • {car.year}</p>
                          <p className="text-white font-bold text-sm mt-1">Rp {(car.price / 1000000).toFixed(0)}M</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => onEditCar(car)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white">
                          <Edit3 size={14} />
                          <span className="text-[9px] uppercase tracking-wider font-bold">Edit</span>
                        </button>
                        <button onClick={() => onDeleteCar(car.id)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-500/20 rounded-xl transition-all text-white/60 hover:text-red-500">
                          <Trash2 size={14} />
                          <span className="text-[9px] uppercase tracking-wider font-bold">Delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <img src={car.images[0]} className="w-32 h-20 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div>
                          <h4 className="font-bold text-xl tracking-tight">{car.name}</h4>
                          <p className="text-white/40 text-[10px] uppercase tracking-widest">{car.brand} • {car.year} • {car.transmission}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">Rp {car.price.toLocaleString('id-ID')}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest">Stock: {car.stock}</p>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => onEditCar(car)} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white/60 hover:text-white"><Edit3 size={18} /></button>
                          <button onClick={() => onDeleteCar(car.id)} className="p-4 bg-white/5 hover:bg-red-500/20 rounded-2xl transition-all text-white/60 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sales Analytics Tab */}
          {activeTab === 'sales' && (
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-8">
                {[
                  { label: 'Total Revenue', value: 'Rp 24.5B', trend: '+12%' },
                  { label: 'Units Sold', value: '18', trend: '+3' },
                  { label: 'Active Leads', value: '142', trend: '+24' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-2">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">{stat.label}</p>
                    <div className="flex justify-between items-end">
                      <p className="text-3xl font-bold tracking-tighter">{stat.value}</p>
                      <span className="text-emerald-500 text-[10px] font-bold">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 p-10 rounded-3xl h-[400px]">
                <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-8">Revenue Performance</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="month" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000000000}B`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff20', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase' }}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#ffffff" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div className="flex justify-end">
                <button 
                  onClick={() => onEditFaq({ question: '', answer: '' })}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-widest"
                >
                  <Plus size={16} /> New FAQ
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {faqs.map(faq => (
                  <div key={faq.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg">{faq.question}</h4>
                      <button onClick={() => onDeleteFaq(faq.id)} className="text-red-500 hover:opacity-50"><Trash2 size={18} /></button>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="flex justify-end">
                <button 
                  onClick={() => onEditTestimonial({ buyer_name: '', car_name: '', image_url: '', comment: '', year: new Date().getFullYear() })}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  <Plus size={16} /> New Testimonial
                </button>
              </div>

              {/* Testimonials by Year */}
              {[2026, 2025, 2024, 2023, 2022, 2021].map(year => {
                const yearTestimonials = testimonials.filter(t => t.year === year);
                
                return (
                  <div key={year} className="space-y-4">
                    {/* Year Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-10 bg-gradient-to-b from-emerald-500 to-emerald-500/20 rounded-full" />
                        <div>
                          <h3 className="text-2xl font-black tracking-tighter uppercase text-white">{year}</h3>
                          <p className="text-white/40 text-[10px] uppercase tracking-widest">
                            {yearTestimonials.length} {yearTestimonials.length === 1 ? 'Testimonial' : 'Testimonials'}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => onEditTestimonial({ buyer_name: '', car_name: '', image_url: '', comment: '', year: year })}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white text-[9px] uppercase tracking-widest font-bold"
                      >
                        <Plus size={14} /> Add for {year}
                      </button>
                    </div>

                    {/* Testimonials Grid */}
                    {yearTestimonials.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {yearTestimonials.map(t => (
                          <div key={t.id} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl flex gap-3 md:gap-4 hover:border-white/20 transition-all group">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-white/10 bg-black/20 flex-shrink-0">
                              <img 
                                src={t.image_url} 
                                alt={t.buyer_name}
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" 
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex-1">
                                  <h4 className="font-bold text-sm">{t.buyer_name}</h4>
                                  <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">{t.car_name}</p>
                                </div>
                                <div className="flex gap-1">
                                  <button onClick={() => onEditTestimonial(t)} className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-white/60 hover:text-white"><Edit3 size={14} /></button>
                                  <button onClick={() => onDeleteTestimonial(t.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition-all text-white/60 hover:text-red-500"><Trash2 size={14} /></button>
                                </div>
                              </div>
                              <p className="text-[10px] text-white/60 italic line-clamp-2 leading-relaxed">"{t.comment}"</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
                        <div className="space-y-2">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-xl">📸</span>
                          </div>
                          <p className="text-white/30 text-xs uppercase tracking-widest">No testimonials for {year}</p>
                          <button 
                            onClick={() => onEditTestimonial({ buyer_name: '', car_name: '', image_url: '', comment: '', year: year })}
                            className="text-emerald-500 text-[10px] uppercase tracking-widest font-bold hover:text-emerald-400 transition-colors"
                          >
                            + Add First Testimonial
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div className="space-y-8">
              <div className="flex justify-end">
                <button 
                  onClick={() => onEditBranding({ type: 'brand', name: '', logo_url: '', display_order: 0 })}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-widest"
                >
                  <Plus size={16} /> Add New Logo
                </button>
              </div>
              
              <div className="space-y-8">
                {/* Header Logo */}
                <div className="space-y-4">
                  <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Header & Footer Logo</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {brandings.filter(b => b.type === 'header').map(logo => (
                      <div key={logo.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between group hover:border-white/30 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center p-2">
                            <img src={logo.logo_url} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{logo.name}</h4>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest">Main Logo</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => onEditBranding(logo)} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white/60 hover:text-white"><Edit3 size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand Logos */}
                <div className="space-y-4">
                  <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Car Brand Logos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {brandings.filter(b => b.type === 'brand').map(logo => (
                      <div key={logo.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 group hover:border-white/30 transition-all">
                        <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center p-4">
                          <img src={logo.logo_url} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-sm">{logo.name}</h4>
                            <p className="text-white/40 text-[9px] uppercase tracking-widest">Order: {logo.display_order}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => onEditBranding(logo)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white"><Edit3 size={14} /></button>
                            <button onClick={() => onDeleteBranding(logo.id)} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-xl transition-all text-white/60 hover:text-red-500"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financing Partners */}
                <div className="space-y-4">
                  <h4 className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Financing Partner Logos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {brandings.filter(b => b.type === 'financing').map(logo => (
                      <div key={logo.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 group hover:border-white/30 transition-all">
                        <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center p-4">
                          <img src={logo.logo_url} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-xs text-center">{logo.name}</h4>
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => onEditBranding(logo)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white"><Edit3 size={12} /></button>
                            <button onClick={() => onDeleteBranding(logo.id)} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-xl transition-all text-white/60 hover:text-red-500"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-8">
              {/* Current Credentials Info */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <span className="text-emerald-500 text-xl">🔐</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm">Current Admin Account</h4>
                    <p className="text-white/40 text-[9px] uppercase tracking-widest">Active Session</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-[9px] text-white/30 uppercase tracking-widest">Username</p>
                    <p className="text-white font-bold text-sm">{loginData.user}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-white/30 uppercase tracking-widest">Password</p>
                    <p className="text-white/60 text-sm">••••••••</p>
                  </div>
                </div>
              </div>

              {/* Change Credentials Form */}
              <div className="bg-black border border-white/10 rounded-3xl p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">Update Admin Credentials</h4>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Ganti username dan password untuk keamanan akun admin Anda. Pastikan menggunakan password yang kuat.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-white/40 tracking-widest flex items-center gap-2">
                      <span>New Username</span>
                      <span className="text-white/20">(Optional)</span>
                    </label>
                    <input 
                      value={adminSettings.newUsername}
                      onChange={e => setAdminSettings({...adminSettings, newUsername: e.target.value})}
                      placeholder={`Current: ${loginData.user}`}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-all"
                    />
                    <p className="text-[9px] text-white/20 uppercase tracking-widest">Kosongkan jika tidak ingin mengubah username</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-white/40 tracking-widest flex items-center gap-2">
                      <span>New Password</span>
                      <span className="text-emerald-500">(Required)</span>
                    </label>
                    <input 
                      type="password"
                      value={adminSettings.newPassword}
                      onChange={e => setAdminSettings({...adminSettings, newPassword: e.target.value})}
                      placeholder="Masukkan password baru"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-all"
                    />
                    <p className="text-[9px] text-white/20 uppercase tracking-widest">Minimal 6 karakter, gunakan kombinasi huruf dan angka</p>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={onUpdateSettings}
                      disabled={!adminSettings.newPassword}
                      className="w-full py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:from-emerald-500 hover:to-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)]"
                    >
                      {adminSettings.newPassword ? '🔒 Update Security Credentials' : '⚠️ Password Required'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Tips */}
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-3xl p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-lg">⚠️</span>
                  <h5 className="text-yellow-500 font-bold uppercase tracking-widest text-[10px]">Security Tips</h5>
                </div>
                <ul className="space-y-2 text-white/60 text-xs leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>Gunakan password yang kuat dengan kombinasi huruf besar, kecil, angka, dan simbol</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>Jangan gunakan password yang sama dengan akun lain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>Simpan kredensial di tempat yang aman (password manager)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>Ganti password secara berkala untuk keamanan maksimal</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
