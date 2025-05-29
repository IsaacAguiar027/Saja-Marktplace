import { useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryBrowser from '../components/home/CategoryBrowser';
import FeaturedListings from '../components/home/FeaturedListings';
import RecentListings from '../components/home/RecentListings';

const HomePage = () => {
  useEffect(() => {
    document.title = "LocalMarket - Buy & Sell Locally";
  }, []);

  return (
    <div>
      <HeroBanner />
      <CategoryBrowser />
      <FeaturedListings />
      <RecentListings />
      
      {/* How It Works Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Your Ad</h3>
              <p className="text-gray-600">
                Create a free account and list your item or service with photos and description in just a few minutes.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Buyers</h3>
              <p className="text-gray-600">
                Receive messages from interested buyers and coordinate with them directly through our platform.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make the Deal</h3>
              <p className="text-gray-600">
                Meet locally to complete the transaction. Mark your listing as sold when the deal is done.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;