
import React, { useState, useMemo } from 'react';
import { Property, Country } from '../types';
import { COUNTRIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { Search, Filter, Globe, ChevronDown, SlidersHorizontal } from 'lucide-react';

interface ExplorePageProps {
  properties: Property[];
}

const ExplorePage: React.FC<ExplorePageProps> = ({ properties }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === 'All' || p.country === selectedCountry;
      const matchesType = selectedType === 'All' || p.type === selectedType;
      return matchesSearch && matchesCountry && matchesType;
    });
  }, [properties, searchTerm, selectedCountry, selectedType]);

  const propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Studio', 'Penthouse'];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Explore Rentals</h1>
          <p className="text-slate-500">Browse through our global collection</p>
        </div>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search by city or name..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 py-2">
        <div className="flex items-center gap-2 bg-white px-4 py-2 border border-slate-200 rounded-xl">
          <Globe className="w-4 h-4 text-slate-400" />
          <select 
            className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="All">All Countries (250+)</option>
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.name}>{c.emoji} {c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 border border-slate-200 rounded-xl">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
          <SlidersHorizontal size={16} />
          More Filters
        </button>
      </div>

      {/* Results */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-3xl">
            🔍
          </div>
          <h3 className="text-xl font-bold text-slate-900">No properties found</h3>
          <p className="text-slate-500 max-w-sm">
            We couldn't find any listings matching your current filters. Try adjusting your search criteria.
          </p>
          <button 
            onClick={() => {setSearchTerm(''); setSelectedCountry('All'); setSelectedType('All');}}
            className="text-blue-600 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
