"use client";

import React from "react";
import { ArrowRight, VolumeX, Sparkles, Languages, Zap } from "lucide-react";

interface AIFeaturesSectionProps {
  onExplore?: () => void;
}

export default function AIFeaturesSection({ onExplore }: AIFeaturesSectionProps) {
  const features = [
    {
      icon: VolumeX,
      title: "Cancelamento de Ruído com IA",
      description: "Áudio cristalino em qualquer ambiente, eliminando ecos e ruídos de fundo.",
    },
    {
      icon: Sparkles,
      title: "Resumos Automáticos",
      description: "Receba atas completas e pontos de acção logo após o término da reunião.",
    },
    {
      icon: Languages,
      title: "Transcrição em Tempo Real",
      description: "Legendas ao vivo com precisão elevada e suporte a múltiplos idiomas.",
    },
    {
      icon: Zap,
      title: "Destaques Inteligentes",
      description: "A inteligência artificial identifica e marca momentos-chave da conversa.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Reuniões com IA <br />
              Que Realmente <span className="text-purple-600">Funcionam</span>
            </h2>

            <div>
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-600/20 active:scale-95 transition"
              >
                <span>Explorar Recursos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 text-base leading-relaxed max-w-md">
              Do cancelamento de ruído a atas e resumos inteligentes com IA, nós cuidamos da infra-estrutura para que a sua equipa se foque em resultados.
            </p>
          </div>

          {/* Right Column: 2x2 Feature Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-purple-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-normal leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
