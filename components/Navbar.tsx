import React, { useState, useEffect } from 'react';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import ThemeToggle from './ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = api.getCurrentUser();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    api.logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleNavClick = async (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Check if it's an anchor link
    if (path.includes('#')) {
      const [pathname, hash] = path.split('#');
      const targetId = hash;
      
      // If we are not on home page, go there first
      if (location.pathname !== pathname && pathname === '/') {
        await navigate('/');
        // Wait for route change then scroll
        setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 150);
      } else {
        // We are on the page, just scroll
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group relative z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-blue-500/50 transition-all">
              Y
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">YogiTech</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.path} 
                onClick={(e) => handleNavClick(e, link.path)}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
            
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                {user.role === 'admin' && (
                   <Link 
                   to="/admin" 
                   className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 font-medium"
                 >
                   <LayoutDashboard className="w-4 h-4" />
                   Admin
                 </Link>
                )}
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium hidden lg:inline">Hi, {user.name.split(' ')[0]}</span>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4 relative z-50">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-40"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              {user ? (
                <>
                  <div className="border-t border-slate-200 dark:border-slate-700 my-2 pt-2"></div>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800/50"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mt-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                           <UserIcon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="text-base font-medium text-slate-800 dark:text-slate-200">{user.name}</div>
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{user.email}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="ml-auto flex-shrink-0 p-2 rounded-full text-slate-400 hover:text-red-500 bg-white dark:bg-slate-700 shadow-sm"
                      >
                        <LogOut className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block w-full text-center px-4 py-3 mt-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transform active:scale-95 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;