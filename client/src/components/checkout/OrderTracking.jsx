import React from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Truck, Home, ShoppingBag, Clock } from 'lucide-react';

const TRACKING_STEPS = [
  { id: 1, title: 'Order Placed', icon: ShoppingBag, description: 'We have received your order' },
  { id: 2, title: 'Packed', icon: Package, description: 'Your item has been packed' },
  { id: 3, title: 'Shipped', icon: Truck, description: 'Item is on the way to your city' },
  { id: 4, title: 'Out for Delivery', icon: Clock, description: 'Our partner is delivering your order' },
  { id: 5, title: 'Delivered', icon: Home, description: 'Order successfully delivered' },
];

const OrderTracking = ({ currentStep = 1 }) => {
  return (
    <div className="py-md px-sm">
      <div className="space-y-0 relative">
        {/* Connecting Line Base */}
        <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-border" />
        
        {/* Animated Progress Line Overlay */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: `${((currentStep - 1) / (TRACKING_STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-[23px] top-6 w-0.5 bg-accent z-10 origin-top"
        />

        {TRACKING_STEPS.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="relative flex gap-md pb-xl last:pb-0">
              {/* Step Indicator */}
              <div className="relative z-20">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-12 h-12 rounded-standard flex items-center justify-center transition-all duration-500 shadow-premium ${
                    isCompleted || isActive ? 'bg-accent text-white shadow-accent/20' : 
                    'bg-white border border-border text-secondary'
                  } ${isActive ? 'scale-110 shadow-accent/40' : ''}`}
                >
                  {isCompleted ? <Check size={20} strokeWidth={3} /> : <StepIcon size={20} />}
                  
                  {/* Glow effect for active step */}
                  {isActive && (
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-accent rounded-standard -z-10"
                    />
                  )}
                </motion.div>
              </div>

              {/* Step Content */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="flex flex-col justify-center"
              >
                <h4 className={`text-body-sm font-bold tracking-tight ${isActive || isCompleted ? 'text-primary' : 'text-secondary'}`}>
                  {step.title}
                </h4>
                <p className="text-caption font-medium text-secondary max-w-[200px]">
                  {isActive ? step.description : isCompleted ? 'Completed' : 'Pending'}
                </p>
                {isActive && (
                  <span className="text-[9px] font-bold text-accent uppercase tracking-widest mt-1">In Progress</span>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
