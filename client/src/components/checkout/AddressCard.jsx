import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Check, Trash2, Edit2 } from 'lucide-react';

const AddressCard = ({ address, isSelected, onSelect, onDelete, onEdit }) => {
  return (
    <motion.div
      whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}
      onClick={() => onSelect(address)}
      className={`
        group relative p-6 rounded-[24px] border-2 cursor-pointer transition-all duration-300 bg-white
        ${isSelected 
          ? 'border-accent shadow-premium ring-4 ring-accent/5' 
          : 'border-slate-100 hover:border-slate-200'
        }
      `}
    >
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Check size={14} strokeWidth={3} />
        </motion.div>
      )}

      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${isSelected ? 'bg-accent/10 text-accent' : 'bg-slate-50 text-secondary'}`}>
          <MapPin size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
             <h4 className="text-sm font-bold text-primary uppercase tracking-tight truncate">{address.fullName}</h4>
             <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-md text-secondary">
               {address.type || 'Home'}
             </span>
          </div>
          <p className="text-xs text-secondary font-medium leading-relaxed mb-4 line-clamp-2 italic">
            {address.address}, {address.city}, {address.state} - {address.pincode}
          </p>
          <div className="flex items-center gap-2 text-primary">
             <Phone size={12} className="text-accent" />
             <span className="text-[10px] font-bold tracking-widest">{address.phone}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
         {onEdit && (
           <button onClick={(e) => { e.stopPropagation(); onEdit(address); }} className="p-2 hover:bg-slate-50 rounded-lg text-secondary hover:text-accent transition-colors">
             <Edit2 size={14} />
           </button>
         )}
         {onDelete && (
           <button onClick={(e) => { e.stopPropagation(); onDelete(address.id); }} className="p-2 hover:bg-slate-50 rounded-lg text-secondary hover:text-red-500 transition-colors">
             <Trash2 size={14} />
           </button>
         )}
      </div>
    </motion.div>
  );
};

export default AddressCard;
