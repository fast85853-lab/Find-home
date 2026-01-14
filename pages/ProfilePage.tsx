
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import { Edit3, ShieldCheck, Star, Calendar, Camera, X, Check } from 'lucide-react';

interface ProfilePageProps {
  user: UserProfile;
  userProperties: Property[];
  onUpdateAvatar: (url: string) => void;
  onUpdateInfo: (name: string, bio: string) => void;
  onDeleteProperty: (id: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, userProperties, onUpdateAvatar, onUpdateInfo, onDeleteProperty }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (property: Property) => {
    navigate('/create', { state: { editProperty: property } });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateInfo(editName, editBio);
    setIsEditing(false);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form 
            onSubmit={handleSaveProfile}
            className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">Edit Profile</h2>
              <button type="button" onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Your Name</label>
                <input 
                  required
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Bio / Description</label>
                <textarea 
                  rows={4}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-medium text-slate-700 resize-none"
                  placeholder="Tell people about yourself..."
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20"
            >
              <Check size={20} /> Save Changes
            </button>
          </form>
        </div>
      )}

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
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
              >
                <Edit3 size={18} /> Edit Info
              </button>
            </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-600 leading-relaxed italic">"{user.bio}"</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900">Active Property Listings</h2>
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">{userProperties.length} Posts</span>
        </div>
        
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
          <div className="p-16 text-center bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-3xl mx-auto">🏠</div>
            <p className="text-slate-500 font-bold">You haven't listed any properties yet.</p>
            <button 
              onClick={() => navigate('/create')} 
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all"
            >
              Post Your First Ad
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
