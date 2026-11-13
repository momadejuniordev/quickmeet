"use client";

import React, { useState } from "react";
import {
  Video,
  X,
  ArrowRight,
  Sparkles,
  User,
  Hash,
  Calendar,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileText,
} from "lucide-react";
import { meetingService, Meeting } from "@/services/meetingService";
import { useAuth } from "@/contexts/AuthContext";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (roomName: string, username: string, meetingMeta?: Meeting) => void;
  initialRoom?: string;
  isJoining?: boolean;
}

export default function MeetingModal({
  isOpen,
  onClose,
  onJoin,
  initialRoom = "",
  isJoining = false,
}: MeetingModalProps) {
  const { userFullName } = useAuth();
  const [activeTab, setActiveTab] = useState<"instant" | "schedule">("instant");
  const [room, setRoom] = useState(initialRoom);
  const [name, setName] = useState(userFullName || "");
  const [plan, setPlan] = useState<"inicial" | "profissional">("inicial");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (userFullName && !name) {
      setName(userFullName);
    }
  }, [userFullName]);

  // Campos de Agendamento
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleSuccess, setScheduleSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInstantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !room.trim()) {
      setErrorMsg("Por favor, preencha o seu nome e o código da sala.");
      return;
    }

    try {
      // Regra de Negócio: Registo no Supabase e validação de limites
      const result = await meetingService.registerOrJoinMeeting(room, name, { plan });

      if (result.error) {
        setErrorMsg(result.error);
        return;
      }

      onJoin(room.trim(), name.trim(), result.meeting);
    } catch (err: any) {
      console.error(err);
      onJoin(room.trim(), name.trim());
    }
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setScheduleSuccess(null);

    if (!name.trim() || !scheduleTitle.trim() || !scheduleDate) {
      setErrorMsg("Preencha todos os campos para agendar a reunião.");
      return;
    }

    const generatedRoom = room || `reuniao-${Math.floor(100 + Math.random() * 900)}`;

    const res = await meetingService.scheduleMeeting({
      roomCode: generatedRoom,
      title: scheduleTitle,
      hostName: name,
      scheduledFor: scheduleDate,
      plan,
    });

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setScheduleSuccess(`Reunião agendada com sucesso! Código da sala: ${generatedRoom}`);
    }
  };

  const generateRandomRoom = () => {
    const prefixes = ["reuniao", "alinhamento", "estrategia", "sala", "conferencia"];
    const locations = ["maputo", "beira", "nampula", "tete", "moz"];
    const rand = Math.floor(100 + Math.random() * 900);
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    setRoom(`${prefix}-${loc}-${rand}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra decorativa superior */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Quick Meet</h3>
              <p className="text-xs text-slate-500">Conexão segura com base de dados Supabase</p>
            </div>
          </div>

          {/* Abas: Imediata vs Agendamento */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setActiveTab("instant"); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "instant"
                  ? "bg-white text-purple-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Iniciar ou Entrar Agora
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab("schedule"); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "schedule"
                  ? "bg-white text-purple-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Agendar Reunião
            </button>
          </div>

          {/* Mensagem de Erro / Regra de Negócio */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Mensagem de Sucesso no Agendamento */}
          {scheduleSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span>{scheduleSuccess}</span>
            </div>
          )}

          {activeTab === "instant" ? (
            /* Formulário: Reunião Imediata */
            <form onSubmit={handleInstantSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  O Seu Nome de Exibição
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Celso Mabunda"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Código ou Nome da Sala
                  </label>
                  <button
                    type="button"
                    onClick={generateRandomRoom}
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 hover:underline"
                  >
                    <Sparkles className="w-3 h-3" /> Gerar automático
                  </button>
                </div>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Ex: alinhamento-maputo"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition"
                  />
                </div>
              </div>

              {/* Seletor de Regra de Negócio: Plano */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Regras do Plano
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlan("inicial")}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      plan === "inicial"
                        ? "border-purple-600 bg-purple-50/50 text-purple-900"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-xs font-bold">Plano Inicial</p>
                    <p className="text-[10px] text-slate-500">Até 5 pessoas • 40 min</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlan("profissional")}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      plan === "profissional"
                        ? "border-purple-600 bg-purple-50/50 text-purple-900"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-xs font-bold">Plano Profissional</p>
                    <p className="text-[10px] text-purple-600 font-medium">Até 100 • Ilimitado</p>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isJoining}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition disabled:opacity-50"
                >
                  {isJoining ? (
                    <span>A ligar à sala...</span>
                  ) : (
                    <>
                      <span>Entrar na Reunião</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Formulário: Agendamento */
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  O Seu Nome (Organizador)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Amélia Tembe"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Título da Reunião
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={scheduleTitle}
                    onChange={(e) => setScheduleTitle(e.target.value)}
                    placeholder="Ex: Apresentação Trimestral de Resultados"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Data e Hora Prevista
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="datetime-local"
                    required
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition"
                >
                  <Clock className="w-4 h-4" />
                  <span>Salvar Agendamento no Supabase</span>
                </button>
              </div>
            </form>
          )}

          <p className="mt-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Dados sincronizados com Supabase & encriptação LiveKit RTC</span>
          </p>
        </div>
      </div>
    </div>
  );
}
