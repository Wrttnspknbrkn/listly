import { FC } from 'react';
import { 
  Apple, 
  Carrot, 
  Cookie, 
  Milk, 
  Pizza, 
  ShoppingBasket,
  DollarSign,
  Users,
  LucideIcon
} from 'lucide-react';

interface CategoryIconProps {
  category: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Fruits: Apple,
  Vegetables: Carrot,
  Snacks: Cookie,
  Dairy: Milk,
  'Ready Meals': Pizza,
  Other: ShoppingBasket,
  Prices: DollarSign,
  Shared: Users
};

export const CategoryIcon: FC<CategoryIconProps> = ({ category, size = 24, className = '' }) => {
  const Icon = iconMap[category] || ShoppingBasket;
  return <Icon size={size} className={className} />;
};