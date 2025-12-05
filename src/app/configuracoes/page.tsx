'use client';

import { useState } from 'react';
import { Settings, Moon, Sun, HelpCircle, Shield, LogOut, User, Bell, Lock, Info } from 'lucide-react';

export default function ConfiguracoesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFC947]/10 rounded-xl">
              <Settings className="w-6 h-6 text-[#FFC947]" />
            </div>
            <h1 className="text-3xl font-bold text-[#1E2D2F]">Configurações</h1>
          </div>
          <p className="text-[#1E2D2F]/70">
            Personalize sua experiência no Saldo Mental.
          </p>
        </div>

        {/* Account Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-[#1E2D2F]/60 uppercase tracking-wide">Conta</h2>
          
          <button className="w-full bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#1E2D2F]/5 hover:border-[#FFC947]/30 transition-all text-left group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D2F]">Perfil</p>
                  <p className="text-sm text-[#1E2D2F]/60">Editar informações pessoais</p>
                </div>
              </div>
            </div>
          </button>

          <button className="w-full bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#1E2D2F]/5 hover:border-[#FFC947]/30 transition-all text-left group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <Lock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D2F]">Privacidade e Segurança</p>
                  <p className="text-sm text-[#1E2D2F]/60">Gerenciar dados e senha</p>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Preferences Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-[#1E2D2F]/60 uppercase tracking-wide">Preferências</h2>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#1E2D2F]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-500/10 rounded-xl">
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Sun className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D2F]">Modo Escuro</p>
                  <p className="text-sm text-[#1E2D2F]/60">Tema visual do aplicativo</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  darkMode ? 'bg-[#FFC947]' : 'bg-[#1E2D2F]/20'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#1E2D2F]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-500/10 rounded-xl">
                  <Bell className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D2F]">Notificações</p>
                  <p className="text-sm text-[#1E2D2F]/60">Lembretes e atualizações</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifications ? 'bg-[#FFC947]' : 'bg-[#1E2D2F]/20'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-[#1E2D2F]/60 uppercase tracking-wide">Suporte</h2>
          
          <button className="w-full bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#1E2D2F]/5 hover:border-[#FFC947]/30 transition-all text-left group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                  <HelpCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D2F]">Ajuda e Suporte</p>
                  <p className="text-sm text-[#1E2D2F]/60">Central de ajuda e FAQ</p>
                </div>
              </div>
            </div>
          </button>

          <button className="w-full bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#1E2D2F]/5 hover:border-[#FFC947]/30 transition-all text-left group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                  <Info className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E2D2F]">Sobre o App</p>
                  <p className="text-sm text-[#1E2D2F]/60">Versão e informações</p>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl p-6 border border-orange-500/20">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-[#1E2D2F] mb-2">Aviso Importante</h3>
              <p className="text-sm text-[#1E2D2F]/70">
                O Saldo Mental é uma ferramenta de apoio ao bem-estar mental e não substitui o acompanhamento 
                de profissionais de saúde qualificados. Em caso de emergência ou crise, procure ajuda profissional 
                imediatamente. CVV: 188 (24h).
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-500/10 hover:bg-red-500/20 rounded-2xl p-5 border border-red-500/20 hover:border-red-500/40 transition-all group">
          <div className="flex items-center justify-center gap-3">
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-600">Sair da Conta</span>
          </div>
        </button>
      </div>
    </div>
  );
}
