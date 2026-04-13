// --- Admin Modal Components ---
import React from 'react';
import { motion } from 'motion/react';
import { X, Plus, Trash2 } from 'lucide-react';
import { CarData, FAQ, Testimonial, BrandingData } from '../types';

// Car Edit Modal
export const CarEditModal = ({ 
  car, 
  onSave, 
  onClose, 
  onChange,
  onFileUpload,
  uploading 
}: { 
  car: Partial<CarData>; 
  onSave: () => void; 
  onClose: () => void;
  onChange: (updates: Partial<CarData>) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => void;
  uploading: boolean;
}) => (
  <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
    <div className="bg-black border border-white/20 p-10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold uppercase tracking-tighter">{car.id ? 'Modify Unit' : 'Initialize New Unit'}</h3>
        <button onClick={onClose}><X size={24} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-white/40 tracking-widest">Model Name</label>
            <input value={car.name || ''} onChange={e => onChange({...car, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Brand</label>
              <input value={car.brand || ''} onChange={e => onChange({...car, brand: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Year</label>
              <input type="number" value={car.year || ''} onChange={e => onChange({...car, year: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Credit Price</label>
              <input type="number" value={car.price || ''} onChange={e => onChange({...car, price: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Cash Price</label>
              <input type="number" value={car.cash_price || ''} onChange={e => onChange({...car, cash_price: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Min DP (%)</label>
              <input type="number" value={car.min_dp_percent || ''} onChange={e => onChange({...car, min_dp_percent: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Max DP (%)</label>
              <input type="number" value={car.max_dp_percent || ''} onChange={e => onChange({...car, max_dp_percent: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Kilometers</label>
              <input type="number" value={car.km || ''} onChange={e => onChange({...car, km: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Transmission</label>
              <select value={car.transmission || 'AT'} onChange={e => onChange({...car, transmission: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm">
                <option value="AT">Automatic</option>
                <option value="MT">Manual</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Fuel Type</label>
              <select value={car.fuel || 'Bensin'} onChange={e => onChange({...car, fuel: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm">
                <option value="Bensin">Bensin</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Stock Status</label>
              <input type="number" value={car.stock ?? 1} onChange={e => onChange({...car, stock: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-white/40 tracking-widest">Interest Rate (%)</label>
            <input type="number" step="0.1" value={(car.interest_rate || 0.05) * 100} onChange={e => onChange({...car, interest_rate: parseFloat(e.target.value) / 100})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-white/40 tracking-widest">Description (Optional)</label>
            <textarea 
              value={car.description || ''} 
              onChange={e => onChange({...car, description: e.target.value})} 
              placeholder="Deskripsi lengkap mobil, fitur, kondisi, dll..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm h-32 resize-none"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase text-white/40 tracking-widest">Upload Images</label>
              <label className="cursor-pointer px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl transition-all">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  multiple
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;
                    
                    const fileArray = Array.from(files) as File[];
                    for (const file of fileArray) {
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        try {
                          const res = await fetch('/api/upload', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ image: reader.result, fileName: file.name })
                          });
                          const data = await res.json();
                          if (data.url) {
                            onChange({...car, images: [...(car.images || []), data.url]});
                          }
                        } catch (err) {
                          console.error('Upload failed:', err);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold flex items-center gap-2">
                  <Plus size={12} /> Bulk Upload
                </span>
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {car.images?.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                  <img src={img} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => onChange({...car, images: car.images?.filter((_, idx) => idx !== i)})}
                    className="absolute top-1 right-1 p-1.5 bg-red-500/90 hover:bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                  >
                    <X size={12} />
                  </button>
                  <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[8px] text-white/60 font-bold">
                    {i + 1}
                  </div>
                </div>
              ))}
              <label className="aspect-video rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all group">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => onFileUpload(e, (url) => onChange({...car, images: [...(car.images || []), url]}))}
                />
                {uploading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
                ) : (
                  <>
                    <Plus size={20} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="text-[8px] text-white/30 uppercase tracking-widest mt-1">Add</span>
                  </>
                )}
              </label>
            </div>
            <p className="text-[9px] text-white/30 uppercase tracking-widest">💡 Tip: Gunakan Bulk Upload untuk upload banyak gambar sekaligus</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={onSave} className="flex-1 py-6 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-2xl">Deploy Changes</button>
        <button onClick={onClose} className="flex-1 py-6 border border-white/10 text-white/40 font-bold uppercase tracking-widest text-xs rounded-2xl">Abort</button>
      </div>
    </div>
  </div>
);

// FAQ Edit Modal
export const FaqEditModal = ({ 
  faq, 
  onSave, 
  onClose,
  onChange 
}: { 
  faq: Partial<FAQ>; 
  onSave: () => void; 
  onClose: () => void;
  onChange: (updates: Partial<FAQ>) => void;
}) => (
  <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
    <div className="bg-black border border-white/20 p-10 rounded-3xl w-full max-w-lg space-y-6">
      <h3 className="text-2xl font-bold uppercase tracking-tighter">AI Knowledge Base</h3>
      <div className="space-y-4">
        <input placeholder="Question" value={faq.question || ''} onChange={e => onChange({...faq, question: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
        <textarea placeholder="Answer" value={faq.answer || ''} onChange={e => onChange({...faq, answer: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm h-32" />
      </div>
      <div className="flex gap-4">
        <button onClick={onSave} className="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-xl">Save</button>
        <button onClick={onClose} className="flex-1 py-4 border border-white/10 text-white/40 font-bold uppercase tracking-widest text-[10px] rounded-xl">Cancel</button>
      </div>
    </div>
  </div>
);

// Testimonial Edit Modal
export const TestimonialEditModal = ({ 
  testimonial, 
  onSave, 
  onClose,
  onChange,
  onFileUpload,
  uploading 
}: { 
  testimonial: Partial<Testimonial>; 
  onSave: () => void; 
  onClose: () => void;
  onChange: (updates: Partial<Testimonial>) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => void;
  uploading: boolean;
}) => (
  <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
    <div className="bg-black border border-white/20 p-10 rounded-3xl w-full max-w-lg space-y-6">
      <h3 className="text-2xl font-bold uppercase tracking-tighter">{testimonial.id ? 'Edit' : 'New'} Testimonial</h3>
      <div className="space-y-4">
        <input placeholder="Buyer Name" value={testimonial.buyer_name || ''} onChange={e => onChange({...testimonial, buyer_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
        <input placeholder="Car Model" value={testimonial.car_name || ''} onChange={e => onChange({...testimonial, car_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" />
        <div className="space-y-2">
          <label className="text-[10px] uppercase text-white/40 tracking-widest">Year</label>
          <select
            value={testimonial.year || new Date().getFullYear()}
            onChange={e => onChange({...testimonial, year: parseInt(e.target.value)})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm"
          >
            {[2021, 2022, 2023, 2024, 2025, 2026].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase text-white/40 tracking-widest">Buyer Photo</label>
          <div className="flex items-center gap-4">
            {testimonial.image_url && (
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-black/20">
                <img 
                  src={testimonial.image_url} 
                  alt="Preview"
                  className="w-full h-full object-cover object-center" 
                />
              </div>
            )}
            <label className="flex-1 py-4 border border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => onFileUpload(e, (url) => onChange({...testimonial, image_url: url}))}
              />
              <span className="text-[10px] uppercase tracking-widest text-white/40">
                {uploading ? 'Uploading...' : 'Choose Local File'}
              </span>
            </label>
          </div>
        </div>
        <textarea placeholder="Comment" value={testimonial.comment || ''} onChange={e => onChange({...testimonial, comment: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm h-32" />
      </div>
      <div className="flex gap-4">
        <button onClick={onSave} className="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-xl">Save</button>
        <button onClick={onClose} className="flex-1 py-4 border border-white/10 text-white/40 font-bold uppercase tracking-widest text-[10px] rounded-xl">Cancel</button>
      </div>
    </div>
  </div>
);

// Branding Edit Modal
export const BrandingEditModal = ({ 
  branding, 
  onSave, 
  onClose,
  onChange,
  onFileUpload,
  uploading 
}: { 
  branding: Partial<BrandingData>; 
  onSave: () => void; 
  onClose: () => void;
  onChange: (updates: Partial<BrandingData>) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => void;
  uploading: boolean;
}) => (
  <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
    <div className="bg-black border border-white/20 p-10 rounded-3xl w-full max-w-lg space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold uppercase tracking-tighter">{branding.id ? 'Edit Logo' : 'Add New Logo'}</h3>
        <button onClick={onClose}><X size={24} /></button>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase text-white/40 tracking-widest">Logo Type</label>
          <select 
            value={branding.type || 'brand'} 
            onChange={e => onChange({...branding, type: e.target.value as 'header' | 'brand' | 'financing'})} 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm"
          >
            <option value="header">Header/Footer Logo</option>
            <option value="brand">Car Brand Logo</option>
            <option value="financing">Financing Partner</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase text-white/40 tracking-widest">Name</label>
          <input 
            placeholder="e.g., Toyota, BCA Finance" 
            value={branding.name || ''} 
            onChange={e => onChange({...branding, name: e.target.value})} 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase text-white/40 tracking-widest">Logo Image</label>
          <div className="space-y-3">
            {branding.logo_url && (
              <div className="w-full aspect-video bg-white/5 rounded-2xl flex items-center justify-center p-4 border border-white/10">
                <img src={branding.logo_url} className="max-w-full max-h-full object-contain" />
              </div>
            )}
            <div className="flex gap-2">
              <input 
                placeholder="Logo URL" 
                value={branding.logo_url || ''} 
                onChange={e => onChange({...branding, logo_url: e.target.value})} 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" 
              />
              <label className="px-6 py-4 border border-dashed border-white/20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => onFileUpload(e, (url) => onChange({...branding, logo_url: url}))}
                />
                <span className="text-[10px] uppercase tracking-widest text-white/40">
                  {uploading ? 'Uploading...' : 'Upload'}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase text-white/40 tracking-widest">Display Order</label>
          <input 
            type="number" 
            placeholder="0" 
            value={branding.display_order ?? 0} 
            onChange={e => onChange({...branding, display_order: parseInt(e.target.value)})} 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" 
          />
          <p className="text-[9px] text-white/30 uppercase tracking-widest">Lower numbers appear first</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={onSave} className="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-xl">Save Logo</button>
        <button onClick={onClose} className="flex-1 py-4 border border-white/10 text-white/40 font-bold uppercase tracking-widest text-[10px] rounded-xl">Cancel</button>
      </div>
    </div>
  </div>
);

// Confirm Delete Modal
export const ConfirmModal = ({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[210] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-black border border-white/20 p-10 rounded-3xl max-w-md w-full space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <Trash2 size={32} />
        </div>
        <h3 className="text-xl font-bold uppercase tracking-tighter">Konfirmasi Hapus</h3>
        <p className="text-white/40 text-sm leading-relaxed">{message}</p>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onCancel}
          className="flex-1 py-4 border border-white/10 text-white/60 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/5 transition-all"
        >
          Batal
        </button>
        <button 
          onClick={onConfirm}
          className="flex-1 py-4 bg-red-500 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-red-600 transition-all"
        >
          Hapus Unit
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// Login Modal
export const LoginModal = ({ 
  loginData, 
  onChange, 
  onLogin, 
  onClose 
}: { 
  loginData: { user: string; pass: string }; 
  onChange: (data: { user: string; pass: string }) => void;
  onLogin: () => void; 
  onClose: () => void;
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
  >
    <div className="bg-black border border-white/20 p-10 rounded-3xl w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-bold tracking-tighter uppercase">Admin Access</h3>
        <p className="text-white/40 text-xs uppercase tracking-widest">Enter credentials to manage showroom</p>
      </div>
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Username" 
          value={loginData.user}
          onChange={e => onChange({...loginData, user: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/40"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={loginData.pass}
          onChange={e => onChange({...loginData, pass: e.target.value})}
          onKeyDown={e => e.key === 'Enter' && onLogin()}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/40"
        />
        <button 
          onClick={onLogin}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/90 transition-all"
        >
          Login
        </button>
        <button 
          onClick={onClose}
          className="w-full py-4 text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </motion.div>
);

// Notification Toast
export const Notification = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[250] px-6 py-3 rounded-2xl border backdrop-blur-xl flex items-center gap-3 shadow-2xl ${
      type === 'success' 
        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
        : 'bg-red-500/10 border-red-500/20 text-red-400'
    }`}
  >
    <div className={`w-2 h-2 rounded-full animate-pulse ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
    <span className="text-xs font-bold uppercase tracking-widest">{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-50">
      <X size={14} />
    </button>
  </motion.div>
);
