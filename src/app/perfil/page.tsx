'use client';

import { useState } from 'react';
import { User, Mail, Calendar, Crown, TrendingUp, Settings, LogOut, Edit2 } from 'lucide-react';
import type { UserProfile } from '@/lib/types';

export default function PerfilPage() {
  const [profile] = useState<UserProfile>({
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    memberSince: new Date('2024-01-15'),
    currentStreak: 7,
    totalPoints: 1250,
    level: 3,
    planType: 'intermediario',
    trialEndsAt: new Date('2024-02-18'),
  });

  const planNames = {
    basico: 'Essencial',
    intermediario: 'Evolução',
    premium: 'Transformação',
  };

  const planColors = {
    basico: '#4ECDC4',
    intermediario: '#FFC947',
    premium: '#9B59B6',
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E2D2F] font-inter">
            Meu Perfil
          </h1>
          <p className="text-[#1E2D2F]/60">Gerencie suas informações e preferências</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#1E2D2F]/5 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFC947] to-[#FFD700] flex items-center justify-center text-4xl font-bold text-[#1E2D2F]">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#1E2D2F] mb-2">{profile.name}</h2>
              <p className="text-[#1E2D2F]/60 mb-3">{profile.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${planColors[profile.planType]}20`,
                    color: planColors[profile.planType],
                  }}
                >
                  <Crown className="w-4 h-4" />
                  Plano {planNames[profile.planType]}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#2ECC71]/10 text-[#2ECC71]">
                  <TrendingUp className="w-4 h-4" />
                  Nível {profile.level}
                </span>
              </div>
            </div>
            <button className="px-6 py-3 bg-[#FFC947] hover:bg-[#FFD700] text-[#1E2D2F] rounded-xl font-semibold transition-all hover:shadow-lg flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          </div>

          {/* Trial Info */}
          {profile.trialEndsAt && (
            <div className="bg-gradient-to-r from-[#FFC947]/20 to-[#FFD700]/20 rounded-2xl p-6 border border-[#FFC947]/30 mb-8">
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-[#FFC947] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-[#1E2D2F] mb-1">Período de teste ativo</h4>
                  <p className="text-sm text-[#1E2D2F]/70">
                    Seu teste gratuito termina em{' '}
                    {profile.trialEndsAt.toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/40 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-[#1E2D2F] mb-1">{profile.currentStreak}</div>
              <div className="text-sm text-[#1E2D2F]/60">Dias seguidos</div>
            </div>
            <div className="bg-white/40 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-[#1E2D2F] mb-1">{profile.totalPoints}</div>
              <div className="text-sm text-[#1E2D2F]/60">Pontos totais</div>
            </div>
            <div className="bg-white/40 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-[#1E2D2F] mb-1">{profile.level}</div>
              <div className="text-sm text-[#1E2D2F]/60">Nível atual</div>
            </div>
            <div className="bg-white/40 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-[#1E2D2F] mb-1">
                {Math.floor((Date.now() - profile.memberSince.getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-[#1E2D2F]/60">Dias no app</div>
            </div>
          </div>

          {/* Info List */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/40 rounded-xl">
              <User className="w-5 h-5 text-[#1E2D2F]/60" />
              <div className="flex-1">
                <div className="text-sm text-[#1E2D2F]/60">Nome completo</div>
                <div className="font-medium text-[#1E2D2F]">{profile.name}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/40 rounded-xl">
              <Mail className="w-5 h-5 text-[#1E2D2F]/60" />
              <div className="flex-1">
                <div className="text-sm text-[#1E2D2F]/60">E-mail</div>
                <div className="font-medium text-[#1E2D2F]">{profile.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/40 rounded-xl">
              <Calendar className="w-5 h-5 text-[#1E2D2F]/60" />
              <div className="flex-1">
                <div className="text-sm text-[#1E2D2F]/60">Membro desde</div>
                <div className="font-medium text-[#1E2D2F]">
                  {profile.memberSince.toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-[#1E2D2F] px-6 py-4 rounded-2xl font-semibold transition-all border border-[#1E2D2F]/5 hover:border-[#1E2D2F]/10">
            <Settings className="w-5 h-5" />
            Configurações
          </button>

          <button className="w-full flex items-center justify-center gap-3 bg-white/60 backdrop-blur-sm hover:bg-red-50 text-red-600 px-6 py-4 rounded-2xl font-semibold transition-all border border-[#1E2D2F]/5 hover:border-red-200">
            <LogOut className="w-5 h-5" />
            Sair da conta
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-[#1E2D2F]/50 space-y-1">
          <p>Versão 1.0.0 • Saldo Mental</p>
          <p>Seus dados estão seguros e criptografados</p>
        </div>
      </div>
    </div>
  );
}
