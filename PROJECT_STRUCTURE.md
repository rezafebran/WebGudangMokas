# 📁 GUDANG MOKAS - Project Structure

## 🎯 Overview
Project ini sudah di-refactor menjadi struktur modular yang rapi dan mudah di-maintain.

---

## 📂 File Structure

```
src/
├── App.tsx                          # Main App - Orchestrator
├── types.ts                         # All TypeScript Interfaces
├── ai-logic.ts                      # AI Chat Logic (No API Cost)
├── components/
│   ├── ClientComponents.tsx         # Client-Side Components
│   ├── AdminComponents.tsx          # Admin Dashboard Components
│   └── AdminModals.tsx              # Admin Modal Components
└── pages/
    └── ClientPages.tsx              # Client Page Sections
```

---

## 📄 File Descriptions

### 🔹 **src/types.ts**
**Purpose:** Semua TypeScript interfaces dan types
- `CarData` - Interface untuk data mobil
- `Testimonial` - Interface untuk testimoni
- `FAQ` - Interface untuk FAQ
- `SaleData` - Interface untuk data penjualan
- `BrandingData` - Interface untuk logo & branding
- `ServiceBusiness` - Interface untuk layanan ecosystem

**Update:** Tambah/edit interface di sini jika ada perubahan struktur data

---

### 🔹 **src/ai-logic.ts**
**Purpose:** Logic AI chatbot tanpa API mahal
- `generateAIResponse()` - Main function untuk generate response

**Features:**
- ✅ Query stok mobil
- ✅ Cek harga & simulasi kredit
- ✅ Info Urusmen (layanan surat)
- ✅ Info Washi Washi (car wash)
- ✅ Budget filtering
- ✅ Brand queries
- ✅ FAQ integration
- ✅ Greeting & thank you responses
- ✅ Location & contact info
- ✅ Trade-in info
- ✅ Warranty info
- ✅ Financing partners
- ✅ Recommendations

**Update:** Tambah keyword detection atau response baru di sini

---

### 🔹 **src/components/ClientComponents.tsx**
**Purpose:** Komponen-komponen untuk client side (pengunjung)

**Components:**
- `Navbar` - Navigation bar dengan mobile menu
- `BrandLogos` - Marquee logo brand mobil
- `CreditPartners` - Section partner pembiayaan
- `ServicePopup` - Modal popup untuk Urusmen & Washi Washi
- `CarCard` - Card untuk display mobil
- `CreditCalculator` - Kalkulator simulasi kredit
- `ChatAgent` - AI chatbot floating button

**Update:** Edit komponen client di sini (navbar, card, calculator, dll)

---

### 🔹 **src/components/AdminComponents.tsx**
**Purpose:** Komponen untuk admin dashboard

**Components:**
- `AdminDashboard` - Main admin dashboard dengan sidebar & tabs

**Tabs:**
- Inventory - Manage mobil
- Sales Analytics - Chart penjualan
- Testimonials - Manage testimoni
- FAQ - Manage AI knowledge base
- Branding - Manage logos
- Settings - Admin credentials

**Update:** Edit layout atau tab admin di sini

---

### 🔹 **src/components/AdminModals.tsx**
**Purpose:** Modal-modal untuk admin operations

**Modals:**
- `CarEditModal` - Form edit/add mobil
- `FaqEditModal` - Form edit/add FAQ
- `TestimonialEditModal` - Form edit/add testimoni
- `BrandingEditModal` - Form edit/add logo
- `ConfirmModal` - Konfirmasi delete
- `LoginModal` - Login admin
- `Notification` - Toast notification

**Update:** Edit form atau modal admin di sini

---

### 🔹 **src/pages/ClientPages.tsx**
**Purpose:** Section-section halaman client

**Sections:**
- `HeroSection` - Hero banner utama
- `InventorySection` - Grid mobil dengan filter
- `EcosystemSection` - Urusmen & Washi Washi cards
- `TestimonialsSection` - Carousel testimoni
- `FaqSection` - Accordion FAQ
- `LocationSection` - Map & alamat showroom
- `FooterSection` - Footer dengan links
- `CarDetailModal` - Modal detail mobil

