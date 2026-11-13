"use client";

import React from "react";
import { Video, Building2, CheckCircle2, Globe2 } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: Video,
      value: "2M+",
      label: "Reuniões Realizadas",
    },
    {
      icon: Building2,
      value: "150K+",
      label: "Equipas Activas",
    },
    {
      icon: CheckCircle2,
      value: "98.7%",
      label: "Taxa de Satisfação",
    },
    {
      icon: Globe2,
      value: "11",
      label: "Províncias & Internacional",
    },
  ];

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </h4>
                  <p className="text-xs font-medium text-slate-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
