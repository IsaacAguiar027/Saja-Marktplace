import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[
    category.icon.charAt(0).toUpperCase() + category.icon.slice(1)
  ] || LucideIcons.Tag;

  return (
    <Link 
      to={`/category/${category.id}`}
      className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-teal-200"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-full mb-3">
        <IconComponent size={24} className="text-teal-600" />
      </div>
      <span className="font-medium text-gray-800">{category.name}</span>
      {category.subcategories && (
        <span className="text-xs text-gray-500 mt-1">
          {category.subcategories.length} subcategories
        </span>
      )}
    </Link>
  );
};

export default CategoryCard;