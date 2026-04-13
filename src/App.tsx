// --- Main App (Refactored & Modular) ---
import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';

// Types
import { CarData, Testimonial, FAQ, SaleData, BrandingData, ServiceBusiness } from './types';

// SEO Utilities
import { 
  defaultSEO, 
  updateMetaTags, 
  addStructuredData, 
  organizationStructuredData,
  generateFAQStructuredData,
  generateReviewStructuredData 
} from './utils/seo';

// Client Components
import { 
  Navbar, 
  BrandLogos, 
  CreditPartners, 
  ChatAgent, 
  ServicePopup 
} from './components/ClientComponents';

// Client Pages
import { 
  HeroSection, 
  InventorySection,
  SellTradeSection,
  TradeInSection,
  EcosystemSection, 
  TestimonialsSection, 
  FaqSection, 
  LocationSection, 
  FooterSection,
  CarDetailModal
} from './pages/ClientPages';

// Form Pages
import { SellCarPage } from './pages/SellCarPage';
import { TradeInPage } from './pages/TradeInPage';

// Admin Components
import { AdminDashboard } from './components/AdminComponents';

// Admin Modals
import { 
  CarEditModal, 
  FaqEditModal, 
  TestimonialEditModal, 
  BrandingEditModal, 
  ConfirmModal, 
  LoginModal, 
  Notification 
} from './components/AdminModals';

