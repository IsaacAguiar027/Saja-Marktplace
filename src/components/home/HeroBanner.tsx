import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import Button from '../common/Button';

const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.append('q', searchQuery);
      if (location) {
        searchParams.append('location', location);
      }
      navigate(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-teal-600 to-teal-800 py-16 md:py-24">
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Buy & Sell <span className="text-orange-400">Locally</span> in Your Community
          </h1>
          <p className="text-lg md:text-xl mb-8 text-teal-100">
            The easiest way to buy and sell in your local area. Find great deals or reach thousands of potential buyers.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row">
            <div className="flex-1 relative mb-2 md:mb-0">
              <span className="absolute left-3 top-3 text-gray-400">
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex-1 relative mb-2 md:mb-0 md:ml-2">
              <span className="absolute left-3 top-3 text-gray-400">
                <MapPin size={20} />
              </span>
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors md:ml-2"
            >
              Search
            </button>
          </form>
          
          {/* Call to Action */}
          <div className="mt-8">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate('/create-listing')}
            >
              Post Your Ad Now
            </Button>
            <p className="mt-4 text-sm text-teal-100">
              Join thousands of happy buyers and sellers in your local community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;