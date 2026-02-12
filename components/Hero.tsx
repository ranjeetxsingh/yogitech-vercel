import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import TechMarquee from './ui/TechMarquee';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const scrollToServices = () => {
    const el = document.getElementById('services');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mouse Tracking for Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Dynamic Background Gradient
  const background = useMotionTemplate`radial-gradient(
    650px circle at ${mouseX}px ${mouseY}px,
    rgba(14, 165, 233, 0.10),
    transparent 80%
  )`;

  const handleNavClick = async (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();
      
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

  return (
    <>
      <div 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 group"
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />

        {/* Static Background Gradients & Grid */}
        <div className="absolute inset-0 w-full h-full bg-slate-50 dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          {/* Animated Glow Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Radial fade for background */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-slate-950 dark:via-transparent dark:to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                Your Trusted IT Partner
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Future-Proof Your <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">Digital Existence</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              We don't just fix computers; we engineer solutions. From recovering lost data to building enterprise-grade web applications, we are the architects of your digital peace of mind.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <button
                onClick={scrollToServices}
                className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1"
              >
                Discover Solutions
              </button>
              <a
                href="/#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 group"
              >
                Get a Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-500 z-10"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
      
      {/* Marquee Section */}
      <TechMarquee />
    </>
  );
};

export default Hero;