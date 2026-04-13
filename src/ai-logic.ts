// --- AI Logic (Simple & Cost-Free) ---
import { CarData, FAQ } from './types';

export const generateAIResponse = (userMsg: string, cars: CarData[], faqs: FAQ[]): string => {
  const msg = userMsg.toLowerCase();
  
  // Check FAQ first
  for (const faq of faqs) {
    const keywords = faq.question.toLowerCase().split(' ');
    const matchCount = keywords.filter(k => k.length > 3 && msg.includes(k)).length;
    if (matchCount >= 2 || msg.includes(faq.question.toLowerCase())) {
      return `📚 *${faq.question}*\n\n${faq.answer}\n\n💬 Ada pertanyaan lain? Saya siap membantu!`;
    }
  }
  
  // Urusmen queries
  if (msg.includes('urusmen') || msg.includes('stnk') || msg.includes('pajak') || msg.includes('balik nama') || msg.includes('mutasi') || msg.includes('surat')) {
    return `📄 *URUSMEN - Layanan Surat Kendaraan*\n\n` +
           `Kami menyediakan layanan profesional untuk:\n\n` +
           `✅ Perpanjangan STNK & Pajak Tahunan\n` +
           `✅ Balik Nama Kendaraan (Ganti Pemilik)\n` +
           `✅ Mutasi Kendaraan Antar Daerah\n` +
           `✅ Pengurusan BPKB Hilang/Rusak\n` +
           `✅ Cek Pajak & Tilang Online\n\n` +
           `⚡ *Keuntungan:*\n` +
           `• Proses cepat & terpercaya\n` +
           `• Tidak perlu antri di Samsat\n` +
           `• Harga transparan & kompetitif\n` +
           `• Garansi uang kembali jika gagal\n\n` +
           `📱 Hubungi Urusmen: https://wa.me/6281298661260\n\n` +
           `💡 Part of Gudang Mokas Ecosystem`;
  }
  
  // Washi Washi queries
  if (msg.includes('washi') || msg.includes('cuci') || msg.includes('wash') || msg.includes('salon') || msg.includes('detailing')) {
    return `💧 *WASHI WASHI - Premium Car Wash*\n\n` +
           `Layanan cuci mobil premium yang datang ke rumah Anda!\n\n` +
           `✨ *Paket Layanan:*\n\n` +
           `🚗 *Basic Wash* - Rp 75.000\n` +
           `   Cuci luar, vakum interior, lap dashboard\n\n` +
           `💎 *Premium Wash* - Rp 150.000\n` +
           `   Basic + wax coating, poles velg, semir ban\n\n` +
           `👑 *Ultimate Detailing* - Rp 350.000\n` +
           `   Premium + interior deep clean, engine bay, nano coating\n\n` +
           `⚡ *Keunggulan:*\n` +
           `• Datang ke lokasi Anda (home service)\n` +
           `• Produk premium eco-friendly\n` +
           `• Teknisi berpengalaman & terlatih\n` +
           `• Hasil maksimal, mobil seperti baru\n\n` +
           `📱 Booking Washi Washi: https://wa.me/6281298661260\n\n` +
           `💡 Part of Gudang Mokas Ecosystem`;
  }
  
  // Location & Contact queries
  if (msg.includes('lokasi') || msg.includes('alamat') || msg.includes('dimana') || msg.includes('location') || msg.includes('address')) {
    return `📍 *LOKASI SHOWROOM GUDANG MOKAS*\n\n` +
           `🏢 Jl. Parahiyangan, Adiarsa Bar.\n` +
           `   Kec. Karawang Bar., Karawang\n` +
           `   Jawa Barat 41313\n\n` +
           `⏰ *Jam Operasional:*\n` +
           `   Senin - Sabtu: 08.00 - 17.00 WIB\n` +
           `   Minggu: Tutup\n\n` +
           `📱 WhatsApp: 6281298661260\n` +
           `📧 Email: info@gudangmokas.com\n` +
           `📷 Instagram: @gudang_mokas\n\n` +
           `🗺️ Klik "Location" di menu untuk lihat peta!`;
  }
  
  // Test drive queries
  if (msg.includes('test drive') || msg.includes('coba') || msg.includes('lihat') || msg.includes('kunjung')) {
    return `🚗 *TEST DRIVE & KUNJUNGAN SHOWROOM*\n\n` +
           `Kami sangat welcome untuk test drive!\n\n` +
           `✅ *Prosedur Test Drive:*\n` +
           `1. Hubungi kami via WhatsApp untuk booking\n` +
           `2. Bawa KTP & SIM asli\n` +
           `3. Pilih unit yang ingin dicoba\n` +
           `4. Test drive didampingi sales profesional\n` +
           `5. Gratis konsultasi kredit & trade-in\n\n` +
           `⚡ *Benefit Kunjungan:*\n` +
           `• Lihat kondisi unit secara langsung\n` +
           `• Cek kelengkapan dokumen\n` +
           `• Konsultasi dengan expert kami\n` +
           `• Promo khusus untuk kunjungan pertama\n\n` +
           `📱 Booking sekarang: https://wa.me/6281298661260`;
  }
  
  // Trade-in queries
  if (msg.includes('trade') || msg.includes('tukar') || msg.includes('jual mobil') || msg.includes('over kredit')) {
    return `🔄 *TRADE-IN & JUAL MOBIL BEKAS*\n\n` +
           `Mau upgrade mobil? Kami terima trade-in!\n\n` +
           `💰 *Keuntungan Trade-In:*\n` +
           `• Harga terbaik untuk mobil lama Anda\n` +
           `• Proses cepat, langsung deal\n` +
           `• Bisa langsung upgrade ke unit baru\n` +
           `• Urus surat-surat dibantu lengkap\n\n` +
           `📋 *Yang Perlu Disiapkan:*\n` +
           `✅ STNK & BPKB asli\n` +
           `✅ KTP pemilik\n` +
           `✅ Faktur pembelian (jika ada)\n` +
           `✅ Kwitansi blanko (jika masih kredit)\n\n` +
           `🔍 *Proses Penilaian:*\n` +
           `1. Survey kondisi fisik & mesin\n` +
           `2. Cek kelengkapan dokumen\n` +
           `3. Penawaran harga terbaik\n` +
           `4. Deal & proses administrasi\n\n` +
           `📱 Konsultasi trade-in: https://wa.me/6281298661260`;
  }
  
  // Stock query
  if (msg.includes('stok') || msg.includes('stock') || msg.includes('ada') || msg.includes('tersedia')) {
    const readyStock = cars.filter(c => c.stock > 0);
    if (readyStock.length === 0) {
      return '😔 Maaf, saat ini semua unit sedang sold out. Silakan hubungi kami via WhatsApp untuk info stok terbaru!';
    }
    
    let response = `✅ *STOK READY SAAT INI (${readyStock.length} Unit):*\n\n`;
    readyStock.forEach((car, i) => {
      response += `${i + 1}. *${car.brand} ${car.name}* (${car.year})\n`;
      response += `   💰 Kredit: Rp ${(car.price / 1000000).toFixed(0)}jt | Cash: Rp ${(car.cash_price / 1000000).toFixed(0)}jt\n`;
      response += `   📦 Stok: ${car.stock} unit\n`;
      response += `   ⚙️ ${car.transmission} | ⛽ ${car.fuel} | 📏 ${car.km.toLocaleString()} KM\n\n`;
    });
    response += `💬 Tertarik? Chat kami via WhatsApp untuk info lebih lanjut!`;
    return response;
  }
  
  // Price query
  if (msg.includes('harga') || msg.includes('price') || msg.includes('berapa')) {
    let matchedCars = cars;
    
    for (const car of cars) {
      if (msg.includes(car.brand.toLowerCase()) || msg.includes(car.name.toLowerCase())) {
        matchedCars = [car];
        break;
      }
    }
    
    if (matchedCars.length === 1) {
      const car = matchedCars[0];
      return `💰 *${car.brand} ${car.name} (${car.year})*\n\n` +
             `📊 Harga Kredit: Rp ${car.price.toLocaleString('id-ID')}\n` +
             `💵 Harga Cash: Rp ${car.cash_price.toLocaleString('id-ID')}\n` +
             `📦 Stok: ${car.stock > 0 ? `${car.stock} unit (READY)` : 'SOLD OUT'}\n\n` +
             `💳 *Simulasi Cicilan (DP 20%, 3 tahun):*\n` +
             `   DP: Rp ${(car.price * 0.2).toLocaleString('id-ID')}\n` +
             `   Cicilan: Rp ${Math.round((car.price * 0.8 * (1 + car.interest_rate * 3)) / 36).toLocaleString('id-ID')}/bulan\n\n` +
             `💬 Mau simulasi dengan DP berbeda? Chat kami via WhatsApp!`;
    }
    
    let response = `💰 *DAFTAR HARGA SEMUA UNIT:*\n\n`;
    cars.forEach((car, i) => {
      response += `${i + 1}. *${car.brand} ${car.name}* (${car.year})\n`;
      response += `   Kredit: Rp ${(car.price / 1000000).toFixed(0)}jt | Cash: Rp ${(car.cash_price / 1000000).toFixed(0)}jt\n`;
      response += `   ${car.stock > 0 ? '✅ Ready' : '❌ Sold'}\n\n`;
    });
    return response;
  }
  
  // Credit simulation query
  if (msg.includes('cicil') || msg.includes('kredit') || msg.includes('dp') || msg.includes('angsuran')) {
    const readyStock = cars.filter(c => c.stock > 0);
    if (readyStock.length === 0) {
      return '😔 Maaf, saat ini tidak ada unit ready stock untuk simulasi kredit.';
    }
    
    const car = readyStock[0];
    const dp20 = Math.round((car.price * 0.8 * (1 + car.interest_rate * 3)) / 36);
    const dp30 = Math.round((car.price * 0.7 * (1 + car.interest_rate * 3)) / 36);
    const dp40 = Math.round((car.price * 0.6 * (1 + car.interest_rate * 3)) / 36);
    
    return `💳 *SIMULASI KREDIT - ${car.brand} ${car.name}*\n\n` +
           `Harga: Rp ${car.price.toLocaleString('id-ID')}\n\n` +
           `📊 *Opsi 1 - DP 20% (3 tahun):*\n` +
           `   DP: Rp ${(car.price * 0.2).toLocaleString('id-ID')}\n` +
           `   Cicilan: Rp ${dp20.toLocaleString('id-ID')}/bulan\n\n` +
           `📊 *Opsi 2 - DP 30% (3 tahun):*\n` +
           `   DP: Rp ${(car.price * 0.3).toLocaleString('id-ID')}\n` +
           `   Cicilan: Rp ${dp30.toLocaleString('id-ID')}/bulan\n\n` +
           `📊 *Opsi 3 - DP 40% (3 tahun):*\n` +
           `   DP: Rp ${(car.price * 0.4).toLocaleString('id-ID')}\n` +
           `   Cicilan: Rp ${dp40.toLocaleString('id-ID')}/bulan\n\n` +
           `💬 Mau simulasi custom atau tenor berbeda? Chat kami via WhatsApp!`;
  }
  
  // Brand query
  const brands = Array.from(new Set(cars.map(c => c.brand)));
  for (const brand of brands) {
    if (msg.includes(brand.toLowerCase())) {
      const brandCars = cars.filter(c => c.brand === brand);
      let response = `🚗 *${brand.toUpperCase()} COLLECTION - ${brandCars.length} Unit*\n\n`;
      brandCars.forEach((car, i) => {
        response += `${i + 1}. *${car.name}* (${car.year})\n`;
        response += `   💰 Rp ${(car.price / 1000000).toFixed(0)}jt (Kredit) | Rp ${(car.cash_price / 1000000).toFixed(0)}jt (Cash)\n`;
        response += `   ${car.stock > 0 ? '✅ Ready Stock' : '❌ Sold Out'}\n`;
        response += `   📏 ${car.km.toLocaleString()} KM | ⚙️ ${car.transmission}\n\n`;
      });
      response += `💬 Mau info detail? Chat kami sekarang!`;
      return response;
    }
  }
  
  // Greeting
  if (msg.includes('halo') || msg.includes('hai') || msg.includes('hello') || msg.includes('hi') || msg.includes('hei')) {
    const readyCount = cars.filter(c => c.stock > 0).length;
    return `👋 *Halo! Selamat datang di Gudang Mokas!*\n\n` +
           `Saya GM_NEURAL_AGENT, asisten virtual Anda. 🤖\n\n` +
           `📊 *Saat ini kami punya ${readyCount} unit ready stock!*\n\n` +
           `Saya bisa bantu Anda dengan:\n` +
           `🚗 Info stok & spesifikasi mobil\n` +
           `💰 Cek harga & simulasi kredit\n` +
           `📄 Layanan Urusmen (STNK, Pajak, Balik Nama)\n` +
           `💧 Layanan Washi Washi (Car Wash Premium)\n` +
           `🔄 Trade-in & jual mobil bekas\n` +
           `📍 Info lokasi & jam operasional\n\n` +
           `Silakan tanya apa saja! 😊`;
  }
  
  // Budget query
  const budgetMatch = msg.match(/(\d+)\s*(jt|juta|m|million|milyar|miliar|b)/i);
  if (budgetMatch || msg.includes('budget') || msg.includes('uang') || msg.includes('dana')) {
    let budget = budgetMatch ? parseInt(budgetMatch[1]) : 100;
    const unit = budgetMatch?.[2]?.toLowerCase();
    
    if (unit?.includes('m') || unit?.includes('jt') || unit?.includes('juta')) {
      budget = budget * 1000000;
    } else if (unit?.includes('b') || unit?.includes('milyar') || unit?.includes('miliar')) {
      budget = budget * 1000000000;
    } else {
      budget = budget * 1000000;
    }
    
    const affordable = cars.filter(c => c.price <= budget && c.stock > 0);
    
    if (affordable.length === 0) {
      const cheapest = Math.min(...cars.filter(c => c.stock > 0).map(c => c.price));
      return `😔 Maaf, tidak ada unit ready stock dalam budget Rp ${(budget / 1000000).toFixed(0)}jt.\n\n` +
             `💡 *Saran:*\n` +
             `• Unit termurah kami: Rp ${(cheapest / 1000000).toFixed(0)}jt\n` +
             `• Bisa pakai skema kredit dengan DP rendah\n` +
             `• Trade-in mobil lama untuk tambah budget\n\n` +
             `📱 Chat kami untuk solusi terbaik: https://wa.me/6281298661260`;
    }
    
    let response = `💰 *UNIT DALAM BUDGET Rp ${(budget / 1000000).toFixed(0)}jt (${affordable.length} Unit):*\n\n`;
    affordable.slice(0, 5).forEach((car, i) => {
      const monthly = Math.round((car.price * 0.8 * (1 + car.interest_rate * 3)) / 36);
      response += `${i + 1}. *${car.brand} ${car.name}* (${car.year})\n`;
      response += `   💰 Rp ${(car.price / 1000000).toFixed(0)}jt\n`;
      response += `   💳 Cicilan: ~Rp ${(monthly / 1000000).toFixed(1)}jt/bln (DP 20%)\n`;
      response += `   📦 ${car.stock} unit ready\n\n`;
    });
    response += `💬 Mau simulasi detail? Chat kami!`;
    return response;
  }
  
  // Warranty & guarantee queries
  if (msg.includes('garansi') || msg.includes('warranty') || msg.includes('jaminan')) {
    return `🛡️ *GARANSI & JAMINAN GUDANG MOKAS*\n\n` +
           `Kami berkomitmen untuk kualitas terbaik!\n\n` +
           `✅ *Garansi Mesin & Transmisi:*\n` +
           `   30 hari sejak pembelian\n\n` +
           `✅ *Garansi Dokumen:*\n` +
           `   100% legal & bebas sengketa\n\n` +
           `✅ *Free Service:*\n` +
           `   1x general check-up gratis\n\n` +
           `✅ *Sertifikat Inspeksi:*\n` +
           `   Setiap unit sudah diinspeksi 150+ poin\n\n` +
           `💡 *Bonus Pembelian:*\n` +
           `• Voucher Washi Washi Rp 100.000\n` +
           `• Diskon Urusmen 20%\n` +
           `• Karpet mobil premium\n` +
           `• Parfum mobil eksklusif\n\n` +
           `📱 Info lengkap: https://wa.me/6281298661260`;
  }
  
  // Financing partners
  if (msg.includes('leasing') || msg.includes('finance') || msg.includes('bank') || msg.includes('pembiayaan')) {
    return `🏦 *PARTNER PEMBIAYAAN KAMI*\n\n` +
           `Kami bekerja sama dengan lembaga pembiayaan terpercaya:\n\n` +
           `✅ BCA Finance - Bunga kompetitif, proses cepat\n` +
           `✅ BFI Finance - Approval mudah, DP fleksibel\n` +
           `✅ Adira Finance - Tenor panjang hingga 5 tahun\n` +
           `✅ Mandiri Utama Finance - Syarat ringan\n\n` +
           `💳 *Keuntungan Kredit di Kami:*\n` +
           `• Approval rate tinggi (90%+)\n` +
           `• Proses 1-3 hari kerja\n` +
           `• DP mulai dari 20%\n` +
           `• Tenor fleksibel 1-5 tahun\n` +
           `• Bunga kompetitif mulai 5%/tahun\n\n` +
           `📋 *Syarat Kredit:*\n` +
           `• KTP & KK\n` +
           `• Slip gaji / rekening koran 3 bulan\n` +
           `• NPWP (jika ada)\n\n` +
           `📱 Konsultasi kredit: https://wa.me/6281298661260`;
  }
  
  // Comparison queries
  if (msg.includes('banding') || msg.includes('compare') || msg.includes('vs') || msg.includes('atau')) {
    const readyStock = cars.filter(c => c.stock > 0);
    if (readyStock.length >= 2) {
      const car1 = readyStock[0];
      const car2 = readyStock[1];
      return `⚖️ *PERBANDINGAN UNIT*\n\n` +
             `🚗 *${car1.brand} ${car1.name}* vs 🚗 *${car2.brand} ${car2.name}*\n\n` +
             `💰 *Harga:*\n` +
             `   ${car1.name}: Rp ${(car1.price / 1000000).toFixed(0)}jt\n` +
             `   ${car2.name}: Rp ${(car2.price / 1000000).toFixed(0)}jt\n\n` +
             `📅 *Tahun:*\n` +
             `   ${car1.name}: ${car1.year}\n` +
             `   ${car2.name}: ${car2.year}\n\n` +
             `📏 *Kilometer:*\n` +
             `   ${car1.name}: ${car1.km.toLocaleString()} KM\n` +
             `   ${car2.name}: ${car2.km.toLocaleString()} KM\n\n` +
             `⚙️ *Transmisi:*\n` +
             `   ${car1.name}: ${car1.transmission}\n` +
             `   ${car2.name}: ${car2.transmission}\n\n` +
             `💬 Butuh rekomendasi? Chat kami untuk konsultasi!`;
    }
  }
  
  // Recommendation queries
  if (msg.includes('rekomendasi') || msg.includes('saran') || msg.includes('recommend') || msg.includes('suggest') || msg.includes('bagus')) {
    const readyStock = cars.filter(c => c.stock > 0).sort((a, b) => b.year - a.year);
    if (readyStock.length === 0) {
      return '😔 Maaf, saat ini tidak ada unit ready stock.';
    }
    
    const bestValue = readyStock.sort((a, b) => (a.price / a.year) - (b.price / b.year))[0];
    const newest = readyStock.sort((a, b) => b.year - a.year)[0];
    const cheapest = readyStock.sort((a, b) => a.price - b.price)[0];
    
    return `⭐ *REKOMENDASI TERBAIK KAMI*\n\n` +
           `🏆 *Best Value:*\n` +
           `   ${bestValue.brand} ${bestValue.name} (${bestValue.year})\n` +
           `   Rp ${(bestValue.price / 1000000).toFixed(0)}jt - Kondisi prima, harga terbaik!\n\n` +
           `🆕 *Newest Unit:*\n` +
           `   ${newest.brand} ${newest.name} (${newest.year})\n` +
           `   Rp ${(newest.price / 1000000).toFixed(0)}jt - Tahun termuda!\n\n` +
           `💰 *Most Affordable:*\n` +
           `   ${cheapest.brand} ${cheapest.name} (${cheapest.year})\n` +
           `   Rp ${(cheapest.price / 1000000).toFixed(0)}jt - Budget friendly!\n\n` +
           `💬 Mau konsultasi lebih detail? Chat kami!`;
  }
  
  // Thank you / positive feedback
  if (msg.includes('terima kasih') || msg.includes('thanks') || msg.includes('makasih') || msg.includes('ok') || msg.includes('oke')) {
    return `🙏 Sama-sama! Senang bisa membantu!\n\n` +
           `Jangan ragu untuk bertanya lagi kapan saja. Kami siap melayani Anda 24/7! 😊\n\n` +
           `📱 Untuk info lebih lanjut atau booking:\n` +
           `WhatsApp: https://wa.me/6281298661260\n\n` +
           `Sampai jumpa di showroom! 🚗✨`;
  }
  
  // Ecosystem overview
  if (msg.includes('layanan') || msg.includes('service') || msg.includes('apa aja') || msg.includes('ecosystem')) {
    const readyCount = cars.filter(c => c.stock > 0).length;
    return `🌟 *GUDANG MOKAS ECOSYSTEM*\n\n` +
           `Lebih dari sekadar showroom mobil!\n\n` +
           `🚗 *Gudang Mokas Showroom*\n` +
           `   ${readyCount} unit premium ready stock\n` +
           `   Garansi mesin & transmisi\n` +
           `   Kredit mudah & cepat\n\n` +
           `📄 *Urusmen*\n` +
           `   Perpanjangan STNK & Pajak\n` +
           `   Balik nama & mutasi kendaraan\n` +
           `   Pengurusan dokumen lengkap\n\n` +
           `💧 *Washi Washi*\n` +
           `   Car wash premium home service\n` +
           `   Detailing & nano coating\n` +
           `   Produk eco-friendly\n\n` +
           `💡 Semua layanan terintegrasi untuk kemudahan Anda!\n\n` +
           `📱 Info lengkap: https://wa.me/6281298661260`;
  }
  
  // Default: Show all available cars
  const readyStock = cars.filter(c => c.stock > 0);
  if (readyStock.length > 0) {
    let response = `🚗 *STOK MOBIL KAMI (${readyStock.length} Unit Ready):*\n\n`;
    readyStock.slice(0, 5).forEach((car, i) => {
      response += `${i + 1}. ${car.brand} ${car.name} (${car.year}) - Rp ${(car.price / 1000000).toFixed(0)}jt\n`;
    });
    if (readyStock.length > 5) {
      response += `\n...dan ${readyStock.length - 5} unit lainnya!\n`;
    }
    response += `\n💬 Tanya:\n`;
    response += `• "harga [nama mobil]" - Info detail harga\n`;
    response += `• "simulasi kredit" - Hitung cicilan\n`;
    response += `• "urusmen" - Layanan surat kendaraan\n`;
    response += `• "washi washi" - Car wash premium\n`;
    response += `• "budget 500jt" - Cari sesuai budget`;
    return response;
  }
  
  return `🤔 Hmm, saya belum mengerti pertanyaan Anda.\n\n` +
         `💡 *Coba tanya:*\n` +
         `• "Ada stok apa?" - Lihat semua unit ready\n` +
         `• "Harga BMW berapa?" - Info harga spesifik\n` +
         `• "Simulasi kredit" - Hitung cicilan\n` +
         `• "Budget 500jt" - Cari sesuai budget\n` +
         `• "Urusmen" - Layanan surat kendaraan\n` +
         `• "Washi Washi" - Car wash premium\n` +
         `• "Lokasi showroom" - Alamat & jam buka\n\n` +
         `📱 Atau chat langsung via WhatsApp untuk bantuan personal!\n` +
         `https://wa.me/6281298661260`;
};
