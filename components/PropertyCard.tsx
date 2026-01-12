
import React, { useState } from 'react';
import { Property } from '../types';
import { Heart, Star, MapPin, Bed, Bath, Zap, Flame, Phone, MessageCircle, CheckCircle2, Trash2, Edit, AlertCircle, Check, X as CloseIcon, Loader2 } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEdit, onDelete }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    // Add a small artificial delay to make the process feel "strong" and professional
    await new Promise(r => setTimeout(r, 800));
    onDelete?.();
    setIsDeleting(false);
    setIsConfirmingDelete(false);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full relative">
      
      {/* Deletion Confirmation Overlay */}
      {isConfirmingDelete && (
        <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-200">
          {isDeleting ? (
             <div className="flex flex-col items-center gap-4 animate-pulse">
                <Loader2 size={48} className="text-white animate-spin" />
                <h3 className="text-white text-xl font-black uppercase tracking-tighter italic">Deleting Post...</h3>
             </div>
          ) : (
            <>
              <div className="bg-red-500/20 p-4 rounded-full mb-4">
                <AlertCircle size={48} className="text-red-500" />
              </div>
              <h3 className="text-white text-xl font-black mb-2 tracking-tight">Delete Listing?</h3>
              <p className="text-slate-400 text-xs mb-8 font-medium">This action is permanent and cannot be undone.</p>
              <div className="flex gap-4 w-full">
                <button 
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                >
                  <Check size={16} /> Yes, Delete
                </button>
                <button 
                  onClick={() => setIsConfirmingDelete(false)}
                  className="flex-1 bg-white/10 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <CloseIcon size={16} /> Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="relative h-64 overflow-hidden shrink-0">
        <img 
          src={property.images[0] || 'https://picsum.photos/seed/placeholder/800/600'} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm w-fit ${property.purpose === 'For Sale' ? 'bg-indigo-600 text-white' : 'bg-white/95 text-slate-900'}`}>
              {property.purpose}
            </span>
            <span className="bg-white/95 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm w-fit">
              {property.type}
            </span>
          </div>
          
          <div className="flex gap-1">
            {property.hasElectricity && (
              <span className="bg-yellow-400/90 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 shadow-sm">
                <Zap size={10} fill="currentColor" /> BIJLI
              </span>
            )}
            {property.hasGas && (
              <span className="bg-orange-500/90 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1 shadow-sm">
                <Flame size={10} fill="currentColor" /> GAS
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={(e) => {e.preventDefault(); setIsLiked(!isLiked)}} 
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${isLiked ? 'bg-red-500 text-white shadow-lg' : 'bg-white/50 text-white hover:bg-white hover:text-red-500'}`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
           {(property.hasElectricity || property.hasGas) && (
             <div className="bg-black/40 backdrop-blur-md text-white p-2 rounded-xl border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-[10px] font-medium flex items-center gap-1">
                  <CheckCircle2 size={10} className="text-green-400" /> Utilities Verified
                </p>
             </div>
           )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">
              {property.title}
            </h3>
            <div className="text-right">
              <p className="text-lg font-black text-slate-900 whitespace-nowrap">
                {property.price.toLocaleString()}
              </p>
              <p className="text-[10px] font-bold text-blue-500 uppercase leading-none">
                {property.currency} {property.purpose === 'For Rent' ? '/ Mo' : ''}
              </p>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
               <h2 className="text-3xl font-black text-red-600 leading-tight uppercase tracking-tight">
                 {property.city}
               </h2>
               <p className="text-blue-600 font-bold text-lg leading-none">
                 {property.area}
               </p>
            </div>
            <div className="flex items-start gap-1 pt-1">
               <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" />
               <p className="text-sm text-black font-semibold leading-snug">
                 {property.street}
               </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 py-3 border-y border-slate-50">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
            <Bed size={14} className="text-slate-400" /> {property.bedrooms} Room
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
            <Bath size={14} className="text-slate-400" /> {property.bathrooms} Bath
          </div>
          <div className="ml-auto flex items-center gap-1 text-[10px] font-black text-yellow-500">
            <Star size={10} fill="currentColor" /> {property.rating}
          </div>
        </div>

        <div className="mt-auto space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <a href={`tel:${property.phoneNumber}`} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-colors">
              <Phone size={14} /> Call
            </a>
            <a href={`https://wa.me/${property.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-green-600 transition-colors">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>

          {(onEdit || onDelete) && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  onEdit?.();
                }}
                className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-colors"
              >
                <Edit size={14} /> Edit
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsConfirmingDelete(true);
                }}
                className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
