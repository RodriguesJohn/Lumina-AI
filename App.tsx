
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { IntakeTable } from './components/IntakeTable';
import { DecisionCard } from './components/DecisionCard';
import { ReviewFlow } from './components/ReviewFlow';
import { SidebarChat } from './components/SidebarChat';
import { VolumeChart, SourceDonut, FunnelChart, EfficiencyBar } from './components/DataVisualizations';
import { ManageAgents } from './components/ManageAgents';
import { ActiveCallHUD } from './components/ActiveCallHUD';
import { MOCK_METRICS, MOCK_CASES } from './constants';
import { Bell, Command, Activity, Filter, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const Particles: React.FC = () => {
  const particleCount = 45;
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 300;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const duration = 4 + Math.random() * 8;
      const delay = Math.random() * 10;
      const size = 2 + Math.random() * 4;
      return { i, tx, ty, duration, delay, size };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.i}
          className="particle"
          style={{
            left: '50%',
            top: '50%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showReview, setShowReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [activeCallPatient, setActiveCallPatient] = useState<string | null>(null);
  
  const criticalCases = MOCK_CASES.filter(c => c.priority === 'Critical' || c.priority === 'High').slice(0, 3);

  const handleReviewComplete = () => {
    setShowReview(false);
    setHasReviewed(true);
  };

  const handleExecuteAction = (patientName: string) => {
    setActiveCallPatient(patientName);
  };

  // Map internal IDs to Display Names for the top pill nav
  const tabMap: Record<string, string> = {
    'dashboard': 'Overview',
    'agents': 'Manage Agents',
    'intake': 'Queue',
    'analytics': 'Analytics'
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fbfbfd]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Navigation Bar */}
        <nav className="h-16 flex items-center justify-between px-10 glass border-b border-gray-100 z-50">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Command size={18} />
               </div>
               <span className="font-bold text-lg tracking-tight text-gray-900">Lumina AI Operator</span>
            </div>
            
            {hasReviewed && (
              <div className="flex items-center bg-gray-100/50 p-1 rounded-xl animate-in fade-in zoom-in-95 duration-500 border border-gray-200/20">
                 {Object.entries(tabMap).map(([id, label]) => (
                   <button 
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === id ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
                    }`}
                   >
                     {label}
                   </button>
                 ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
               <Activity size={12} className={hasReviewed ? "text-green-500" : "text-gray-300"} />
               {hasReviewed ? "Active" : "Standby"}
            </div>
            <button className="text-gray-400 hover:text-black transition-colors relative">
               <Bell size={20} />
               {hasReviewed && <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>}
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden cursor-pointer">
               <img src="https://picsum.photos/64/64" alt="User" />
            </div>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto scrollbar-hide relative">
          {!hasReviewed ? (
            <div className="h-full w-full flex items-center justify-center relative overflow-hidden px-6 pb-24">
              <div className="ai-sphere-wrapper">
                <div className="sphere-center-glow"></div>
                <Particles />
                <div className="fluid-container">
                  <div className="blob blob-blue"></div>
                  <div className="blob blob-purple"></div>
                  <div className="blob blob-cyan"></div>
                  <div className="blob blob-pink"></div>
                </div>
              </div>

              <div className="apple-card max-w-[440px] w-full p-12 text-center relative z-20 animate-in fade-in zoom-in-95 duration-1000">
                <div className="flex justify-center mb-10">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-400 relative">
                    <Sparkles size={32} />
                    <div className="absolute inset-0 rounded-2xl bg-blue-400 blur-2xl opacity-40 -z-10 animate-pulse"></div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-12">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 leading-[1.15]">
                    Intake Oversight
                  </h1>
                  <p className="text-gray-400 text-sm font-medium tracking-tight px-2 leading-relaxed">
                    Continuously auditing inbound demand across all channels, identifying and prioritizing high-intent surgical cases.
                  </p>
                </div>
                
                <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-white text-left">
                   <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority Status</span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                        <Activity size={12}/> Monitoring Live
                      </span>
                   </div>
                   <p className="text-gray-600 text-[13px] font-medium leading-relaxed">
                    There are <span className="text-gray-900 font-bold">18 critical interventions</span> currently flagged for human oversight to secure upcoming revenue.
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={() => setShowReview(true)}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all group"
                  >
                    Review All Intakes
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="mt-14 flex items-center justify-center gap-4 opacity-30">
                   <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em]"><ShieldCheck size={14}/> Encrypted</div>
                   <div className="h-4 w-[1px] bg-gray-300"></div>
                   <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em]"><Activity size={14}/> Sync Active</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-10 py-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
              {activeTab === 'dashboard' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="md:col-span-2 apple-card p-8 flex flex-col justify-between">
                       <div className="flex items-center justify-between mb-10">
                          <div>
                            <h3 className="font-bold text-gray-900">Intake Volume</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Performance</p>
                          </div>
                          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <Activity size={14} />
                            <span className="text-xs font-bold">+12% vs Yesterday</span>
                          </div>
                       </div>
                       <VolumeChart />
                    </div>

                    <div className="apple-card p-8 flex flex-col">
                       <h3 className="font-bold text-gray-900 mb-2">Conversion Funnel</h3>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-10">Lead Lifecycle</p>
                       <FunnelChart />
                       <div className="mt-auto pt-6 flex justify-between items-center border-t border-gray-100">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Efficiency</span>
                          <span className="text-sm font-bold text-blue-600">92.4%</span>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="apple-card p-8">
                       <h3 className="font-bold text-gray-900 mb-6">Operational Pulse</h3>
                       <EfficiencyBar />
                       <div className="mt-6 grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-2xl">
                             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Avg Resolution</span>
                             <span className="text-lg font-bold text-gray-900">4.2m</span>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-2xl">
                             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Queue Depth</span>
                             <span className="text-lg font-bold text-gray-900">18 cases</span>
                          </div>
                       </div>
                    </div>

                    <div className="apple-card p-8 flex flex-col justify-center">
                       <div className="flex items-center justify-between mb-8">
                         <h3 className="font-bold text-gray-900">Demand Sources</h3>
                         <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md border border-orange-100 uppercase tracking-tight">
                            Low Risk
                         </div>
                       </div>
                       <SourceDonut />
                    </div>
                  </div>

                  <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Priority Decisions</h2>
                        <div className="px-2 py-0.5 bg-red-50 rounded-md text-[10px] font-bold text-red-500 border border-red-100 uppercase">Critical</div>
                      </div>
                      <button className="text-sm font-bold text-blue-600 hover:underline">View all</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {criticalCases.map(item => (
                        <DecisionCard 
                          key={item.id} 
                          item={item} 
                          onExecute={() => handleExecuteAction(item.patientName)}
                        />
                      ))}
                    </div>
                  </section>
                </>
              )}

              {activeTab === 'agents' && <ManageAgents />}
              
              {activeTab === 'intake' && (
                <section className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Queue Oversight</h2>
                      <div className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] font-bold text-gray-400 uppercase">124 Items</div>
                    </div>
                    <button className="p-2.5 text-gray-400 hover:text-black bg-white rounded-xl border border-gray-100 shadow-sm transition-all">
                        <Filter size={18} />
                    </button>
                  </div>
                  <div className="apple-card overflow-hidden">
                    <IntakeTable />
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>

      {hasReviewed && <SidebarChat />}

      {showReview && <ReviewFlow onClose={() => setShowReview(false)} onComplete={handleReviewComplete} />}
      
      {activeCallPatient && (
        <ActiveCallHUD 
          patientName={activeCallPatient} 
          onEnd={() => setActiveCallPatient(null)} 
        />
      )}
    </div>
  );
};

export default App;
