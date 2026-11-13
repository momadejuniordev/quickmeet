"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function CustomerStoriesSection() {
  const stories = [
    {
      tag: "TECNOLOGIA",
      title: "Como startups em Maputo aumentaram a produtividade remota em 60%",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    },
    {
      tag: "EDUCAÇÃO",
      title: "Instituições de ensino moçambicanas conectam milhares de formandos online",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    },
    {
      tag: "CORPORATIVO",
      title: "Grandes empresas em Moçambique poupam 10+ horas semanais com reuniões inteligentes",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Histórias de Sucesso
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition"
          >
            <span>Ver Todas as Histórias</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-purple-600 mb-2 block">
                    {story.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                    {story.title}
                  </h3>
                </div>

                <div className="pt-6">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 group-hover:text-purple-600 transition"
                  >
                    <span>Ler História Completa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
