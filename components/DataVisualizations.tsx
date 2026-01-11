
import React from 'react';

export const VolumeChart: React.FC = () => {
  return (
    <div className="w-full h-32 relative group">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 Q50,40 100,60 T200,30 T300,70 T400,20 L400,100 L0,100 Z"
          fill="url(#gradient)"
        />
        <path
          d="M0,80 Q50,40 100,60 T200,30 T300,70 T400,20"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          className="group-hover:stroke-[4px] transition-all"
        />
        <circle cx="200" cy="30" r="4" fill="#3b82f6" className="animate-pulse" />
      </svg>
      <div className="absolute top-0 right-0 flex gap-4">
        <div className="flex flex-col text-right">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Current Peak</span>
          <span className="text-sm font-bold text-gray-900">42 Calls/hr</span>
        </div>
      </div>
    </div>
  );
};

export const SourceDonut: React.FC = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="4" />
          <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="65, 100" strokeLinecap="round" />
          <circle cx="18" cy="18" r="16" fill="none" stroke="#a78bfa" strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-65" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-gray-900">142</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phone (65%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Web (25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Other (10%)</span>
        </div>
      </div>
    </div>
  );
};

export const FunnelChart: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-24 flex items-end gap-1">
        <div className="flex-1 bg-blue-600/10 rounded-t-xl relative group">
          <div className="absolute bottom-0 inset-x-0 bg-blue-600 rounded-t-xl transition-all h-[95%] group-hover:h-[98%]"></div>
          <span className="absolute -top-6 inset-x-0 text-center text-[10px] font-bold text-gray-900">Inbound</span>
        </div>
        <div className="flex-1 bg-blue-600/10 rounded-t-xl relative group">
          <div className="absolute bottom-0 inset-x-0 bg-blue-500 rounded-t-xl transition-all h-[72%] group-hover:h-[75%]"></div>
          <span className="absolute -top-6 inset-x-0 text-center text-[10px] font-bold text-gray-900">Qualified</span>
        </div>
        <div className="flex-1 bg-blue-600/10 rounded-t-xl relative group">
          <div className="absolute bottom-0 inset-x-0 bg-blue-400 rounded-t-xl transition-all h-[45%] group-hover:h-[48%]"></div>
          <span className="absolute -top-6 inset-x-0 text-center text-[10px] font-bold text-gray-900">Scheduled</span>
        </div>
        <div className="flex-1 bg-blue-600/10 rounded-t-xl relative group">
          <div className="absolute bottom-0 inset-x-0 bg-blue-300 rounded-t-xl transition-all h-[28%] group-hover:h-[31%]"></div>
          <span className="absolute -top-6 inset-x-0 text-center text-[10px] font-bold text-gray-900">Converted</span>
        </div>
      </div>
    </div>
  );
};

export const EfficiencyBar: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">AI Efficiency</span>
        <span className="text-sm font-bold text-blue-600">91.8%</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full w-[91.8%] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};
