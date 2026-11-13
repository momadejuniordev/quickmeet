"use client";

import React from "react";
import { ShieldCheck, MonitorSmartphone, Globe2 } from "lucide-react";

export default function BoardroomAdvantageSection() {
  const languages = [
    "Português",
    "Inglês",
    "Changana",
    "Sena",
    "Emakhuwa",
    "Francês",
    "+35 outros",
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Vantagem Competitiva <br className="hidden sm:inline" />
            <span className="text-purple-600">em Qualquer Sala de Reunião</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Boardroom Display Mockup */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800 p-2 sm:p-3">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80"
                  alt="Sala de reunião executiva corporativa com Quick Meet"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating overlay chip */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Transmissão Corporativa Ultra-HD</span>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-purple-600/90 backdrop-blur-md text-white text-xs font-semibold shadow-lg">
                  Foco Inteligente no Orador Activo
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feature Points */}
          <div className="lg:col-span-6 space-y-8">
            {/* 1: Languages */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-purple-200 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    40+ Idiomas & Dialectos Nacionais Suportados
                  </h3>
                  <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                    Comunique sem barreiras linguísticas com legendas instantâneas e tradução em tempo real.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          lang === "+35 outros"
                            ? "bg-purple-100 text-purple-700 font-semibold"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2: Enterprise Security */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-purple-200 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Segurança de Nível Empresarial
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Criptografia de ponta a ponta que assegura sigilo absoluto para os dados estratégicos da sua organização.
                  </p>
                </div>
              </div>
            </div>

            {/* 3: Works on Any Device */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-purple-200 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <MonitorSmartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Funciona em Qualquer Dispositivo
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Experiência suave e directa através do navegador no computador, telemóvel ou tablet sem instalações obrigatórias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
