"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Lock,
  ShoppingBag,
  Check,
  CreditCard,
  User,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase/client";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userFullName, updatePlan } = useAuth();

  const planParam = searchParams.get("plan") || "profissional";
  const periodParam = searchParams.get("period") || "mensal";

  const isYearly = periodParam === "anual";
  const price = isYearly ? 440 * 12 : 550; // 550 MZN/mês ou 5.280 MZN/ano

  // Form states
  const [fullName, setFullName] = useState(userFullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("Maputo Cidade");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (userFullName && !fullName) setFullName(userFullName);
    if (user?.email && !email) setEmail(user.email);
  }, [userFullName, user]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg("Por favor, insira o seu nome completo.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Por favor, insira um email válido para a confirmação.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/payments/paysuite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          phone: phoneNumber.replace(/\D/g, ""),
          email,
          customer_name: fullName,
          province,
          returnUrl: `${window.location.origin}/checkout/sucesso?plan=${planParam}&period=${periodParam}&amount=${price}`,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMsg(data.error);
        setLoading(false);
        return;
      }

      // Atualiza o plano localmente
      await updatePlan("profissional");

      // Registar subscrição e fatura no Supabase se o utilizador estiver autenticado
      if (user) {
        try {
          const endDate = new Date();
          if (periodParam === "anual") {
            endDate.setFullYear(endDate.getFullYear() + 1);
          } else {
            endDate.setMonth(endDate.getMonth() + 1);
          }

          const { data: subData } = await supabase
            .from("subscriptions")
            .insert({
              user_id: user.id,
              plan: "profissional",
              status: "active",
              billing_period: periodParam === "anual" ? "anual" : "mensal",
              amount: price,
              gateway: "paysuite",
              paysuite_payment_id: data.payment_id || null,
              paysuite_link_url: data.payment_url || null,
              current_period_end: endDate.toISOString(),
            })
            .select()
            .single();

          await supabase.from("invoices").insert({
            subscription_id: subData?.id || null,
            user_id: user.id,
            order_number: `QM-${Math.floor(100000 + Math.random() * 900000)}`,
            amount: price,
            currency: "MZN",
            status: "completed",
            gateway: "paysuite",
            payment_method: "PaySuite",
          });
        } catch {
          // Continua sem interrupções caso as tabelas ainda não tenham sido criadas
        }
      }

      // Redireciona imediatamente para o gateway seguro da PaySuite
      if (data.payment_url) {
        window.location.href = data.payment_url;
        return;
      }

      // Fallback para página de confirmação
      router.push(`/checkout/sucesso?plan=${planParam}&period=${periodParam}&amount=${price}`);
    } catch {
      setErrorMsg("Ocorreu uma falha na comunicação com a PaySuite. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-purple-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Quick Meet</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Checkout Seguro SSL • PaySuite</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Finalizar Encomenda
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Reveja os detalhes do pedido e pague com segurança usando a PaySuite.
          </p>
        </div>

        <form onSubmit={handleCheckout}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Dados do Cliente e Pagamento */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Etapa 1: Dados de Facturação */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Dados do Comprador</h2>
                    <p className="text-xs text-slate-400">Informações para emissão do recibo e ativação da conta</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Carlos Sitoe"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seuemail@empresa.co.mz"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                        Telefone de Contacto (Opcional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Ex: 84 123 4567"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Província / Localização
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="Maputo Cidade">Maputo Cidade</option>
                      <option value="Maputo Província">Maputo Província (Matola)</option>
                      <option value="Gaza">Gaza (Xai-Xai)</option>
                      <option value="Inhambane">Inhambane</option>
                      <option value="Sofala">Sofala (Beira)</option>
                      <option value="Manica">Manica (Chimoio)</option>
                      <option value="Tete">Tete</option>
                      <option value="Zambézia">Zambézia (Quelimane)</option>
                      <option value="Nampula">Nampula</option>
                      <option value="Cabo Delgado">Cabo Delgado (Pemba)</option>
                      <option value="Niassa">Niassa (Lichinga)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Etapa 2: Gateway PaySuite */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Pagamento Seguro via PaySuite</h2>
                    <p className="text-xs text-slate-400">Processamento oficial e encriptado</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/30 border border-slate-200/70 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-600 text-white flex-shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        O método de pagamento é gerido com segurança pela PaySuite
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Ao clicar no botão de finalizar, será direcionado para o portal de pagamento oficial da PaySuite, onde poderá escolher pagar com facilidade por:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0" />
                      <span>M-Pesa (Vodacom)</span>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                      <span>e-Mola (Movitel)</span>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm col-span-2 sm:col-span-1">
                      <CreditCard className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                      <span>Cartões & Outros</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Ambiente certificado com encriptação SSL de 256 bits.</span>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Right Column: Resumo da Encomenda (Order Summary) */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-slate-900">Resumo da Encomenda</h2>
                </div>

                {/* Produto no Carrinho */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        Subscrição SaaS
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-1">
                        Quick Meet • Plano Profissional
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isYearly ? "Faturação Anual (12 Meses)" : "Faturação Mensal Recorrente"}
                      </p>
                    </div>
                    <span className="text-base font-extrabold text-slate-900">
                      {price} MZN
                    </span>
                  </div>

                  <ul className="pt-3 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600" />
                      <span>Até 100 participantes por reunião</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600" />
                      <span>Duração de chamada ilimitada</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600" />
                      <span>Resumos e atas inteligentes por IA</span>
                    </li>
                  </ul>
                </div>

                {/* Totais de Compra */}
                <div className="space-y-2.5 text-sm pt-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{price},00 MZN</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>IVA / Impostos (Inclusos)</span>
                    <span>0,00 MZN</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-base font-bold text-slate-900">Total a Pagar</span>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-purple-600">{price}</span>
                      <span className="text-sm font-bold text-slate-800 ml-1">MZN</span>
                    </div>
                  </div>
                </div>

                {/* Botão Finalizar Compra */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold text-base shadow-xl shadow-purple-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>A processar encomenda...</span>
                    ) : (
                      <>
                        <span>Pagar {price} MZN com PaySuite</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Garantias */}
                <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-400 text-center">
                  <div className="flex items-center justify-center gap-2 text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Pagamento Seguro processado pela PaySuite.tech</span>
                  </div>
                  <p>Ativação imediata da sua subscrição após autorização no telemóvel.</p>
                </div>
              </div>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="p-8 text-center">A carregar checkout...</div>}>
        <CheckoutContent />
      </Suspense>
    </AuthProvider>
  );
}
