// SEO Utilities for Gudang Mokas
import { CarData } from '../types';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
  structuredData?: object;
}

// Default SEO Configuration
export const defaultSEO: SEOConfig = {
  title: 'Gudang Mokas - Jual Beli Mobil Bekas Berkualitas Terpercaya',
  description: 'Gudang Mokas adalah showroom jual beli mobil bekas terpercaya di Karawang, Jabodetabek, Jawa Barat, dan seluruh Indonesia. Melayani semua kalangan dengan pilihan lengkap mobil sport dan berbagai merek. Dapatkan mobil impian Anda dengan harga terbaik, garansi, dan layanan kredit mudah.',
  keywords: [
    // Keyword Utama Target
    'jual beli mobil karawang',
    'jual beli mobil jabodetabek',
    'jual beli mobil jawa barat',
    'jual beli mobil indonesia',
    'jual beli mobil semua kalangan',
    'jual beli mobil sport',
    'jual beli mobil bekas',
    'jual beli mobil',
    
    // Keyword Lokasi Spesifik
    'jual beli mobil bekas karawang',
    'jual beli mobil bekas jabodetabek',
    'jual beli mobil bekas jawa barat',
    'jual beli mobil bekas indonesia',
    'mobil bekas karawang',
    'mobil bekas jakarta',
    'mobil bekas tangerang',
    'mobil bekas bekasi',
    'mobil bekas depok',
    'mobil bekas bogor',
    'mobil bekas bandung',
    'mobil bekas jawa barat',
    
    // Keyword Umum
    'mobil bekas',
    'showroom mobil',
    'mobil second',
    'kredit mobil bekas',
    'gudang mokas',
    'mobil bekas berkualitas',
    'mobil bekas murah',
    'showroom mobil terpercaya',
    'mobil sport bekas',
    'mobil sport',
    'jual mobil bekas',
    'beli mobil bekas',
    'dealer mobil bekas',
    'showroom mobil karawang',
    'showroom mobil jabodetabek',
    
    // Keyword Brand
    'toyota bekas',
    'honda bekas',
    'daihatsu bekas',
    'suzuki bekas',
    'mitsubishi bekas',
    'nissan bekas',
    'mazda bekas',
    'bmw bekas',
    'mercedes bekas',
    'audi bekas',
    
    // Keyword Layanan
    'kredit mobil',
    'mobil bekas semua kalangan',
    'mobil murah semua kalangan',
    'jual beli mobil terpercaya'
  ],
  ogType: 'website',
  twitterCard: 'summary_large_image'
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Gudang Mokas - Showroom Mobil Bekas Berkualitas Terpercaya',
    description: 'Temukan mobil bekas impian Anda di Gudang Mokas. Showroom terpercaya dengan pilihan lengkap, harga terbaik, garansi mesin, dan kemudahan kredit. Kualitas terjamin!',
    keywords: [...defaultSEO.keywords, 'showroom mobil bekas terbaik', 'jual mobil bekas terpercaya'],
    ogTitle: 'Gudang Mokas - Showroom Mobil Bekas Terpercaya',
    ogDescription: 'Showroom mobil bekas berkualitas dengan pilihan lengkap dan harga terbaik. Garansi mesin & kemudahan kredit tersedia.',
  },
  inventory: {
    title: 'Inventori Mobil Bekas - Gudang Mokas',
    description: 'Lihat koleksi lengkap mobil bekas berkualitas di Gudang Mokas. Berbagai merek dan tipe tersedia dengan harga kompetitif dan kondisi terjamin.',
    keywords: [...defaultSEO.keywords, 'daftar mobil bekas', 'stok mobil bekas', 'katalog mobil second'],
  },
  ecosystem: {
    title: 'Layanan Ekosistem Otomotif - Gudang Mokas',
    description: 'Layanan lengkap untuk kebutuhan otomotif Anda: jual beli mobil, kredit mudah, asuransi, perawatan, dan konsultasi. Solusi one-stop untuk mobil Anda.',
    keywords: [...defaultSEO.keywords, 'layanan otomotif', 'kredit mobil', 'asuransi mobil', 'perawatan mobil'],
  },
  testimonials: {
    title: 'Testimoni Pelanggan - Gudang Mokas',
    description: 'Baca pengalaman pelanggan yang puas dengan layanan Gudang Mokas. Ribuan pelanggan telah mempercayai kami untuk kebutuhan mobil bekas mereka.',
    keywords: [...defaultSEO.keywords, 'testimoni mobil bekas', 'review gudang mokas', 'pengalaman pelanggan'],
  },
  faq: {
    title: 'FAQ - Pertanyaan Umum Seputar Mobil Bekas | Gudang Mokas',
    description: 'Temukan jawaban untuk pertanyaan umum seputar pembelian mobil bekas, kredit, garansi, dan layanan di Gudang Mokas.',
    keywords: [...defaultSEO.keywords, 'faq mobil bekas', 'pertanyaan mobil bekas', 'panduan beli mobil bekas'],
  }
};

