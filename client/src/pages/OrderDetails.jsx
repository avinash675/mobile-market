import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ShieldCheck, Download, ChevronLeft, MapPin, CheckCircle, Truck } from 'lucide-react';

import Navbar from '../components/Navbar';
import Button from '../components/common/Button';
import { generateInvoice } from '../utils/generateInvoice';
import { useAppContext } from '../context/AppContext';

const OrderDetails = () => {
  const { orders } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // DEBUG: Log for troubleshooting
    console.log("OrderDetails: Searching for ID:", id);
    console.log("OrderDetails: Current Orders in state:", orders);

    // String-safe lookup to handle type mismatches (e.g., number in state vs. string in URL)
    const foundOrder = (orders || []).find(o => String(o.id) === String(id));
    
    if (foundOrder) {
      console.log("OrderDetails: Order Found!", foundOrder);
      // Apply the same status simulation logic as Orders.jsx to ensure consistency
      const orderTime = new Date(foundOrder.date).getTime();
      const now = Date.now();
      let currentStatus = foundOrder.status === 'pending' ? 'Pending' : 'Delivered';
      
      if (now - orderTime > 10000) {
        currentStatus = "Delivered";
      }
      
      setOrder({ ...foundOrder, status: currentStatus });
    } else {
      console.warn("OrderDetails: Order NOT FOUND in state.");
    }
  }, [id, orders]);

  if (!order) {
    return (
      <div className="min-h-screen bg-bgLight dark:bg-[#09090b] transition-colors duration-300">
        <Navbar />
        <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-text-primary dark:text-white mb-4">Order Not Found</h2>
          <Button variant="secondary" onClick={() => navigate('/my-orders')}>
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const isDelivered = order.status === 'Delivered';

  return (
    <div className="min-h-screen bg-bgLight dark:bg-slate-950 pt-24 pb-20 transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        {/* Header Navigation */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate('/my-orders')}
            className="w-10 h-10 flex items-center justify-center border border-border dark:border-white/10 rounded-2xl hover:bg-bg-soft dark:hover:bg-white/5 transition-colors duration-200 text-text-primary dark:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-text-primary dark:text-white tracking-tight">Order Details</h1>
            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Order #{order.id}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-8">
            {/* Status Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className={`p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center gap-6 ${isDelivered ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20' : 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20'}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${isDelivered ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' : 'bg-blue-500 shadow-lg shadow-blue-500/30'}`}>
                {isDelivered ? <CheckCircle size={28} className="text-white" /> : <Truck size={28} className="text-white animate-bounce" />}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className={`text-xl font-black mb-1 ${isDelivered ? 'text-emerald-700 dark:text-emerald-400' : 'text-blue-700 dark:text-blue-400'}`}>
                  {isDelivered ? 'Delivered Successfully' : 'Preparing for Shipment'}
                </h3>
                <p className={`text-sm font-medium ${isDelivered ? 'text-emerald-600/80 dark:text-emerald-500/80' : 'text-blue-600/80 dark:text-blue-500/80'}`}>
                  Ordered on {order.date ? new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Unknown Date'}
                </p>
              </div>
              {!isDelivered && (
                 <Button onClick={() => navigate('/order-tracking')} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white !px-6 !rounded-xl !py-3 shadow-md">
                   Track Order
                 </Button>
              )}
            </motion.div>

            {/* Items List */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <h4 className="text-lg font-black text-text-primary dark:text-white mb-4">Items in this order</h4>
              <div className="bg-white dark:bg-[#111113] border border-border dark:border-white/5 rounded-3xl shadow-sm overflow-hidden">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <div key={idx} className="p-6 flex flex-col sm:flex-row items-center gap-6 border-b border-border dark:border-white/5 last:border-0 hover:bg-bg-soft dark:hover:bg-white/[0.02] transition-colors">
                      <div className="w-24 h-24 bg-gray-50 dark:bg-white/[0.02] rounded-2xl flex items-center justify-center p-3 shrink-0 box-border">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <Package size={32} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h5 className="font-bold text-text-primary dark:text-white text-lg mb-1">{item.name}</h5>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">{item.storage || 'Standard'} · {item.condition || 'New'}</p>
                        <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-xl font-black text-text-primary dark:text-white">
                        ₹{item.price ? (item.price * item.quantity).toLocaleString() : '0'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-white/[0.02] rounded-2xl flex items-center justify-center p-3 shrink-0 box-border">
                      <Package size={28} className="text-gray-400" />
                    </div>
                    <div>
                        <h5 className="font-bold text-text-primary dark:text-white text-lg mb-1">{order.productName}</h5>
                        <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Qty: 1</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="space-y-6">
            
            {/* Price Summary */}
            <div className="bg-white dark:bg-[#111113] border border-border dark:border-white/5 rounded-3xl p-6 shadow-sm">
              <h4 className="text-base font-black text-text-primary dark:text-white mb-5 uppercase tracking-wider">Payment Summary</h4>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm font-medium text-text-secondary dark:text-gray-400">
                  <span>Method</span>
                  <span className="text-text-primary dark:text-white uppercase font-bold">{order.details?.paymentMethod || 'UPI'}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-text-secondary dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-bold uppercase tracking-widest">Free</span>
                </div>
              </div>
              <div className="h-px w-full bg-border dark:bg-white/10 mb-5"></div>
              <div className="flex justify-between text-lg font-black text-text-primary dark:text-white mb-6">
                <span>Total</span>
                <span>₹{order.price?.toLocaleString() || '0'}</span>
              </div>
              <Button onClick={() => generateInvoice(order)} variant="secondary" className="w-full !rounded-xl !py-3">
                <Download size={16} className="mr-2" />
                Download Invoice
              </Button>
            </div>

            {/* Shipping Details */}
            {order.details?.address && (
              <div className="bg-white dark:bg-[#111113] border border-border dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                 <div className="flex items-center gap-3 mb-1">
                   <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                     <MapPin size={18} />
                   </div>
                   <h4 className="text-base font-black text-text-primary dark:text-white tracking-tight">Shipping Details</h4>
                 </div>
                 <div className="pl-13 pl-[52px]">
                   <p className="text-sm font-bold text-text-primary dark:text-white mb-1">{order.details.address.fullName}</p>
                   <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed mb-2">
                     {order.details.address.addressLine1}<br/>
                     {order.details.address.city}, {order.details.address.state} {order.details.address.pincode}
                   </p>
                   <p className="text-sm font-medium text-text-secondary dark:text-gray-400 flex items-center gap-2">
                     <ShieldCheck size={14} className="text-emerald-500" /> Secure Delivery
                   </p>
                 </div>
              </div>
            )}
            
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default OrderDetails;
