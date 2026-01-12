
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import { Search, TrendingUp } from 'lucide-react';

interface HomePageProps {
  properties: Property[];
}

const HomePage: React.FC<HomePageProps> = ({ properties }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative h-[450px] rounded-3xl overflow-hidden flex items-center px-6 md:px-16">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <TrendingUp size={16} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Most Trusted in Pakistan</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Find Home with <br/> 
            <span className="text-blue-400">Bijli & Gas</span> Included
          </h1>
          <p className="text-lg text-slate-200 mb-8 max-w-lg font-medium">
            Explore premium rental properties. Verified utilities and direct owner contact for a hassle-free experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/explore')}
              className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20"
            >
              <Search size={20} />
              Start Exploring
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recommended for You</h2>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              <p className="text-sm font-medium">Top properties in popular areas</p>
            </div>
          </div>
          <button onClick={() => navigate('/explore')} className="text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">View All</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property, idx) => (
            <div 
              key={property.id} 
              className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both" 
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </section>

      {/* Categories / Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        <CategoryCard title="Karachi" icon="🌊" count={412} />
        <CategoryCard title="Lahore" icon="🏰" count={285} />
        <CategoryCard title="Islamabad" icon="🌲" count={192} />
        <CategoryCard title="Faisalabad" icon="🏭" count={95} />
      </section>

      {/* Footer Branding Section */}
      <div className="pt-8 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          &copy; 2024 GetHome Rental App. Built for Pakistan.
        </p>
      </div>
    </div>
  );
};

const CategoryCard: React.FC<{ title: string, icon: string, count: number }> = ({ title, icon, count }) => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate('/explore')}
      className="flex flex-col items-center p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-xl hover:border-blue-100 transition-all group overflow-hidden"
    >
      <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">{icon}</span>
      <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors animate-in slide-in-from-bottom-2">
        {title}
      </span>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{count} Homes</span>
    </button>
  );
};

export default HomePage;
