import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

const NAMES = ["Rahul", "Ankit", "Priya", "Sneha", "Vikram", "Neha", "Arjun", "Aditi", "Karan", "Pooja", "Rohan", "Suresh", "Amir", "Sarah", "John"];
const CITIES = ["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Surat"];
const PRODUCTS = [
  "iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra", "OnePlus 12", 
  "Google Pixel 8 Pro", "Nothing Phone (2)", "Vivo X100 Pro",
  "Xiaomi 14 Ultra", "Oppo Find X7 Ultra", "iQOO 12 5G", "iPhone 14 Plus"
];

const LivePurchaseNotification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Helper to trigger a notification
    const triggerNotification = () => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      
      setNotification({
        id: Date.now(),
        name: randomName,
        city: randomCity,
        product: randomProduct,
        timeAgo: Math.floor(Math.random() * 5) + 1 // 1-5 mins ago
      });

      // Auto hide the notification after 4 seconds
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    };

    // Initial delay so nothing pops up instantly on page load
    const initialDelay = setTimeout(() => {
      triggerNotification();
    }, 8000);

    // Continuous randomized interval (15-25 seconds)
    const runContinuous = () => {
      const nextDelay = Math.floor(Math.random() * 10000) + 15000;
      return setTimeout(() => {
        triggerNotification();
        intervalRef = runContinuous(); // Schedule next recursively
      }, nextDelay);
    };

    let intervalRef = runContinuous();

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(intervalRef);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[999] pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-white dark:bg-[#1a1c23] border border-border dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 pr-10 flex items-start gap-3 w-[300px] sm:w-[320px] pointer-events-auto relative"
          >
            {/* Close Button */}
            <button 
              onClick={() => setNotification(null)}
              className="absolute top-3 right-3 text-text-secondary dark:text-gray-500 hover:text-text-primary dark:hover:text-white transition-colors focus-visible:outline-none"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>

            {/* Icon */}
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <p className="text-[13px] text-text-primary dark:text-white leading-[1.3]">
                <span className="font-bold">{notification.name}</span> from <span className="font-semibold">{notification.city}</span> purchased
              </p>
              <p className="text-[13px] font-bold text-accent dark:text-accent-light mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                {notification.product}
              </p>
              <p className="text-[10px] text-text-secondary dark:text-gray-500 mt-1 font-medium">
                {notification.timeAgo} min{notification.timeAgo > 1 ? 's' : ''} ago
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LivePurchaseNotification;
