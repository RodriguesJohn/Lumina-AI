
import React from 'react';
import { Sparkles, Clock, PhoneCall, Zap } from 'lucide-react';
import { IntakeCase } from '../types';

interface DecisionCardProps {
  item: IntakeCase;
  onExecute?: () => void;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({ item, onExecute }) => {
  return (
    <div className="apple-card p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group border border-gray-200/40">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          item.priority === 'Critical' ? 'bg-red-500 text-white shadow-lg shadow-red-200 border border-red-400' : 'bg-blue-600 text-white shadow-lg shadow-blue-200 border border-blue-500'
        }`}>
          {item.source === 'Phone Call' ? <PhoneCall size={20} /> : <Zap size={20} />}
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Potential</span>
          <span className="text-lg font-bold text-gray-900">${item.value.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-bold text-xl text-gray-900 mb-1 leading-tight">{item.patientName}</h4>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <span className="flex items-center gap-1"><Clock size={12} /> {item.waitTime} ago</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{item.source}</span>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-blue-500" />
          <p className="text-xs font-bold text-blue-600 uppercase tracking-tight">AI: {item.nextAction}</p>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onExecute?.();
          }}
          className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all border border-transparent active:scale-[0.98]"
        >
          Execute Action
        </button>
      </div>
    </div>
  );
};
