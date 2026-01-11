
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const IntakeInsightPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] p-8 shadow-xl border border-gray-200/50 relative overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={18} className="text-blue-500" />
          <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-blue-500">AI Intelligence Report</span>
        </div>
        
        <h2 className="text-2xl font-bold leading-tight mb-4 tracking-tight text-gray-900">
          Lumina has prioritized <br/> 
          <span className="text-blue-600 underline decoration-blue-100 decoration-4 underline-offset-4">18 revenue-critical cases</span> <br/>
          for your review.
        </h2>
        
        <div className="space-y-4 mt-6">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
            <p className="text-sm text-gray-600 font-medium">3 implant inquiries waiting over 15m.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2"></div>
            <p className="text-sm text-gray-600 font-medium">4 insurance verifications pending approval.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 group border border-transparent">
          <span>Start Smart Review</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};