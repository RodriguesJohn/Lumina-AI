
import React, { useState } from 'react';
import { 
  Mail, Phone, Globe, Cpu, MoreVertical, ToggleLeft as Toggle, 
  Plus, X, Sparkles, ShieldCheck, Zap, ArrowRight, Settings2, 
  Volume2, BookOpen, Database, MessageSquare, Save, ChevronRight,
  Activity
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  channel: string;
  status: 'Active' | 'Standby' | 'Training';
  tasks: string;
  efficiency: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
}

const INITIAL_AGENTS: Agent[] = [
  { id: 'a1', name: 'Lumina Master Intake', channel: 'Voice/SMS/Web', status: 'Active', tasks: '12,402', efficiency: '99.2%', icon: <Sparkles size={18} />, isPrimary: true },
  { id: 'a2', name: 'Email Triage Unit', channel: 'Inbound Mail', status: 'Active', tasks: '1,402', efficiency: '98.4%', icon: <Mail size={18} /> },
  { id: 'a3', name: 'Web Assistant', channel: 'Direct Site', status: 'Standby', tasks: '4,201', efficiency: '99.9%', icon: <Globe size={18} /> },
  { id: 'a4', name: 'Revenue Auditor', channel: 'Internal EHR', status: 'Active', tasks: '142', efficiency: '87.5%', icon: <Cpu size={18} /> },
];

