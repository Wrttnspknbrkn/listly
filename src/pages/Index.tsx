import { useState } from 'react';
import { StoreSection } from '../components/StoreSection';
import { Plus } from 'lucide-react';

const Index = () => {
  const [groceryLists] = useState({
    "Walmart": [
      { id: "1", name: "Bananas", quantity: 3, maxQuantity: 6, checked: false },
      { id: "2", name: "Milk", quantity: 1, maxQuantity: 2, checked: true },
      { id: "3", name: "Bread", quantity: 1, maxQuantity: 3, checked: false },
    ],
    "Whole Foods": [
      { id: "4", name: "Organic Apples", quantity: 4, maxQuantity: 8, checked: false },
      { id: "5", name: "Quinoa", quantity: 2, maxQuantity: 4, checked: false },
    ],
  });

  const handleToggleItem = (id: string) => {
    // Will implement in next iteration
    console.log('Toggle item:', id);
  };

  const handleDeleteItem = (id: string) => {
    // Will implement in next iteration
    console.log('Delete item:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Grocery List</h1>
          <p className="text-gray-600">Keep track of your shopping needs</p>
        </header>

        <button className="w-full mb-8 p-4 rounded-lg border-2 border-dashed border-primary/30 text-primary hover:border-primary hover:bg-primary/5 transition-colors duration-200 flex items-center justify-center gap-2 animate-scale-in">
          <Plus size={20} />
          <span>Add New Item</span>
        </button>

        {Object.entries(groceryLists).map(([store, items]) => (
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