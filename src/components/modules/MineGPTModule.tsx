import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Image as ImageIcon, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  Globe, 
  Scan, 
  Eye, 
  BookOpen, 
  GitBranch, 
  Bell, 
  ShieldAlert, 
  DollarSign, 
  Pickaxe, 
  Fuel, 
  Truck, 
  Users, 
  ShoppingBag, 
  Coins, 
  Trees, 
  Scale, 
  LineChart as LineChartIcon, 
  HelpCircle, 
  Sun, 
  FileCode, 
  ListOrdered, 
  Send, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Download, 
  Upload, 
  RefreshCw, 
  Zap, 
  Layers
} from 'lucide-react';
import { Language } from '../../types';

interface MineGPTModuleProps {
  language: Language;
}

type MineGPTFeature = 
  | 'chat'
  | 'voice'
  | 'image'
  | 'document'
  | 'predictive'
  | 'recommendation'
  | 'reporting'
  | 'summary'
  | 'translator'
  | 'ocr'
  | 'vision'
  | 'knowledge'
  | 'workflow'
  | 'notification'
  | 'risk'
  | 'cost'
  | 'production'
  | 'fuel'
  | 'equipment'
  | 'hr'
  | 'procurement'
  | 'financial'
  | 'esg'
  | 'compliance'
  | 'forecast'
  | 'decision_support'
  | 'daily_briefing'
  | 'meeting_summary'
  | 'action_recommendation';

