import { useState, useEffect } from 'react';
import CategoryCard from '../common/CategoryCard';
import { Category } from '../../types';
import { categories } from '../../data/mockData';

const CategoryBrowser = () => {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  
  // In a real app, you would fetch categories from an API
  useEffect(() => {
    // Simulate API call with mock data
    setAllCategories(categories);
  }, []);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBrowser;