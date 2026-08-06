import React, { useState, useRef, useEffect } from 'react';
import { askAIChat } from '../services/aiService';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  RefreshCw, 
  Copy, 
  Check, 
  Layers, 
  FileText, 
  TrendingUp, 
  ShieldAlert 
} from 'lucide-react';
import { Language } from '../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      sender: 'ai',
      text: `Halo! Saya **NickelSmart AI**, Asisten Pintar Operasional Pertambangan Nikel Indonesia.
Saya siap membantu Anda dalam:
- **Optimasi Blending Ore Nikel** (Saprolit vs Limonit untuk RKEF / HPAL)
- **Kepatuhan Regulasi ESDM** (Format RKAB, Harga HPM, DMO)
- **Prediksi Risiko Geoteknik & K3LH**
- **Efisiensi Armada Alat Berat & Konsumsi BBM**

Ada yang bisa saya bantu untuk operasional site Anda hari ini?`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      label: 'Formula Blending Saprolit 1.8% Ni',
      prompt: 'Bagaimana komposisi blending optimal antara Stockpile EFO High Grade dan Limonite agar mencapai kadar 1.80% Ni untuk umpan smelter RKEF?'
    },
    {
      label: 'Evaluasi HPM & Royalty ESDM',
      prompt: 'Berapa perkiraan nilai HPM nikel Saprolite 1.8% Ni dengan HMA $16,450/dmt dan Moisture Content 29% serta berapa royalti PNBP yang harus dibayar?'
    },
    {
      label: 'Poin Penting Laporan RKAB',
      prompt: 'Buatkan kerangka laporan kinerja RKAB triwulan untuk pengupasan Overburden dan reklamasi lahan tambang nikel.'
    },
    {
      label: 'Diagnostik BBM PC2000',
      prompt: 'Berikan analisis efisiensi konsumsi BBM Excavator Komatsu PC2000 yang mencapai 42.5 L/jam dan cara menguranginya.'
    }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const replyText = await askAIChat({
        message: text,
        mineData: {
          siteName: "Bahodopi Pit Alpha",
          rkabTarget: "250,000 MT/bulan",
          saproliteGrade: "1.82% Ni",
          limoniteGrade: "1.28% Ni",
          hpmPrice: "$16,450 / dmt"
        }
      });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: "Maaf, terjadi kendala saat terhubung ke AI Service.",
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mining AI Human Engineer Avatar Header Badge */}
            <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/60 p-1 flex items-center justify-center shrink-0 shadow-md shadow-emerald-900/30">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
                <defs>
                  <linearGradient id="hdrHelmet3D" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <linearGradient id="hdrSkin3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                  <linearGradient id="hdrVest3D" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff7849" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
                <path d="M 22 84 C 22 70, 32 64, 50 64 C 68 64, 78 70, 78 84 L 80 96 L 20 96 Z" fill="url(#hdrVest3D)" />
                <rect x="28" y="66" width="10" height="28" rx="2" fill="#ffffff" opacity="0.9" />
                <rect x="62" y="66" width="10" height="28" rx="2" fill="#ffffff" opacity="0.9" />
                <rect x="42" y="54" width="16" height="14" rx="4" fill="url(#hdrSkin3D)" />
                <ellipse cx="50" cy="46" rx="21" ry="20" fill="url(#hdrSkin3D)" />
                <ellipse cx="40" cy="42" rx="3" ry="3.5" fill="#1e293b" />
                <ellipse cx="60" cy="42" rx="3" ry="3.5" fill="#1e293b" />
                <rect x="32" y="38" width="16" height="10" rx="3" fill="#0284c7" opacity="0.8" />
                <rect x="52" y="38" width="16" height="10" rx="3" fill="#0284c7" opacity="0.8" />
                <line x1="48" y1="42" x2="52" y2="42" stroke="#0f172a" strokeWidth="2" />
                <path d="M 43 53 Q 50 58 57 53" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 23 35 C 23 12, 77 12, 77 35 Z" fill="url(#hdrHelmet3D)" />
                <path d="M 16 35 C 16 33, 84 33, 84 35 C 84 39, 16 39, 16 35 Z" fill="#d97706" />
                <rect x="43" y="24" width="14" height="9" rx="3" fill="#1e293b" />
                <circle cx="50" cy="28.5" r="3.5" fill="#38bdf8" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-100 text-sm">MineGPT / NickelSmart AI</h3>
                <span className="px-1.5 py-0.2 text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">NIKEL SPECIALIST</span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">Asisten Pintar Operasional Tambang Nikel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto custom-scrollbar text-[11px]">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.prompt)}
              disabled={isLoading}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700/80 transition-colors font-medium"
            >
              + {qp.label}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900/90">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700 rounded-tl-none shadow-sm'
              }`}>
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                <div className={`flex items-center justify-between text-[10px] pt-1 ${
                  msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400 border-t border-slate-700/50'
                }`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-slate-400 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>NickelSmart AI sedang menganalisis data pertambangan...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Tanyakan analisis kadar nikel, RKAB, atau K3LH..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
