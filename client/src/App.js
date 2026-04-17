import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CartDrawer from './components/CartDrawer';
import LivePurchaseNotification from './components/LivePurchaseNotification';
import Navbar from './components/Navbar';
import MobixaAI from './components/MobixaAI';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import { useAppContext } from './context/AppContext';
import OrderSuccess from './pages/OrderSuccess';

// ... (imports remain the same)
import Home from './pages/HomePage';
import Shop from './pages/Shop';
import Deals from './pages/Deals';
import ProductDetails from './pages/ProductDetails';

// Critical Auth & Core Routes (Direct Import to prevent ChunkLoadError)
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import CartPage from './pages/CartPage';

// A wrapper around React.lazy to prevent ChunkLoadError in development (hot reload) and production
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
      }
      throw error;
    }
  });

// Lazy loading remaining pages for background performance
const Wishlist       = lazyWithRetry(() => import('./pages/Wishlist'));
const AddressPage    = lazyWithRetry(() => import('./pages/AddressPage'));
const PaymentPage    = lazyWithRetry(() => import('./pages/PaymentPage'));
const SuccessPage    = lazyWithRetry(() => import('./pages/SuccessPage'));
const Orders         = lazyWithRetry(() => import('./pages/Orders'));
const OrderTracking  = lazyWithRetry(() => import('./pages/OrderTracking'));
const OrderDetails   = lazyWithRetry(() => import('./pages/OrderDetails'));
const AboutPage      = lazyWithRetry(() => import('./pages/AboutPage'));
const Profile         = lazyWithRetry(() => import('./pages/Profile'));


// Fast, instant-like page transition without heavy blurs
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15, ease: "easeIn" }
  },
};

const PageTransition = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ willChange: 'opacity, transform' }}
  >
    {children}
  </motion.div>
);

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-bgLight dark:bg-slate-950 flex flex-col">
    <div className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-white/5" />
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-20 space-y-8">
      <div className="h-64 bg-gray-100 dark:bg-slate-800 rounded-[32px] animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-72 bg-gray-100 dark:bg-slate-800 rounded-[24px] animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  const location = useLocation();
  const { isProcessingOrder } = useAppContext();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  
  // Hide chatbot on auth and checkout pages
  const hideChatbotRoutes = ['/login', '/signup', '/checkout'];

  const hideFooterRoutes = [
    "/login",
    "/signup",
    "/checkout",
    "/profile",
    "/my-orders",
    "/order",
    "/order-tracking"
  ];

  const shouldHideFooter = hideFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen bg-bgLight dark:bg-slate-950 text-textDark dark:text-white font-sans antialiased transition-colors duration-300">
      <ScrollToTop />
      
      {/* Global floating UI elements */}
      <CartDrawer />
      <LivePurchaseNotification />
      {!hideChatbotRoutes.some(route => location.pathname.startsWith(route)) && <MobixaAI />}
      
      {/* Only show Navbar on pages other than Login and Signup */}
      {!['/login', '/signup'].some(route => location.pathname.startsWith(route)) && <Navbar />}

      <AnimatePresence mode="wait" initial={false}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<PageTransition><Home /></PageTransition>} />
        <Route path="/shop"     element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/deals"    element={<PageTransition><Deals /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
        <Route path="/cart"     element={<PageTransition><CartPage /></PageTransition>} />
        <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
        <Route path="/login"    element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup"   element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/address"  element={<PageTransition><AddressPage /></PageTransition>} />
        <Route path="/payment"  element={<PageTransition><PaymentPage /></PageTransition>} />
        <Route path="/success"  element={<PageTransition><SuccessPage /></PageTransition>} />
        <Route path="/order-success" element={<PageTransition><OrderSuccess /></PageTransition>} />
        <Route path="/about"    element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/my-orders"   element={<PageTransition><Orders /></PageTransition>} />
        <Route path="/order/:id"   element={<PageTransition><OrderDetails /></PageTransition>} />
        <Route path="/profile"     element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/order-tracking" element={<PageTransition><OrderTracking /></PageTransition>} />
      </Routes>
          </Suspense>
        </ErrorBoundary>
      </AnimatePresence>

      {/* Show Footer on everywhere except Login, Signup, Profile, Orders, etc. */}
      {!shouldHideFooter && !isProcessingOrder && <Footer />}
    </div>
  );
};

export default App;
