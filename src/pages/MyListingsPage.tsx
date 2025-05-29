import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import ListingCard from '../components/common/ListingCard';
import { listings } from '../data/mockData';
import { Listing } from '../types';
import toast from 'react-hot-toast';

const MyListingsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "My Listings - LocalMarket";
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // In a real app, this would fetch the user's listings from an API
    const filteredListings = listings.filter(listing => listing.userId === user?.id);
    setUserListings(filteredListings);
    setIsLoading(false);
  }, [isAuthenticated, user, navigate]);

  const handleDelete = (listingId: string) => {
    // In a real app, this would call an API to delete the listing
    setUserListings(userListings.filter(listing => listing.id !== listingId));
    toast.success('Listing deleted successfully');
  };

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Listings</h1>
          <Link to="/create-listing">
            <Button variant="primary" icon={<Plus size={18} />}>
              Create New Listing
            </Button>
          </Link>
        </div>
        
        {userListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userListings.map(listing => (
              <div key={listing.id} className="relative">
                <ListingCard listing={listing} />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Link
                    to={`/edit-listing/${listing.id}`}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 size={16} className="text-gray-600" />
                  </Link>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No listings yet</h2>
            <p className="text-gray-600 mb-6">
              Start selling by creating your first listing.
            </p>
            <Link to="/create-listing">
              <Button variant="primary" icon={<Plus size={18} />}>
                Create New Listing
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;