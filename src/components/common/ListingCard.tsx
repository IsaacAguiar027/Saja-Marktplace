import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { Listing } from '../../types';
import { formatDistance } from 'date-fns';

interface ListingCardProps {
  listing: Listing;
  featured?: boolean;
}

const ListingCard = ({ listing, featured = false }: ListingCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Calculate the time since posting
  const timeAgo = formatDistance(
    new Date(listing.createdAt),
    new Date(),
    { addSuffix: true }
  );

  return (
    <Link 
      to={`/listing/${listing.id}`} 
      className={`block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
        featured ? 'border-2 border-orange-500' : ''
      }`}
    >
      {/* Image container with consistent aspect ratio */}
      <div className="relative pb-[56.25%] h-0 overflow-hidden bg-gray-200">
        {listing.images && listing.images.length > 0 ? (
          <img 
            src={listing.images[0]} 
            alt={listing.title} 
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {/* Favorite button overlay */}
        <button 
          onClick={toggleFavorite} 
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart 
            size={18} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}
          />
        </button>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-gray-800 line-clamp-1">{listing.title}</p>
        </div>
        
        <p className="text-teal-600 text-xl font-bold mt-1">
          ${listing.price.toLocaleString()}
          {listing.negotiable && <span className="text-xs text-gray-500 ml-1">(Negotiable)</span>}
        </p>
        
        <div className="mt-2 flex items-center text-gray-500 text-sm">
          <MapPin size={14} className="mr-1" />
          <span>{listing.location}</span>
        </div>
        
        <div className="mt-1 flex items-center text-gray-500 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;