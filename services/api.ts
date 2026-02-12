import { Enquiry, User, VisitorStat, SEOSettings } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return {
    'Content-Type': 'application/json',
    ...(user?.token && { Authorization: `Bearer ${user.token}` }),
  };
};

export const api = {
  login: async (email: string, password?: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      const user = { ...data, id: data._id };
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  register: async (name: string, email: string, password?: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) throw new Error('Registration failed');
      const data = await response.json();
      const user = { ...data, id: data._id };
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
        console.error(error);
        return null;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    window.location.reload(); // Force reload to clear state
  },

  getCurrentUser: (): User | null => {
    return JSON.parse(localStorage.getItem('user') || 'null');
  },

  getStats: async (): Promise<VisitorStat[]> => {
    try {
      const response = await fetch(`${API_URL}/stats`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  getEnquiries: async (): Promise<Enquiry[]> => {
    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch enquiries');
      const data = await response.json();
      return data.map((item: any) => ({ ...item, id: item._id }));
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  addEnquiry: async (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>): Promise<Enquiry | null> => {
     try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry),
      });
      if (!response.ok) throw new Error('Failed to add enquiry');
      const data = await response.json();
      return { ...data, id: data._id };
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getSEO: async (): Promise<SEOSettings> => {
    try {
      const response = await fetch(`${API_URL}/seo`, {
        headers: getHeaders(),
      });
      if (!response.ok) return {
          title: '', metaDescription: '', keywords: [], ogImage: ''
      };
      return await response.json();
    } catch (error) {
       console.error(error);
       return {
            title: '', metaDescription: '', keywords: [], ogImage: ''
       };
    }
  },

  updateSEO: async (settings: SEOSettings): Promise<SEOSettings | null> => {
    try {
      const response = await fetch(`${API_URL}/seo`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error('Failed to update SEO');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  
  resetDatabase: async () => {
      // Not implemented in backend yet, doing nothing or calling an endpoint if I added it
      console.warn("Reset database not implemented in real backend yet");
  }
};
