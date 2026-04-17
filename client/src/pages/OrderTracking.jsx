import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle, Truck, Box, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const steps = [
  { id: 1, title: 'Order Placed', icon: ShoppingBag },
  { id: 2, title: 'Confirmed', icon: CheckCircle },
  { id: 3, title: 'Shipped', icon: Box },
  { id: 4, title: 'Out for Delivery', icon: Truck },
  { id: 5, title: 'Delivered', icon: Home },
];

const OrderTracking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 5) setCurrentStep(prev => prev + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-bgLight dark:bg-[#09090b] pt-24 pb-20 transition-colors duration-300">
      <main className="max-w-3xl mx-auto px-6 pt-12 md:pt-16 lg:pt-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-textDark dark:text-white mb-2 italic">Live Tracking</h1>
          <p className="text-textMuted dark:text-gray-400 font-bold uppercase tracking-widest text-[10px]">Order #MOB-TRACK-9921</p>
        </div>

        <div className="glass-panel p-8 md:p-12 mb-10">
          <div className="flex justify-between relative mb-12">
            <div className="absolute top-7 left-0 right-0 h-1 bg-gray-100 dark:bg-white/5 z-0" />
            <motion.div 
              className="absolute top-7 left-0 h-1 bg-blue-600 z-10"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep - 1) * 25}%` }}
            />
            {steps.map((step) => (
              <div key={step.id} className="relative z-20 flex flex-col items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  currentStep >= step.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-gray-400 border border-gray-100 dark:border-white/5'
                }`}>
                  <step.icon size={22} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-tighter ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-500/10 p-6 rounded-[24px] border border-emerald-100 dark:border-emerald-500/20 flex items-center gap-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <Truck size={20} className="animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Status Update</p>
              <p className="font-black text-emerald-900 dark:text-emerald-400">Your package is {steps[currentStep-1].title.toLowerCase()}.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button onClick={() => navigate('/')} variant="outline" className="h-14">Back to Home</Button>
          <Button onClick={() => navigate('/my-orders')} variant="primary" className="h-14">Order History</Button>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
