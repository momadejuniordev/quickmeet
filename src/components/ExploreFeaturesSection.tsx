"use client";

import React from "react";
import {
  Video,
  Monitor,
  LayoutGrid,
  BarChart3,
  Disc3,
  CalendarDays,
} from "lucide-react";

export default function ExploreFeaturesSection() {
  const tools = [
    {
      icon: Video,
      title: "Qualidade de Vídeo Full HD",
      description: "Vídeo nítido e fluido com compressão inteligente que economiza dados móveis.",
    },
    {
      icon: Monitor,
      title: "Partilha de Ecrã Instantânea",
      description: "Apresente relatórios, planilhas e janelas com áudio integrado sem complicações.",
    },
    {
      icon: LayoutGrid,
      title: "Salas Simultâneas (Breakouts)",
      description: "Divida grandes equipas em salas menores para discussões e workshops dinâmicos.",
    },
    {
      icon: BarChart3,
      title: "Votações e Enquetes em Directo",
      description: "Colha opiniões e tome decisões rápidas em equipa com sondagens interactivas.",
    },
    {
      icon: Disc3,
      title: "Gravação Segura na Nuvem",
      description: "Grave e armazene as suas reuniões para partilhar com quem não pôde estar presente.",
    },
    {
      icon: CalendarDays,
      title: "Sincronização de Calendários",
      description: "Integração directa com Google Agenda, Microsoft Outlook e envio de convites.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2 block">
            Explore Mais
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tudo o que Precisa <br />
            para Reuniões de Alto Rendimento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-100 hover:border-purple-200 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-100/70 flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
