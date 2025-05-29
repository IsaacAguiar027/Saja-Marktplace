import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../common/ListingCard';
import Button from '../common/Button';
import { Listing } from '../../types';
import { listings } from '../../data/mockData';

const RecentListings = () => {
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  
  // In a real app, you would fetch recent listings from an API
  useEffect(() => {
    // Simulate API call with mock data
    // Sort by date (newest first) and take the first 8
    const sorted = [...listings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 8);
    
    setRecentListings(sorted);
  }, []);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Listings</h2>
          <Link to="/search">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListings;