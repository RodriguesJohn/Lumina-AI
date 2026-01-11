
import React from 'react';
import { MOCK_CASES } from '../constants';
import { MoreHorizontal } from 'lucide-react';

export const IntakeTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-50 bg-gray-50/30">
            <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source</th>
            <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Patient</th>
            <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Value</th>
            <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority</th>
            <th className="px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {MOCK_CASES.filter(c => c.priority !== 'Critical').map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
              <td className="px-8 py-4">
                <span className="text-xs font-bold text-gray-400">{item.source}</span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm font-semibold text-gray-900">{item.patientName}</span>
              </td>
              <td className="px-4 py-4 tabular-nums">
                <span className="text-sm font-bold">${item.value.toLocaleString()}</span>
              </td>
              <td className="px-4 py-4">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                   item.priority === 'High' ? 'border-orange-100 bg-orange-50 text-orange-600' : 'border-gray-100 bg-gray-50 text-gray-500'
                 }`}>
                   {item.priority}
                 </span>
              </td>
              <td className="px-4 py-4 text-right">
                 <button className="text-gray-300 hover:text-gray-600 transition-colors">
                    <MoreHorizontal size={18} />
                 </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 text-center border-t border-gray-50">
         <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Load Extended Archive</button>
      </div>
    </div>
  );
};
