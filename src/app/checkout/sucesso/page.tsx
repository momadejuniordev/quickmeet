"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Video,
  User,
  ArrowRight,
  ShieldCheck,
  Download,
  Calendar,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const { user, userFullName } = useAuth();

  const plan = searchParams.get("plan") || "profissional";
  const amount = searchParams.get("amount") || "550";
  const orderNumber = `QM-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl space-y-6 text-center">
        {/* Ícone de Sucesso */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
            Pagamento PaySuite Aprovado
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Obrigado pelo Seu Pedido!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A sua subscrição ao <strong>Plano Profissional</strong> foi ativada com sucesso.
          </p>
        </div>

        {/* Recibo / Resumo da Compra */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3">
          <div className="flex justify-between text-xs pb-3 border-b border-slate-200">
            <span className="text-slate-500">Número da Encomenda</span>
            <span className="font-mono font-bold text-slate-900">{orderNumber}</span>
          </div>

          <div className="flex justify-between text-xs pb-3 border-b border-slate-200">
            <span className="text-slate-500">Item</span>
            <span className="font-semibold text-slate-900">Quick Meet • Plano Profissional</span>
          </div>

          <div className="flex justify-between text-xs pb-3 border-b border-slate-200">
            <span className="text-slate-500">Cliente</span>
            <span className="font-semibold text-slate-900">{userFullName || user?.email || "Cliente Quick Meet"}</span>
          </div>

          <div className="flex justify-between text-xs pb-3 border-b border-slate-200">
            <span className="text-slate-500">Gateway de Pagamento</span>
            <span className="font-semibold text-slate-900">PaySuite (M-Pesa / e-Mola)</span>
          </div>

          <div className="flex justify-between text-sm pt-1 items-baseline">
            <span className="font-bold text-slate-900">Total Pago</span>
            <span className="text-lg font-extrabold text-purple-600">{amount} MZN</span>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition"
          >
            <Video className="w-4 h-4" />
            <span>Iniciar Reunião Agora</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/perfil"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-200 hover:border-purple-600 text-slate-700 font-semibold text-xs hover:bg-purple-50 transition"
          >
            <User className="w-4 h-4" />
            <span>Ver Meu Perfil & Histórico</span>
          </Link>
        </div>

        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Fatura emitida e subscrição sincronizada no Quick Meet</span>
        </p>
      </div>

      <footer className="text-center text-xs text-slate-400 mt-6">
        © 2026 Quick Meet. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="p-8 text-center">A carregar confirmação...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </AuthProvider>
  );
}

