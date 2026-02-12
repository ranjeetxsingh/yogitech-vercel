import React, { useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import EnquiryForm from '../components/EnquiryForm';
import { SERVICES } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Home: React.FC = () => {
  // Categorize services for better display
  const categories = ['IT', 'Development', 'Marketing'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = activeCategory === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Services Section */}
        <section id="services" className="py-24 relative z-10 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6"
              >
                Our Expertise
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
              >
                Delivering enterprise-grade IT solutions tailored for your business growth.
              </motion.p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center flex-wrap gap-2 mb-12">
               {['All', ...categories].map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                     activeCategory === cat 
                       ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' 
                       : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            <motion.div 
              layout
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features/Stats Section with Modern Gradient */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { number: '500+', label: 'Clients Served' },
                { number: '99%', label: 'Success Rate' },
                { number: '24/7', label: 'Support' },
                { number: '10+', label: 'Years Exp' }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">{stat.number}</div>
                  <div className="text-slate-400 font-medium uppercase tracking-wider text-xs md:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Revamped Contact Section */}
        <section id="contact" className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Contact Us</h2>
               <p className="text-lg text-slate-600 dark:text-slate-400">Let's discuss how we can transform your business.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
               {/* Contact Info Side */}
               <div className="lg:w-1/2 p-8 lg:p-12 bg-slate-900 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
                 
                 <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
                   <div className="space-y-8">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                          <MapPin className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Visit Our Office</p>
                          <p className="text-slate-300 mt-1">123 Tech Avenue, Auckland CBD<br/>New Zealand, 1010</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                          <Phone className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Call Us</p>
                          <p className="text-slate-300 mt-1">0800 YOGI TECH<br/>+64 21 123 4567</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                          <Mail className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Email Us</p>
                          <p className="text-slate-300 mt-1">support@yogitech.co.nz<br/>sales@yogitech.co.nz</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                          <Clock className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Working Hours</p>
                          <p className="text-slate-300 mt-1">Mon - Fri: 9am - 6pm<br/>Sat: 10am - 2pm</p>
                        </div>
                      </div>
                   </div>

                   {/* Map Placeholder */}
                   <div className="mt-12 h-48 w-full rounded-xl bg-slate-800 overflow-hidden relative border border-slate-700">
                     <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Map Location" 
                      className="w-full h-full object-cover opacity-50"
                     />
                     <div className="absolute inset-0 flex items-center justify-center">
                       <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">Auckland, NZ</span>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Form Side */}
               <div className="lg:w-1/2 p-8 lg:p-12 bg-white dark:bg-slate-800">
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h3>
                 <EnquiryForm />
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;