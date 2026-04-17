import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import StepIndicator from '../components/checkout/StepIndicator';
import OrderSummary from '../components/checkout/OrderSummary';
import Button from '../components/common/Button';

const ease = [0.16, 1, 0.3, 1];

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, checkoutData, updateCheckoutData, user } = useAppContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      // Save intent to return here after login
      localStorage.setItem('redirect_after_login', '/address');
      // Toast or simple alert for now
      alert("Please login to continue checkout");
      navigate('/login');
      return;
    }
    navigate('/address');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bgLight dark:bg-slate-950 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="w-28 h-28 bg-white dark:bg-slate-900 rounded-[32px] shadow-card flex items-center justify-center mx-auto mb-10 border border-gray-100 dark:border-white/5"
          >
            <ShoppingBag size={56} className="text-gray-200 dark:text-white/10" strokeWidth={1} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <h1 className="text-4xl font-black text-textDark dark:text-white mb-4 tracking-tightest">
              Your cart is empty
            </h1>
            <p className="text-textMuted dark:text-white/40 mb-10 leading-relaxed">
              Looks like you haven't added any premium smartphones yet.
            </p>
            <Link to="/">
              <Button size="lg" className="w-full">Start Exploring</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgLight dark:bg-[#09090b] pt-24 pb-20 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <StepIndicator currentStep="cart" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-black text-textDark dark:text-white tracking-tightest">
                Shopping Cart
              </h1>
              <span className="text-[10px] font-black text-textMuted dark:text-white/40 bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 px-4 py-2 rounded-2xl uppercase tracking-widest shadow-sm">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, ease }}
                  className="bg-white dark:bg-slate-900 rounded-[28px] p-6 md:p-8 border border-gray-100/80 dark:border-white/5 shadow-card hover:shadow-card-hover dark:shadow-none transition-all duration-500 group flex flex-col md:flex-row items-center gap-6 md:gap-8 relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>

                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <h3 className="text-lg font-bold text-textDark dark:text-white truncate">{item.name}</h3>
                    <p className="text-xs text-textMuted dark:text-gray-400 mb-2">{item.storage} · {item.condition}</p>
                    <div className="text-xl font-black text-textDark dark:text-white">₹{item.price?.toLocaleString() || '0'}</div>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800 p-1.5 rounded-xl">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                      <Minus size={14} />
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                      <Plus size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-white/5">
              <Link to="/" className="text-sm font-bold text-textMuted hover:text-textDark flex items-center gap-2">
                <ChevronLeft size={16} /> Continue Shopping
              </Link>
              <Button onClick={handleCheckout} className="px-10 h-14">
                Proceed to Checkout <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cart={cart}
              coupon={checkoutData.coupon}
              onApplyCoupon={(c) => updateCheckoutData({ coupon: c })}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
