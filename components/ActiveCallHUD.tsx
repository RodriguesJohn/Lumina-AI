
import React, { useEffect, useState, useMemo } from 'react';
import { Phone, X, Activity, Loader2 } from 'lucide-react';

interface ActiveCallHUDProps {
  patientName: string;
  onEnd: () => void;
}

export const ActiveCallHUD: React.FC<ActiveCallHUDProps> = ({ patientName, onEnd }) => {
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<'connecting' | 'active'>('connecting');
  
  // Use a unique session key to force the iframe to reload and trigger the "Start" event in Voiceflow every time
  const sessionKey = useMemo(() => Date.now(), [patientName]);

  useEffect(() => {
    // Simulate a brief connection phase before starting the timer
    const connectionTimer = setTimeout(() => setStatus('active'), 2500);
    
    let interval: number;
    if (status === 'active') {
      interval = window.setInterval(() => setElapsed(prev => prev + 1), 1000);
    }

    return () => {
      clearTimeout(connectionTimer);
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-top-full duration-500 ease-out">
      <div className={`bg-black/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 flex items-center gap-4 shadow-2xl transition-all duration-500 ${status === 'connecting' ? 'min-w-[320px]' : 'min-w-[280px]'}`}>
        
        {/* Call Icon / Spinner */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-500 ${status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-blue-600'}`}>
          {status === 'connecting' ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Phone size={14} fill="currentColor" />
          )}
        </div>
        
        {/* Status Text */}
        <div className="flex-1 flex flex-col">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] leading-none mb-1">
            {status === 'connecting' ? 'Initiating Secure Bridge' : 'AI Agent Active'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white leading-none">{patientName}</span>
            {status === 'active' && (
              <div className="flex gap-0.5 items-end h-2.5">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-0.5 bg-green-400 rounded-full animate-wave" 
                    style={{ 
                      height: '40%', 
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '0.6s'
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Controls & Timer */}
        <div className="flex items-center gap-4 border-l border-white/10 pl-4">
          <span className={`text-xs font-mono font-bold w-10 text-center transition-colors ${status === 'active' ? 'text-green-400' : 'text-white/30'}`}>
            {status === 'active' ? formatTime(elapsed) : '--:--'}
          </span>
          <button 
            onClick={onEnd}
            className="w-7 h-7 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-full flex items-center justify-center transition-colors group"
            title="End Bridge"
          >
            <X size={14} className="group-active:scale-90 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* 
        The "Engine Room": A nearly-invisible but technically active iframe.
        We use a key to ensure a fresh session is created on every button click.
        allow="autoplay; microphone" ensures Voiceflow can trigger the phone logic without being blocked.
      */}
      <div className="absolute opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
        <iframe 
          key={sessionKey}
          src={`https://creator.voiceflow.com/share/6962e8f9319e2dd024fd9e3a/development?t=${sessionKey}`}
          allow="microphone; autoplay"
          title="Voiceflow Action Trigger"
        />
      </div>
    </div>
  );
};
