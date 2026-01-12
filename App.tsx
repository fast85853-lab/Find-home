
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Search, 
  SquarePlus, 
  User, 
  Menu, 
  X, 
  MapPin, 
  Globe, 
  LogOut,
  ShieldCheck,
  Mail,
  Info,
  CheckCircle
} from 'lucide-react';

import HomePage from './pages/HomePage.tsx';
import ExplorePage from './pages/ExplorePage.tsx';
import CreatePostPage from './pages/CreatePostPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';
import ContactUsPage from './pages/ContactUsPage.tsx';
import { Property, UserProfile } from './types.ts';
import { MOCK_PROPERTIES } from './constants.ts';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  const [user, setUser] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "alex.j@gethome.com",
    bio: "Looking for a comfortable home and providing great stays.",
    avatar: "https://picsum.photos/seed/user123/200/200",
    memberSince: "Jan 2024",
    listings: 2,
    rating: 4.9
  });

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addProperty = (newProperty: Property) => {
    // Check if we are updating an existing one
    setProperties(prev => {
      const exists = prev.find(p => p.id === newProperty.id);
      if (exists) {
        showNotification("Post Updated Successfully!");
        return prev.map(p => p.id === newProperty.id ? newProperty : p);
      }
      showNotification("Post Created Successfully!");
      return [newProperty, ...prev];
    });
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    showNotification("Post Deleted Permanently");
  };

  const updateUserAvatar = (newAvatar: string) => {
    setUser(prev => ({ ...prev, avatar: newAvatar }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col pb-16 md:pb-0 relative">
        {/* Global Toast Notification */}
        {notification && (
          <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
            <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
              <CheckCircle size={20} className="text-green-400" />
              <span className="font-bold text-sm tracking-tight">{notification}</span>
            </div>
          </div>
        )}

        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} user={user} />

        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={toggleDrawer} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                GetHome
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full">
               <NavLink to="/" icon={<HomeIcon size={18} />} label="Home" />
               <NavLink to="/explore" icon={<Search size={18} />} label="Explore" />
               <NavLink to="/create" icon={<SquarePlus size={18} />} label="Post" />
               <NavLink to="/profile" icon={<User size={18} />} label="Profile" />
            </div>

            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2">
                <img src={user.avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100 shadow-sm" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage properties={properties} />} />
            <Route path="/explore" element={<ExplorePage properties={properties} />} />
            <Route path="/create" element={<CreatePostPage onAdd={addProperty} />} />
            <Route path="/profile" element={
              <ProfilePage 
                user={user} 
                userProperties={properties.filter(p => p.hostName === user.name)} 
                onUpdateAvatar={updateUserAvatar}
                onDeleteProperty={deleteProperty}
              />
            } />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
          </Routes>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-40 shadow-lg">
          <MobileNavLink to="/" icon={<HomeIcon size={24} />} />
          <MobileNavLink to="/explore" icon={<Search size={24} />} />
          <MobileNavLink to="/create" icon={<SquarePlus size={24} />} />
          <MobileNavLink to="/profile" icon={<User size={24} />} />
        </nav>
      </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-blue-600'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileNavLink: React.FC<{ to: string, icon: React.ReactNode }> = ({ to, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`p-2 rounded-xl transition-all ${isActive ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}>
      {icon}
    </Link>
  );
};

const Drawer: React.FC<{ isOpen: boolean, onClose: () => void, user: UserProfile }> = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <aside className={`fixed top-0 left-0 h-full w-80 bg-white z-[60] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">GetHome</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-8 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleNavigation('/profile')}>
            <img src={user.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm" alt="User" />
            <div><p className="font-semibold text-slate-900">{user.name}</p><p className="text-xs text-slate-500">{user.email}</p></div>
          </div>
          <nav className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
            <DrawerItem icon={<HomeIcon size={20} />} label="Home" onClick={() => handleNavigation('/')} />
            <DrawerItem icon={<User size={20} />} label="My Profile" onClick={() => handleNavigation('/profile')} />
            <div className="h-px bg-slate-100 my-4 mx-2" />
            <DrawerItem icon={<ShieldCheck size={20} />} label="Privacy Policy" onClick={() => handleNavigation('/privacy')} />
            <DrawerItem icon={<Mail size={20} />} label="Contact Us" onClick={() => handleNavigation('/contact')} />
            <DrawerItem icon={<Info size={20} />} label="About GetHome" onClick={() => {}} />
          </nav>
          <button className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-auto font-bold"><LogOut size={20} /> Logout</button>
        </div>
      </aside>
    </>
  );
};

const DrawerItem: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-3 p-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors text-left group">
    <span className="text-slate-400 group-hover:text-blue-500">{icon}</span>
    <span className="font-semibold">{label}</span>
  </button>
);

export default App;
