import { FC } from 'react';
import { GroceryItem } from './GroceryItem';
import { Store } from 'lucide-react';

interface StoreSectionProps {
  name: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    maxQuantity: number;
    checked: boolean;
  }>;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export const StoreSection: FC<StoreSectionProps> = ({
  name,
  items,
  onToggleItem,
  onDeleteItem,
}) => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Store className="text-primary" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <GroceryItem
            key={item.id}
            {...item}
            onToggle={() => onToggleItem(item.id)}
            onDelete={() => onDeleteItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};