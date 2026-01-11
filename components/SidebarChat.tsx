
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const SidebarChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm Lumina AI. I'm currently monitoring your intake channels. How can I assist you with today's cases?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are Lumina AI, an advanced intake operations assistant for healthcare organizations. You help users manage inbound demand, prioritize surgical cases, and optimize clinic capacity. Be professional, concise, and helpful. Use a tone similar to Apple Intelligence: friendly, clear, and direct.",
        }
      });

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.text || "I'm sorry, I couldn't process that request." 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error. Please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="w-96 h-screen border-l border-gray-200/60 glass flex flex-col relative z-50 shadow-sm">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={14} />
          </div>
          <span className="font-bold text-sm tracking-tight text-gray-900">Lumina AI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Always On</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 border-blue-500 rounded-tr-none' 
                : 'bg-white border-gray-100 text-gray-800 shadow-sm rounded-tl-none'
            }`}>
              {m.content}
            </div>
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-wider mt-1 px-1">
              {m.role === 'user' ? 'You' : 'Lumina'}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <Loader2 size={16} className="animate-spin text-blue-600" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pt-0">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask Lumina..."
            className="w-full pl-4 pr-12 py-3.5 bg-gray-50/50 border border-gray-200/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-gray-400 font-medium"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 w-9 h-9 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[9px] text-gray-300 text-center mt-4 font-medium uppercase tracking-widest">
          AI-Powered Intelligence Core
        </p>
      </div>
    </aside>
  );
};
