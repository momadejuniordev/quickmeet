"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  ArrowRight,
  AlertCircle,
  Clock,
  ExternalLink,
  QrCode,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
  period?: "mensal" | "anual";
  onSuccess?: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  amount = 550,
  period = "mensal",
  onSuccess,
}: PaymentModalProps) {
  const { user, updatePlan } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "emola">("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "confirming" | "success">("form");
  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanNumber = phoneNumber.replace(/\D/g, "");
    if (cleanNumber.length < 8) {
      setErrorMsg("Insira um número de telefone moçambicano válido (ex: 84 123 4567 ou 86 123 4567).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/payments/paysuite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          phone: cleanNumber,
          method: paymentMethod,
          email: user?.email,
          returnUrl: `${window.location.origin}/perfil?payment=success`,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMsg(data.error);
        setLoading(false);
        return;
      }

      if (data.payment_url) {
        setExternalUrl(data.payment_url);
      }
      if (data.qr_code) {
        setQrCodeData(data.qr_code);
      }

      setStep("confirming");
      setLoading(false);
    } catch {
      setErrorMsg("Ocorreu um erro ao comunicar com a PaySuite. Tente novamente.");
      setLoading(false);
    }
  };

  const handleConfirmPaid = async () => {
    setLoading(true);
    await updatePlan("profissional");
    setStep("success");
    setLoading(false);
    if (onSuccess) onSuccess();
  };

  const handleClose = () => {
    setStep("form");
    setPhoneNumber("");
    setExternalUrl(null);
    setQrCodeData(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior de gradiente */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500" />

        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Cabeçalho */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-3 border border-purple-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>PaySuite Moçambique Oficial</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Subscrição Profissional
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Desbloqueie até 100 participantes, reuniões ilimitadas e resumos com IA.
            </p>
          </div>

          {/* Cartão de Valor */}
          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-purple-900">Total a Pagar</p>
              <p className="text-[11px] text-purple-600">
                {period === "anual" ? "Faturação Anual com Desconto" : "Faturação Mensal"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-purple-700">{amount}</span>
              <span className="text-xs font-bold text-purple-900 ml-1">MZN</span>
            </div>
          </div>

          {step === "form" && (
            <form onSubmit={handlePay} className="space-y-4">
              {/* Seleção do Método Móvel */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Escolha o Método de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition ${
                      paymentMethod === "mpesa"
                        ? "border-red-500 bg-red-50/40 text-red-900 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-red-600 mb-1" />
                    <span className="text-sm font-bold">M-Pesa</span>
                    <span className="text-[10px] text-slate-400">Vodacom (84/85)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("emola")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition ${
                      paymentMethod === "emola"
                        ? "border-amber-500 bg-amber-50/40 text-amber-900 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-amber-500 mb-1" />
                    <span className="text-sm font-bold">e-Mola</span>
                    <span className="text-[10px] text-slate-400">Movitel (86/87)</span>
                  </button>
                </div>
              </div>

              {/* Número de Telefone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Número de Telemóvel {paymentMethod === "mpesa" ? "M-Pesa" : "e-Mola"}
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    +258
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="84 123 4567"
                    className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Será gerado um link oficial de pagamento PaySuite com código QR e prompt móvel.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition disabled:opacity-50"
                >
                  {loading ? (
                    <span>A gerar link PaySuite...</span>
                  ) : (
                    <>
                      <span>Gerar Pagamento ({amount} MZN)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === "confirming" && (
            <div className="text-center py-4 space-y-4 animate-in fade-in">
              {/* Código QR Oficial da PaySuite (se disponível) */}
              {qrCodeData ? (
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-white border border-purple-200 rounded-2xl shadow-sm mb-2">
                    <img
                      src={qrCodeData}
                      alt="Código QR PaySuite M-Pesa"
                      className="w-40 h-40 object-contain mx-auto"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-purple-600" />
                    <span>Escaneie com a app do M-Pesa para pagar</span>
                  </p>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto animate-pulse">
                  <Smartphone className="w-8 h-8" />
                </div>
              )}

              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Ligação PaySuite Pronta
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  Autorize o pagamento de <strong>{amount} MZN</strong> no número <strong>+258 {phoneNumber}</strong> ou abra o link oficial da PaySuite.
                </p>
              </div>

              {externalUrl && (
                <div className="pt-1">
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition"
                  >
                    <span>Abrir Portal PaySuite</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleConfirmPaid}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Já Confirmei o Pagamento</span>
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Subscrição Ativada!
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  O seu <strong>Plano Profissional</strong> foi ativado com sucesso via PaySuite. Agora tem reuniões ilimitadas com até 100 participantes.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition"
              >
                Concluir & Aproveitar
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-[10px] text-slate-400">
            Conectado com a infraestrutura oficial da PaySuite Moçambique.
          </p>
        </div>
      </div>
    </div>
  );
}