**Update:** Edit layout atau section halaman di sini

---

### 🔹 **src/App.tsx**
**Purpose:** Main orchestrator - menggabungkan semua komponen

**Responsibilities:**
- State management (data, UI, admin)
- API calls (fetch, save, delete)
- File upload handling
- Admin authentication
- Filtering logic

**Update:** Hanya edit logic utama atau state management di sini

---

## 🔄 How to Update

### ✏️ Update Client UI
1. Edit `src/components/ClientComponents.tsx` untuk komponen
2. Edit `src/pages/ClientPages.tsx` untuk section/layout
3. Tidak perlu touch `App.tsx`

### ✏️ Update Admin UI
1. Edit `src/components/AdminComponents.tsx` untuk dashboard
2. Edit `src/components/AdminModals.tsx` untuk form/modal
3. Tidak perlu touch `App.tsx`

### ✏️ Update AI Logic
1. Edit `src/ai-logic.ts`
2. Tambah keyword detection atau response baru
3. Tidak perlu touch file lain

### ✏️ Update Data Structure
1. Edit `src/types.ts` untuk interface
2. Update API di `server.ts` jika perlu
3. Update komponen yang menggunakan data tersebut

---

## 🚀 Benefits

### ✅ **Separation of Concerns**
- Client code terpisah dari admin code
- Logic terpisah dari UI
- Types terpusat di satu file

### ✅ **Easy Maintenance**
- Mau update client? Edit file client aja
- Mau update admin? Edit file admin aja
- Mau update AI? Edit ai-logic.ts aja

### ✅ **Scalability**
- Mudah tambah komponen baru
- Mudah tambah fitur AI baru
- Mudah tambah section baru

### ✅ **Clean Code**
- Setiap file punya purpose jelas
- Tidak ada code campur-campur
- Mudah dibaca dan dipahami

---

## 📝 Quick Reference

### Client Components Location
```
Navbar          → src/components/ClientComponents.tsx
Car Card        → src/components/ClientComponents.tsx
Calculator      → src/components/ClientComponents.tsx
Chat Agent      → src/components/ClientComponents.tsx
```

### Client Pages Location
```
Hero            → src/pages/ClientPages.tsx
Inventory       → src/pages/ClientPages.tsx
Ecosystem       → src/pages/ClientPages.tsx
Testimonials    → src/pages/ClientPages.tsx
FAQ             → src/pages/ClientPages.tsx
Location        → src/pages/ClientPages.tsx
Footer          → src/pages/ClientPages.tsx
```

### Admin Location
```
Dashboard       → src/components/AdminComponents.tsx
Edit Forms      → src/components/AdminModals.tsx
Login           → src/components/AdminModals.tsx
```

### Logic Location
```
AI Responses    → src/ai-logic.ts
Types           → src/types.ts
Main Logic      → src/App.tsx
```

---

## 🎨 Design System

### Colors
- Background: `bg-black`
- Borders: `border-white/10` to `border-white/30`
- Text: `text-white` with opacity variants
- Accent: `emerald-500`, `red-500`

### Typography
- Headings: `font-black uppercase tracking-tighter`
- Labels: `text-[10px] uppercase tracking-widest`
- Body: `text-sm` to `text-base`

### Spacing
- Sections: `py-20` to `py-32`
- Cards: `p-6` to `p-10`
- Gaps: `gap-4` to `gap-8`

---

## 🛠️ Development Tips

1. **Hot Reload:** Vite akan auto-reload saat ada perubahan
2. **TypeScript:** Pastikan types match dengan interface
3. **Imports:** Gunakan relative imports yang benar
4. **Testing:** Test di browser setelah setiap perubahan

---

## 📱 Contact

Untuk pertanyaan atau bantuan:
- WhatsApp: 6281234567890
- Email: info@gudangmokas.com

---

**Last Updated:** March 14, 2026
**Version:** 2.0 (Modular Refactor)
