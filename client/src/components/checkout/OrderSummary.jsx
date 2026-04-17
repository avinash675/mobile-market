import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Check, Truck } from 'lucide-react';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';

const OrderSummary = ({ cart, coupon, onApplyCoupon }) => {
  const [couponInput, setCouponInput] = useState('');
  const { getDeliveryTime, checkoutData } = useAppContext();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = subtotal > 50000 ? 0 : 499;
  const discount = coupon ? (subtotal * 0.1) : 0; // 10% discount for demo
  const total = subtotal + delivery - discount;

  return (
    <div className="card bg-white dark:bg-[#09090b] p-6 lg:p-8">
      <h2 className="heading-3 mb-6 flex items-center gap-2">
        Order Summary
        <span className="label bg-bg-soft dark:bg-white/5 px-2 py-0.5 rounded-full">
          {cart.length} Items
        </span>
      </h2>

      {/* Product Mini List (Scrollable) */}
      <div className="space-y-4 mb-8 max-h-60 overflow-y-auto scrollbar-hide pr-2">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-4 items-center group"
            >
              <div className="h-16 w-16 bg-bg-soft dark:bg-white/5 rounded-[10px] p-2 flex-shrink-0 border border-border dark:border-white/5 transition-colors group-hover:border-text-primary/20 dark:group-hover:border-white/20">
                <img src={item.image} alt={item.name} className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary dark:text-white truncate">{item.name}</p>
                <p className="label capitalize mt-0.5">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-text-primary dark:text-white">₹{item.price ? (item.price * item.quantity).toLocaleString() : '0'}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Coupon Section */}
      <div className="mb-8">
        <div className="flex gap-2 items-center">
          <input 
            type="text"
            placeholder="Enter Coupon"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="form-input flex-1"
          />
          <Button 
            onClick={() => onApplyCoupon(couponInput)}
            variant="secondary"
            className="!px-6 h-[46px]"
          >
            Apply
          </Button>
        </div>
        <AnimatePresence>
          {coupon && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[12px] text-success font-medium mt-3 ml-1 flex items-center gap-1.5"
            >
              <Check size={12} strokeWidth={3} /> Coupon applied! 10% Off
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 border-t border-border dark:border-white/10 pt-6 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-gray-400">Subtotal</span>
          <span className="text-text-primary dark:text-white font-medium">₹{subtotal?.toLocaleString() || '0'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-gray-400 flex items-center gap-1.5"><Truck size={14} className="text-accent" /> Est. Delivery</span>
          <span className="text-text-primary dark:text-white font-bold">{getDeliveryTime(checkoutData.address?.state, checkoutData.address?.city)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-gray-400">Delivery</span>
          <span className="text-text-primary dark:text-white font-medium">{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
        </div>
        <AnimatePresence>
          {discount > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex justify-between text-sm text-success font-medium"
            >
              <span>Discount</span>
              <span>- ₹{discount?.toLocaleString() || '0'}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-between items-end pt-6 border-t border-border dark:border-white/10 relative mt-2">
          <div>
            <span className="block label mb-1">Total Amount</span>
            <motion.span 
              key={total}
              initial={{ opacity: 0.5, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-black text-text-primary dark:text-white block tracking-tight"
            >
              ₹{total?.toLocaleString() || '0'}
            </motion.span>
          </div>
          <div className="text-right">
             <motion.span 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="label text-success flex items-center justify-end gap-1 font-semibold"
             >
               <ShieldCheck size={14} /> Secure
             </motion.span>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-text-secondary/50 dark:text-gray-500 text-center font-medium">
        Secured by Mobixa Fintech Protocol 2.0
      </p>
    </div>
  );
};

export default OrderSummary;
