import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 flex flex-col">
      <Navbar />
      <div className="pt-24 pb-12 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8">Privacy Policy</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h3>1. Introduction</h3>
              <p>
                Welcome to YogiTech. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>

              <h3>2. Data We Collect</h3>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
              </p>
              <ul>
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
              </ul>

              <h3>3. How We Use Your Data</h3>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul>
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>

              <h3>4. Data Security</h3>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>

              <h3>5. Contact Us</h3>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at: <br/>
                <strong>Email:</strong> support@yogitech.co.nz
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;