import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  };

  const iconBgClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className={`
      bg-white rounded-2xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
      ${colorClasses[color]}
    `}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`
                text-sm font-medium
                ${trend.isPositive ? 'text-green-600' : 'text-red-600'}
              `}>
                {trend.isPositive ? '+' : ''}{trend.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
            </div>
          )}
        </div>
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          ${iconBgClasses[color]}
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;