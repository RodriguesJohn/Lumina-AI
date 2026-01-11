
import React from 'react';
import { SIDEBAR_ITEMS } from '../constants';

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 h-screen border-r border-gray-200/60 glass flex flex-col py-8 sticky top-0 z-[60]">
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
             <span className="font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-sm tracking-tight overflow-hidden whitespace-nowrap text-gray-900">Lumina AI Operator</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1 px-3">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id
                ? 'bg-blue-600/5 text-blue-600 font-bold border border-blue-600/10'
                : 'text-gray-400 hover:text-black hover:bg-gray-100/50 border border-transparent'
            }`}
          >
            <div className={`${activeTab === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-black'} transition-colors shrink-0`}>
              {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
            </div>
            <span className="text-sm font-medium overflow-hidden whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="px-6 pt-6 border-t border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-200 hover:bg-white transition-colors cursor-pointer shrink-0">
          ?
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Help & Support</span>
      </div>
    </aside>
  );
};
