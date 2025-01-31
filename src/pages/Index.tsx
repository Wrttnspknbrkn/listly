import { useState, useEffect } from 'react';
import { StoreSection } from '../components/StoreSection';
import { CategoryList } from '../components/CategoryList';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  maxQuantity: number;
  checked: boolean;
  category: string;
  price?: number;
}

interface GroceryLists {
  [key: string]: GroceryItem[];
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [groceryLists, setGroceryLists] = useState<GroceryLists>({});
  const [newItemStore, setNewItemStore] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLists = localStorage.getItem('groceryLists');
    if (savedLists) {
      setGroceryLists(JSON.parse(savedLists));
    } else {
      // Set initial demo data
      const initialData = {
        "Melcom": [
          { id: "1", name: "Bananas", quantity: 3, maxQuantity: 6, checked: false, category: "Fruits", price: 5.99 },
          { id: "2", name: "Milk", quantity: 1, maxQuantity: 2, checked: false, category: "Dairy", price: 12.50 },
        ],
        "Shoprite": [
          { id: "3", name: "Bread", quantity: 1, maxQuantity: 3, checked: false, category: "Other", price: 8.99 },
        ],
      };
      setGroceryLists(initialData);
      localStorage.setItem('groceryLists', JSON.stringify(initialData));
    }
  }, []);

  // Save to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem('groceryLists', JSON.stringify(groceryLists));
  }, [groceryLists]);

  const handleToggleItem = (storeKey: string, id: string) => {
    setGroceryLists(prev => ({
      ...prev,
      [storeKey]: prev[storeKey].map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
    toast({
      description: "Item status updated",
      duration: 2000,
    });
  };

  const handleDeleteItem = (storeKey: string, id: string) => {
    setGroceryLists(prev => ({
      ...prev,
      [storeKey]: prev[storeKey].filter(item => item.id !== id)
    }));
    toast({
      description: "Item deleted successfully",
      duration: 2000,
    });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemStore || !newItemName) {
      toast({
        variant: "destructive",
        description: "Please fill in all fields",
        duration: 2000,
      });
      return;
    }

    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: 1,
      maxQuantity: 10,
      checked: false,
      category: selectedCategory === 'All' ? 'Other' : selectedCategory,
    };

    setGroceryLists(prev => ({
      ...prev,
      [newItemStore]: [...(prev[newItemStore] || []), newItem]
    }));

    setNewItemName('');
    toast({
      description: "Item added successfully",
      duration: 2000,
    });
  };

  const filteredLists = Object.entries(groceryLists).reduce((acc, [store, items]) => {
    const filteredItems = items.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    if (filteredItems.length > 0) {
      acc[store] = filteredItems;
    }
    return acc;
  }, {} as GroceryLists);

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
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <form onSubmit={handleAddItem} className="mb-8 space-y-4">
          <Input
            type="text"
            placeholder="Store name..."
            value={newItemStore}
            onChange={(e) => setNewItemStore(e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Item name..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <Button type="submit">
              <Plus size={20} />
              Add
            </Button>
          </div>
        </form>

        {Object.entries(filteredLists).map(([store, items]) => (
          <StoreSection
            key={store}
            name={store}
            items={items}
            onToggleItem={(id) => handleToggleItem(store, id)}
            onDeleteItem={(id) => handleDeleteItem(store, id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;