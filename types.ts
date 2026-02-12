export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'IT' | 'Development' | 'Marketing';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface VisitorStat {
  date: string;
  visitors: number;
  pageViews: number;
}

export interface SEOSettings {
  title: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
}