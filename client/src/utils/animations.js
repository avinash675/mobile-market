export const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  
  drawer: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { type: "spring", damping: 25, stiffness: 200 }
  },
  
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  
  heartPop: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.4, 1] },
    transition: { duration: 0.3 }
  },
  
  press: {
    whileTap: { scale: 0.98 },
    transition: { duration: 0.1 }
  },
  
  hover: {
    whileHover: { scale: 1.02, y: -4 },
    transition: { duration: 0.2, ease: "easeOut" }
  },
  
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};
