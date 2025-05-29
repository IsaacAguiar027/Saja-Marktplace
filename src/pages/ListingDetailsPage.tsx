import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, User, Heart, Share2, Flag, ArrowLeft, ArrowRight, MessageSquare, ChevronLeft } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { listings } from '../data/mockData';
import { Listing } from '../types';
import toast from 'react-hot-toast';

const ListingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchListing = () => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const foundListing = listings.find(item => item.id === id);
        if (foundListing) {
          setListing(foundListing);
          document.title = `${foundListing.title} | LocalMarket`;
        }
        setIsLoading(false);
      }, 500);
    };

    fetchListing();
  }, [id]);

  // Handle image navigation
  const nextImage = () => {
    if (listing?.images && activeImageIndex < listing.images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  // Toggle favorite
  const toggleFavorite = () => {
    if (isAuthenticated) {
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } else {
      toast.error('Please log in to save favorites');
    }
  };

  // Send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (message.trim()) {
        // In a real app, this would be an API call
        toast.success('Message sent!');
        setMessage('');
      } else {
        toast.error('Please enter a message');
      }
    } else {
      toast.error('Please log in to send messages');
    }
  };

  // Share listing
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  // Report listing
  const handleReport = () => {
    // In a real app, this would open a report dialog
    toast.success('Thank you for your report. We will review this listing.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Listing Not Found</h1>
          <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate time ago
  const timeAgo = formatDistance(
    new Date(listing.createdAt),
    new Date(),
    { addSuffix: true }
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-teal-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${listing.category}`} className="hover:text-teal-600">
              {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{listing.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {listing.images && listing.images.length > 0 ? (
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 h-64 sm:h-96">
                    <img
                      src={listing.images[activeImageIndex]}
                      alt={listing.title}
                      className="w-full h-full object-contain bg-gray-100"
                    />
                  </div>
                  
                  {/* Image navigation buttons */}
                  {listing.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        disabled={activeImageIndex === 0}
                        className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md ${
                          activeImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
                        }`}
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        disabled={activeImageIndex === listing.images.length - 1}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md ${
                          activeImageIndex === listing.images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
                        }`}
                      >
                        <ArrowRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="h-64 sm:h-96 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No images available</span>
                </div>
              )}
              
              {/* Thumbnail navigation */}
              {listing.images && listing.images.length > 1 && (
                <div className="p-4 flex overflow-x-auto space-x-2">
                  {listing.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                        index === activeImageIndex ? 'border-teal-600' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Listing Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{listing.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-1" />
                    <span>Posted {timeAgo}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User size={18} className="mr-1" />
                    <span>{listing.userName}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                  <p className="text-gray-600 whitespace-pre-line">{listing.description}</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="text-lg font-bold text-teal-600">${listing.price.toLocaleString()}</p>
                    {listing.negotiable && <span className="text-sm text-gray-500">Negotiable</span>}
                  </div>
                  
                  {listing.condition && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Condition</h3>
                      <p className="text-gray-800 capitalize">{listing.condition.replace('-', ' ')}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="text-gray-800 capitalize">
                      {listing.category.replace('-', ' ')}
                      {listing.subcategory && ` › ${listing.subcategory.replace('-', ' ')}`}
                    </p>
                  </div>
                </div>
                
                {/* Action buttons for desktop */}
                <div className="hidden sm:flex space-x-4">
                  <Button
                    variant="primary"
                    icon={<MessageSquare size={18} />}
                    onClick={() => document.getElementById('message-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Contact Seller
                  </Button>
                  
                  <Button
                    variant={isFavorite ? 'primary' : 'outline'}
                    icon={<Heart size={18} className={isFavorite ? 'fill-white' : ''} />}
                    onClick={toggleFavorite}
                  >
                    {isFavorite ? 'Saved' : 'Save'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    icon={<Share2 size={18} />}
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                  
                  <Button
                    variant="outline"
                    icon={<Flag size={18} />}
                    onClick={handleReport}
                  >
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Seller info and contact */}
          <div>
            {/* Action buttons for mobile */}
            <div className="grid grid-cols-2 gap-3 mb-6 sm:hidden">
              <Button
                variant="primary"
                fullWidth
                icon={<MessageSquare size={18} />}
                onClick={() => document.getElementById('message-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact
              </Button>
              
              <Button
                variant={isFavorite ? 'primary' : 'outline'}
                fullWidth
                icon={<Heart size={18} className={isFavorite ? 'fill-white' : ''} />}
                onClick={toggleFavorite}
              >
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                icon={<Share2 size={18} />}
                onClick={handleShare}
              >
                Share
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                icon={<Flag size={18} />}
                onClick={handleReport}
              >
                Report
              </Button>
            </div>
            
            {/* Seller Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Seller Information</h2>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <User size={24} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{listing.userName}</h3>
                    <p className="text-sm text-gray-500">Member since 2023</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <Link to={`/profile/${listing.userId}`} className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                    View Seller Profile
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div id="message-form" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Seller</h2>
                
                {isAuthenticated ? (
                  <form onSubmit={handleSendMessage}>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Hi, is this still available?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      icon={<MessageSquare size={18} />}
                    >
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <div className="text-center p-4">
                    <p className="text-gray-600 mb-4">Please log in to contact the seller</p>
                    <Link to="/login">
                      <Button variant="primary">
                        Log In
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;