"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Video,
  User as UserIcon,
  Mail,
  Calendar,
  Sparkles,
  Check,
  ShieldCheck,
  Copy,
  ExternalLink,
  Edit2,
  Save,
  LogOut,
  Smartphone,
} from "lucide-react";
import { AuthProvider, useAuth, UserPlan } from "@/contexts/AuthContext";
import { meetingService, Meeting } from "@/services/meetingService";

function ProfilePageContent() {
  const router = useRouter();
  const { user, userFullName, userPlan, updateFullName, updatePlan, signOut, isLoading } = useAuth();
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [planSuccess, setPlanSuccess] = useState<string | null>(null);
  const [copiedRoom, setCopiedRoom] = useState<string | null>(null);
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (userFullName) {
      setNewName(userFullName);
      setHistoryLoading(true);
      meetingService.getRecentMeetings(userFullName).then((data) => {
        setRecentMeetings(data);
        setHistoryLoading(false);
      });
    }
  }, [userFullName]);

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    setSaveLoading(true);
    await updateFullName(newName.trim());
    setSaveLoading(false);
    setEditingName(false);
  };

  const handleSelectPlan = async (plan: UserPlan) => {
    if (plan === "profissional") {
      router.push("/checkout?plan=profissional&period=mensal");
      return;
    }
    await updatePlan(plan);
    setPlanSuccess("Subscrição actualizada para o Plano Inicial!");
    setTimeout(() => setPlanSuccess(null), 3000);
  };

  const copyRoomLink = (roomCode: string) => {
    const url = `${window.location.origin}/?room=${encodeURIComponent(roomCode)}`;
    navigator.clipboard.writeText(url);
    setCopiedRoom(roomCode);
    setTimeout(() => setCopiedRoom(null), 2000);
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <p className="text-sm text-slate-500">A carregar perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Iniciar Sessão Necessário</h2>
        <p className="text-sm text-slate-500 max-w-sm mb-6">
          Por favor, inicie sessão na página principal para aceder ao seu perfil e histórico de reuniões.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à Página Principal</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-purple-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Quick Meet</span>
          </Link>

          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminar Sessão</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Banner com Dados do Utilizador */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-purple-600/30">
              {getInitials(userFullName)}
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900">{userFullName}</h1>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    userPlan === "profissional"
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  Plano {userPlan}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Conta Quick Meet Moçambique</span>
              </p>
            </div>
          </div>

          <div>
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  onClick={handleSaveName}
                  disabled={saveLoading}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 text-xs font-semibold"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingName(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:border-purple-600 hover:text-purple-600 text-xs font-semibold transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Editar Nome</span>
              </button>
            )}
          </div>
        </div>

        {planSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{planSuccess}</span>
          </div>
        )}

        {/* Gestão de Subscrição & Planos */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Subscrição & Limites da Conta</h2>
              <p className="text-xs text-slate-500">
                Pagamentos locais e instantâneos via PaySuite (M-Pesa e e-Mola).
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PaySuite Moçambique</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inicial */}
            <div
              className={`p-6 rounded-3xl border-2 transition flex flex-col justify-between ${
                userPlan === "inicial"
                  ? "border-purple-600 bg-white shadow-md shadow-purple-600/5"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-lg">Plano Inicial</h3>
                  {userPlan === "inicial" && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white">
                      Activo
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-slate-900">0 MZN</span>
                  <span className="text-xs text-slate-500"> / sempre grátis</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Até 5 participantes por sala</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Reuniões de 40 minutos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Partilha de ecrã em alta definição</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan("inicial")}
                disabled={userPlan === "inicial"}
                className={`w-full mt-6 py-3 rounded-xl text-xs font-semibold transition ${
                  userPlan === "inicial"
                    ? "bg-slate-100 text-slate-400 cursor-default"
                    : "border border-purple-600 text-purple-600 hover:bg-purple-50"
                }`}
              >
                {userPlan === "inicial" ? "Plano Activo" : "Mudar para Inicial"}
              </button>
            </div>

            {/* Profissional - 550 MZN / mês */}
            <div
              className={`p-6 rounded-3xl border-2 transition flex flex-col justify-between ${
                userPlan === "profissional"
                  ? "border-purple-600 bg-white shadow-md shadow-purple-600/5"
                  : "border-purple-200 bg-white hover:border-purple-400"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-lg">Plano Profissional</h3>
                  {userPlan === "profissional" ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white">
                      Activo
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      Plano Popular
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-purple-600">550 MZN</span>
                  <span className="text-xs text-slate-500"> / mês</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Até 100 participantes simultâneos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Duração de reunião ilimitada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Resumos e atas automáticas por IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>100 horas de gravação na nuvem</span>
                  </li>
                </ul>
              </div>

              {userPlan === "profissional" ? (
                <button
                  disabled
                  className="w-full mt-6 py-3 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 cursor-default"
                >
                  Plano Activo
                </button>
              ) : (
                <Link
                  href="/checkout?plan=profissional&period=mensal"
                  className="w-full mt-6 py-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/20"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Subscrever com PaySuite (550 MZN)</span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Histórico de Reuniões */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Histórico de Reuniões</h2>
            <p className="text-xs text-slate-500">
              Salas e sessões associadas à sua conta no Quick Meet.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
            {historyLoading ? (
              <p className="text-xs text-slate-400 py-8 text-center">A carregar reuniões...</p>
            ) : recentMeetings.length === 0 ? (
              <div className="text-center py-10">
                <Video className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">Ainda sem histórico de reuniões</p>
                <p className="text-xs text-slate-400 mt-1">
                  Ao criar ou participar de reuniões, elas aparecerão listadas aqui para acesso rápido.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition"
                >
                  <span>Iniciar Reunião Agora</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentMeetings.map((m, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{m.title || `Sala ${m.room_code}`}</p>
                        <p className="text-xs text-slate-400">Código: {m.room_code}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyRoomLink(m.room_code)}
                        className="p-2 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-slate-50 transition"
                        title="Copiar link"
                      >
                        {copiedRoom === m.room_code ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <Link
                        href={`/?room=${encodeURIComponent(m.room_code)}`}
                        className="px-3.5 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition flex items-center gap-1"
                      >
                        <span>Entrar</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthProvider>
      <ProfilePageContent />
    </AuthProvider>
  );
}
