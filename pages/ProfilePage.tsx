
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import { Edit3, ShieldCheck, Star, Calendar, Camera } from 'lucide-react';

interface ProfilePageProps {
  user: UserProfile;
  userProperties: Property[];
  onUpdateAvatar: (url: string) => void;
  onDeleteProperty: (id: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, userProperties, onUpdateAvatar, onDeleteProperty }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdateAvatar(url);
    }
  };

  const handleEdit = (property: Property) => {
    navigate('/create', { state: { editProperty: property } });
  };

  return (
    <div className="space-y-10 pb-20">
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-8">
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg group-hover:brightness-75 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} />
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center text-white" title="Verified Member">
                <ShieldCheck size={14} />
              </div>
            </div>
            
            <div className="flex-1 space-y-1">
              <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> Member since {user.memberSince}</span>
                <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {user.rating} Host Rating</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                <Edit3 size={18} /> Edit Info
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl">
            <p className="text-slate-600 leading-relaxed italic">"{user.bio}"</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Property Listings</h2>
        {userProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onDelete={() => onDeleteProperty(property.id)}
                onEdit={() => handleEdit(property)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl">
            <p className="text-slate-500 mb-4 font-medium">You haven't listed any properties yet.</p>
            <button onClick={() => navigate('/create')} className="text-blue-600 font-bold hover:underline">Start listing now</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
