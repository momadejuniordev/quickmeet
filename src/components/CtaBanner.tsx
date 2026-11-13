"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  onStartTrial: () => void;
}

export default function CtaBanner({ onStartTrial }: CtaBannerProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-purple-100/60 border border-purple-200/60 p-8 sm:p-12 lg:p-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Pronto para Elevar <br />
                o Nível das Suas Reuniões?
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-md">
                Inicie hoje mesmo o seu teste gratuito e descubra a melhor experiência de videoconferência de Moçambique.
              </p>
              <div>
                <button
                  onClick={onStartTrial}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition"
                >
                  <span>Começar Gratuitamente</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Laptop Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-white p-2 max-w-md w-full">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                  alt="Computador de trabalho com a videoconferência do Quick Meet activa"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
