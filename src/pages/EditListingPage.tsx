import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusCircle, Trash2, DollarSign, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { categories, listings } from '../data/mockData';
import { Listing } from '../types';
import toast from 'react-hot-toast';

const EditListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [condition, setCondition] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get subcategories for selected category
  const selectedCategory = categories.find(cat => cat.id === category);
  const subcategories = selectedCategory?.subcategories || [];

  useEffect(() => {
    document.title = "Edit Listing - LocalMarket";
    
    // Redirect if not logged in
    if (!isAuthenticated) {
      toast.error('You must be logged in to edit a listing');
      navigate('/login');
      return;
    }

    // Fetch listing data
    const listing = listings.find(l => l.id === id);
    
    if (!listing) {
      toast.error('Listing not found');
      navigate('/my-listings');
      return;
    }

    // Check if user owns the listing
    if (listing.userId !== user?.id) {
      toast.error('You do not have permission to edit this listing');
      navigate('/my-listings');
      return;
    }

    // Populate form with listing data
    setTitle(listing.title);
    setDescription(listing.description);
    setPrice(listing.price.toString());
    setCategory(listing.category);
    setSubcategory(listing.subcategory || '');
    setCondition(listing.condition || '');
    setNegotiable(listing.negotiable);
    setLocation(listing.location);
    setImages(listing.images);
    setIsLoading(false);
  }, [id, isAuthenticated, user, navigate]);

  // Reset subcategory when category changes
  useEffect(() => {
    setSubcategory('');
  }, [category]);

  const handleAddImage = () => {
    if (imageUrl && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !description || !price || !category || !location) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to update the listing
      setTimeout(() => {
        toast.success('Listing updated successfully!');
        navigate('/my-listings');
      }, 1000);
    } catch (error) {
      toast.error('Failed to update listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-teal-600 py-4 px-6">
            <h1 className="text-white text-xl font-bold">Edit Listing</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="py-6 px-8">
            {/* Basic Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Basic Information</h2>
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., 'iPhone 12 Pro Max - 256GB'"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {title.length}/100 characters
                </p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Describe your item in detail. Include condition, features, and any other relevant information."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      <DollarSign size={16} />
                    </span>
                    <input
                      type="number"
                      id="price"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Negotiable
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="negotiable"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      checked={negotiable}
                      onChange={(e) => setNegotiable(e.target.checked)}
                    />
                    <label htmlFor="negotiable" className="ml-2 text-gray-700">
                      Price is negotiable
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Category */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Category</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subcategory" className="block text-gray-700 text-sm font-medium mb-2">
                    Subcategory
                  </label>
                  <select
                    id="subcategory"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    disabled={subcategories.length === 0}
                  >
                    <option value="">Select a subcategory</option>
                    {subcategories.map(subcat => (
                      <option key={subcat.id} value={subcat.id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label htmlFor="condition" className="block text-gray-700 text-sm font-medium mb-2">
                  Condition
                </label>
                <select
                  id="condition"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>
            
            {/* Location */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Location</h2>
              
              <div>
                <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., 'Downtown' or 'East Side'"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Images */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Images</h2>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-teal-600 text-white rounded-r-md hover:bg-teal-700 transition-colors"
                    onClick={handleAddImage}
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Info size={12} className="mr-1" />
                  For demo purposes, use image URLs
                </p>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={img}
                        alt={`Listing image ${index + 1}`}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                        }}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Submit */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditListingPage;