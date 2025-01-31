import { useState, useEffect } from 'react';
import { StoreSection } from '../components/StoreSection';
import { CategoryList } from '../components/CategoryList';
import { Plus, Search, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

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
  const [newItemCategory, setNewItemCategory] = useState('Other');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [newItemMaxQuantity, setNewItemMaxQuantity] = useState('10');
  const [points, setPoints] = useState(0);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLists = localStorage.getItem('groceryLists');
    const savedPoints = localStorage.getItem('points');
    if (savedLists) {
      setGroceryLists(JSON.parse(savedLists));
    }
    if (savedPoints) {
      setPoints(Number(savedPoints));
    }
  }, []);

  // Save to localStorage whenever lists or points change
  useEffect(() => {
    localStorage.setItem('groceryLists', JSON.stringify(groceryLists));
    localStorage.setItem('points', points.toString());
  }, [groceryLists, points]);

  const handleToggleItem = (storeKey: string, id: string) => {
    setGroceryLists(prev => {
      const newLists = {
        ...prev,
        [storeKey]: prev[storeKey].map(item => 
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      };
      
      // Check if all items in the store are checked
      const allChecked = newLists[storeKey].every(item => item.checked);
      if (allChecked) {
        setPoints(prevPoints => {
          const newPoints = prevPoints + 10;
          toast({
            title: "Achievement Unlocked! 🎉",
            description: `You earned 10 points for completing a list! Total: ${newPoints} points`,
          });
          return newPoints;
        });
      }
      
      return newLists;
    });
    
    toast({
      description: "Item status updated",
      duration: 2000,
    });
  };

  const handleDeleteItem = (storeKey: string, id: string) => {
    setGroceryLists(prev => {
      const newLists = { ...prev };
      newLists[storeKey] = prev[storeKey].filter(item => item.id !== id);
      
      // Remove store if empty
      if (newLists[storeKey].length === 0) {
        delete newLists[storeKey];
      }
      
      return newLists;
    });
    
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
        description: "Please fill in all required fields",
        duration: 2000,
      });
      return;
    }

    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: Number(newItemQuantity),
      maxQuantity: Number(newItemMaxQuantity),
      checked: false,
      category: newItemCategory,
      price: newItemPrice ? Number(newItemPrice) : undefined,
    };

    setGroceryLists(prev => ({
      ...prev,
      [newItemStore]: [...(prev[newItemStore] || []), newItem]
    }));

    // Reset form
    setNewItemName('');
    setNewItemPrice('');
    setNewItemQuantity('1');
    setNewItemMaxQuantity('10');
    
    toast({
      description: "Item added successfully",
      duration: 2000,
    });
    
    // Award points for adding items
    setPoints(prev => prev + 1);
  };

  const handleShareList = (store: string) => {
    const list = groceryLists[store];
    const shareText = `Shopping List for ${store}:\n${list.map(item => 
      `- ${item.name} (${item.quantity}/${item.maxQuantity})${item.price ? ` GH₵${item.price}` : ''}`
    ).join('\n')}`;
    
    navigator.clipboard.writeText(shareText).then(() => {
      toast({
        description: "List copied to clipboard! You can now share it.",
        duration: 3000,
      });
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-gold">
                Listly
              </h1>
              <p className="text-gray-600">Keep track of everything you need</p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              <span className="font-bold text-lg">{points} points</span>
            </div>
          </div>
        </header>

        <CategoryList 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onShareList={handleShareList}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Item name..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
            >
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Snacks">Snacks</option>
              <option value="Ready Meals">Ready Meals</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              placeholder="Quantity..."
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              min="1"
            />
            <Input
              type="number"
              placeholder="Max Quantity..."
              value={newItemMaxQuantity}
              onChange={(e) => setNewItemMaxQuantity(e.target.value)}
              min="1"
            />
            <Input
              type="number"
              placeholder="Price (GH₵)..."
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus size={20} />
            Add Item
          </Button>
        </form>

        {Object.entries(filteredLists).map(([store, items]) => (
          <StoreSection
            key={store}
            name={store}
            items={items}
            onToggleItem={(id) => handleToggleItem(store, id)}
            onDeleteItem={(id) => handleDeleteItem(store, id)}
            onShare={() => handleShareList(store)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;