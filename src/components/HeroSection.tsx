"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Star,
  Mic,
  Video,
  Share2,
  Hand,
  PhoneOff,
  Settings,
  MoreVertical,
  MessageSquare,
  Users,
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  onStartMeeting: (room?: string) => void;
}

export default function HeroSection({ onStartMeeting }: HeroSectionProps) {
  const [quickRoom, setQuickRoom] = useState("");

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartMeeting(quickRoom.trim() || undefined);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-radial-gradient">
      {/* Decorative blurred background orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>A Plataforma de Videoconferência de Moçambique</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Reuniões Virtuais. <br />
                Conexões <span className="text-purple-600">Reais.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                A plataforma moçambicana de videoconferência inteligente, criada para empresas e equipas que valorizam estabilidade, clareza e produtividade.
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Nome ou código da sala..."
                  value={quickRoom}
                  onChange={(e) => setQuickRoom(e.target.value)}
                  className="flex-1 px-4 py-3.5 bg-white rounded-xl border border-slate-200 shadow-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition-all whitespace-nowrap"
                >
                  <span>Iniciar Reunião</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Avatar stack */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Utilizador do Quick Meet"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Utilizador do Quick Meet"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Utilizador do Quick Meet"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Utilizador do Quick Meet"
                />
              </div>

              {/* Stars & Text */}
              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm font-bold text-slate-800 ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">+600 Avaliações Verificadas em Moçambique</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Conference Mockup */}
          <div className="lg:col-span-6 relative">
            {/* Outer card frame with glass and shadows */}
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl bg-white p-2.5 sm:p-3.5 shadow-2xl shadow-purple-900/10 border border-slate-100">
              
              {/* Meeting Header Bar inside screen */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden relative aspect-[16/10] sm:aspect-[16/11]">
                {/* Main Video Feed */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                  alt="Apresentadora em fato roxo na videoconferência do Quick Meet"
                  className="w-full h-full object-cover object-top"
                />

                {/* Left Mini Sidebar Overlay (Navigation icons on video feed) */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md text-white/80 border border-white/10 shadow-lg hidden sm:flex">
                  <div className="p-1.5 hover:bg-white/20 rounded-lg cursor-pointer transition">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-white/20 rounded-lg cursor-pointer transition">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-white/20 rounded-lg cursor-pointer transition">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 hover:bg-white/20 rounded-lg cursor-pointer transition">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>

                {/* Top Badge: Room title & Recording tag */}
                <div className="absolute top-3 left-3 sm:left-12 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-xs font-medium border border-white/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Sincronização Estratégica - Maputo</span>
                  </div>
                  <div className="hidden sm:flex px-2 py-0.5 rounded-full bg-purple-600/90 text-[10px] font-semibold text-white uppercase tracking-wider">
                    IA Activa
                  </div>
                </div>

                {/* Participant name tag */}
                <div className="absolute bottom-16 sm:bottom-18 left-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                  Amélia Tembe (Anfitriã)
                </div>

                {/* Floating Bottom Control Bar */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-2xl bg-slate-900/80 backdrop-blur-lg border border-white/10 shadow-2xl">
                  <button className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition hidden sm:block">
                    <Hand className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onStartMeeting()}
                    className="p-2 sm:p-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition shadow-md shadow-rose-600/30"
                    title="Entrar ou Encerrar Chamada"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                  <button className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating interactive badge */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Ultra-baixa latência de 45ms</p>
                  <p className="text-[11px] text-slate-400">Servidores Optimizados para Moçambique e o Mundo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