export default function App() {
  // Data State
  const [cars, setCars] = useState<CarData[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [salesData, setSalesData] = useState<SaleData[]>([]);
  const [brandings, setBrandings] = useState<BrandingData[]>([]);

  // UI State
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceBusiness | null>(null);
  const [showSellCarForm, setShowSellCarForm] = useState(false);
  const [showTradeInForm, setShowTradeInForm] = useState(false);

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ user: '', pass: '' });
  const [activeTab, setActiveTab] = useState<'inventory' | 'testimonials' | 'faq' | 'sales' | 'branding' | 'settings'>('inventory');
  const [adminSettings, setAdminSettings] = useState({ newUsername: '', newPassword: '' });

  // Edit State
  const [editingCar, setEditingCar] = useState<Partial<CarData> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingBranding, setEditingBranding] = useState<Partial<BrandingData> | null>(null);

  // Notification & Confirm
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [confirmModal, setConfirmModal] = useState<{message: string, onConfirm: () => void} | null>(null);
  const [uploading, setUploading] = useState(false);

  // Filters
  const [filterBrand, setFilterBrand] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterStock, setFilterStock] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Data
  useEffect(() => {
    fetchCars();
    fetchTestimonials();
    fetchFaqs();
    fetchSales();
    fetchBrandings();
    
    const session = localStorage.getItem('gm_admin_session');
    const savedUser = localStorage.getItem('gm_admin_user');
    if (session === 'true') {
      setIsAdmin(true);
      if (savedUser) setLoginData(prev => ({ ...prev, user: savedUser }));
    }

    // Check for admin access via URL hash
    const checkAdminAccess = () => {
      if (window.location.hash === '#gm-admin-access') {
        setShowLogin(true);
        // Clear the hash for security
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    
    // Check immediately on mount
    checkAdminAccess();
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkAdminAccess);
    
    // Also check periodically in case hash was set before listener was added
    const intervalId = setInterval(checkAdminAccess, 500);

    // Initialize SEO
    updateMetaTags(defaultSEO);
    addStructuredData(organizationStructuredData, 'organization-schema');

    return () => {
      window.removeEventListener('hashchange', checkAdminAccess);
      clearInterval(intervalId);
    };
  }, []);

  // Update SEO when data changes
  useEffect(() => {
    if (faqs.length > 0) {
      const faqSchema = generateFAQStructuredData(
        faqs.map(faq => ({ question: faq.question, answer: faq.answer }))
      );
      addStructuredData(faqSchema, 'faq-schema');
    }
  }, [faqs]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const reviewSchema = generateReviewStructuredData(
        testimonials.map(t => ({ 
          name: t.buyer_name, 
          text: t.comment,
          rating: '5'
        }))
      );
      addStructuredData(reviewSchema, 'review-schema');
    }
  }, [testimonials]);

  useEffect(() => {
    if (selectedCar) setActiveImageIndex(0);
  }, [selectedCar]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // API Calls
  const fetchCars = async () => {
    try {
      const res = await fetch('/api/cars');
      const data = await res.json();
      setCars(data);
    } catch (e) { console.error('Failed to fetch cars'); }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (e) { console.error('Failed to fetch testimonials'); }
  };

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faq');
      const data = await res.json();
      setFaqs(data);
    } catch (e) { console.error('Failed to fetch FAQs'); }
  };

  const fetchSales = async () => {
    try {
      const res = await fetch('/api/sales');
      const data = await res.json();
      setSalesData(data);
    } catch (e) { console.error('Failed to fetch sales'); }
  };

  const fetchBrandings = async () => {
    try {
      const res = await fetch('/api/branding');
      const data = await res.json();
      setBrandings(data);
    } catch (e) { console.error('Failed to fetch brandings'); }
  };

  // Admin Actions
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginData.user, password: loginData.pass })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        setShowLogin(false);
        localStorage.setItem('gm_admin_session', 'true');
        localStorage.setItem('gm_admin_user', loginData.user);
        setNotification({ message: 'Login Berhasil. Selamat datang, Admin.', type: 'success' });
      } else {
        setNotification({ message: 'Login Gagal: Username atau Password salah', type: 'error' });
      }
    } catch (e) {
      setNotification({ message: 'Terjadi kesalahan koneksi ke server', type: 'error' });
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('gm_admin_session');
    setNotification({ message: 'Berhasil Logout', type: 'success' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result, fileName: file.name })
        });
        
        if (!res.ok) throw new Error('Upload failed');
        
        const data = await res.json();
        if (data.url) {
          callback(data.url);
          setNotification({ message: 'Gambar berhasil diunggah', type: 'success' });
        } else {
          throw new Error('No URL returned');
        }
      } catch (err) {
        setNotification({ message: 'Gagal mengunggah gambar', type: 'error' });
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      setUploading(false);
      setNotification({ message: 'Gagal membaca file', type: 'error' });
    };
    reader.readAsDataURL(file);
  };

  const saveCar = async () => {
    try {
      if (!editingCar?.name || !editingCar?.brand || !editingCar?.price || !editingCar?.year) {
        setNotification({ message: 'Mohon lengkapi data utama (Nama, Brand, Harga, Tahun)', type: 'error' });
        return;
      }

      const method = editingCar?.id ? 'PUT' : 'POST';
      const url = editingCar?.id ? `/api/cars/${editingCar.id}` : '/api/cars';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCar)
      });
      
      if (res.ok) {
        setNotification({ message: 'Data mobil berhasil disimpan', type: 'success' });
        setEditingCar(null);
        fetchCars();
      } else {
        setNotification({ message: 'Gagal menyimpan data mobil', type: 'error' });
      }
    } catch (e) {
      setNotification({ message: 'Kesalahan jaringan saat menyimpan', type: 'error' });
    }
  };

  const deleteCar = async (id: number) => {
    setConfirmModal({
      message: 'Apakah Anda yakin ingin menghapus unit ini dari inventaris?',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/cars/${id}`, { method: 'DELETE' });
          if (res.ok) {
            setNotification({ message: 'Unit berhasil dihapus', type: 'success' });
            fetchCars();
          }
        } catch (e) {
          setNotification({ message: 'Gagal menghapus unit', type: 'error' });
        }
        setConfirmModal(null);
      }
    });
  };

  const saveFaq = async () => {
    try {
      const res = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq)
      });
      if (res.ok) {
        setNotification({ message: 'FAQ berhasil disimpan', type: 'success' });
        setEditingFaq(null);
        fetchFaqs();
      }
    } catch (e) { setNotification({ message: 'Gagal menyimpan FAQ', type: 'error' }); }
  };

  const deleteFaq = async (id: number) => {
    try {
      await fetch(`/api/faq/${id}`, { method: 'DELETE' });
      fetchFaqs();
    } catch (e) { console.error('Failed to delete FAQ'); }
  };

  const saveTestimonial = async () => {
    try {
      // Validation
      if (!editingTestimonial?.buyer_name || !editingTestimonial?.car_name || !editingTestimonial?.image_url) {
        setNotification({ message: 'Mohon lengkapi Nama Pembeli, Model Mobil, dan Upload Foto', type: 'error' });
        return;
      }

      if (!editingTestimonial?.year) {
        setNotification({ message: 'Mohon pilih tahun testimonial', type: 'error' });
        return;
      }

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTestimonial)
      });
      
      if (res.ok) {
        setNotification({ message: `Testimoni berhasil disimpan untuk tahun ${editingTestimonial.year}`, type: 'success' });
        setEditingTestimonial(null);
        fetchTestimonials();
      } else {
        setNotification({ message: 'Gagal menyimpan testimoni ke database', type: 'error' });
      }
    } catch (e) { 
      console.error('Error saving testimonial:', e);
      setNotification({ message: 'Gagal menyimpan testimoni', type: 'error' }); 
    }
  };

  const deleteTestimonial = async (id: number) => {
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      fetchTestimonials();
    } catch (e) { console.error('Failed to delete testimonial'); }
  };

  const saveBranding = async () => {
    try {
      if (!editingBranding?.name || !editingBranding?.logo_url || !editingBranding?.type) {
        setNotification({ message: 'Mohon lengkapi semua data logo', type: 'error' });
        return;
      }

      const method = editingBranding?.id ? 'PUT' : 'POST';
      const url = editingBranding?.id ? `/api/branding/${editingBranding.id}` : '/api/branding';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBranding)
      });
      
      if (res.ok) {
        setNotification({ message: 'Logo berhasil disimpan', type: 'success' });
        setEditingBranding(null);
        fetchBrandings();
      }
    } catch (e) {
      setNotification({ message: 'Gagal menyimpan logo', type: 'error' });
    }
  };

  const deleteBranding = async (id: number) => {
    try {
      await fetch(`/api/branding/${id}`, { method: 'DELETE' });
      setNotification({ message: 'Logo berhasil dihapus', type: 'success' });
      fetchBrandings();
    } catch (e) {
      setNotification({ message: 'Gagal menghapus logo', type: 'error' });
    }
  };

  const updateAdminSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          oldUsername: loginData.user, 
          newUsername: adminSettings.newUsername || loginData.user, 
          newPassword: adminSettings.newPassword 
        })
      });
      if (res.ok) {
        setNotification({ message: 'Pengaturan admin berhasil diperbarui', type: 'success' });
        if (adminSettings.newUsername) {
          setLoginData(prev => ({ ...prev, user: adminSettings.newUsername }));
          localStorage.setItem('gm_admin_user', adminSettings.newUsername);
        }
        setAdminSettings({ newUsername: '', newPassword: '' });
      }
    } catch (e) {
      setNotification({ message: 'Gagal memperbarui pengaturan', type: 'error' });
    }
  };

  // Filtered Cars
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesBrand = filterBrand === 'All' || car.brand === filterBrand;
      const matchesYear = filterYear === 'All' || car.year.toString() === filterYear;
      const matchesStock = filterStock === 'All' || (filterStock === 'Ready' ? car.stock > 0 : car.stock === 0);
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesYear && matchesStock && matchesSearch;
    });
  }, [cars, filterBrand, filterYear, filterStock, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <AnimatePresence>
        {confirmModal && (
          <ConfirmModal 
            message={confirmModal.message} 
            onConfirm={confirmModal.onConfirm} 
            onCancel={() => setConfirmModal(null)} 
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar 
        onAdminClick={() => isAdmin ? handleLogout() : setShowLogin(true)} 
        isAdmin={isAdmin}
        onServiceClick={(service) => setSelectedService(service)}
        onSellClick={() => setShowSellCarForm(true)}
        onTradeClick={() => setShowTradeInForm(true)}
      />
      
      {/* Client Pages */}
      <HeroSection />
      <BrandLogos brands={brandings} />
      <InventorySection 
        cars={filteredCars}
        onCarClick={setSelectedCar}
        filterBrand={filterBrand}
        setFilterBrand={setFilterBrand}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        filterStock={filterStock}
        setFilterStock={setFilterStock}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TestimonialsSection testimonials={testimonials} />
      <SellTradeSection 
        onSellClick={() => setShowSellCarForm(true)}
        onTradeClick={() => setShowTradeInForm(true)}
      />
      <EcosystemSection onServiceClick={setSelectedService} />
      <CreditPartners partners={brandings} />
      <FaqSection faqs={faqs} />
      <LocationSection />
      <FooterSection brandings={brandings} />

      {/* Car Detail Modal */}
      <AnimatePresence>
        {selectedCar && (
          <CarDetailModal 
            car={selectedCar}
            onClose={() => setSelectedCar(null)}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
            onFullscreenClick={() => setShowFullscreenImage(true)}
          />
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <LoginModal 
            loginData={loginData}
            onChange={setLoginData}
            onLogin={handleLogin}
            onClose={() => setShowLogin(false)}
          />
        )}
      </AnimatePresence>

      {/* Admin Dashboard */}
      <AnimatePresence>
        {isAdmin && (
          <AdminDashboard 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onClose={() => setIsAdmin(false)}
            onLogout={handleLogout}
            cars={cars}
            testimonials={testimonials}
            faqs={faqs}
            salesData={salesData}
            brandings={brandings}
            onEditCar={setEditingCar}
            onDeleteCar={deleteCar}
            onEditFaq={setEditingFaq}
            onDeleteFaq={deleteFaq}
            onEditTestimonial={setEditingTestimonial}
            onDeleteTestimonial={deleteTestimonial}
            onEditBranding={setEditingBranding}
            onDeleteBranding={deleteBranding}
            adminSettings={adminSettings}
            setAdminSettings={setAdminSettings}
            onUpdateSettings={updateAdminSettings}
            loginData={loginData}
          />
        )}
      </AnimatePresence>

      {/* Admin Modals */}
      {editingCar && (
        <CarEditModal 
          car={editingCar}
          onSave={saveCar}
          onClose={() => setEditingCar(null)}
          onChange={setEditingCar}
          onFileUpload={handleFileUpload}
          uploading={uploading}
        />
      )}

      {editingFaq && (
        <FaqEditModal 
          faq={editingFaq}
          onSave={saveFaq}
          onClose={() => setEditingFaq(null)}
          onChange={setEditingFaq}
        />
      )}

      {editingTestimonial && (
        <TestimonialEditModal 
          testimonial={editingTestimonial}
          onSave={saveTestimonial}
          onClose={() => setEditingTestimonial(null)}
          onChange={setEditingTestimonial}
          onFileUpload={handleFileUpload}
          uploading={uploading}
        />
      )}

      {editingBranding && (
        <BrandingEditModal 
          branding={editingBranding}
          onSave={saveBranding}
          onClose={() => setEditingBranding(null)}
          onChange={setEditingBranding}
          onFileUpload={handleFileUpload}
          uploading={uploading}
        />
      )}

      {/* Chat Agent */}
      <ChatAgent cars={cars} faqs={faqs} />

      {/* Service Popup */}
      <AnimatePresence>
        {selectedService && (
          <ServicePopup service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>

      {/* Sell Car Form Page */}
      <AnimatePresence>
        {showSellCarForm && (
          <SellCarPage onClose={() => setShowSellCarForm(false)} />
        )}
      </AnimatePresence>

      {/* Trade-In Form Page */}
      <AnimatePresence>
        {showTradeInForm && (
          <TradeInPage onClose={() => setShowTradeInForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
