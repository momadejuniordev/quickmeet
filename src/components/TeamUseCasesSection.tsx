"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function TeamUseCasesSection() {
  const [activeTab, setActiveTab] = useState("Todas");

  const tabs = ["Todas", "Equipas Remotas", "Vendas", "Educação", "Apoio ao Cliente"];

  const cases = [
    {
      category: "Equipas Remotas",
      title: "Alinhamentos Diários",
      description: "Mantenha a sua equipa conectada e alinhada todos os dias com conexões rápidas.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    },
    {
      category: "Vendas",
      title: "Reuniões Comerciais",
      description: "Impressione parceiros e clientes com máxima estabilidade e qualidade profissional.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
    },
    {
      category: "Apoio ao Cliente",
      title: "Webinars & Conferências",
      description: "Organize conferências corporativas e sessões interactivas com milhares de ouvintes.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    },
    {
      category: "Educação",
      title: "Aulas e Formações Online",
      description: "Ensine e conecte estudantes e formandos de Maputo ao Rovuma sem barreiras.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filteredCases = activeTab === "Todas" 
    ? cases 
    : cases.filter((c) => c.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="solutions" className="py-16 md:py-24 bg-slate-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reuniões Eficientes para Cada Equipa
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCases.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
