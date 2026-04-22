import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Package, 
  Phone,
  Mail,
  Heart,
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const Profile = () => {
  const { user, logout, wishlist, orders, updateUser } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showEditModal, setShowEditModal] = useState(false);

  console.log("Updated user:", user);

  // Animation constants for Apple-level smoothness
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  // Orders are managed via AppContext for site-wide syncing
  const recentOrders = orders.slice(0, 3);
  
  console.log("Profile Orders:", orders);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser({ profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Safe Rendering Check
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-bgLight dark:bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-black mb-2 dark:text-white">Account Limited</h2>
          <p className="text-text-secondary dark:text-gray-400 mb-8 font-medium">Please sign in to access your personal dashboard and order history.</p>
          <Button variant="primary" size="lg" className="w-full h-14" onClick={() => navigate('/login')}>
            Sign In Now
          </Button>
        </motion.div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'orders',    label: 'My Orders',  icon: ShoppingBag },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'settings',  label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-bgLight dark:bg-[#09090b] pt-24 pb-20 sm:pt-32">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
          <div>
            <h1 className="text-4xl font-black tracking-tight dark:text-white mb-1">Account Dashboard</h1>
            <p className="text-text-secondary dark:text-gray-400 font-medium">Manage your profile, orders, and preferences.</p>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 transition-colors w-fit shadow-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar Menu */}
          <motion.aside 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="lg:col-span-3 space-y-2"
          >
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                variants={itemVariants}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                    : 'glass-panel hover:bg-white dark:hover:bg-white/5 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                  <span className="font-bold text-[14px]">{item.label}</span>
                </div>
                {activeTab !== item.id && (
                  <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                )}
              </motion.button>
            ))}
          </motion.aside>

          {/* Main Content Area */}
          <motion.main 
            layout
            className="lg:col-span-9"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  {/* User Profile Card */}
                  <div className="glass-panel p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10 w-full">
                      <div className="flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative group cursor-pointer">
                          <input 
                            type="file" 
                            id="avatar-upload" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                          />
                          <label htmlFor="avatar-upload" className="block cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-black italic shadow-2xl border-4 border-white/20 overflow-hidden relative">
                              {user.profileImage ? (
                                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                user.name.charAt(0)
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-tighter text-white">
                                <MapPin size={16} className="mb-1" />
                                Change
                              </div>
                            </div>
                          </label>
                        </div>
                        <div className="text-center sm:text-left">
                          <h2 className="text-2xl font-black dark:text-white mb-2">{user.name}</h2>
                          <div className="flex flex-col gap-2 items-center sm:items-start text-text-secondary dark:text-gray-400 font-medium text-[13px]">
                            <span className="flex items-center gap-2"><Mail size={14} className="text-blue-500" /> {user.email}</span>
                            <span className="flex items-center gap-2"><Phone size={14} className="text-blue-500" /> {user.phone || '+91 98765 43210'}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="!rounded-xl border border-border dark:border-white/10"
                        onClick={() => setShowEditModal(true)}
                      >
                        <Settings size={14} className="mr-2" /> Edit Profile
                      </Button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 dark:bg-blue-500/10 mb-4">
                        <ShoppingBag size={24} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Orders</span>
                      <span className="text-3xl font-black dark:text-white">{orders.length}</span>
                    </div>
                    <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 dark:bg-red-500/10 mb-4">
                        <Heart size={24} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Wishlist</span>
                      <span className="text-3xl font-black dark:text-white">{wishlist.length}</span>
                    </div>
                    <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 dark:bg-amber-500/10 mb-4">
                        <Package size={24} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Returns</span>
                      <span className="text-3xl font-black dark:text-white">0</span>
                    </div>
                  </div>

                  {/* Recent Orders Overview */}
                  <div className="glass-panel p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold dark:text-white">Recent Orders</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-sm font-bold text-blue-500 hover:underline">View All</button>
                    </div>

                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                           <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                             <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                                  <Package size={20} className="text-blue-500" />
                               </div>
                               <div>
                                 <p className="font-bold text-sm dark:text-white">Order #{order.id?.slice(-6).toUpperCase() || 'N/A'}</p>
                                 <p className="text-xs text-text-secondary dark:text-gray-400">{order.date ? new Date(order.date).toLocaleDateString() : 'Unknown Date'}</p>
                               </div>
                             </div>
                             <div className="text-right">
                               <p className="font-black text-sm dark:text-white mb-1">₹{order.total?.toLocaleString('en-IN') || '0'}</p>
                               <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
                                 {order.status || 'Processing'}
                               </span>
                             </div>
                           </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ShoppingBag size={24} className="text-gray-400" />
                        </div>
                        <p className="text-text-secondary dark:text-gray-400 font-medium">No recent orders found.</p>
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/shop')}>Start Shopping</Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel p-8"
                >
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-[32px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 group">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                              <Package size={28} className="text-blue-500" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Order #{order.id?.slice(-6).toUpperCase() || 'N/A'}</p>
                              <h4 className="font-bold text-lg dark:text-white mb-1">{order.productName || 'Order Item'}</h4>
                              <p className="text-xs text-text-secondary dark:text-gray-400 font-medium">Placed on {order.date ? new Date(order.date).toLocaleDateString() : 'Unknown Date'}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3 mt-4 sm:mt-0">
                            <p className="text-xl font-black dark:text-white leading-none">₹{order.price?.toLocaleString() || '0'}</p>
                            <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                              {order.status || 'Processing'}
                            </span>
                            <button onClick={() => navigate(`/order/${order.id}`)} className="text-[11px] font-bold text-blue-500 flex items-center gap-1 hover:underline">
                              View Full Details <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <ShoppingBag size={48} className="text-gray-200 dark:text-white/10 mb-6" />
                      <h4 className="text-lg font-bold dark:text-white mb-2">Track & Manage Your Orders</h4>
                      <p className="text-text-secondary dark:text-gray-400 max-w-xs mx-auto mb-8">You can track your active orders and view your purchase history right here.</p>
                      <Button variant="primary" onClick={() => navigate('/shop')}>Start Shopping</Button>
                    </div>
                  )}
                </motion.div>
              )}

              {(activeTab === 'addresses' || activeTab === 'settings') && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel p-8"
                >
                  <h3 className="text-xl font-bold dark:text-white mb-8">
                    {activeTab === 'addresses' ? 'Saved Addresses' : 'Account Settings'}
                  </h3>
                  <div className="p-12 text-center bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                    <Settings className="mx-auto text-gray-400 mb-4 animate-spin-slow" />
                  <p className="text-text-secondary dark:text-gray-400 font-medium">This section is currently under maintenance. Please check back soon!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>
      {/* Profile Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <EditProfileModal 
            user={user} 
            onClose={() => setShowEditModal(false)} 
            onSave={(updated) => {
              updateUser(updated);
              setShowEditModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-components ---

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white dark:bg-slate-900 rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl border border-gray-100 dark:border-white/5"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black dark:text-white tracking-tightest">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Full Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full bg-gray-50 dark:bg-slate-800 border-2 ${errors.name ? 'border-red-500' : 'border-transparent focus:border-blue-500'} rounded-2xl px-5 py-4 font-bold text-textDark dark:text-white outline-none transition-all`}
            />
            {errors.name && <p className="text-xs text-red-500 font-bold ml-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Email Address</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full bg-gray-50 dark:bg-slate-800 border-2 ${errors.email ? 'border-red-500' : 'border-transparent focus:border-blue-500'} rounded-2xl px-5 py-4 font-bold text-textDark dark:text-white outline-none transition-all`}
            />
            {errors.email && <p className="text-xs text-red-500 font-bold ml-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Phone Number</label>
            <input 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={`w-full bg-gray-50 dark:bg-slate-800 border-2 ${errors.phone ? 'border-red-500' : 'border-transparent focus:border-blue-500'} rounded-2xl px-5 py-4 font-bold text-textDark dark:text-white outline-none transition-all`}
            />
            {errors.phone && <p className="text-xs text-red-500 font-bold ml-1">{errors.phone}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="secondary" className="flex-1 !rounded-2xl h-14" onClick={onClose} type="button">Cancel</Button>
            <Button variant="primary" className="flex-1 !rounded-2xl h-14 shadow-lg shadow-blue-500/20" type="submit">Save Changes</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
