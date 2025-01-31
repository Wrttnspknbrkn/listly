import { FC } from 'react';

interface QuantityIndicatorProps {
  current: number;
  max: number;
}

export const QuantityIndicator: FC<QuantityIndicatorProps> = ({ current, max }) => {
  const percentage = (current / max) * 100;
  const getColor = () => {
    if (percentage <= 20) return 'bg-red-500';
    if (percentage <= 50) return 'bg-yellow-500';
    return 'bg-accent';
  };

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ${getColor()}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};