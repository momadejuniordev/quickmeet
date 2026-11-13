"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Smartphone, ShieldCheck } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);

  const proAmount = isYearly ? 440 : 550;

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            O Plano Certo <br />
            para <span className="text-purple-600">Melhores Reuniões</span>
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Planos transparentes cobrados em <strong className="text-purple-600 font-semibold">Meticais (MZN)</strong> com checkout seguro via <strong className="text-slate-900 font-semibold">PaySuite (M-Pesa e e-Mola)</strong>.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-xs font-semibold ${!isYearly ? "text-slate-900" : "text-slate-500"}`}>
              Mensal
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-7 w-12 items-center rounded-full bg-purple-600 transition-colors p-1"
              aria-label="Alternar facturação anual"
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isYearly ? "text-slate-900" : "text-slate-500"}`}>
              Anual
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                Poupe 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Starter */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Inicial</h3>
                <p className="text-xs text-slate-500 mt-1">Ideal para profissionais individuais e pequenas equipas.</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-slate-900">0</span>
                  <span className="text-xl font-bold text-slate-800">MZN</span>
                  <span className="text-sm font-medium text-slate-500">/ Sempre Grátis</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Sem necessidade de cartão de crédito</p>
              </div>

              <button
                onClick={() => onSelectPlan("Inicial")}
                className="w-full py-3 px-4 rounded-xl border border-purple-200 hover:border-purple-600 hover:bg-purple-50 text-purple-700 font-semibold text-xs tracking-wide uppercase transition mb-8"
              >
                Começar Gratuitamente
              </button>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">O que está incluído</p>
                {[
                  "Até 5 participantes por sala",
                  "Reuniões de até 40 minutos",
                  "Chat ao vivo interactivo",
                  "Partilha de ecrã em alta definição",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Professional (Popular - Checkout Ecommerce) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-purple-600 shadow-xl shadow-purple-600/10 flex flex-col justify-between relative hover:scale-[1.01] transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" /> Mais Popular
            </div>

            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Profissional</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    PaySuite
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Para empresas e equipas em crescimento dinâmico.</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-purple-600">
                    {proAmount}
                  </span>
                  <span className="text-xl font-bold text-slate-800">MZN</span>
                  <span className="text-xs font-medium text-slate-500">/ mês</span>
                </div>
                <p className="text-[11px] text-purple-600 font-medium mt-1">
                  {isYearly ? "Facturado anualmente (5.280 MZN/ano)" : "Facturado mensalmente via M-Pesa / e-Mola"}
                </p>
              </div>

              <Link
                href={`/checkout?plan=profissional&period=${isYearly ? "anual" : "mensal"}`}
                className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-98 text-white font-semibold text-xs tracking-wide uppercase transition shadow-lg shadow-purple-600/25 mb-4 flex items-center justify-center gap-2"
              >
                <span>Subscrever ({proAmount} MZN)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mb-6 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-100">
                <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                <span>Pague com <strong>M-Pesa</strong> ou <strong>e-Mola</strong></span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600">Tudo no Inicial, mais</p>
                {[
                  "Até 100 participantes simultâneos",
                  "Duração de reunião ilimitada",
                  "Resumos automáticos com inteligência artificial",
                  "Gravação em nuvem (100 horas de armazenamento)",
                  "Fundos virtuais personalizados com logótipo",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Enterprise */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Empresarial</h3>
                <p className="text-xs text-slate-500 mt-1">Para grandes instituições, bancos e ministérios.</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-slate-900">Sob Medida</span>
                  <span className="text-sm font-medium text-slate-500">em MZN</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Facturação corporativa flexível com NUIT</p>
              </div>

              <button
                onClick={() => onSelectPlan("Empresarial")}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 font-semibold text-xs tracking-wide uppercase transition mb-8"
              >
                Falar com Consultores
              </button>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tudo no Profissional</p>
                {[
                  "Participantes e salas ilimitadas",
                  "Auditoria e transcrição corporativa completa",
                  "Segurança corporativa com integração SSO / SAML",
                  "Gestor de conta moçambicano dedicado",
                  "Garantia de 99.99% de disponibilidade com SLA",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
