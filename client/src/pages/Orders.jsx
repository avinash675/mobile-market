import React, { useState, useMemo, useEffect } from 'react';
import { Package, ShoppingBag, Eye, Navigation, Filter, ArrowUpDown, Download } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { generateInvoice } from '../utils/generateInvoice';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';


const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Delivered':
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[11px] font-black uppercase tracking-wider">{status}</span>
        </div>
      );
    case 'Shipped':
    case 'Out for Delivery':
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-500/20 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[11px] font-black uppercase tracking-wider">{status}</span>
        </div>
      );
    case 'Pending':
    default:
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 rounded-full border border-amber-200 dark:border-amber-500/20 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 translate-y-px"></div>
          <span className="text-[11px] font-black uppercase tracking-wider">{status}</span>
        </div>
      );
  }
};

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const { orders } = useAppContext();
  const [filter, setFilter] = useState('All'); // 'All' | 'Delivered' | 'Pending'
  const [sortBy, setSortBy] = useState('latest'); 
  const [ordersWithStatus, setOrdersWithStatus] = useState([]);

  useEffect(() => {
    // Simulate delivery update for UI matching
    const updatedOrders = orders.map(order => {
      const orderTime = new Date(order.date).getTime();
      const now = Date.now();
      let currentStatus = order.status === 'pending' ? 'Pending' : 'Delivered';
      if (now - orderTime > 10000) currentStatus = "Delivered";
      return { ...order, status: currentStatus };
    });

    setOrdersWithStatus(updatedOrders);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let result = [...ordersWithStatus];
    
    // Apply filters
    if (filter === 'Delivered') {
      result = result.filter(o => o.status === 'Delivered');
    } else if (filter === 'Pending') {
      result = result.filter(o => ['Pending', 'Shipped', 'Out for Delivery'].includes(o.status));
    }

    // Apply sorting
    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return result;
  }, [filter, sortBy, ordersWithStatus]);

  return (
    <div className="min-h-screen bg-bgLight dark:bg-slate-950 pt-24 pb-20 transition-colors duration-300">
      

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="mb-10 block">
          <p className="text-xs font-black text-accent uppercase tracking-widest mb-2 px-1">Customer Dashboard</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black mb-2 text-text-primary dark:text-white tracking-tight">My Orders</h1>
              <p className="text-sm font-medium text-text-secondary dark:text-gray-400">View and download your order details anytime</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2.5 bg-white dark:bg-[#111113] border border-border dark:border-white/10 rounded-xl text-sm font-bold text-text-primary dark:text-white shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="All">All Orders</option>
                  <option value="Pending">Active / Pending</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <Filter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-500 pointer-events-none" />
              </div>

              <div className="relative group">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2.5 bg-white dark:bg-[#111113] border border-border dark:border-white/10 rounded-xl text-sm font-bold text-text-primary dark:text-white shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <ArrowUpDown size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Orders List */}
        <div className="space-y-4">

          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white dark:bg-[#111113] rounded-2xl p-5 sm:p-6 border border-border dark:border-white/5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 flex-1">
                    
                    {/* Icon/Image representation */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 dark:bg-white/[0.02] rounded-[18px] border border-border dark:border-white/5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent dark:from-white/5 z-0" />
                      {order.image && !order.image.includes('Products') ? (
                         <img src={order.image} alt={order.productName} className="w-full h-full object-contain p-2 relative z-10" />
                      ) : (
                         <Package size={28} strokeWidth={1.5} className="text-text-secondary dark:text-gray-400 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <p className="text-[11px] font-black text-text-secondary dark:text-gray-500 uppercase tracking-widest">{order.id}</p>
                        <div className="w-1 h-1 rounded-full bg-border dark:bg-gray-600 hidden sm:block" />
                        <p className="text-[11px] font-bold text-text-secondary dark:text-gray-500 hidden sm:block">
                          {order.date ? new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown Date'}
                        </p>
                      </div>
                      <h3 className="text-lg font-black text-text-primary dark:text-white leading-tight mb-1">{order.productName}</h3>
                      <p className="text-sm font-bold text-text-primary dark:text-gray-300">₹{order.price?.toLocaleString() || '0'}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-4 md:gap-3 shrink-0 border-t md:border-t-0 border-border dark:border-white/10 pt-4 md:pt-0">
                    <StatusBadge status={order.status} />

                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <Button 
                        variant="secondary" 
                        onClick={() => generateInvoice(order)}
                        className="flex-1 sm:flex-none !px-4 !py-2.5 !text-[12px] !rounded-xl border-dashed border-border hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        <Download size={14} className="mr-1.5" /> Invoice
                      </Button>
                      
                      {order.status !== 'Delivered' ? (
                        <div className="flex gap-2">
                          <Button 
                            variant="primary" 
                            onClick={() => navigate('/order-tracking')}
                            className="flex-1 sm:flex-none !px-4 !py-2.5 !text-[12px] shadow-md shadow-primary/20 !rounded-xl"
                          >
                            <Navigation size={14} className="mr-1.5" /> Track
                          </Button>
                          <Button variant="secondary" onClick={() => navigate(`/order/${order.id}`)} className="flex-1 sm:flex-none !px-4 !py-2.5 !text-[12px] !rounded-xl">
                            <Eye size={14} className="mr-1.5" /> Details
                          </Button>
                        </div>
                      ) : (
                        <Button variant="secondary" onClick={() => navigate(`/order/${order.id}`)} className="flex-1 sm:flex-none !px-4 !py-2.5 !text-[12px] !rounded-xl">
                          <Eye size={14} className="mr-1.5" /> Details
                        </Button>
                      )}
                    </div>
                  </div>

                </motion.div>
              ))
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-white dark:bg-[#111113] rounded-3xl p-12 border border-border dark:border-white/5 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-24 h-24 bg-gray-50 dark:bg-white/[0.02] rounded-full flex items-center justify-center mb-6 border border-border dark:border-white/5">
                  <ShoppingBag size={40} className="text-text-secondary dark:text-gray-500 opacity-50" />
                </div>
                <h3 className="text-xl font-black text-text-primary dark:text-white mb-2">No orders found</h3>
                <p className="text-sm text-text-secondary dark:text-gray-400 mb-8 max-w-sm">
                  {filter === 'All' ? "You haven’t placed any orders yet. Discover our latest smartphones and upgrade today." : `There are no orders matching the '${filter}' filter.`}
                </p>
                <Link to="/shop">
                  <Button variant="primary" className="!px-8 !py-3.5 shadow-lg shadow-primary/20">
                    Start Shopping
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default MyOrdersPage;



