import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  Smartphone,
  ArrowLeft
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import PaymentCard3D from '../components/checkout/PaymentCard3D';

const Checkout = () => {
  const { cart, checkoutData, updateCheckoutData, user } = useAppContext();
  const navigate = useNavigate();

  // Strict Auth Protection
  useEffect(() => {
    if (!user) {
      localStorage.setItem('redirect_after_login', '/checkout');
      navigate('/login');
    }
  }, [user, navigate]);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upi: '',
    bank: ''
  });

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.address) newErrors.address = 'Street address is required';
    if (formData.pincode.length !== 6) newErrors.pincode = '6-digit pincode required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (checkoutData.paymentMethod === 'card') {
      if (formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = '16-digit card number required';
      if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) newErrors.expiry = 'MM/YY required';
      if (formData.cvv.length < 3) newErrors.cvv = '3-4 digit CVV required';
    } else if (checkoutData.paymentMethod === 'upi') {
      if (!formData.upi.includes('@')) newErrors.upi = 'Invalid UPI ID format';
    } else if (checkoutData.paymentMethod === 'netbanking') {
      if (!formData.bank) newErrors.bank = 'Please select your bank';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateShipping()) setStep(2);
  };

  const handlePayment = () => {
    if (validatePayment()) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
      }, 2500);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = v.match(/.{1,4}/g) || [];
    return parts.join(' ').substring(0, 19);
  };

  return (
    <div className="min-h-screen bg-bg-soft dark:bg-[#09090b] pt-24 lg:pt-32 pb-24 transition-colors duration-500">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        <AnimatePresence mode="wait">
          {step === 3 ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <div className="h-24 w-24 bg-accent/10 rounded-full flex items-center justify-center mb-8 relative">
                <CheckCircle2 size={64} className="text-accent" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">Payment Successful!</h1>
              <p className="text-lg text-secondary max-w-md mx-auto mb-10">
                Your order for {cart.length} items has been confirmed.
              </p>
              <Button variant="primary" size="lg" onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
            </motion.div>
          ) : (
            <div key="form" className="flex flex-col gap-8 lg:gap-12">
              {/* Global Header */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 w-32">
                  <div className={`h-1.5 w-full rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-primary dark:bg-white' : 'bg-slate-200 dark:bg-white/10'}`} />
                  <div className={`h-1.5 w-full rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-primary dark:bg-white' : 'bg-slate-200 dark:bg-white/10'}`} />
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-3xl lg:text-4xl font-black text-text-primary dark:text-white tracking-tight">
                    {step === 1 ? 'Shipping Details' : 'Secure Payment'}
                  </h2>
                  {step === 2 && (
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-text-primary dark:hover:text-white transition-all group">
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Edit Shipping
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Order: 1. Card (Top) */}
              {step === 2 && checkoutData.paymentMethod === 'card' && (
                <div className="lg:hidden w-full flex justify-center perspective-[1200px] px-4 mb-4">
                  <PaymentCard3D 
                    cardNumber={formData.cardNumber}
                    cardHolder={formData.name}
                    expiry={formData.expiry}
                    cvv={formData.cvv}
                    isFlipped={isCvvFocused}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
                {/* 2. Payment Form (Desktop Left / Mobile 2nd) */}
                <div className="lg:col-span-7 space-y-8">
                  {step === 1 ? (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <Input label="Full Name" placeholder="e.g. John Doe" className="col-span-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} error={errors.name} />
                      <Input label="Email Address" placeholder="john@example.com" className="col-span-2" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} error={errors.email} />
                      <Input label="Street Address" placeholder="123 Luxury Lane" className="col-span-2" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} error={errors.address} />
                      <Input label="City" placeholder="Bengaluru" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                      <Input label="Pincode" placeholder="560001" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} error={errors.pincode} />
                      <Button variant="primary" size="lg" className="col-span-2 mt-4" onClick={handleNext} icon={ChevronRight} iconPosition="right">
                        Continue to Payment
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-3 gap-4 mb-6 px-1">
                        {[
                          { id: 'card', icon: CreditCard, label: 'Card' },
                          { id: 'upi', icon: Smartphone, label: 'UPI' },
                          { id: 'netbanking', icon: Building2, label: 'Bank' }
                        ].map(method => (
                          <button
                            key={method.id}
                            onClick={() => updateCheckoutData({ paymentMethod: method.id })}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300 ${checkoutData.paymentMethod === method.id ? 'border-primary dark:border-white bg-primary/5 dark:bg-white/10 text-primary dark:text-white' : 'border-white/20 bg-white/50 dark:bg-white/5 text-text-secondary hover:border-text-primary/40 dark:hover:border-white/40 glass-panel'}`}
                          >
                            <method.icon size={24} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{method.label}</span>
                          </button>
                        ))}
                      </div>

                      <Card className="p-10 border-none glass-panel shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-black/40 mt-0 relative overflow-hidden group">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-[32px]"></div>
                        
                        {checkoutData.paymentMethod === 'card' && (
                          <div className="grid grid-cols-2 gap-5 relative z-10">
                            <Input label="Card Number" placeholder="0000 0000 0000 0000" className="col-span-2 bg-white/40 dark:bg-black/20 shadow-sm rounded-xl border-white/20 dark:border-white/5 focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/20 transition-all duration-300" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: formatCardNumber(e.target.value)})} maxLength={19} error={errors.cardNumber} onFocus={() => setIsCvvFocused(false)} />
                            <Input label="Expiry (MM/YY)" placeholder="12/26" className="bg-white/40 dark:bg-black/20 shadow-sm rounded-xl border-white/20 dark:border-white/5 focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/20 transition-all duration-300" value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} error={errors.expiry} onFocus={() => setIsCvvFocused(false)} />
                            <Input label="CVV" placeholder="***" type="password" maxLength={3} className="bg-white/40 dark:bg-black/20 shadow-sm rounded-xl border-white/20 dark:border-white/5 focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/20 transition-all duration-300" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} error={errors.cvv} onFocus={() => setIsCvvFocused(true)} onBlur={() => setIsCvvFocused(false)} />
                          </div>
                        )}

                        {checkoutData.paymentMethod === 'upi' && (
                          <Input label="UPI ID" placeholder="example@upi" value={formData.upi} onChange={(e) => setFormData({...formData, upi: e.target.value})} error={errors.upi} />
                        )}

                        {checkoutData.paymentMethod === 'netbanking' && (
                          <div className="space-y-4">
                            <label className="text-[10px] text-secondary uppercase tracking-widest font-bold">Select Bank</label>
                            <select className="w-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl p-4 text-sm font-bold focus:border-text-primary dark:focus:border-white outline-none" value={formData.bank} onChange={(e) => setFormData({...formData, bank: e.target.value})}>
                              <option value="">Choose your bank</option>
                              <option value="sbi">State Bank of India</option>
                              <option value="hdfc">HDFC Bank</option>
                              <option value="icici">ICICI Bank</option>
                            </select>
                            {errors.bank && <p className="text-[10px] text-red-500 font-bold">{errors.bank}</p>}
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  )}
                </div>

                {/* 3. Order Summary & Desktop Card (Desktop Right / Mobile 3rd) */}
                <div className="lg:col-span-5 space-y-8">
                  {/* Desktop Card Preview - Perfect Top Alignment */}
                  {step === 2 && checkoutData.paymentMethod === 'card' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hidden lg:flex w-full justify-center perspective-[1200px]"
                    >
                      <PaymentCard3D 
                        cardNumber={formData.cardNumber}
                        cardHolder={formData.name}
                        expiry={formData.expiry}
                        cvv={formData.cvv}
                        isFlipped={isCvvFocused}
                      />
                    </motion.div>
                  )}

                  <div className="glass-panel rounded-[32px] p-8 relative overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/20 group">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-white/40">Order Summary</h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                          <CheckCircle2 size={10} className="text-emerald-500" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Secure</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-text-secondary dark:text-white/60">{item.name} <span className="text-xs opacity-40">×{item.quantity}</span></span>
                            <span className="text-sm font-bold text-text-primary dark:text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                        <span className="text-xs font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest">Total</span>
                        <div className="text-right">
                          <span className="block text-[10px] text-text-secondary/50 dark:text-white/20 line-through">₹{(total + 1000).toLocaleString()}</span>
                          <span className="text-2xl font-black text-text-primary dark:text-white tracking-tight">₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Pay Button (Bottom) - Full width mobile, Centered desktop */}
              {step === 2 && (
                <div className="w-full flex justify-center mt-4">
                  <Button 
                    loading={isProcessing} 
                    disabled={isProcessing} 
                    variant="primary" 
                    size="lg" 
                    className="w-full lg:w-auto lg:px-24 uppercase tracking-[0.2em] font-black py-6 rounded-full shadow-2xl shadow-primary/20 dark:shadow-white/5" 
                    onClick={handlePayment}
                  >
                    {isProcessing ? 'Verifying...' : `Pay ₹${total.toLocaleString()}`}
                  </Button>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;
