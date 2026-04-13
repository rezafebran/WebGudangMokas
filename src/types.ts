// --- Types & Interfaces ---

export interface CarData {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  cash_price: number;
  km: number;
  transmission: string;
  fuel: string;
  images: string[];
  stock: number;
  min_dp_percent: number;
  max_dp_percent: number;
  interest_rate: number;
  description?: string;
}

export interface Testimonial {
  id: number;
  buyer_name: string;
  car_name: string;
  image_url: string;
  comment: string;
  year: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface SaleData {
  month: string;
  amount: number;
}

export interface BrandingData {
  id: number;
  type: 'header' | 'brand' | 'financing' | 'service';
  name: string;
  logo_url: string;
  display_order: number;
}

export interface ServiceBusiness {
  name: string;
  description: string;
  logo: string;
  whatsapp: string;
  color: string;
}
