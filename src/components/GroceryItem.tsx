import { FC } from 'react';
import { QuantityIndicator } from './QuantityIndicator';
import { Check, Trash2, DollarSign } from 'lucide-react';

interface GroceryItemProps {
  name: string;
  quantity: number;
  maxQuantity: number;
  checked: boolean;
  price?: number;
  onToggle: () => void;
  onDelete: () => void;
}

export const GroceryItem: FC<GroceryItemProps> = ({
  name,
  quantity,
  maxQuantity,
  checked,
  price,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in">
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
          ${checked ? 'bg-primary border-primary' : 'border-gray-300 hover:border-primary'}`}
      >
        {checked && <Check size={14} className="text-white" />}
      </button>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
            {name}
          </h3>
          {price && (
            <span className="flex items-center text-sm text-gray-600">
              <span className="mr-1">GH₵</span>
              {price.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-2">
          <QuantityIndicator current={quantity} max={maxQuantity} />
        </div>
      </div>

      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};