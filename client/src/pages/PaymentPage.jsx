import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import StepIndicator from '../components/checkout/StepIndicator';
import OrderSummary from '../components/checkout/OrderSummary';
import PaymentMethods from '../components/checkout/PaymentMethods';
import Button from '../components/common/Button';
import BankRedirectScreen from '../components/checkout/BankRedirectScreen';
import PaymentProcessingScreen from '../components/checkout/PaymentProcessingScreen';


const ease = [0.16, 1, 0.3, 1];

const banks = [
  { id: 'hdfc',   name: 'HDFC Bank',      color: '#1E3A8A' },
  { id: 'icici',  name: 'ICICI Bank',     color: '#F97316' },
  { id: 'sbi',    name: 'SBI',            color: '#0369A1' },
  { id: 'axis',   name: 'Axis Bank',      color: '#9D174D' },
  { id: 'kotak',  name: 'Kotak',          color: '#EF4444' },
  { id: 'canara', name: 'Canara',         color: '#0EA5E9' },
  { id: 'idbi',   name: 'IDBI Bank',      color: '#10B981' },
  { id: 'pnb',    name: 'PNB',            color: '#BE123C' },
  { id: 'bob',    name: 'Bank of Baroda', color: '#F97316' },
];

const PaymentPage = () => {
  const { cart, checkoutData, updateCheckoutData, clearCart, addOrder, user, setIsProcessingOrder } = useAppContext();
  const navigate = useNavigate();
  const [isPaying, setIsPaying]           = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isProcessing, setIsProcessing]   = useState(false);
  const [selectedBank, setSelectedBank]   = useState(null);


  useEffect(() => {
    const saved = localStorage.getItem('mobixa_last_bank');
    if (saved) setSelectedBank(saved);
  }, []);

  useEffect(() => {
    // Strictly require login
    if (!user) {
      localStorage.setItem('redirect_after_login', '/payment');
      navigate('/login');
    }
    else if (!checkoutData.address) navigate('/address');
  }, [checkoutData.address, navigate, user]);


  const handleBankSelect = (id) => {
    setSelectedBank(id);
    localStorage.setItem('mobixa_last_bank', id);
  };

  const handlePayment = async () => {
    if (isProcessing || isPaying) return;
    setIsPaying(true);

    if (checkoutData.paymentMethod === 'netbanking') {
      await new Promise(r => setTimeout(r, 800));
      setIsRedirecting(true);
      await new Promise(r => setTimeout(r, 2000));
      setIsRedirecting(false);
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 2000));
    } else if (checkoutData.paymentMethod === 'upi') {
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 2000));
    } else if (checkoutData.paymentMethod === 'cod') {
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 1000));
    }
    
    // SAVE ORDER (Unified context flow)
    const newOrder = {
      id: `MOB-${Date.now()}-${Math.floor(Math.random() * 10000)}`.toString(),
      date: new Date().toISOString(),
      status: 'pending',
      productName: cart.length === 1 ? cart[0].name : `${cart.length} Items`,
      brand: cart[0]?.brand || 'Mixed',
      price: total,
      image: cart[0]?.image || 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
      items: cart,
      details: {
        address: checkoutData.address,
        paymentMethod: checkoutData.paymentMethod
      }
    };
    
    // CLEAR CART
    clearCart();
    localStorage.removeItem("mobixa_cart");

    // BLOCK UI and Navigate to Celebration
    addOrder(newOrder);
    setIsProcessingOrder(true); 
    setIsProcessing(false);
    setIsPaying(false);
    
    navigate('/order-success', { replace: true });
  };



  if (cart.length === 0) return null;

  const subtotal      = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const shipping      = subtotal > 50000 ? 0 : 499;
  const total         = subtotal + shipping - (checkoutData.coupon ? subtotal * 0.1 : 0);
  const payDisabled = 
    (checkoutData.paymentMethod === 'netbanking' && !selectedBank) ||
    (checkoutData.paymentMethod === 'upi' && selectedBank !== 'READY');
  const selectedBankData = banks.find(b => b.id === selectedBank);

  return (
    <>
      <AnimatePresence>
        {isRedirecting && <BankRedirectScreen bankName={selectedBankData?.name} bankColor={selectedBankData?.color} />}
        {isProcessing  && <PaymentProcessingScreen />}
      </AnimatePresence>

      {/* Removed local success screen in favor of global /order-success flow */}


      <div className="min-h-screen bg-bgLight dark:bg-[#09090b] pt-24 pb-20 transition-colors duration-300">
        <main className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
            <StepIndicator currentStep="payment" />
          </motion.div>

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
            
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="lg:col-span-7 space-y-10"
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/address')}
                  className="w-10 h-10 flex items-center justify-center border border-border dark:border-white/10 rounded-2xl hover:bg-bg-soft dark:hover:bg-white/5 transition-colors duration-200 text-text-primary dark:text-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <div>
                  <h1 className="heading-2">Payment</h1>
                  <p className="text-sm text-text-secondary dark:text-gray-400 flex items-center gap-1.5 mt-1 font-medium">
                    <Lock size={12} className="text-success" />
                    256-bit SSL encrypted connection
                  </p>
                </div>
              </div>

              {/* Payment methods */}
              <div className="card p-8 bg-bg-soft dark:bg-white/[0.02]">
                 <PaymentMethods
                  selectedMethod={checkoutData.paymentMethod}
                  onSelect={(m) => updateCheckoutData({ paymentMethod: m })}
                  selectedBank={selectedBank}
                  onSelectBank={handleBankSelect}
                />
              </div>
            </motion.div>

            {/* Sidebar summary */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="lg:col-span-5 relative"
            >
              <div className="sticky top-32 space-y-8">
                <OrderSummary
                  cart={cart}
                  coupon={checkoutData.coupon}
                  onApplyCoupon={(c) => updateCheckoutData({ coupon: c })}
                />
                
                {/* Pay button */}
                <div className="space-y-4">
                  <Button
                    onClick={handlePayment}
                    isLoading={isPaying}
                    variant="primary"
                    disabled={payDisabled}
                    className="w-full !py-5 group text-sm shadow-xl"
                  >
                    {isPaying ? 'Processing' : 
                     checkoutData.paymentMethod === 'cod' ? `Place Order (COD) - ₹${total.toLocaleString()}` :
                     `Pay ₹${total.toLocaleString()}`}
                    {!isPaying && <ShieldCheck size={18} />}
                  </Button>

                  {/* Trust logos */}
                  <div className="flex items-center justify-center gap-6 opacity-30 pt-4">
                    {['UPI', 'RAZORPAY', 'RuPay'].map(name => (
                      <span key={name} className="label uppercase">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Mobile sticky CTA */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6, type: 'spring', damping: 24 }}
          className="fixed bottom-0 inset-x-0 p-4 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl border-t border-border dark:border-white/5 lg:hidden z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]"
        >
          <Button
            onClick={handlePayment}
            isLoading={isPaying}
            disabled={payDisabled}
            className="w-full !py-4"
          >
            {isPaying ? 'Processing' : 
             checkoutData.paymentMethod === 'cod' ? `Place Order (COD) - ₹${total.toLocaleString()}` :
             `Pay ₹${total.toLocaleString()}`}
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default PaymentPage;
