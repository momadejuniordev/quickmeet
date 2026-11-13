"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Video, Menu, X, ArrowRight, User, LogOut, UserCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onOpenJoin: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({ onOpenJoin, onOpenAuth }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, userFullName, userPlan, signOut } = useAuth();

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Funcionalidades", href: "/#features" },
    { label: "Soluções", href: "/#solutions" },
    { label: "Preços", href: "/#pricing" },
    { label: "Recursos", href: "/#resources" },
  ];

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30 group-hover:bg-purple-700 transition">
              <Video className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                Quick <span className="font-semibold text-purple-600">Meet</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  MZ
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              /* User logged in -> Links to /perfil */
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {getInitials(userFullName)}
                  </div>
                  <div className="text-left max-w-[120px]">
                    <span className="block text-xs font-semibold text-slate-800 truncate">
                      {userFullName || user.email}
                    </span>
                    <span className="block text-[9px] uppercase font-bold text-purple-700">
                      Plano {userPlan}
                    </span>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{userFullName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        Plano {userPlan}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/perfil"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                        <span>Aceder à Página de Perfil</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Terminar Sessão</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* User not logged in */
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-slate-700 hover:text-purple-600 font-semibold text-sm transition"
              >
                <User className="w-4 h-4" />
                <span>Iniciar Sessão</span>
              </button>
            )}

            <button
              onClick={onOpenJoin}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 active:scale-95 transition-all"
            >
              <span>Entrar na Reunião</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link
                href="/perfil"
                className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center"
              >
                {getInitials(userFullName)}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Alternar menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 border-t border-slate-100 space-y-2">
            {user ? (
              <div className="space-y-2 bg-slate-50 p-3 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{userFullName}</p>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                    Plano {userPlan}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <Link
                    href="/perfil"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-purple-700 hover:bg-purple-50 flex items-center justify-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Ver Página de Perfil</span>
                  </Link>

                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                    title="Terminar Sessão"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-purple-200 text-purple-700 font-semibold text-sm hover:bg-purple-50 transition"
              >
                <User className="w-4 h-4" />
                <span>Iniciar Sessão</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoin();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-600/20"
            >
              <span>Entrar na Reunião</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
