import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, Lock, Shield } from 'lucide-react';

const Sitemap: React.FC = () => {
  const pages = [
    { name: 'Home', path: '/', icon: Home, desc: 'Main landing page and overview.' },
    { name: 'Services', path: '/#services', icon: FileText, desc: 'List of IT, Development, and Marketing services.' },
    { name: 'Contact', path: '/#contact', icon: FileText, desc: 'Get in touch with our team.' },
    { name: 'Sign In / Register', path: '/auth', icon: Lock, desc: 'Access your account.' },
    { name: 'Privacy Policy', path: '/privacy', icon: Shield, desc: 'How we handle your data.' },
    { name: 'Terms of Service', path: '/terms', icon: FileText, desc: 'Rules for using our website.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 flex flex-col">
      <Navbar />
      <div className="pt-24 pb-12 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 text-center">Sitemap</h1>
            
            <div className="grid gap-6 md:grid-cols-2">
              {pages.map((page, index) => (
                <Link key={index} to={page.path} className="block group">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <page.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {page.name}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                          {page.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap;