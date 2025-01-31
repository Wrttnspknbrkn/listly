import { FC } from 'react';
import { CategoryIcon } from './CategoryIcon';
import { Users, DollarSign } from 'lucide-react';

interface CategoryListProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export const CategoryList: FC<CategoryListProps> = ({ onSelectCategory, selectedCategory }) => {
  const categories = [
    'Fruits',
    'Vegetables',
    'Dairy',
    'Snacks',
    'Ready Meals',
    'Other'
  ];

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white hover:bg-primary/10'
            }`}
          >
            <CategoryIcon category={category} size={20} />
            <span>{category}</span>
          </button>
        ))}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-primary/10 transition-all duration-200"
        >
          <Users size={20} />
          <span>Share List</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-primary/10 transition-all duration-200"
        >
          <DollarSign size={20} />
          <span>Price Tracker</span>
        </button>
      </div>
    </div>
  );
};