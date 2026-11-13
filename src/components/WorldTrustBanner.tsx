"use client";

import React from "react";
import { ArrowRight, Globe } from "lucide-react";

interface WorldTrustBannerProps {
  onLearnMore?: () => void;
}

export default function WorldTrustBanner({ onLearnMore }: WorldTrustBannerProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-purple-900/20">
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-purple-200">
                Orgulho Moçambicano
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                De Moçambique <br />
                Para o Mundo
              </h2>
              <p className="text-purple-100 text-base sm:text-lg max-w-lg leading-relaxed">
                Junte-se a centenas de empresas, startups, escolas e instituições públicas que contam com o Quick Meet para a sua comunicação diária.
              </p>
              <div>
                <button
                  onClick={onLearnMore}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-700 hover:bg-purple-50 font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition"
                >
                  <span>Saber Mais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Globe graphic with avatars */}
            <div className="lg:col-span-6 flex justify-center items-center relative">
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
                {/* Globe sphere visual representation */}
                <div className="w-64 h-64 sm:w-76 sm:h-76 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-500/80 border border-white/20 shadow-inner flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                  <Globe className="w-48 h-48 sm:w-60 sm:h-60 text-white/30 animate-pulse stroke-[1]" />
                </div>

                {/* Floating User Pins with city tooltips */}
                <div className="absolute top-4 left-10 p-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg ring-4 ring-purple-600/30 animate-bounce duration-1000 group">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Maputo"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Maputo
                  </span>
                </div>

                <div className="absolute top-12 right-6 p-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg ring-4 ring-indigo-600/30 group">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Beira"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Beira
                  </span>
                </div>

                <div className="absolute bottom-10 left-8 p-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg ring-4 ring-purple-600/30 group">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                    alt="Nampula"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Nampula
                  </span>
                </div>

                <div className="absolute bottom-6 right-12 p-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg ring-4 ring-purple-600/30 animate-pulse group">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                    alt="Tete"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Tete
                  </span>
                </div>

                <div className="absolute top-1/2 left-4 p-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg ring-4 ring-purple-600/30 group">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                    alt="Pemba"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Pemba
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
