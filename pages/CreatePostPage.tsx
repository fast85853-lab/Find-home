
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Property, Country } from '../types';
import { COUNTRIES } from '../constants';
import { 
  Camera, 
  MapPin, 
  Home as HomeIcon, 
  Loader2,
  Phone,
  MessageCircle,
  Zap,
  Flame,
  Plus,
  X,
  Target
} from 'lucide-react';

interface CreatePostPageProps {
  onAdd: (p: Property) => void;
}

const CreatePostPage: React.FC<CreatePostPageProps> = ({ onAdd }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const editData = location.state?.editProperty as Property | undefined;
  
  const [selectedCountryObj, setSelectedCountryObj] = useState<Country>(
    editData ? (COUNTRIES.find(c => c.name === editData.country) || COUNTRIES[0]) : COUNTRIES[0]
  );
  const [images, setImages] = useState<string[]>(editData?.images || []);

  const [formData, setFormData] = useState({
    title: editData?.title || '',
    purpose: editData?.purpose || 'For Rent' as 'For Rent' | 'For Sale',
    type: editData?.type || 'Apartment',
    city: editData?.city || '',
    area: editData?.area || '',
    street: editData?.street || '',
    price: editData?.price.toString() || '',
    bedrooms: editData?.bedrooms.toString() || '1',
    bathrooms: editData?.bathrooms.toString() || '1',
    description: editData?.description || '',
    hasGas: editData ? editData.hasGas : true,
    hasElectricity: editData ? editData.hasElectricity : true,
    phoneNumber: editData?.phoneNumber || '',
    whatsappNumber: editData?.whatsappNumber || ''
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = COUNTRIES.find(c => c.name === e.target.value);
    if (country) {
      setSelectedCountryObj(country);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImages = fileArray.map((file: File) => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 4));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    setLoading(true);
    
    setTimeout(() => {
      const newProperty: Property = {
        id: editData?.id || Math.random().toString(36).substr(2, 9),
        title: formData.title,
        purpose: formData.purpose,
        description: formData.description,
        price: parseFloat(formData.price),
        currency: selectedCountryObj.currency,
        location: `${formData.area}, ${formData.city}`,
        city: formData.city,
        area: formData.area,
        street: formData.street,
        country: selectedCountryObj.name,
        type: formData.type,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        hasGas: formData.hasGas,
        hasElectricity: formData.hasElectricity,
        phoneNumber: formData.phoneNumber,
        whatsappNumber: formData.whatsappNumber,
        images: images,
        hostName: editData?.hostName || "Alex Johnson",
        rating: editData?.rating || 5.0
      };
      
      onAdd(newProperty);
      setLoading(false);
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4 sm:px-2">
      <div className="mb-10 text-center md:text-left flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">{editData ? 'Update Your Listing' : 'List Your Property'}</h1>
          <p className="text-slate-500 font-medium mt-2">
            {editData ? 'Adjust details for better visibility' : 'Get verified leads and premium visibility'}
          </p>
        </div>
        {editData && (
          <button onClick={() => navigate(-1)} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
            <X size={20} className="text-slate-600" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Images Upload */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-lg font-black mb-6 flex items-center gap-2">
            <Camera size={22} className="text-blue-600" /> Property Photos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100">
                <img src={img} className="w-full h-full object-cover" alt={`Upload ${idx}`} />
                <button 
                  type="button"
                  onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {images.length < 4 && (
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-blue-50/50 hover:border-blue-200 transition-all group">
                <Plus size={32} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 group-hover:text-blue-600">Upload</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
        </div>

        {/* Listing Purpose */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-lg font-black flex items-center gap-2 mb-6 text-slate-900">
            <Target className="text-blue-600" size={22} /> Listing Purpose
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => setFormData({...formData, purpose: 'For Rent'})}
              className={`py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border-2 ${formData.purpose === 'For Rent' ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'}`}
            >
              For Rent
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, purpose: 'For Sale'})}
              className={`py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border-2 ${formData.purpose === 'For Sale' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'}`}
            >
              For Sale
            </button>
          </div>
        </div>

        {/* Basic Details */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
          <h2 className="text-lg font-black flex items-center gap-2">
            <HomeIcon className="text-blue-600" size={22} /> Property Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Property Title</label>
              <input required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-300" placeholder="e.g., Luxury House with Garden" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Property Type</label>
              <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-900" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option>Apartment</option><option>House</option><option>Villa</option><option>Studio</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                {formData.purpose === 'For Rent' ? 'Monthly Rent' : 'Total Price'} ({selectedCountryObj.currency})
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{selectedCountryObj.currency}</span>
                <input required type="number" className="w-full pl-16 pr-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-900" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
          <h2 className="text-lg font-black flex items-center gap-2"><MapPin className="text-blue-600" size={22} /> Address & Area</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Country</label>
              <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-900" value={selectedCountryObj.name} onChange={handleCountryChange}>
                {COUNTRIES.map(c => <option key={c.code} value={c.name}>{c.emoji} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">City Name</label>
              <input required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-900" placeholder="e.g., Lahore" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Area / Housing Society</label>
              <input required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-900" placeholder="e.g., Phase 6, DHA" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Street & House Number</label>
              <input required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-slate-900" placeholder="e.g., Street 4, House #23" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Features & Utilities */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
          <h2 className="text-lg font-black uppercase tracking-tighter italic">Verify Utilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Rooms</label>
              <input type="number" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent outline-none font-bold text-slate-900" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Baths</label>
              <input type="number" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent outline-none font-bold text-slate-900" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} />
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-orange-50 transition-colors group">
                <input type="checkbox" checked={formData.hasGas} onChange={e => setFormData({...formData, hasGas: e.target.checked})} className="w-5 h-5 accent-orange-500" />
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-tighter text-slate-700">
                  <Flame size={18} className="text-orange-500" /> SUI GAS
                </div>
              </label>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-yellow-50 transition-colors group">
                <input type="checkbox" checked={formData.hasElectricity} onChange={e => setFormData({...formData, hasElectricity: e.target.checked})} className="w-5 h-5 accent-yellow-500" />
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-tighter text-slate-700">
                  <Zap size={18} className="text-yellow-500" /> BIJLI
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
          <h2 className="text-lg font-black flex items-center gap-2"><Phone className="text-blue-600" size={22} /> Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{selectedCountryObj.phonePrefix}</span>
                <input required type="tel" className="w-full pl-16 pr-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-900" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">WhatsApp Number</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{selectedCountryObj.phonePrefix}</span>
                <input required type="tel" className="w-full pl-16 pr-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-900" value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} />
              </div>
            </div>
          </div>
        </div>

        <button disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest">
          {loading ? <><Loader2 className="animate-spin" /> {editData ? 'Updating...' : 'Publishing...'}</> : (editData ? 'SAVE CHANGES' : 'POST NOW')}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
