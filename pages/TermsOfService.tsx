import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const TermsOfService: React.FC = () => {
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
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8">Terms of Service</h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h3>1. Agreement to Terms</h3>
              <p>
                By accessing our website at www.yogitech.co.nz, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>

              <h3>2. Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on YogiTech's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>attempt to decompile or reverse engineer any software contained on YogiTech's website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>

              <h3>3. Disclaimer</h3>
              <p>
                The materials on YogiTech's website are provided on an 'as is' basis. YogiTech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h3>4. Limitations</h3>
              <p>
                In no event shall YogiTech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on YogiTech's website, even if YogiTech or a YogiTech authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h3>5. Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of New Zealand and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;