"use client";

import React, { useState } from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [activeDot, setActiveDot] = useState(0);

  const testimonials = [
    {
      quote:
        "O Quick Meet transformou a comunicação diária da nossa equipa. Mesmo com variações de internet móvel, as chamadas mantêm-se estáveis e o áudio é impecável.",
      name: "Amina Ismael",
      role: "Gestora de Operações (Maputo)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      quote:
        "Os resumos de IA poupam-nos horas semanais. Não precisamos mais de redigir atas manuais, tudo fica documentado automaticamente com extrema precisão.",
      name: "Edson Macamo",
      role: "Director de Marketing (Beira)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      quote:
        "Confiável, moderno e com baixíssima latência. É um grande orgulho ver Moçambique a liderar com uma solução de videoconferência de padrão mundial.",
      name: "Carlos Sitoe",
      role: "CTO & Engenheiro de Software (Nampula)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            O que Dizem os Nossos Utilizadores
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="text-purple-600 mb-4 opacity-70 group-hover:opacity-100 transition">
                  <Quote className="w-8 h-8 fill-purple-100 text-purple-600" />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-100"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveDot(dot)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeDot === dot ? "w-6 bg-purple-600" : "bg-slate-300"
              }`}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
