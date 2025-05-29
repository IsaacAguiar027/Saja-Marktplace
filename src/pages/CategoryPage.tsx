import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, Check } from 'lucide-react';
import ListingCard from '../components/common/ListingCard';
import Button from '../components/common/Button';
import { listings, categories } from '../data/mockData';
import { Listing, Category } from '../types';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const [category, setCategory] = useState<Category | null>(null);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCategoryData = () => {
      setIsLoading(true);
      
      // Find the category
      const foundCategory = categories.find(cat => cat.id === categoryId);
      
      if (foundCategory) {
        setCategory(foundCategory);
        document.title = `${foundCategory.name} | LocalMarket`;
        
        // Filter listings by category
        const categoryListings = listings.filter(
          listing => listing.category === categoryId && 
          (selectedSubcategory ? listing.subcategory === selectedSubcategory : true) &&
          listing.price >= priceRange[0] && 
          listing.price <= priceRange[1]
        );
        
        // Sort listings
        let sortedListings = [...categoryListings];
        switch (sortBy) {
          case 'newest':
            sortedListings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'oldest':
            sortedListings.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case 'price_low':
            sortedListings.sort((a, b) => a.price - b.price);
            break;
          case 'price_high':
            sortedListings.sort((a, b) => b.price - a.price);
            break;
        }
        
        setFilteredListings(sortedListings);
      } else {
        navigate('/');
      }
      
      setIsLoading(false);
    };

    fetchCategoryData();
  }, [categoryId, selectedSubcategory, priceRange, sortBy, navigate]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId === selectedSubcategory ? '' : subcategoryId);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{category?.name}</h1>
            <p className="text-gray-600">{filteredListings.length} listings found</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="relative mr-2">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
            
            <Button
              variant="outline"
              icon={<Filter size={18} />}
              onClick={toggleFilter}
              className="md:hidden"
            >
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden p-4 h-fit">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
            
            {/* Subcategories */}
            {category?.subcategories && category.subcategories.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Subcategories</h3>
                <div className="space-y-2">
                  {category.subcategories.map(subcat => (
                    <div key={subcat.id} className="flex items-center">
                      <button
                        onClick={() => handleSubcategoryChange(subcat.id)}
                        className="flex items-center"
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectedSubcategory === subcat.id ? 'bg-teal-600 border-teal-600' : 'border-gray-300'
                        }`}>
                          {selectedSubcategory === subcat.id && (
                            <Check size={14} className="text-white" />
                          )}
                        </div>
                        <span className="ml-2 text-gray-700">{subcat.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="sr-only">Min Price</label>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={priceRange[0] === 0 ? '' : priceRange[0]}
                    onChange={(e) => handlePriceChange(Number(e.target.value) || 0, priceRange[1])}
                  />
                </div>
                <div>
                  <label className="sr-only">Max Price</label>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={priceRange[1] === 10000 ? '' : priceRange[1]}
                    onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value) || 10000)}
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(0, 50)}
                >
                  Under $50
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(50, 200)}
                >
                  $50-$200
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(200, 10000)}
                >
                  $200+
                </Button>
              </div>
            </div>
            
            {/* Reset Filters */}
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setSelectedSubcategory('');
                setPriceRange([0, 10000]);
              }}
            >
              Reset Filters
            </Button>
          </div>
          
          {/* Filters - Mobile */}
          {isFilterOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
              <div className="bg-white rounded-t-lg p-4 w-full max-h-[70vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                  <button onClick={toggleFilter} className="text-gray-500">
                    <ChevronDown size={24} />
                  </button>
                </div>
                
                {/* Mobile Filters Content */}
                {/* Subcategories */}
                {category?.subcategories && category.subcategories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Subcategories</h3>
                    <div className="space-y-2">
                      {category.subcategories.map(subcat => (
                        <div key={subcat.id} className="flex items-center">
                          <button
                            onClick={() => handleSubcategoryChange(subcat.id)}
                            className="flex items-center"
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                              selectedSubcategory === subcat.id ? 'bg-teal-600 border-teal-600' : 'border-gray-300'
                            }`}>
                              {selectedSubcategory === subcat.id && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <span className="ml-2 text-gray-700">{subcat.name}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="sr-only">Min Price</label>
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={priceRange[0] === 0 ? '' : priceRange[0]}
                        onChange={(e) => handlePriceChange(Number(e.target.value) || 0, priceRange[1])}
                      />
                    </div>
                    <div>
                      <label className="sr-only">Max Price</label>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={priceRange[1] === 10000 ? '' : priceRange[1]}
                        onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value) || 10000)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePriceChange(0, 50)}
                    >
                      Under $50
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePriceChange(50, 200)}
                    >
                      $50-$200
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePriceChange(200, 10000)}
                    >
                      $200+
                    </Button>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      setSelectedSubcategory('');
                      setPriceRange([0, 10000]);
                    }}
                  >
                    Reset
                  </Button>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={toggleFilter}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Listings */}
          <div className="md:col-span-3">
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                    featured={listing.featured}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No listings found</h2>
                <p className="text-gray-600 mb-6">
                  There are no listings matching your criteria at the moment.
                </p>
                <Button 
                  variant="primary"
                  onClick={() => {
                    setSelectedSubcategory('');
                    setPriceRange([0, 10000]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;