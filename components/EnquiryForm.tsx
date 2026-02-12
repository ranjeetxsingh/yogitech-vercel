import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    
    try {
        await api.addEnquiry({
            name: formData.name,
            email: formData.email,
            serviceInterest: formData.serviceInterest || 'General Enquiry',
            message: formData.message
        });

        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', serviceInterest: '', message: '' });
        
        setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
        setLoading(false);
        console.error("Failed to submit enquiry", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full">
      {submitted ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-full flex flex-col items-center justify-center bg-green-50 dark:bg-slate-800 rounded-2xl border border-green-200 dark:border-green-900 p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
             <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Thanks {formData.name || 'there'}! We'll be in touch shortly to discuss your project.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 transition-colors"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="serviceInterest" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service</label>
            <select
                id="serviceInterest"
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleChange}
                className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 transition-colors"
            >
                <option value="">I'm interested in...</option>
                {SERVICES.map(s => (
                <option key={s.id} value={s.title}>{s.title}</option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Details</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 transition-colors"
              placeholder="Tell us a bit about what you need help with..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Enquiry <Send className="ml-2 w-4 h-4" /></>}
          </button>
        </form>
      )}
    </div>
  );
};

export default EnquiryForm;