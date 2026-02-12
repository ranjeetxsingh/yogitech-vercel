import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Lock, Mail, User, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ui/ThemeToggle';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const user = await api.login(formData.email, formData.password);
        if (user) {
          if (user.role === 'admin') navigate('/admin');
          else navigate('/');
        } else {
          setError('Invalid email or password.');
        }
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setError('All fields are required.');
          return;
        }
        const user = await api.register(formData.name, formData.email, formData.password);
        if (user) {
            navigate('/');
        } else {
            setError('Registration failed. Email might be in use.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative transition-colors duration-300">
       <div className="absolute top-6 left-6 z-10">
         <button 
          onClick={() => navigate('/')}
          className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back Home
        </button>
       </div>

       <div className="absolute top-6 right-6 z-10">
         <ThemeToggle />
       </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
             <div className="inline-block w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
              Y
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {isLogin ? 'Welcome Back' : 'Join YogiTech'}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {isLogin ? 'Enter your details to access your account' : 'Start your digital journey with us today'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 py-8 px-8 shadow-2xl rounded-2xl border border-slate-100 dark:border-slate-800"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="block w-full pl-10 sm:text-sm border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="block w-full pl-10 sm:text-sm border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="block w-full pl-10 sm:text-sm border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</div>}

              {/* Admin Hint */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-800 dark:text-blue-300 flex gap-2">
                 <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                 <div>
                   <strong>Demo Admin Access:</strong><br/>
                   Email: admin@yogitech.co.nz<br/>
                   Password: admin
                 </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Or continue with</span>
              </div>
            </div>

             <div className="mt-6">
               <button
                  onClick={() => navigate('/#contact')}
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
               >
                 Continue as Guest <ArrowRight className="ml-2 w-4 h-4" />
               </button>
             </div>

             <div className="mt-6 text-center text-sm">
               <span className="text-slate-600 dark:text-slate-400">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>{' '}
               <button onClick={() => {setIsLogin(!isLogin); setError('');}} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                 {isLogin ? 'Register' : 'Sign In'}
               </button>
             </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Side Image (Hidden on mobile) */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-900">
        <div className="absolute inset-0 h-full w-full object-cover bg-gradient-to-br from-blue-900 to-slate-900 overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
           <div className="absolute inset-0 flex items-center justify-center p-20">
             <div className="text-white">
               <h3 className="text-4xl font-bold mb-6">Expert IT Solutions</h3>
               <p className="text-xl text-blue-100 max-w-lg">Join hundreds of satisfied clients who have transformed their digital infrastructure with YogiTech.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;