import React, { useState } from 'react';
import { Sparkles, MessageSquare, ShieldCheck, ChevronRight, X, Bot, Activity, Zap } from 'lucide-react';

interface FloatingAIAvatarProps {
  onOpenAIDrawer: () => void;
}

export const FloatingAIAvatar: React.FC<FloatingAIAvatarProps> = ({ onOpenAIDrawer }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group select-none">
      
      {/* Interactive Speech Bubble Greeting */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-slate-900/95 text-slate-100 p-3 rounded-2xl border border-emerald-500/40 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300 relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-2 -right-2 bg-slate-800 text-slate-400 hover:text-white p-1 rounded-full border border-slate-700 shadow"
            title="Tutup Pesan"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shrink-0 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-bold text-xs text-white">NickelSmart AI</span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Butuh bantuan hitung <strong className="text-emerald-400">Armada DT</strong>, <strong className="text-emerald-400">Ore Blending</strong>, atau <strong className="text-emerald-400">RKAB Nikel</strong>?
              </p>
              
              <button
                onClick={onOpenAIDrawer}
                className="mt-2 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                Tanya AI Sekarang <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* Arrow pointer down */}
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-slate-900 border-b border-r border-emerald-500/40 rotate-45" />
        </div>
      )}

      {/* Main Floating Mining AI Avatar Button */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing Backlight Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-pulse transition duration-500" />

        {/* Floating Trigger Button */}
        <button
          onClick={onOpenAIDrawer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-16 h-16 rounded-2xl bg-slate-950 border-2 border-emerald-500/80 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-300 transform group-hover:scale-105 active:scale-95 group-hover:border-amber-400"
          title="Buka Asisten AI Tambang Nikel"
        >
          {/* Mining AI Custom Helmet Vector Avatar */}
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 p-2">
            
            {/* 3D Human Mining Engineer Avatar SVG */}
            <svg viewBox="0 0 100 100" className="w-13 h-13 drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)]">
              <defs>
                {/* 3D Helmet Shading */}
                <linearGradient id="helmet3D" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>

                {/* Helmet Rim 3D */}
                <linearGradient id="helmetRim3D" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>

                {/* Human Skin Tone 3D Gradient */}
                <linearGradient id="skin3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="60%" stopColor="#fdba74" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>

                {/* Safety Goggles Glass 3D */}
                <linearGradient id="goggles3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                </linearGradient>

                {/* High Vis Vest Orange 3D */}
                <linearGradient id="vest3D" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff7849" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>

                {/* Reflective Stripe */}
                <linearGradient id="reflective3D" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
              </defs>

              {/* Background 3D Soft Glow Ring */}
              <circle cx="50" cy="50" r="47" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[spin_16s_linear_infinite]" />

              {/* High-Vis Safety Vest & Shoulders (3D Body) */}
              <path d="M 22 84 C 22 70, 32 64, 50 64 C 68 64, 78 70, 78 84 L 80 96 L 20 96 Z" fill="url(#vest3D)" />
              {/* Inner Shirt Collar */}
              <path d="M 40 64 L 50 72 L 60 64 L 50 68 Z" fill="#0f172a" />
              {/* 3D Reflective Safety Harness Stripes */}
              <rect x="28" y="66" width="10" height="28" rx="2" fill="url(#reflective3D)" />
              <rect x="62" y="66" width="10" height="28" rx="2" fill="url(#reflective3D)" />
              {/* ID Badge Card */}
              <rect x="44" y="74" width="12" height="15" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
              <rect x="46" y="76" width="8" height="6" rx="1" fill="#0284c7" />

              {/* Human Neck */}
              <rect x="42" y="54" width="16" height="14" rx="4" fill="url(#skin3D)" />

              {/* Human Head (3D Face) */}
              <ellipse cx="50" cy="46" rx="21" ry="20" fill="url(#skin3D)" />

              {/* Human Ears & Comms Headset */}
              <circle cx="28" cy="46" r="5" fill="url(#skin3D)" />
              <circle cx="72" cy="46" r="5" fill="url(#skin3D)" />
              {/* Radio Earpiece / Walkie Comms */}
              <rect x="71" y="42" width="6" height="10" rx="2" fill="#1e293b" />
              <circle cx="74" cy="47" r="2" fill="#10b981" />

              {/* Friendly Eyebrows */}
              <path d="M 36 37 Q 41 34 45 37" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 55 37 Q 59 34 64 37" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Human Eyes */}
              <ellipse cx="40" cy="42" rx="3" ry="3.5" fill="#1e293b" />
              <ellipse cx="60" cy="42" rx="3" ry="3.5" fill="#1e293b" />
              {/* Eye Catchlights */}
              <circle cx="39" cy="41" r="1" fill="#ffffff" />
              <circle cx="59" cy="41" r="1" fill="#ffffff" />

              {/* 3D Safety Glasses / Goggles (Tinted Green-Blue) */}
              <rect x="32" y="38" width="16" height="10" rx="3" fill="url(#goggles3D)" stroke="#0f172a" strokeWidth="1.2" opacity="0.85" />
              <rect x="52" y="38" width="16" height="10" rx="3" fill="url(#goggles3D)" stroke="#0f172a" strokeWidth="1.2" opacity="0.85" />
              <line x1="48" y1="42" x2="52" y2="42" stroke="#0f172a" strokeWidth="2" />
              {/* Glasses Glare Highlight */}
              <line x1="34" y1="40" x2="42" y2="46" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
              <line x1="54" y1="40" x2="62" y2="46" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

              {/* Friendly Confident Smile */}
              <path d="M 43 53 Q 50 58 57 53" stroke="#9a3412" strokeWidth="2.2" strokeLinecap="round" fill="none" />

              {/* 3D Mining Hardhat Helmet */}
              <path d="M 23 35 C 23 12, 77 12, 77 35 Z" fill="url(#helmet3D)" />
              {/* Helmet Rim (Brim) */}
              <path d="M 16 35 C 16 33, 84 33, 84 35 C 84 39, 16 39, 16 35 Z" fill="url(#helmetRim3D)" />
              {/* Helmet Front Center Ridge */}
              <path d="M 46 14 C 46 14, 50 12, 54 14 L 54 33 L 46 33 Z" fill="#fde047" opacity="0.8" />

              {/* Miner Headlamp (3D LED Torch) */}
              <rect x="43" y="24" width="14" height="9" rx="3" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="50" cy="28.5" r="3.5" fill="#38bdf8" className="animate-pulse" />
              <circle cx="50" cy="28.5" r="1.5" fill="#ffffff" />
            </svg>

            {/* Corner Badge Tag */}
            <div className="absolute top-1 right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full shadow border border-amber-300">
              <Zap className="w-2.5 h-2.5 fill-slate-950" />
            </div>

            {/* Bottom AI Status Label */}
            <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 py-0.5 text-center border-t border-emerald-500/50">
              <span className="text-[8px] font-extrabold tracking-wider text-emerald-400 uppercase block">
                MINEGPT
              </span>
            </div>
          </div>
        </button>

        {/* Live Active Status Ring Badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>
        </span>
      </div>

    </div>
  );
};