// Generate car-specific SEO
export const generateCarSEO = (car: CarData): SEOConfig => {
  const title = `${car.brand} ${car.name} ${car.year} - ${formatPrice(car.price)} | Gudang Mokas`;
  const description = `${car.brand} ${car.name} tahun ${car.year} dengan harga ${formatPrice(car.price)}. ${car.description || 'Kondisi prima, siap pakai.'} Tersedia di Gudang Mokas dengan garansi dan kemudahan kredit.`;
  
  return {
    title,
    description,
    keywords: [
      `${car.brand.toLowerCase()} ${car.name.toLowerCase()}`,
      `${car.brand.toLowerCase()} ${car.year}`,
      `${car.name.toLowerCase()} bekas`,
      `${car.name.toLowerCase()} second`,
      `jual ${car.brand.toLowerCase()} ${car.name.toLowerCase()}`,
      ...defaultSEO.keywords
    ],
    ogTitle: title,
    ogDescription: description,
    ogImage: car.images?.[0] || '/default-car-image.jpg',
    ogType: 'product',
    structuredData: generateCarStructuredData(car)
  };
};

// Format price for display
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Generate structured data for car (Schema.org)
export const generateCarStructuredData = (car: CarData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.brand} ${car.name}`,
    brand: {
      '@type': 'Brand',
      name: car.brand
    },
    model: car.name,
    vehicleModelDate: car.year.toString(),
    productionDate: car.year.toString(),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.km || 0,
      unitCode: 'KMT'
    },
    fuelType: car.fuel || 'Gasoline',
    vehicleTransmission: car.transmission || 'Manual',
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'IDR',
      availability: car.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'Gudang Mokas',
        url: 'https://gudangmokas.com'
      }
    },
    image: car.images || [],
    description: car.description || `${car.brand} ${car.name} tahun ${car.year} dalam kondisi prima`
  };
};

// Generate organization structured data
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'Gudang Mokas',
  description: 'Showroom jual beli mobil bekas berkualitas terpercaya di Karawang, Jabodetabek, Jawa Barat & Indonesia',
  url: 'https://gudangmokas.com',
  logo: 'https://gudangmokas.com/logo.png',
  image: 'https://gudangmokas.com/og-image.jpg',
  telephone: '+62-812-9866-1260',
  email: 'info@gudangmokas.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Contoh No. 123',
    addressLocality: 'Jakarta',
    addressRegion: 'DKI Jakarta',
    postalCode: '12345',
    addressCountry: 'ID'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.2088,
    longitude: 106.8456
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '09:00',
      closes: '17:00'
    }
  ],
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/gudangmokas',
    'https://www.instagram.com/gudangmokas',
    'https://www.youtube.com/gudangmokas',
    'https://twitter.com/gudangmokas'
  ]
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = (faqs: { question: string; answer: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Generate review/testimonial structured data
export const generateReviewStructuredData = (reviews: any[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gudang Mokas',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: reviews.length.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.name
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating || '5',
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: review.text
    }))
  };
};

// Update meta tags dynamically
export const updateMetaTags = (config: SEOConfig) => {
  // Update title
  document.title = config.title;

  // Update or create meta tags
  const metaTags = [
    { name: 'description', content: config.description },
    { name: 'keywords', content: config.keywords.join(', ') },
    
    // Open Graph
    { property: 'og:title', content: config.ogTitle || config.title },
    { property: 'og:description', content: config.ogDescription || config.description },
    { property: 'og:type', content: config.ogType || 'website' },
    { property: 'og:url', content: config.canonical || window.location.href },
    { property: 'og:site_name', content: 'Gudang Mokas' },
    { property: 'og:locale', content: 'id_ID' },
    
    // Twitter Card
    { name: 'twitter:card', content: config.twitterCard || 'summary_large_image' },
    { name: 'twitter:title', content: config.ogTitle || config.title },
    { name: 'twitter:description', content: config.ogDescription || config.description },
    
    // Additional SEO tags
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'bingbot', content: 'index, follow' },
    { name: 'author', content: 'Gudang Mokas' },
    { name: 'language', content: 'Indonesian' },
    { name: 'geo.region', content: 'ID' },
    { name: 'geo.placename', content: 'Jakarta' },
  ];

  // Add og:image if provided
  if (config.ogImage) {
    metaTags.push(
      { property: 'og:image', content: config.ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: config.ogTitle || config.title },
      { name: 'twitter:image', content: config.ogImage }
    );
  }

  metaTags.forEach(tag => {
    const key = tag.name ? 'name' : 'property';
    const value = tag.name || tag.property;
    let element = document.querySelector(`meta[${key}="${value}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(key, value!);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', tag.content);
  });

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = config.canonical || window.location.href;

  // Add structured data
  if (config.structuredData) {
    addStructuredData(config.structuredData);
  }
};

// Add structured data to page
export const addStructuredData = (data: object, id: string = 'structured-data') => {
  let script = document.getElementById(id) as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

// Generate sitemap data (to be used by server)
export const generateSitemapData = (cars: CarData[]) => {
  const baseUrl = 'https://gudangmokas.com';
  const pages = [
    { url: baseUrl, priority: 1.0, changefreq: 'daily' },
    { url: `${baseUrl}/#inventory`, priority: 0.9, changefreq: 'daily' },
    { url: `${baseUrl}/#ecosystem`, priority: 0.8, changefreq: 'weekly' },
    { url: `${baseUrl}/#testimonials`, priority: 0.7, changefreq: 'weekly' },
    { url: `${baseUrl}/#faq`, priority: 0.7, changefreq: 'weekly' },
    { url: `${baseUrl}/#location`, priority: 0.6, changefreq: 'monthly' },
  ];

  // Add car pages
  cars.forEach(car => {
    pages.push({
      url: `${baseUrl}/car/${car.id}`,
      priority: 0.8,
      changefreq: 'weekly'
    });
  });

  return pages;
};
