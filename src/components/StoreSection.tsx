import { FC } from 'react';
import { GroceryItem } from './GroceryItem';
import { Store, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StoreSectionProps {
  name: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    maxQuantity: number;
    checked: boolean;
    price?: number;
  }>;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onShare: () => void;
}

export const StoreSection: FC<StoreSectionProps> = ({
  name,
  items,
  onToggleItem,
  onDeleteItem,
  onShare,
}) => {
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Store className="text-primary" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Total: GH₵{totalPrice.toFixed(2)}
          </span>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
        </div>
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