import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ease = [0.16, 1, 0.3, 1];

const playPremiumChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Premium Minimal Bell
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    // Silently fail if audio context is blocked
  }
};

const AuthSplash = () => {
  React.useEffect(() => {
    playPremiumChime();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden touch-none"
    >
      {/* Background ambient glow with slow shift */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-indigo-500/[0.03] rounded-full blur-[100px] absolute -translate-y-10 translate-x-10 mix-blend-screen" />
          <div className="w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-fuchsia-500/[0.02] rounded-full blur-[80px] absolute translate-y-10 -translate-x-10 mix-blend-screen" />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10"
        initial={{ scale: 0.96, opacity: 0, y: 3 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.3,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1] // Smooth settle, no bounce
        }}
      >
        <motion.span 
          className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-tr from-[#E2E8F0] via-[#FFFFFF] to-[#C7D2FE]"
          animate={{
            textShadow: [
              "0px 0px 0px rgba(255,255,255,0)",
              "0px 0px 30px rgba(167,139,250,0.15)",
              "0px 0px 10px rgba(167,139,250,0.05)"
            ]
          }}
          transition={{ duration: 1.7, delay: 0.3, times: [0, 0.4, 1], ease: "easeInOut" }}
        >
          Mobixa.
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const Field = ({ label, type = 'text', placeholder, value, onChange, name, error }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-widest">
          {label}
        </label>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-[10px] font-bold text-red-500 uppercase tracking-tight"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        <input
          type={isPassword && show ? 'text' : type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className={`w-full bg-gray-50 dark:bg-white/[0.05] border ${error ? 'border-red-500/50' : 'border-gray-200 dark:border-white/[0.08]'} rounded-2xl py-3.5 px-4 text-sm text-[#09090b] dark:text-white placeholder:text-gray-300 dark:placeholder:text-white/20 font-medium outline-none focus:border-accent dark:focus:border-accent focus:ring-4 ${error ? 'focus:ring-red-500/10' : 'focus:ring-accent/10'} transition-all duration-200`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAppContext();
  
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 600));

      const emailLower = form.email.trim().toLowerCase();
      console.log("Login Input:", emailLower, form.password);
      
      // Fetch stored users
      const storedUsersJSON = localStorage.getItem("mobixa_users");
      const storedUsers = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];
      console.log("Users list:", storedUsers);

      const foundUser = storedUsers.find(
        u => u.email.toLowerCase() === emailLower && u.password === form.password
      );

      if (foundUser) {
        console.log("Logged in user:", foundUser);
        login(foundUser); // Updates context and session
        setShowSplash(true);
        
        setTimeout(() => {
          const redirectPath = localStorage.getItem('redirect_after_login');
          if (redirectPath) {
            localStorage.removeItem('redirect_after_login');
            navigate(redirectPath);
          } else {
            navigate("/");
          }
        }, 2000);
      } else {
        setError('Account not found. Please check email or sign up.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during local login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <AuthSplash />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="w-full max-w-md"
      >
        <div className="mb-10">
          <Link to="/" className="text-2xl font-black italic tracking-tight text-[#09090b] dark:text-white block mb-8">
            Mobixa.
          </Link>
          <h1 className="text-3xl font-black text-[#09090b] dark:text-white tracking-[-0.03em] mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Sign in to your account to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Email" type="email" name="email" placeholder="name@company.com" value={form.email} onChange={onChange} />
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-widest">Password</label>
              <Link to="#" className="text-[11px] font-bold text-accent hover:opacity-80 transition-opacity">Forgot?</Link>
            </div>
            <Field type="password" name="password" placeholder="••••••••" value={form.password} onChange={onChange} />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs font-bold tracking-tight bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-100 dark:border-red-500/20"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#09090b] dark:bg-white text-white dark:text-[#09090b] py-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity group flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
            {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
          </motion.button>
        </form>

        <p className="text-center text-[13px] text-gray-400 dark:text-gray-400 mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent font-bold hover:opacity-80 transition-opacity">Sign up</Link>
        </p>
      </motion.div>
    </>
  );
};

export const SignupForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const navigate = useNavigate();
  const { login } = useAppContext(); // Brought in to update Global User Context
  
  const onChange = e => {
    const { name, value } = e.target;
    
    // Real-time Phone filtering (digits only)
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setForm(f => ({ ...f, [name]: numericValue }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }

    // Clear specific error as user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Full Name Validation
    if (!form.name.trim() || form.name.trim().length < 3) {
      newErrors.name = 'Enter valid full name';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Enter valid email address';
    }

    // Phone Validation
    if (form.phone.length === 0) {
      newErrors.phone = 'Enter valid phone number';
    } else if (form.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Password Validation (min 6, letters and numbers)
    const passRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
    if (!passRegex.test(form.password)) {
      newErrors.password = 'Password must contain letters and numbers';
    }

    // Confirm Password
    if (form.confirm !== form.password) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError('');
    
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 600));

      const emailLower = form.email.trim().toLowerCase();
      
      const storedUsersJSON = localStorage.getItem("mobixa_users");
      const storedUsers = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];
      
      // Check for duplicate signup
      if (storedUsers.some(u => u.email.toLowerCase() === emailLower)) {
        setError('User with this email already exists.');
        return;
      }

      const userData = {
        name: form.name.trim(),
        email: emailLower,
        phone: form.phone.trim(),
        password: form.password, // Ideally hashed, kept plaintext here for pure frontend demo
        isAdmin: false,
        profileImage: null
      };
      
      // Store in users database array
      storedUsers.push(userData);
      localStorage.setItem("mobixa_users", JSON.stringify(storedUsers));
      console.log("Stored Users after signup:", storedUsers);
      
      // Set current session via context
      login(userData); // 🔥 instant UI update and storage sync
      
      setShowSplash(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setError('An error occurred during local signup.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <>
        <AnimatePresence>
          {showSplash && <AuthSplash />}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="w-full max-w-md"
      >
        <div className="mb-10">
          <Link to="/" className="text-2xl font-black italic tracking-tight text-[#09090b] dark:text-white block mb-8">
            Mobixa.
          </Link>
          <h1 className="text-3xl font-black text-[#09090b] dark:text-white tracking-[-0.03em] mb-2">
            Create account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Join thousands of smart buyers on Mobixa.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full Name" name="name" placeholder="John Doe" value={form.name} onChange={onChange} error={errors.name} />
          <Field label="Email" type="email" name="email" placeholder="name@company.com" value={form.email} onChange={onChange} error={errors.email} />
          <Field label="Phone Number" type="tel" name="phone" placeholder="98765 43210" value={form.phone} onChange={onChange} error={errors.phone} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Password" type="password" name="password" placeholder="••••••••" value={form.password} onChange={onChange} error={errors.password} />
            <Field label="Confirm" type="password" name="confirm" placeholder="••••••••" value={form.confirm} onChange={onChange} error={errors.confirm} />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs font-bold tracking-tight bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-100 dark:border-red-500/20"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#09090b] dark:bg-white text-white dark:text-[#09090b] py-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity group flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
            {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
          </motion.button>
        </form>

        <p className="text-center text-[13px] text-gray-400 dark:text-gray-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-accent font-bold hover:opacity-80 transition-opacity">Sign in</Link>
        </p>
      </motion.div>
      </>
  );
};

export default LoginForm;
