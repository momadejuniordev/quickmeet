"use client";

import React from "react";
import {
  Video,
  ShieldCheck,
  Clock,
  Globe2,
  Cpu,
} from "lucide-react";

export default function Footer() {
  const socialIcons = [
    {
      label: "Facebook",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer id="resources" className="bg-[#2e1065] text-white pt-16 pb-12 border-t border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-purple-800/40">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Quick <span className="text-purple-400 font-semibold">Meet</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-800 text-purple-200 border border-purple-700">
                  Moçambique
                </span>
              </span>
            </div>
            
            <p className="text-purple-200 text-xs sm:text-sm max-w-sm leading-relaxed">
              Criando conexões mais inteligentes para equipas moçambicanas e internacionais que querem alcançar resultados extraordinários.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialIcons.map((s, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-purple-900/80 hover:bg-purple-600 flex items-center justify-center text-purple-200 hover:text-white transition"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-purple-200">
              <li><a href="#" className="hover:text-white transition">Início</a></li>
              <li><a href="#features" className="hover:text-white transition">Funcionalidades</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Preços</a></li>
              <li><a href="#solutions" className="hover:text-white transition">Soluções</a></li>
              <li><a href="#resources" className="hover:text-white transition">Recursos</a></li>
              <li><a href="#" className="hover:text-white transition">Contacto</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Soluções
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-purple-200">
              <li><a href="#" className="hover:text-white transition">Equipas Remotas</a></li>
              <li><a href="#" className="hover:text-white transition">Equipas de Vendas</a></li>
              <li><a href="#" className="hover:text-white transition">Educação & Escolas</a></li>
              <li><a href="#" className="hover:text-white transition">Suporte ao Cliente</a></li>
              <li><a href="#" className="hover:text-white transition">Webinars & Eventos</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Recursos
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-purple-200">
              <li><a href="#" className="hover:text-white transition">Blog & Novidades</a></li>
              <li><a href="#" className="hover:text-white transition">Centro de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition">Guias de Utilização</a></li>
              <li><a href="#" className="hover:text-white transition">Segurança & Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition">O que Há de Novo</a></li>
            </ul>
          </div>

        </div>

        {/* Middle Trust Badges */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-purple-800/40 text-purple-200 text-xs">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">99.9% Disponibilidade</p>
              <p className="text-[11px] text-purple-300">Desempenho Confiável</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">Segurança Empresarial</p>
              <p className="text-[11px] text-purple-300">Seus Dados Protegidos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">Apoio Técnico 24/7</p>
              <p className="text-[11px] text-purple-300">Equipa Local Pronta a Ajudar</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white">Rede Global & Nacional</p>
              <p className="text-[11px] text-purple-300">Ultra-Rápida e Estável</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300">
          <p>© 2026 Quick Meet. Todos os direitos reservados. Desenvolvido com orgulho em Moçambique.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition">Termos de Serviço</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
