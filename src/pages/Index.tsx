import { useState } from 'react';
import { StoreSection } from '../components/StoreSection';
import { CategoryList } from '../components/CategoryList';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [groceryLists] = useState({
    "Walmart": [
      { id: "1", name: "Bananas", quantity: 3, maxQuantity: 6, checked: false, category: "Fruits", price: 2.99 },
      { id: "2", name: "Milk", quantity: 1, maxQuantity: 2, checked: true, category: "Dairy", price: 3.49 },
      { id: "3", name: "Bread", quantity: 1, maxQuantity: 3, checked: false, category: "Other", price: 2.49 },
    ],
    "Whole Foods": [
      { id: "4", name: "Organic Apples", quantity: 4, maxQuantity: 8, checked: false, category: "Fruits", price: 4.99 },
      { id: "5", name: "Quinoa", quantity: 2, maxQuantity: 4, checked: false, category: "Other", price: 6.99 },
    ],
  });

  const handleToggleItem = (id: string) => {
    console.log('Toggle item:', id);
  };

  const handleDeleteItem = (id: string) => {
    console.log('Delete item:', id);
  };

  const filteredLists = Object.entries(groceryLists).reduce((acc, [store, items]) => {
    const filteredItems = selectedCategory === 'All' 
      ? items 
      : items.filter(item => item.category === selectedCategory);
    
    if (filteredItems.length > 0) {
      acc[store] = filteredItems;
    }
    return acc;
  }, {} as typeof groceryLists);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-gold">
            Listly
          </h1>
          <p className="text-gray-600">Keep track of everything you need</p>
        </header>

        <CategoryList 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search items..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <Button
          className="w-full mb-8 group hover:shadow-lg transition-all duration-200 animate-scale-in"
          variant="outline"
        >
          <Plus className="mr-2 group-hover:rotate-90 transition-transform duration-200" size={20} />
          Add New Item
        </Button>

        {Object.entries(filteredLists).map(([store, items]) => (
          <StoreSection
            key={store}
            name={store}
            items={items}
            onToggleItem={handleToggleItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;