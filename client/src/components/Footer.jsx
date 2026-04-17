import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Twitter, 
  Facebook,
  Smartphone
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // ✅ FIX: Scroll to top when route changes via footer links
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-white/5">
      
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <Smartphone className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">MOBIXA</span>
          </Link>

          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Your trusted platform for premium refurbished smartphones. Quality guaranteed, prices redefined.
          </p>

          <div className="flex items-center gap-4">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a key={i} href="#!" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "Cart", path: "/cart" },
              { name: "Login", path: "/login" }
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
          <ul className="space-y-5">
            <li className="flex items-start gap-3 group">
              <div className="icon-box">
                <MapPin size={16} />
              </div>
              <span className="text-slate-400 text-sm mt-1">Mobixa, India</span>
            </li>

            <li className="flex items-start gap-3 group">
              <div className="icon-box">
                <Phone size={16} />
              </div>
              <a href="tel:+919876543210" className="link-text">
                +91 98765 43210
              </a>
            </li>

            <li className="flex items-start gap-3 group">
              <div className="icon-box">
                <Mail size={16} />
              </div>
              <a href="mailto:support@mobixa.com" className="link-text">
                support@mobixa.com
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Support Hours</h4>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <div className="flex items-center gap-3 text-cyan-400">
              <Clock size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Availability</span>
            </div>

            <p className="text-slate-300 font-medium">Mon - Sat</p>
            <p className="text-slate-500 text-sm">9:00 AM - 7:00 PM</p>

            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Active Now
            </span>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-medium">
        <p>© {currentYear} Mobixa Inc. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-white transition">Privacy</Link>
          <Link to="/" className="hover:text-white transition">Terms</Link>
          <Link to="/" className="hover:text-white transition">Cookies</Link>
        </div>
      </div>

      {/* Reusable Styles */}
      <style>
        {`
          .icon-box {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .link-text {
            color: #94a3b8;
            transition: 0.2s;
          }

          .link-text:hover {
            color: #22d3ee;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;