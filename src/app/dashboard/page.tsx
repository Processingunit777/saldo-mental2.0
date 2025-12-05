'use client';

import { useState } from 'react';
import { Trophy, Target, Flame, Star, TrendingUp, Calendar, Award, CheckCircle2 } from 'lucide-react';
import type { Mission, Badge, DailyProgress } from '@/lib/types';

const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Meditação matinal',
    description: 'Pratique 10 minutos de meditação guiada',
    completed: true,
    points: 50,
    category: 'mental',
  },
  {
    id: '2',
    title: 'Exercício físico',
    description: 'Faça 30 minutos de atividade física',
    completed: true,
    points: 75,
    category: 'fisica',
  },
  {
    id: '3',
    title: 'Gratidão diária',
    description: 'Liste 3 coisas pelas quais você é grato hoje',
    completed: false,
    points: 40,
    category: 'mental',
  },
  {
    id: '4',
    title: 'Conexão social',
    description: 'Converse com um amigo ou familiar',
    completed: false,
    points: 60,
    category: 'social',
  },
];

const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Primeira Semana',
    description: 'Complete 7 dias consecutivos',
    icon: '🎯',
    unlocked: true,
  },
  {
    id: '2',
    name: 'Meditador',
    description: 'Complete 10 sessões de meditação',
    icon: '🧘',
    unlocked: true,
  },
  {
    id: '3',
    name: 'Guerreiro',
    description: 'Mantenha 30 dias de sequência',
    icon: '⚔️',
    unlocked: false,
  },
  {
    id: '4',
    name: 'Mestre do Bem-estar',
    description: 'Alcance nível 10',
    icon: '👑',
    unlocked: false,
  },
];

export default function DashboardPage() {
  const [missions] = useState<Mission[]>(mockMissions);
  const [badges] = useState<Badge[]>(mockBadges);

  const completedMissions = missions.filter((m) => m.completed).length;
  const totalPoints = missions.filter((m) => m.completed).reduce((sum, m) => sum + m.points, 0);
  const currentStreak = 7;
  const level = 3;

  const categoryColors = {
    mental: '#9B59B6',
    fisica: '#3498DB',
    social: '#E74C3C',
    financeira: '#2ECC71',
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E2D2F] font-inter">
            Seu Progresso
          </h1>
          <p className="text-[#1E2D2F]/60">Continue evoluindo todos os dias</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#1E2D2F]/5 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#FFC947]/10 rounded-xl">
                <Flame className="w-5 h-5 text-[#FFC947]" />
              </div>
              <span className="text-sm text-[#1E2D2F]/60">Sequência</span>
            </div>
            <div className="text-3xl font-bold text-[#1E2D2F]">{currentStreak}</div>
            <div className="text-xs text-[#1E2D2F]/50 mt-1">dias seguidos</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#1E2D2F]/5 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#9B59B6]/10 rounded-xl">
                <Star className="w-5 h-5 text-[#9B59B6]" />
              </div>
              <span className="text-sm text-[#1E2D2F]/60">Pontos</span>
            </div>
            <div className="text-3xl font-bold text-[#1E2D2F]">{totalPoints}</div>
            <div className="text-xs text-[#1E2D2F]/50 mt-1">hoje</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#1E2D2F]/5 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#3498DB]/10 rounded-xl">
                <TrendingUp className="w-5 h-5 text-[#3498DB]" />
              </div>
              <span className="text-sm text-[#1E2D2F]/60">Nível</span>
            </div>
            <div className="text-3xl font-bold text-[#1E2D2F]">{level}</div>
            <div className="text-xs text-[#1E2D2F]/50 mt-1">evolução</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#1E2D2F]/5 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#2ECC71]/10 rounded-xl">
                <Target className="w-5 h-5 text-[#2ECC71]" />
              </div>
              <span className="text-sm text-[#1E2D2F]/60">Missões</span>
            </div>
            <div className="text-3xl font-bold text-[#1E2D2F]">{completedMissions}/{missions.length}</div>
            <div className="text-xs text-[#1E2D2F]/50 mt-1">concluídas</div>
          </div>
        </div>

        {/* Missions Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#1E2D2F]/5 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-[#FFC947]" />
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Missões de Hoje</h2>
          </div>

          <div className="space-y-4">
            {missions.map((mission) => (
              <div
                key={mission.id}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  mission.completed
                    ? 'bg-[#2ECC71]/5 border-[#2ECC71]/20'
                    : 'bg-white/40 border-[#1E2D2F]/10 hover:border-[#FFC947]/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                      mission.completed
                        ? 'bg-[#2ECC71] border-[#2ECC71]'
                        : 'border-[#1E2D2F]/30'
                    }`}
                  >
                    {mission.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className={`font-semibold ${mission.completed ? 'text-[#1E2D2F]/50 line-through' : 'text-[#1E2D2F]'}`}>
                        {mission.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[#FFC947] font-semibold text-sm">
                        <Star className="w-4 h-4" />
                        {mission.points}
                      </div>
                    </div>
                    <p className={`text-sm ${mission.completed ? 'text-[#1E2D2F]/40' : 'text-[#1E2D2F]/60'}`}>
                      {mission.description}
                    </p>
                    <div className="mt-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${categoryColors[mission.category]}20`,
                          color: categoryColors[mission.category],
                        }}
                      >
                        {mission.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#1E2D2F]/5 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-[#FFC947]" />
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Conquistas</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-[#FFC947]/10 to-[#FFD700]/10 border-[#FFC947]/30 shadow-lg'
                    : 'bg-white/20 border-[#1E2D2F]/10 opacity-50'
                }`}
              >
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold text-[#1E2D2F] mb-1 text-sm">{badge.name}</h3>
                <p className="text-xs text-[#1E2D2F]/60">{badge.description}</p>
                {badge.unlocked && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#2ECC71] font-medium">
                    <Trophy className="w-3 h-3" />
                    Desbloqueado
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
