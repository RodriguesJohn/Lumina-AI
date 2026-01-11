
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Metric } from '../types';

export const StatCard: React.FC<{ metric: Metric }> = ({ metric }) => {
  return (
    <div className="flex flex-col gap-1 px-2 group">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{metric.label}</span>
        {metric.trend !== undefined && (
          <span className={`text-[10px] font-bold ${metric.trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {metric.trend > 0 ? '↑' : '↓'}{Math.abs(metric.trend)}%
          </span>
        )}
      </div>
      <p className={`text-2xl font-bold tracking-tight transition-transform group-hover:scale-105 origin-left ${metric.status === 'critical' ? 'text-red-600' : 'text-gray-900'}`}>
        {metric.value}
      </p>
    </div>
  );
};
