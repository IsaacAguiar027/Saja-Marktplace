import { useState, useEffect } from 'react';
import ListingCard from '../common/ListingCard';
import { Listing } from '../../types';
import { listings } from '../../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedListings = () => {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  
  // In a real app, you would fetch featured listings from an API
  useEffect(() => {
    // Simulate API call with mock data
    const featured = listings.filter(listing => listing.featured);
    if (featured.length < 4) {
      // If we don't have enough featured listings, add some regular ones
      const regularListings = listings.filter(listing => !listing.featured).slice(0, 4 - featured.length);
      setFeaturedListings([...featured, ...regularListings]);
    } else {
      setFeaturedListings(featured);
    }
  }, []);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Listings</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map(listing => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              featured={listing.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;