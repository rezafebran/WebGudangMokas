// --- Sell Car Form Page ---
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Check, Upload, X } from 'lucide-react';

interface SellCarFormData {
  ownerName: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  year: string;
  carType: string;
  engineType: string;
  transmission: string;
  mileage: string;
  condition: string;
  images: File[];
  notes: string;
  agreeToTerms: boolean;
}

export const SellCarPage = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SellCarFormData>({
    ownerName: '',
    phone: '',
    email: '',
    brand: '',
    model: '',
    year: '',
    carType: '',
    engineType: '',
    transmission: '',
    mileage: '',
    condition: '',
    images: [],
    notes: '',
    agreeToTerms: false
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const brands = ['Toyota', 'Honda', 'Daihatsu', 'Suzuki', 'Mitsubishi', 'Nissan', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai', 'KIA', 'Wuling', 'DFSK', 'Chery', 'MG', 'Lainnya'];
  
  const modelsByBrand: { [key: string]: string[] } = {
    'Toyota': ['Avanza', 'Innova', 'Fortuner', 'Rush', 'Yaris', 'Vios', 'Camry', 'Alphard', 'Vellfire', 'Agya', 'Calya', 'Raize', 'Veloz', 'Lainnya'],
    'Honda': ['Brio', 'Mobilio', 'Jazz', 'City', 'Civic', 'Accord', 'HR-V', 'CR-V', 'BR-V', 'Odyssey', 'Freed', 'Lainnya'],
    'Daihatsu': ['Ayla', 'Sigra', 'Xenia', 'Terios', 'Gran Max', 'Luxio', 'Sirion', 'Rocky', 'Lainnya'],
    'Suzuki': ['Ertiga', 'XL7', 'Baleno', 'Swift', 'Ignis', 'Karimun Wagon R', 'Carry', 'APV', 'Jimny', 'Lainnya'],
    'Mitsubishi': ['Xpander', 'Pajero Sport', 'Outlander', 'Eclipse Cross', 'Triton', 'L300', 'Mirage', 'Lainnya'],
    'Nissan': ['Livina', 'Grand Livina', 'X-Trail', 'Serena', 'Juke', 'Terra', 'Navara', 'Lainnya'],
    'Lainnya': ['Lainnya']
  };

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
  const carTypes = ['Sedan', 'Hatchback', 'SUV', 'MPV', 'Pick Up', 'Van', 'Coupe', 'Convertible', 'Wagon', 'Lainnya'];
  const engineTypes = ['Bensin', 'Diesel', 'Hybrid', 'Electric', 'Lainnya'];
  const transmissions = ['Manual', 'Automatic', 'CVT', 'DCT', 'Lainnya'];
  const conditions = ['Sangat Baik', 'Baik', 'Cukup Baik', 'Perlu Perbaikan'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    
    const files = Array.from(fileList) as File[];
    if (files.length + formData.images.length > 5) {
      alert('Maksimal 5 foto');
      return;
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!formData.agreeToTerms) {
      alert('Mohon setujui kebijakan privasi dan ketentuan penggunaan');
      return;
    }

    // Create WhatsApp message
    const message = `*JUAL MOBIL - Gudang Mokas*

*Data Pemilik:*
Nama: ${formData.ownerName}
Telepon: ${formData.phone}
Email: ${formData.email}

*Data Mobil:*
Merek: ${formData.brand}
Model: ${formData.model}
Tahun: ${formData.year}
Tipe: ${formData.carType}
Jenis Mesin: ${formData.engineType}
Transmisi: ${formData.transmission}
Kilometer: ${formData.mileage} km
Kondisi: ${formData.condition}

*Catatan Tambahan:*
${formData.notes || 'Tidak ada'}

Mohon bantu survey dan berikan penawaran harga terbaik. Terima kasih!`;

    const whatsappUrl = `https://wa.me/6281298661260?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isStep1Valid = formData.ownerName && formData.phone && formData.email;
  const isStep2Valid = formData.brand && formData.model && formData.year && formData.carType && formData.engineType && formData.transmission;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto"
    >
      <div className="min-h-screen py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm uppercase tracking-widest font-bold">Kembali</span>
            </button>
            
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(s => (
                <div 
                  key={s}
                  className={`w-2 h-2 rounded-full transition-all ${
                    step >= s ? 'bg-blue-500 w-8' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-blue-500 text-xs font-black uppercase tracking-widest">💰 Jual Mobil</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Masukkan Data Mobil Anda<br />
              <span className="text-blue-500">Untuk Cek Harga Gratis!</span>
            </h1>
            <p className="text-white/50 text-sm max-w-2xl mx-auto">
              Isi formulir di bawah ini dan dapatkan penawaran harga terbaik untuk mobil Anda dalam 24 jam
            </p>
          </motion.div>

          {/* Form Container */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Step 1: Data Pemilik */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-black text-lg">1</span>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Data Pemilik</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Nama Lengkap *</label>
                      <input 
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                        placeholder="Masukkan nama lengkap Anda"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Nomor Telepon *</label>
                        <input 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="08xxxxxxxxxx"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Email *</label>
                        <input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="email@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Data Mobil */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-black text-lg">2</span>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Data Mobil</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Merek Mobil *</label>
                        <select
                          value={formData.brand}
                          onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value, model: '' }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Pilih Merek Mobil</option>
                          {brands.map(brand => (
                            <option key={brand} value={brand} className="bg-black">{brand}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Model Mobil *</label>
                        <select
                          value={formData.model}
                          onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                          disabled={!formData.brand}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="" className="bg-black">Pilih Model Mobil</option>
                          {formData.brand && modelsByBrand[formData.brand]?.map(model => (
                            <option key={model} value={model} className="bg-black">{model}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Tahun Mobil *</label>
                        <select
                          value={formData.year}
                          onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Pilih Tahun Mobil</option>
                          {years.map(year => (
                            <option key={year} value={year} className="bg-black">{year}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Tipe Mobil *</label>
                        <select
                          value={formData.carType}
                          onChange={(e) => setFormData(prev => ({ ...prev, carType: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Pilih Tipe Mobil</option>
                          {carTypes.map(type => (
                            <option key={type} value={type} className="bg-black">{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Jenis Mesin *</label>
                        <select
                          value={formData.engineType}
                          onChange={(e) => setFormData(prev => ({ ...prev, engineType: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Pilih Jenis Mesin</option>
                          {engineTypes.map(type => (
                            <option key={type} value={type} className="bg-black">{type}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Transmisi *</label>
                        <select
                          value={formData.transmission}
                          onChange={(e) => setFormData(prev => ({ ...prev, transmission: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Pilih Transmisi</option>
                          {transmissions.map(trans => (
                            <option key={trans} value={trans} className="bg-black">{trans}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Kilometer (KM) *</label>
                        <input 
                          type="number"
                          value={formData.mileage}
                          onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                          placeholder="Contoh: 50000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Kondisi Mobil *</label>
                        <select
                          value={formData.condition}
                          onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Pilih Kondisi</option>
                          {conditions.map(cond => (
                            <option key={cond} value={cond} className="bg-black">{cond}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Detail & Foto */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-black text-lg">3</span>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Detail & Foto</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Upload Foto Mobil (Maks. 5 foto)</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {imagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                            <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeImage(idx)}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        
                        {imagePreviews.length < 5 && (
                          <label className="aspect-video rounded-xl border-2 border-dashed border-white/20 hover:border-blue-500/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10">
                            <Upload size={24} className="text-white/40" />
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Upload</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              multiple 
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-[10px] text-white/40 mt-2">Upload foto dari berbagai sudut untuk penilaian yang lebih akurat</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/60 uppercase tracking-widest font-bold">Catatan Tambahan</label>
                      <textarea 
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Ceritakan kondisi mobil, riwayat servis, atau informasi penting lainnya..."
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                      />
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-1">
                          <input 
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-white/20 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all flex items-center justify-center">
                            {formData.agreeToTerms && <Check size={14} className="text-white" />}
                          </div>
                        </div>
                        <span className="text-xs text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                          Dengan melanjutkan, saya setuju dengan <span className="text-blue-500 font-bold">Kebijakan Privasi</span> & <span className="text-blue-500 font-bold">Ketentuan Penggunaan</span> Gudang Mokas
                        </span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/10 transition-all"
                  >
                    Kembali
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
                  >
                    Lanjut ke Step {step + 1}
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.agreeToTerms}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)]"
                  >
                    Kirim via WhatsApp
                  </button>
                )}
              </div>
            </div>

            {/* Progress Info */}
            <div className="px-8 md:px-12 py-6 bg-blue-500/5 border-t border-blue-500/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40 uppercase tracking-widest font-bold">Step {step} dari 3</span>
                <span className="text-blue-500 font-bold">{Math.round((step / 3) * 100)}% Selesai</span>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '💵', text: 'Harga Kompetitif' },
              { icon: '⚡', text: 'Proses 24 Jam' },
              { icon: '💰', text: 'Cash Langsung' },
              { icon: '🔍', text: 'Survey Gratis' }
            ].map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                <span className="text-3xl">{benefit.icon}</span>
                <span className="text-white/80 text-xs font-bold uppercase tracking-wider">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
