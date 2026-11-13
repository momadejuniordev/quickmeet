"use client";

import React from "react";
import { Mic, Video, PhoneOff, Apple, Play } from "lucide-react";

export default function MobileAppSection() {
  const participants = [
    {
      name: "Celso Nhatitima",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Amélia Tembe",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "David Mabunda",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Yara Manjate",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-purple-900/20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Text & Store Badges */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Leve as Suas Reuniões <br />
                Onde Quer que Vá
              </h2>
              <p className="text-purple-100 text-base sm:text-lg max-w-lg leading-relaxed">
                A aplicação Quick Meet mantém-no ligado onde quer que esteja. Participe em chamadas, apresente e colabore com a sua equipa com baixo consumo de dados móveis.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/80 hover:bg-black text-white border border-white/20 transition shadow-lg">
                  <Apple className="w-6 h-6 fill-white" />
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] text-white/70 uppercase tracking-wider">
                      Descarregar na
                    </span>
                    <span className="text-sm font-bold">App Store</span>
                  </div>
                </button>

                <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/80 hover:bg-black text-white border border-white/20 transition shadow-lg">
                  <Play className="w-5 h-5 fill-white" />
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] text-white/70 uppercase tracking-wider">
                      Disponível no
                    </span>
                    <span className="text-sm font-bold">Google Play</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Realistic Mobile Phone Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-64 sm:w-72 bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-700 ring-1 ring-white/20">
                {/* Notch / Speaker bar */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950 ml-6" />
                </div>

                {/* Inner Screen */}
                <div className="relative bg-white rounded-[2rem] overflow-hidden pt-8 pb-4 px-3 flex flex-col justify-between aspect-[9/16]">
                  {/* Top Bar */}
                  <div className="text-center mb-3">
                    <h4 className="text-xs font-bold text-slate-800">Alinhamento de Equipa MZ</h4>
                    <p className="text-[10px] text-slate-500">10:00 - 11:00 (Maputo)</p>
                  </div>

                  {/* 2x2 Video Grid */}
                  <div className="grid grid-cols-2 gap-2 flex-1 my-2">
                    {participants.map((person, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-xl overflow-hidden bg-slate-100 aspect-square shadow-sm"
                      >
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/50 text-[9px] text-white font-medium backdrop-blur-xs">
                          {person.name.split(" ")[0]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating Mobile Controls */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shadow-sm">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shadow-sm">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/30">
                      <PhoneOff className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
