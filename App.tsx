import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Sitemap from './pages/Sitemap';
import { api } from './services/api';
import { ThemeProvider } from './contexts/ThemeContext';
import CustomCursor from './components/ui/CustomCursor';
import FloatingContactButtons from './components/FloatingContactButtons';

// Utility to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    const initSEO = async () => {
        // Apply SEO settings on load
        const seo = await api.getSEO();
        document.title = seo.title || 'YogiTech IT Solutions';
        
        // Create/Update meta tags
        const updateMeta = (name: string, content: string) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('name', name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
        };

        updateMeta('description', seo.metaDescription || '');
        if (seo.keywords) updateMeta('keywords', seo.keywords.join(', '));
    };
    initSEO();
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
        <FloatingContactButtons />
      </Router>
    </ThemeProvider>
  );
};

export default App;