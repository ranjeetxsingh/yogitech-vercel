import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">Y</div>
            <div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">YogiTech</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} YogiTech NZ.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;