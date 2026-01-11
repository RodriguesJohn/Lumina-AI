
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2, ArrowRight, X } from 'lucide-react';

interface ReviewFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

const steps = [
  { 
    id: 1, 
    label: 'Email Monitoring', 
    description: 'Agent scanning Gmail threads and referral attachments for new surgical cases.' 
  },
  { 
    id: 2, 
    label: 'Form Extraction', 
    description: 'Digitizing web forms and correlating submission data with patient history.' 
  },
  { 
    id: 3, 
    label: 'Call Auditing', 
    description: 'Analyzing recent call recordings and transcriptions for high-intent urgency.' 
  },
  { 
    id: 4, 
    label: 'Unified Synthesis', 
    description: 'Synthesizing 142 cross-channel signals into the priority revenue queue.' 
  },
];

export const ReviewFlow: React.FC<ReviewFlowProps> = ({ onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep <= steps.length) {
      const timer = setTimeout(() => {
        if (currentStep === steps.length) {
          setIsComplete(true);
        } else {
          setCurrentStep(prev => prev + 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass">
      <div className="apple-card w-full max-w-2xl p-10 relative overflow-hidden bg-white shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Lumina Intelligence Sync</h2>
          <p className="text-gray-500 font-medium">Lumina agents are auditing all inbound communication channels.</p>
        </div>

        <div className="space-y-6 relative mb-12">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-100"></div>
          
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isFinished = step.id < currentStep || isComplete;
            
            return (
              <div key={step.id} className={`flex gap-6 relative transition-opacity duration-500 ${!isActive && !isFinished ? 'opacity-30' : 'opacity-100'}`}>
                <div className="relative z-10">
                  {isFinished ? (
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <CheckCircle2 size={24} />
                    </div>
                  ) : isActive ? (
                    <div className="w-12 h-12 bg-white border-2 border-blue-600 rounded-2xl flex items-center justify-center text-blue-600 shadow-xl">
                      <Loader2 size={24} className="animate-spin" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center text-gray-300">
                      <Circle size={24} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 pt-1">
                  <h4 className={`font-bold text-lg ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>{step.label}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {isComplete && (
          <button 
            onClick={onComplete}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4"
          >
            Access Priority Decisions
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
