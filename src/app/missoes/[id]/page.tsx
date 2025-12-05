'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Circle, Lock, Trophy, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Challenge {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  day: number;
}

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;

  // Dados mockados - serão gerados pela Gemini 2.5 Pro
  const moduleData = {
    id: moduleId,
    title: 'Fundamentos do Bem-Estar',
    description: 'Construa hábitos saudáveis básicos para sua rotina',
    difficulty: 'Iniciante',
    color: 'from-green-500 to-emerald-600',
  };

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      day: 1,
      title: 'Respiração Consciente',
      description: 'Pratique 5 minutos de respiração profunda pela manhã',
      completed: true,
      locked: false,
    },
    {
      id: 2,
      day: 2,
      title: 'Gratidão Diária',
      description: 'Escreva 3 coisas pelas quais você é grato hoje',
      completed: true,
      locked: false,
    },
    {
      id: 3,
      day: 3,
      title: 'Movimento Ativo',
      description: 'Faça 15 minutos de exercício físico leve',
      completed: true,
      locked: false,
    },
    {
      id: 4,
      day: 4,
      title: 'Conexão Social',
      description: 'Converse com alguém querido por pelo menos 10 minutos',
      completed: false,
      locked: false,
    },
    {
      id: 5,
      day: 5,
      title: 'Desconexão Digital',
      description: 'Fique 1 hora sem telas antes de dormir',
      completed: false,
      locked: true,
    },
    {
      id: 6,
      day: 6,
      title: 'Alimentação Consciente',
      description: 'Faça uma refeição sem distrações, prestando atenção aos sabores',
      completed: false,
      locked: true,
    },
    {
      id: 7,
      day: 7,
      title: 'Reflexão Semanal',
      description: 'Reserve 10 minutos para refletir sobre sua semana',
      completed: false,
      locked: true,
    },
  ]);

  const completedCount = challenges.filter((c) => c.completed).length;
  const progress = Math.round((completedCount / challenges.length) * 100);

  const handleToggleChallenge = (id: number) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id && !challenge.locked
          ? { ...challenge, completed: !challenge.completed }
          : challenge
      )
    );
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/missoes">
            <button className="p-2 hover:bg-white/60 rounded-xl transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#1E2D2F]" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#1E2D2F]">{moduleData.title}</h1>
            <p className="text-sm text-[#1E2D2F]/60">{moduleData.description}</p>
          </div>
        </div>

        {/* Progress Card */}
        <div className={`bg-gradient-to-br ${moduleData.color} rounded-3xl p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Progresso do Módulo</p>
              <p className="text-3xl font-bold">{progress}%</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Desafios</p>
              <p className="text-2xl font-bold">
                {completedCount}/{challenges.length}
              </p>
            </div>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#1E2D2F]/5">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-[#FFC947]" />
              <span className="text-xs text-[#1E2D2F]/60">Concluídos</span>
            </div>
            <p className="text-2xl font-bold text-[#1E2D2F]">{completedCount}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#1E2D2F]/5">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-[#1E2D2F]/60">Dias restantes</span>
            </div>
            <p className="text-2xl font-bold text-[#1E2D2F]">{7 - completedCount}</p>
          </div>
        </div>

        {/* Challenges List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1E2D2F]">Desafios Diários</h2>
          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => handleToggleChallenge(challenge.id)}
              disabled={challenge.locked}
              className={`w-full text-left bg-white/60 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 ${
                challenge.locked
                  ? 'border-[#1E2D2F]/5 opacity-50 cursor-not-allowed'
                  : challenge.completed
                  ? 'border-green-500/30 bg-green-500/5'
                  : 'border-[#1E2D2F]/5 hover:border-[#FFC947]/30 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {challenge.locked ? (
                    <Lock className="w-6 h-6 text-[#1E2D2F]/30" />
                  ) : challenge.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#1E2D2F]/30" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#FFC947] bg-[#FFC947]/10 px-2 py-1 rounded-full">
                      Dia {challenge.day}
                    </span>
                    {challenge.completed && (
                      <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-2 py-1 rounded-full">
                        Concluído
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#1E2D2F] mb-1">{challenge.title}</h3>
                  <p className="text-sm text-[#1E2D2F]/70">{challenge.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="bg-gradient-to-br from-[#FFC947]/20 to-[#FFD700]/10 rounded-3xl p-6 border border-[#FFC947]/30">
            <div className="flex items-start gap-3">
              <Trophy className="w-8 h-8 text-[#FFC947]" />
              <div>
                <h3 className="font-bold text-[#1E2D2F] mb-2">Parabéns! 🎉</h3>
                <p className="text-sm text-[#1E2D2F]/70">
                  Você completou todos os desafios deste módulo! Continue assim e desbloqueie o próximo módulo.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
