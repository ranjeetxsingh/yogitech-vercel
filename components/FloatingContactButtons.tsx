import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContactButtons: React.FC = () => {
  const phoneNumber = '+64211234567';
  const whatsappNumber = '64211234567'; 
  const [hovered, setHovered] = useState<string | null>(null);
  const [autoShow, setAutoShow] = useState(false);

  useEffect(() => {
    // Initial delay of 5 seconds
    const initialTimer = setTimeout(() => {
      setAutoShow(true);
      // Hide after 5 seconds
      setTimeout(() => setAutoShow(false), 5000);
    }, 5000);

    // Repeat every 20 seconds
    const interval = setInterval(() => {
      setAutoShow(true);
      setTimeout(() => setAutoShow(false), 5000);
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const buttons = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      href: `https://wa.me/${whatsappNumber}`,
      color: 'bg-[#25D366] hover:bg-[#20bd5a] shadow-green-500/30',
      label: 'Chat on WhatsApp',
      delay: 0
    },
    {
      id: 'phone',
      icon: Phone,
      href: `tel:${phoneNumber}`,
      color: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30',
      label: 'Call Us Now',
      delay: 0.1
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end pointer-events-none">
      {buttons.map((btn) => (
        <div 
          key={btn.id} 
          className="flex items-center gap-4 pointer-events-auto"
          onMouseEnter={() => setHovered(btn.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {(hovered === btn.id || autoShow) && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap border border-slate-100 dark:border-slate-700"
              >
                {btn.label}
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={btn.href}
            target={btn.id === 'whatsapp' ? "_blank" : undefined}
            rel={btn.id === 'whatsapp' ? "noopener noreferrer" : undefined}
            aria-label={btn.label}
          >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: btn.delay }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${btn.color}`}
            >
                <btn.icon className="w-7 h-7" />
            </motion.div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default FloatingContactButtons;
