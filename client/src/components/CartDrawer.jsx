import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Button from './common/Button';
import iphoneImg from '../assets/images/iphone.png';

const ease = [0.16, 1, 0.3, 1];

const CartItemImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src || iphoneImg);
  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => imgSrc !== iphoneImg && setImgSrc(iphoneImg)}
      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
      loading="lazy"
    />
  );
};

const CartDrawer = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useAppContext();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFree = subtotal > 50000;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300, mass: 0.8 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] glass-panel !rounded-none !rounded-l-[40px] border-y-0 border-r-0 z-[110] flex flex-col overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.12)]"
          >
            {/* Header */}
            <div className="p-8 pb-6 border-b border-gray-50 dark:border-white/5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-accent/10 dark:bg-accent/20 text-accent rounded-2xl flex items-center justify-center">
                  <ShoppingBag size={20} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-textDark dark:text-white tracking-tight leading-none">
                    Your Cart
                  </h2>
                  <p className="text-[10px] font-bold text-textMuted dark:text-white/30 uppercase tracking-widest mt-1">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl transition-colors duration-200 text-textDark dark:text-white"
                aria-label="Close cart"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-7 space-y-5 scrollbar-hide">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-16"
                >
                  <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-[32px] flex items-center justify-center text-gray-300 dark:text-white/10">
                    <ShoppingBag size={48} strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-textDark dark:text-white mb-2 tracking-tight">Cart is empty</h3>
                    <p className="text-textMuted dark:text-white/40 text-sm font-medium max-w-[200px] mx-auto leading-relaxed">
                      Your premium picks will appear here.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsCartOpen(false)}
                    variant="primary"
                    size="sm"
                    className="mt-2"
                  >
                    Start Exploring
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.35, ease }}
                      className="flex gap-5 group"
                    >
                      {/* Image */}
                      <div className="w-[88px] h-[88px] rounded-[20px] bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 p-3 overflow-hidden flex-shrink-0">
                        <CartItemImage src={item.image} alt={item.name} />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h3 className="font-black text-textDark dark:text-white text-sm tracking-tight truncate leading-tight group-hover:text-accent transition-colors duration-200">
                              {item.name}
                            </h3>
                            <p className="text-[10px] font-bold text-textMuted dark:text-white/30 uppercase tracking-wider mt-1">
                              {item.storage} · {item.condition}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-all duration-200 ease-in-out hover:scale-110 cursor-pointer flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={18} strokeWidth={2.5} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center gap-1 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl p-1 border border-white/20 dark:border-white/5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-colors duration-200 text-textDark dark:text-white"
                            >
                              <Minus size={12} strokeWidth={2.5} />
                            </button>
                            <span className="w-7 text-center text-sm font-black text-textDark dark:text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-colors duration-200 text-textDark dark:text-white"
                            >
                              <Plus size={12} strokeWidth={2.5} />
                            </button>
                          </div>
                          <span className="font-black text-base text-textDark dark:text-white tracking-tight">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-7 pt-6 border-t border-white/20 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl flex-shrink-0 space-y-5"
              >
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-textMuted dark:text-white/40 uppercase tracking-widest">
                      Subtotal
                    </span>
                    <span className="text-2xl font-black text-textDark dark:text-white tracking-tightest">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${shippingFree ? 'bg-success' : 'bg-amber-400'}`} />
                    <p className="text-[10px] font-bold text-textMuted dark:text-white/40 uppercase tracking-widest">
                      {shippingFree ? 'Free delivery included' : `Add ₹${(50001 - subtotal).toLocaleString()} more for free delivery`}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => { setIsCartOpen(false); navigate('/address'); }}
                    variant="primary"
                    className="w-full !py-4 !text-[11px] group"
                  >
                    Checkout <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-[10px] font-black uppercase tracking-widest text-textMuted dark:text-white/30 hover:text-accent dark:hover:text-accent transition-colors duration-200 text-center py-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
