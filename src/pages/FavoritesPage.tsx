import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ListingCard from '../components/common/ListingCard';
import { listings } from '../data/mockData';
import { Listing } from '../types';

const FavoritesPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favoriteListings, setFavoriteListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "My Favorites - LocalMarket";
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // In a real app, this would fetch the user's favorite listings from an API
    setFavoriteListings(listings.slice(0, 4)); // Mock data
    setIsLoading(false);
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h1>
        
        {favoriteListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-600">
              Start saving listings you're interested in by clicking the heart icon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;