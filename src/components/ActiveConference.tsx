"use client";

import React, { useState, useEffect } from "react";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { QRCodeSVG } from "qrcode.react";
import {
  Share2,
  Copy,
  Check,
  X,
  PhoneOff,
  Shield,
  Clock,
  FileText,
  Send,
  AlertTriangle,
} from "lucide-react";
import { meetingService, Meeting, MeetingNote } from "@/services/meetingService";

interface ActiveConferenceProps {
  token: string;
  roomName: string;
  username: string;
  meetingMeta?: Meeting;
  onDisconnect: () => void;
}

function ShareModal({
  shareUrl,
  roomName,
  onClose,
}: {
  shareUrl: string;
  roomName: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Convidar Participantes</h3>
          <p className="text-xs text-slate-500 mt-1">Escaneie o código QR ou copie a ligação da reunião</p>
        </div>

        <div className="flex justify-center mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <QRCodeSVG value={shareUrl} size={180} fgColor="#2e1065" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Código da Sala: <span className="text-purple-600 font-bold">{roomName}</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-mono focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="px-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition flex items-center justify-center font-medium shadow-sm"
              title="Copiar URL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal de Notas Colaborativas & Atas em Tempo Real sincronizadas no Supabase
function NotesDrawer({
  roomName,
  username,
  isOpen,
  onClose,
}: {
  roomName: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState<MeetingNote[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      meetingService.getMeetingNotes(roomName).then(setNotes);
    }
  }, [isOpen, roomName]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const added = await meetingService.addMeetingNote(roomName, username, content);
    if (added) {
      setNotes((prev) => [...prev, added]);
      setContent("");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[140] w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-purple-50">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <h4 className="font-bold text-sm text-slate-900">Notas & Atas da Reunião (Supabase)</h4>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notes.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">
            Nenhuma nota adicionada ainda. Escreva conclusões, decisões ou pontos importantes da chamada.
          </p>
        ) : (
          notes.map((n, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-purple-700">{n.author_name}</span>
                <span className="text-[10px] text-slate-400">
                  {n.created_at ? new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{n.content}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva uma nota ou resumo..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-600/20"
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="p-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default function ActiveConference({
  token,
  roomName,
  username,
  meetingMeta,
  onDisconnect,
}: ActiveConferenceProps) {
  const [showShare, setShowShare] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/?room=${encodeURIComponent(roomName)}` : "";

  // Regra de Negócio: Cronómetro da reunião
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isFreePlan = meetingMeta?.plan === "inicial";
  const durationLimit = meetingMeta?.duration_limit_minutes || (isFreePlan ? 40 : 0);
  const isCloseToLimit = isFreePlan && elapsedSeconds >= 35 * 60; // Aviso após 35 min

  const handleLeave = async () => {
    await meetingService.leaveOrEndMeeting(roomName, username, false);
    onDisconnect();
  };

  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden font-sans">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: "100dvh" }}
        onDisconnected={handleLeave}
      >
        {/* Top Floating Glass Header */}
        <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
          {/* Room info pill */}
          <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-xl text-white">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                Quick Meet | {roomName}
              </span>
              <span className="text-[10px] text-purple-300 flex items-center gap-1">
                <Shield className="w-3 h-3 text-purple-400" /> Sincronizado no Supabase
              </span>
            </div>

            {/* Timer do Plano */}
            <div className="ml-2 pl-3 border-l border-slate-700 flex items-center gap-1.5 text-xs font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>{formatTime(elapsedSeconds)}</span>
              {durationLimit > 0 && (
                <span className="text-[10px] text-slate-400">/ {durationLimit}m</span>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Botão de Notas */}
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs shadow-md transition"
              title="Notas e Atas da Reunião"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Notas</span>
            </button>

            {/* Partilhar */}
            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-lg shadow-purple-600/30 transition active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Convidar</span>
            </button>

            {/* Sair */}
            <button
              onClick={handleLeave}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-rose-600/90 hover:bg-rose-600 text-white font-medium text-xs shadow-lg shadow-rose-600/30 transition active:scale-95"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Alerta de Limite de Tempo do Plano Inicial */}
        {isCloseToLimit && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-amber-500/95 backdrop-blur-md text-slate-950 font-bold text-xs shadow-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-950" />
            <span>Aviso do Plano Inicial: A reunião aproxima-se do limite de 40 minutos.</span>
          </div>
        )}

        {showShare && (
          <ShareModal
            roomName={roomName}
            shareUrl={shareUrl}
            onClose={() => setShowShare(false)}
          />
        )}

        <NotesDrawer
          roomName={roomName}
          username={username}
          isOpen={showNotes}
          onClose={() => setShowNotes(false)}
        />

        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}
