
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  departmentId?: string;
  qualification: string;
  experience: string;
  image: string;
  motto: string;
  days: string[];
  timings?: string;
  fee?: string;
}

export interface Department {
  id: string;
  name: string;
  urduName: string;
  description: string;
  icon: string;
  image?: string; 
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: 'News' | 'Health Tips' | 'Success Story';
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  doctorId: string;
  departmentId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  paymentMethod?: 'JazzCash' | 'EasyPaisa' | 'Bank';
  transactionId?: string;
  paymentStatus: 'Unpaid' | 'Paid' | 'Verified';
  adminMessage?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

export interface DonationAccount {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  logo?: string;
  branchCode?: string;
  branchName?: string;
  originalIban?: string; // Helper for admin edits
}

export interface PaymentMethodConfig {
  accountName: string;
  jazzCashNumber: string;
  easyPaisaNumber: string;
  bankName: string;
  bankIban: string;
  qrCodeImage: string;
}

export interface PaymentConfig {
  appointment: PaymentMethodConfig;
  donation: PaymentMethodConfig;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface BrandingConfig {
  hospitalName: string;
  tagline: string;
  address: string;
  phone: string;
  heroSlides: HeroSlide[];
  ceoName: string;
  ceoTitle: string;
  ceoMessage: string;
  ceoImage: string;
  ceoQualification: string;
  logoUrl?: string;
}

export interface SiteData {
  doctors: Doctor[];
  departments: Department[];
  blogs: BlogPost[];
  appointments: Appointment[];
  messages: ContactMessage[];
  donationAccounts: DonationAccount[];
  paymentConfig: PaymentConfig;
  branding: BrandingConfig;
  newsItems: string[];
}
