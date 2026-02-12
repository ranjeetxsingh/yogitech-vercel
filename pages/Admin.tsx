import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Enquiry, VisitorStat, SEOSettings } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Settings, Users, MessageSquare, TrendingUp, Search, Save, ArrowLeft, ArrowRight, Download, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'seo' | 'enquiries' | 'settings'>('dashboard');
  const [stats, setStats] = useState<VisitorStat[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [seo, setSeo] = useState<SEOSettings>({
    title: '',
    metaDescription: '',
    keywords: [],
    ogImage: ''
  });
  const [saveStatus, setSaveStatus] = useState('');
  const [resetStatus, setResetStatus] = useState(false);

  useEffect(() => {
    // Check local storage or validate token via API
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/auth');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const statsData = await api.getStats();
      const enquiriesData = await api.getEnquiries();
      const seoData = await api.getSEO();
      
      setStats(statsData || []);
      setEnquiries(enquiriesData || []);
      setSeo(seoData);
    } catch (error) {
      console.error("Failed to load admin data", error);
    }
  };

  const handleSeoSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateSEO(seo);
    setSaveStatus('Settings saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleResetData = async () => {
    if (window.confirm("Are you sure? This will delete all enquiries, custom users, and reset stats to default. This cannot be undone.")) {
      await api.resetDatabase();
      loadData();
      setResetStatus(true);
      setTimeout(() => setResetStatus(false), 3000);
    }
  };

  const generateSitemap = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.yogitech.co.nz/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.yogitech.co.nz/auth</loc>
    <priority>0.8</priority>
  </url>
</urlset>`;
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
        activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                Y
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">Admin</span>
            </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem id="dashboard" icon={TrendingUp} label="Dashboard" />
          <SidebarItem id="enquiries" icon={MessageSquare} label="Enquiries" />
          <SidebarItem id="seo" icon={Search} label="SEO & Sitemap" />
          <SidebarItem id="settings" icon={Settings} label="System Settings" />
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
             <span className="text-xs text-slate-500 font-medium">Appearance</span>
             <ThemeToggle />
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-8 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6">
           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
           <div className="flex gap-2">
             <ThemeToggle />
             <button onClick={() => navigate('/')} className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300">Exit</button>
           </div>
        </div>
        
        {/* Mobile Nav Tabs */}
        <div className="md:hidden flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>Dashboard</button>
            <button onClick={() => setActiveTab('enquiries')} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${activeTab === 'enquiries' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>Enquiries</button>
            <button onClick={() => setActiveTab('seo')} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${activeTab === 'seo' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>SEO</button>
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>Settings</button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
               <div className="text-sm text-slate-500 dark:text-slate-400">Last updated: Just now</div>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Visitors</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.reduce((acc, curr) => acc + curr.visitors, 0)}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-500/50 transition-colors" onClick={() => setActiveTab('enquiries')}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">New Enquiries</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{enquiries.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Page Views</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats.reduce((acc, curr) => acc + curr.pageViews, 0)}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              {/* SEO Quick Link */}
              <div 
                className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-blue-900 dark:to-slate-900 p-6 rounded-2xl shadow-sm border border-slate-700 cursor-pointer group"
                onClick={() => setActiveTab('seo')}
              >
                <div className="flex items-center justify-between h-full">
                  <div>
                    <p className="text-sm font-medium text-slate-400 dark:text-blue-200">Optimization</p>
                    <p className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                       Configure SEO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                    <Search className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-[400px]">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Visitor Trends</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#64748b" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#64748b" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }} 
                    />
                    <Line type="monotone" dataKey="visitors" stroke="#2563eb" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#2563eb'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-[400px]">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Engagement</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#64748b" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#64748b" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'rgba(148, 163, 184, 0.1)'}} contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.9)' }} />
                    <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pageViews" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Enquiries</h1>
            <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                {enquiries.length === 0 ? (
                  <li className="p-12 text-center text-slate-500 dark:text-slate-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No enquiries received yet.</p>
                  </li>
                ) : (
                  enquiries.map((enquiry) => (
                    <li key={enquiry.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex flex-col md:flex-row justify-between mb-3">
                        <div className="font-bold text-lg text-slate-900 dark:text-white">{enquiry.name} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">({enquiry.email})</span></div>
                        <div className="text-sm text-slate-400">{new Date(enquiry.date).toLocaleDateString()} {new Date(enquiry.date).toLocaleTimeString()}</div>
                      </div>
                      <div className="mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                          {enquiry.serviceInterest}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-sm">{enquiry.message}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">SEO & Sitemap</h1>
            <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
              <div className="mb-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Search Engine Visibility</h3>
                    <p className="text-sm text-slate-500">Manage how YogiTech appears on Google and other search engines.</p>
                  </div>
                  <button 
                    onClick={generateSitemap}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4" /> Download Sitemap.xml
                  </button>
              </div>

              <form onSubmit={handleSeoSave} className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Meta Title</label>
                        <input
                            type="text"
                            value={seo.title}
                            onChange={(e) => setSeo({...seo, title: e.target.value})}
                            className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3.5"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Meta Description</label>
                        <textarea
                            rows={4}
                            value={seo.metaDescription}
                            onChange={(e) => setSeo({...seo, metaDescription: e.target.value})}
                            className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3.5"
                        />
                        <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                           <span>Optimal length for search engines</span>
                           <span className={seo.metaDescription.length > 160 ? "text-red-500" : "text-green-500"}>{seo.metaDescription.length}/160</span>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Keywords</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                           {seo.keywords.map((k, i) => (
                             <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                               {k}
                             </span>
                           ))}
                        </div>
                        <input
                            type="text"
                            value={seo.keywords.join(', ')}
                            onChange={(e) => setSeo({...seo, keywords: e.target.value.split(',').map(s => s.trim())})}
                            className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3.5"
                            placeholder="IT Support, Web Design, ..."
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Open Graph Image URL</label>
                        <input
                            type="text"
                            value={seo.ogImage}
                            onChange={(e) => setSeo({...seo, ogImage: e.target.value})}
                            className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3.5"
                        />
                    </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                  <span className={`font-medium text-sm transition-all duration-300 ${saveStatus ? 'text-green-600 dark:text-green-400 opacity-100' : 'opacity-0'}`}>
                    {saveStatus || 'Saved'}
                  </span>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition hover:scale-105"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Settings</h1>
            
            <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl border border-red-200 dark:border-red-900 p-6 md:p-8">
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-6 h-6" />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reset Database</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 mb-4">
                       Clear all registered users, enquiries, and restore default SEO and Visitor stats. 
                       This is useful for resetting the demo environment. 
                       <br/><strong className="text-red-600 dark:text-red-400">Warning: This action cannot be undone.</strong>
                    </p>
                    
                    <button
                       onClick={handleResetData}
                       className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                       <Trash2 className="w-4 h-4 mr-2" />
                       Reset All Data
                    </button>

                    {resetStatus && (
                       <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-medium animate-pulse">
                          <CheckCircle className="w-5 h-5 mr-2" /> Data reset successfully.
                       </div>
                    )}
                 </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
               <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">About this Backend</h4>
               <p className="text-sm text-blue-800 dark:text-blue-200">
                  This application uses a client-side mock backend powered by LocalStorage. 
                  In a production environment, this would be replaced by a Node.js/Express API and a MongoDB database.
                  Currently, all your changes are persisted in your browser cache.
               </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;