export const ManageAgents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    if (!newAgentName) return;
    setIsDeploying(true);
    setTimeout(() => {
      const newAgent: Agent = {
        id: `a${Date.now()}`,
        name: newAgentName,
        channel: 'Custom Channel',
        status: 'Training',
        tasks: '0',
        efficiency: '--%',
        icon: <Zap size={18} />,
      };
      setAgents(prev => [...prev, newAgent]);
      setIsDeploying(false);
      setShowCreateModal(false);
      setNewAgentName('');
    }, 2000);
  };

  const primaryAgent = agents.find(a => a.isPrimary);
  const specializedAgents = agents.filter(a => !a.isPrimary);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 relative">
      {/* Fleet Dashboard Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Agent Fleet</h2>
            <div className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200">Live</div>
          </div>
          <p className="text-sm text-gray-400 font-medium max-w-md leading-relaxed">
            Manage your high-performance AI units. Configure their specialized knowledge and track their autonomous efficiency.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-gray-100 rounded-2xl p-3 flex items-center gap-4 shadow-sm">
             <div className="text-center px-4 border-r border-gray-100">
                <span className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Active Fleet</span>
                <span className="text-sm font-bold text-gray-900">{agents.length} Units</span>
             </div>
             <div className="text-center px-4">
                <span className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Fleet Accuracy</span>
                <span className="text-sm font-bold text-blue-600">98.2%</span>
             </div>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={16} />
            Deploy Unit
          </button>
        </div>
      </div>

      {/* Primary Intake Agent Workspace */}
      {primaryAgent && (
        <div className="apple-card p-0 mb-12 relative overflow-hidden group border-blue-100 bg-gradient-to-br from-white to-blue-50/20">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-blue-200 group-hover:rotate-3 transition-transform duration-500">
                  <Sparkles size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{primaryAgent.name}</h3>
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-widest rounded-md">Primary</span>
                  </div>
                  {/* Fixed: Added 'Activity' icon to imports */}
                  <p className="text-gray-400 font-medium flex items-center gap-2 text-sm">
                    {primaryAgent.channel} • HIPAA Compliant • <Activity size={14} className="text-green-500 inline" /> Running
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white">
                 <div className="text-center px-4 border-r border-gray-100">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Actions</span>
                    <span className="text-2xl font-bold text-gray-900">{primaryAgent.tasks}</span>
                 </div>
                 <div className="text-center px-4 border-r border-gray-100">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Score</span>
                    <span className="text-2xl font-bold text-blue-600">{primaryAgent.efficiency}</span>
                 </div>
                 <button 
                  onClick={() => setShowConfigPanel(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-xl font-bold text-xs text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
                 >
                    <Settings2 size={16} />
                    Configure Unit
                 </button>
              </div>
            </div>

            {/* Quick Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => setShowConfigPanel(true)} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                    <Volume2 size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">Voice Synthesis</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Profile: Kore (Cheerfull)</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
              </button>

              <button onClick={() => setShowConfigPanel(true)} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">Intake Script</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Active: Version 2.4.1</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
              </button>

              <button onClick={() => setShowConfigPanel(true)} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                    <Database size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">Knowledge Base</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Syncing: Dentrix EHR</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fleet Grid */}
      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 px-1 flex items-center gap-2">
        Fleet Capacity <div className="h-[1px] flex-1 bg-gray-100"></div>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specializedAgents.map(agent => (
          <div key={agent.id} className="apple-card p-6 flex flex-col group hover:-translate-y-1 transition-all border-gray-200/40">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 shadow-sm transition-colors group-hover:bg-white group-hover:text-blue-600">
                  {agent.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{agent.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{agent.channel}</p>
                </div>
              </div>
              <button className="text-gray-300 hover:text-black transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100/50">
                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Unit Status</p>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' ? 'bg-green-500' : agent.status === 'Training' ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  <span className="text-[10px] font-bold text-gray-700">{agent.status}</span>
                </div>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100/50">
                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Intelligence</p>
                <span className="text-[10px] font-bold text-blue-600">{agent.efficiency}</span>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Auto-Scale</span>
              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                <Toggle className={agent.status === 'Active' ? "text-green-500 rotate-180" : "text-gray-200"} size={22} />
              </button>
            </div>
          </div>
        ))}

        {/* Create Placeholder Card */}
        <button 
          onClick={() => setShowCreateModal(true)}
          className="border-2 border-dashed border-gray-200 rounded-[18px] p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/20 transition-all group min-h-[220px]"
        >
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <span className="text-sm font-bold">New Specialization</span>
        </button>
      </div>

      {/* Deep Config Overlay (Slide-out style) */}
      {showConfigPanel && (
        <div className="fixed inset-0 z-[250] flex justify-end animate-in fade-in duration-300">
           <div 
            className="absolute inset-0 bg-black/5 backdrop-blur-sm" 
            onClick={() => setShowConfigPanel(false)}
           />
           <div className="w-full max-w-xl bg-white h-full shadow-2xl relative animate-in slide-in-from-right duration-500 flex flex-col">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                       <Settings2 size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 tracking-tight">Unit Configuration</h3>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lumina Master Intake (Primary)</p>
                    </div>
                 </div>
                 <button onClick={() => setShowConfigPanel(false)} className="p-2 text-gray-400 hover:text-black bg-white rounded-full border border-gray-100 shadow-sm">
                    <X size={20} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-12">
                 <section>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">Voice & Greeting Profile</label>
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-4">
                          <button className="p-4 border-2 border-blue-500 bg-blue-50 rounded-2xl text-left">
                             <p className="text-xs font-bold text-blue-700 mb-1">Cheerfull Professional</p>
                             <p className="text-[10px] text-blue-400 font-medium leading-tight">Optimized for surgical referral conversion.</p>
                          </button>
                          <button className="p-4 border border-gray-100 bg-white rounded-2xl text-left hover:border-gray-300 transition-colors">
                             <p className="text-xs font-bold text-gray-900 mb-1">Direct Clinical</p>
                             <p className="text-[10px] text-gray-400 font-medium leading-tight">Concise, efficient info gathering.</p>
                          </button>
                       </div>
                       <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                          <div className="flex justify-between items-center mb-4">
                             <span className="text-[10px] font-bold text-gray-400 uppercase">Intro Script</span>
                             <button className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                <Sparkles size={10} /> Generate with AI
                             </button>
                          </div>
                          <p className="text-sm font-medium text-gray-700 italic leading-relaxed">
                            "Hello! Thank you for calling Lumina Healthcare. I'm your intake assistant. Are you calling regarding a recent referral or a new consult?"
                          </p>
                       </div>
                    </div>
                 </section>

                 <section>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">Knowledge Sources</label>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                          <div className="flex items-center gap-3">
                             <Database size={18} className="text-blue-500" />
                             <div>
                                <p className="text-xs font-bold text-gray-900">Dentrix G7 EHR Sync</p>
                                <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">Real-time Bidirectional</p>
                             </div>
                          </div>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><X size={16}/></button>
                       </div>
                       <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-100 rounded-xl text-xs font-bold text-gray-400 hover:bg-gray-50 hover:border-blue-200 hover:text-blue-500 transition-all">
                          <Plus size={14} /> Connect New Source (PDF, API, DB)
                       </button>
                    </div>
                 </section>

                 <section>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">Advanced Logic</label>
                    <div className="bg-gray-900 text-white rounded-2xl p-6 font-mono text-[11px] leading-relaxed relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Cpu size={48} />
                       </div>
                       <p className="text-blue-400 mb-2">// Conditional Routing Rules</p>
                       <p><span className="text-pink-400">if</span> (intent === <span className="text-green-400">"Surgical"</span> && value > <span className="text-orange-400">5000</span>) &#123;</p>
                       <p className="pl-4">priority = <span className="text-green-400">"CRITICAL"</span>;</p>
                       <p className="pl-4">alert_human(<span className="text-green-400">"Revenue Triage"</span>);</p>
                       <p>&#125; <span className="text-pink-400">else</span> &#123;</p>
                       <p className="pl-4">handle_autonomously();</p>
                       <p>&#125;</p>
                    </div>
                 </section>
              </div>

              <div className="p-8 border-t border-gray-100 flex gap-4">
                 <button className="flex-1 py-4 bg-black text-white rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
                    <Save size={18} />
                    Deploy Changes
                 </button>
                 <button onClick={() => setShowConfigPanel(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all">
                    Discard
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Deployment Modal (Simple) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/10 backdrop-blur-md animate-in fade-in duration-300">
          <div className="apple-card w-full max-w-lg p-10 bg-white shadow-[0_32px_120px_rgba(0,0,0,0.12)] border-white relative">
             <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-6 right-6 p-2 text-gray-300 hover:text-black hover:bg-gray-100 rounded-full transition-all"
             >
              <X size={20} />
             </button>

             <div className="mb-10 text-center">
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
                   <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Deploy Intelligence</h3>
                <p className="text-sm text-gray-400 font-medium">Provision a new specialized agent unit.</p>
             </div>

             <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Agent Name</label>
                  <input 
                    type="text" 
                    autoFocus
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="e.g. Surgical Referral Bot"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-medium"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleDeploy}
                    disabled={!newAgentName || isDeploying}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 disabled:opacity-30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    {isDeploying ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Provisioning...
                      </>
                    ) : (
                      <>
                        Deploy Unit
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Loader2 = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