export const MineGPTModule: React.FC<MineGPTModuleProps> = ({ language }) => {
  const [activeFeature, setActiveFeature] = useState<MineGPTFeature>('chat');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Vision / OCR Image Preview
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Document File Preview
  const [selectedDocName, setSelectedDocName] = useState<string | null>(null);

  // Chat Messages
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'minegpt'; text: string; time: string }>>([
    {
      sender: 'minegpt',
      text: 'Salam Tambang! Saya **MineGPT**, Asisten Kecerdasan Buatan Terpadu Operasional Pertambangan Nikel Indonesia.\n\nSaya dilengkapi dengan 29 spesialisasi AI mencakup analisis risiko K3LH, optimasi kadar ore, proyeksi keuangan HPM, pemantauan telemetri fuel B35, hingga kepatuhan regulasi ESDM.',
      time: '08:00'
    }
  ]);

  const featureList: Array<{ id: MineGPTFeature; label: string; icon: any; category: 'CORE' | 'ANALYTICS' | 'STRATEGY' | 'AUTOMATION' }> = [
    { id: 'chat', label: 'AI Chat', icon: Bot, category: 'CORE' },
    { id: 'voice', label: 'Voice Chat', icon: Mic, category: 'CORE' },
    { id: 'image', label: 'Image Analysis', icon: ImageIcon, category: 'CORE' },
    { id: 'document', label: 'Document Analysis', icon: FileText, category: 'CORE' },
    { id: 'ocr', label: 'AI OCR', icon: Scan, category: 'CORE' },
    { id: 'vision', label: 'AI Vision', icon: Eye, category: 'CORE' },
    { id: 'translator', label: 'AI Translator', icon: Globe, category: 'CORE' },
    { id: 'knowledge', label: 'AI Knowledge Base', icon: BookOpen, category: 'CORE' },

    { id: 'risk', label: 'AI Risk Analysis', icon: ShieldAlert, category: 'ANALYTICS' },
    { id: 'cost', label: 'AI Cost Analysis', icon: DollarSign, category: 'ANALYTICS' },
    { id: 'production', label: 'AI Production Analysis', icon: Pickaxe, category: 'ANALYTICS' },
    { id: 'fuel', label: 'AI Fuel Analysis', icon: Fuel, category: 'ANALYTICS' },
    { id: 'equipment', label: 'AI Equipment Analysis', icon: Truck, category: 'ANALYTICS' },
    { id: 'hr', label: 'AI HR Analysis', icon: Users, category: 'ANALYTICS' },
    { id: 'procurement', label: 'AI Procurement Analysis', icon: ShoppingBag, category: 'ANALYTICS' },
    { id: 'financial', label: 'AI Financial Analysis', icon: Coins, category: 'ANALYTICS' },
    { id: 'esg', label: 'AI ESG Analysis', icon: Trees, category: 'ANALYTICS' },
    { id: 'compliance', label: 'AI Compliance Analysis', icon: Scale, category: 'ANALYTICS' },

    { id: 'predictive', label: 'Predictive Analytics', icon: LineChartIcon, category: 'STRATEGY' },
    { id: 'forecast', label: 'AI Forecast', icon: TrendingUp, category: 'STRATEGY' },
    { id: 'decision_support', label: 'AI Decision Support', icon: HelpCircle, category: 'STRATEGY' },
    { id: 'recommendation', label: 'Recommendation Engine', icon: Sparkles, category: 'STRATEGY' },
    { id: 'action_recommendation', label: 'AI Action Recommendation', icon: ListOrdered, category: 'STRATEGY' },

    { id: 'reporting', label: 'AI Reporting', icon: FileCheck2, category: 'AUTOMATION' },
    { id: 'summary', label: 'AI Summary', icon: FileCode, category: 'AUTOMATION' },
    { id: 'daily_briefing', label: 'AI Daily Briefing', icon: Sun, category: 'AUTOMATION' },
    { id: 'meeting_summary', label: 'AI Meeting Summary', icon: Users, category: 'AUTOMATION' },
    { id: 'workflow', label: 'AI Workflow Assistant', icon: GitBranch, category: 'AUTOMATION' },
    { id: 'notification', label: 'AI Notification', icon: Bell, category: 'AUTOMATION' }
  ];

  const handleRunFeature = async (modeName: MineGPTFeature, customPrompt?: string) => {
    setIsLoading(true);
    const userMsgText = customPrompt || prompt || `Jalankan analisis kecerdasan buatan untuk modul ${modeName}`;

    if (modeName === 'chat') {
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: userMsgText, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setPrompt('');
    }

    try {
      const res = await fetch('/api/ai/mine-gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: modeName,
          prompt: userMsgText,
          payload: {
            selectedDoc: selectedDocName,
            site: 'Bahodopi Pit Alpha Morowali',
            currentNi: 1.83
          }
        })
      });

      const data = await res.json();
      const outputText = data.result || "Analisis MineGPT berhasil diselesaikan.";

      if (modeName === 'chat') {
        setChatMessages(prev => [
          ...prev,
          { sender: 'minegpt', text: outputText, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }
        ]);
      } else {
        setAnalysisResult(outputText);
      }
    } catch (err) {
      if (modeName === 'chat') {
        setChatMessages(prev => [
          ...prev,
          { sender: 'minegpt', text: 'Maaf, sistem MineGPT mengalami kendala koneksi ke server AI.', time: 'Now' }
        ]);
      } else {
        setAnalysisResult('Gagal memproses analisis MineGPT.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVoiceMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setPrompt("Berapa estimasi sisa umur cadangan ore nikel kadar tinggi di Pit Alpha Morowali?");
      }, 3000);
    }
  };

  const handleTextToSpeech = (textToRead: string) => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(textToRead.replace(/[*#]/g, ''));
      utterance.lang = 'id-ID';
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis?.speak(utterance);
    }
  };

  const handleMockImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop');
    }
  };

  const handleMockDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedDocName(file.name);
    } else {
      setSelectedDocName("Sertifikat_Analis_COA_Sucofindo_Nikel_2026.pdf");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Module Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
            <Bot className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                MineGPT Enterprise AI v3.5
              </span>
              <span className="text-slate-400 text-xs">• 29 Spesialisasi Kecerdasan Tambang</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              MineGPT Smart Mining AI Assistant
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
              Pusat komando AI terpadu untuk analisis risiko geoteknik, prediksi kadar ore, kalkulasi HPM, efisiensi solar B35, inspeksi visi kamera pit, dan penyusunan RKAB ESDM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleRunFeature('daily_briefing')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Sun className="w-4 h-4 text-amber-300" />
            <span>AI Daily Briefing</span>
          </button>

          <button
            onClick={() => handleRunFeature('action_recommendation')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Rekomendasi Aksi Shift</span>
          </button>
        </div>
      </div>

      {/* Feature Navigation Grid Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400 font-bold border-b border-slate-800 pb-2">
          <span>29 Modul Kecerdasan Buatan (Klik untuk Mengaktifkan):</span>
          <span className="text-emerald-400 font-mono">Status AI: ONLINE (Gemini 2.5 Engine)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
          {featureList.map((f) => {
            const IconComponent = f.icon;
            const isActive = activeFeature === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFeature(f.id);
                  if (f.id !== 'chat') handleRunFeature(f.id);
                }}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center gap-2 border ${
                  isActive 
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md scale-[1.02]' 
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                }`}
              >
                <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-400'}`} />
                <span className="truncate">{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Feature Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Interactive Control Panel */}
        <div className="lg:col-span-1 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-sm">
                Control Input & Parametric AI
              </h3>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-800 text-amber-300 rounded">
              {activeFeature.replace('_', ' ')}
            </span>
          </div>

          {/* Voice Feature Controls */}
          {activeFeature === 'voice' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-center">
              <span className="text-xs text-slate-400 block font-medium">Pengenalan Suara (Speech Recognition)</span>
              
              <button
                onClick={handleToggleVoiceMic}
                className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-900/50' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                }`}
              >
                {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <p className="text-[11px] text-slate-400">
                {isListening ? "Mendengarkan instruksi suara Anda..." : "Tekan tombol di atas untuk berbicara dengan MineGPT"}
              </p>
            </div>
          )}

          {/* Image Analysis & Vision Upload Controls */}
          {(activeFeature === 'image' || activeFeature === 'vision' || activeFeature === 'ocr') && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-slate-200 block">Unggah Foto / Tangkapan Kamera Pit:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleMockImageUpload}
                className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700 cursor-pointer"
              />
              {selectedImage && (
                <div className="relative rounded-xl overflow-hidden border border-slate-700 h-36">
                  <img src={selectedImage} alt="Pit preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-mono">
                    Sample Pit Frame
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Document Analysis Upload Controls */}
          {activeFeature === 'document' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-slate-200 block">Unggah Dokumen RKAB / COA Lab (PDF/Docx):</span>
              <input
                type="file"
                onChange={handleMockDocUpload}
                className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700 cursor-pointer"
              />
              {selectedDocName && (
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="font-mono text-emerald-300 text-[11px] truncate">{selectedDocName}</span>
                  <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              )}
            </div>
          )}

          {/* Prompt Text Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Instruksi AI Custom Prompt:</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ketik instruksi khusus atau pertanyaan teknis untuk MineGPT..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 placeholder:text-slate-600 resize-none"
            />
          </div>

          <button
            onClick={() => handleRunFeature(activeFeature)}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Memproses AI Analysis...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Jalankan Analisis MineGPT</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Display Canvas Area */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-sm">
                  Hasil Kecerdasan Buatan & Laporan MineGPT
                </h3>
              </div>

              {analysisResult && (
                <button
                  onClick={() => handleTextToSpeech(analysisResult)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSpeaking 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? "Stop Voice" : "Bacakan Hasil"}</span>
                </button>
              )}
            </div>

            {/* AI Chat View Render */}
            {activeFeature === 'chat' ? (
              <div className="space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar p-1">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'minegpt' && (
                      <div className="w-8 h-8 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-5 h-5" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                    }`}>
                      <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                      <span className="text-[10px] text-slate-400 block mt-2 text-right font-mono">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Structured Result Card Render */
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 min-h-[360px] text-xs text-slate-200 leading-relaxed font-sans space-y-3">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
                    <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                    <p className="font-medium animate-pulse">MineGPT sedang menganalisis data pertambangan...</p>
                  </div>
                ) : analysisResult ? (
                  <div className="whitespace-pre-wrap font-sans space-y-2">
                    {analysisResult}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-20 text-slate-500 space-y-2 text-center">
                    <Sparkles className="w-8 h-8 text-slate-600 mb-1" />
                    <p className="font-semibold text-slate-400">Pilih salah satu spesialisasi AI di atas lalu klik "Jalankan Analisis MineGPT"</p>
                    <p className="text-[11px] text-slate-600">MineGPT mendukung 29 spesialisasi dari inspeksi K3LH hingga laporan RKAB ESDM.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>Powered by NickelSmart Enterprise AI Neural Network</span>
            <span className="font-mono text-emerald-400">Response Latency: 120ms</span>
          </div>
        </div>

      </div>

    </div>
  );
};
