import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Twitter, 
  Facebook,
  Smartphone,
  ArrowUpRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column - Spans 4 */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg shadow-blue-600/20">
                <Smartphone className="text-white" size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none">MOBIXA</span>
                <span className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mt-1">Premium Tech</span>
              </div>
            </Link>

            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm font-medium">
              Redefining the smartphone lifecycle with premium refurbished devices. Quality you can trust, technology you can afford.
            </p>

            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, link: "#" },
                { Icon: Twitter, link: "#" },
                { Icon: Facebook, link: "#" }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.link} 
                  className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
                >
                  <item.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - Spans 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-black uppercase tracking-[0.1em] text-white mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: "Shop All", path: "/shop" },
                { name: "Flash Deals", path: "/shop" },
                { name: "My Account", path: "/login" },
                { name: "Order Tracking", path: "/shop" }
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-[14px] font-medium flex items-center group w-fit"
                  >
                    <span className="transition-all duration-300 group-hover:mr-2">
                      {item.name}
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information - Spans 3 */}
          <div className="lg:col-span-3">
            <h4 className="text-[15px] font-black uppercase tracking-[0.1em] text-white mb-8">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">Call Support</p>
                  <a href="tel:+919876543210" className="text-[14px] font-bold text-gray-300 hover:text-blue-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:support@mobixa.com" className="text-[14px] font-bold text-gray-300 hover:text-blue-400 transition-colors">
                    support@mobixa.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Availability Column - Spans 3 */}
          <div className="lg:col-span-3">
            <h4 className="text-[15px] font-black uppercase tracking-[0.1em] text-white mb-8">Service Status</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-blue-500 shrink-0">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Support Hours</p>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-300">Mon - Sat, 9AM - 7PM</p>
                  <p className="text-[12px] text-gray-500 mt-1 font-medium">IST Timezone</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-[13px] text-gray-400 font-medium leading-relaxed">
                  Need help choosing? Our experts are available for live consultation.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-blue-600"></div>
            <p>© {currentYear} Mobixa Inc. Crafted with excellence.</p>
          </div>

          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link 
                key={item}
                to="/" 
                className="hover:text-blue-500 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;