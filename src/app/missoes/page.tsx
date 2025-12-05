'use client';

import { useState, useEffect } from 'react';
import { Target, Lock, CheckCircle2, ChevronRight, Calendar, Trophy } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Mission {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  coin_reward: number;
  icon: string;
  category: string;
  completed: boolean;
}

export default function MissoesPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    fetchMissions();
    fetchUserProgress();
  }, []);

  const fetchMissions = async () => {
    try {
      const { data } = await supabase
        .from('missions')
        .select('*')
        .order('completed', { ascending: true });

      if (data) {
        setMissions(data);
        setCompletedCount(data.filter(m => m.completed).length);
      }
    } catch (error) {
      console.error('Erro ao buscar missões:', error);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .limit(1);

      if (users && users.length > 0) {
        const { data: progress } = await supabase
          .from('user_progress')
          .select('streak_days')
          .eq('user_id', users[0].id)
          .single();

        if (progress) {
          setStreakDays(progress.streak_days);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar progresso:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'bem-estar': 'from-green-500 to-emerald-600',
      'mentalidade': 'from-purple-500 to-pink-600',
      'saúde': 'from-blue-500 to-cyan-600',
      'educação': 'from-orange-500 to-red-600',
      'finanças': 'from-yellow-500 to-orange-600',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFC947]/10 rounded-xl">
              <Target className="w-6 h-6 text-[#FFC947]" />
            </div>
            <h1 className="text-3xl font-bold text-[#1E2D2F]">Missões</h1>
          </div>
          <p className="text-[#1E2D2F]/70">
            Complete desafios diários e ganhe XP e moedas para evoluir sua jornada.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#1E2D2F]/5">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-[#FFC947]" />
              <span className="text-xs text-[#1E2D2F]/60">Concluídas</span>
            </div>
            <p className="text-2xl font-bold text-[#1E2D2F]">{completedCount}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#1E2D2F]/5">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-[#1E2D2F]/60">Pendentes</span>
            </div>
            <p className="text-2xl font-bold text-[#1E2D2F]">{missions.length - completedCount}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#1E2D2F]/5">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-[#1E2D2F]/60">Sequência</span>
            </div>
            <p className="text-2xl font-bold text-[#1E2D2F]">{streakDays}</p>
          </div>
        </div>

        {/* Missions List */}
        <div className="space-y-4">
          {missions.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-[#1E2D2F]/5 text-center">
              <Target className="w-16 h-16 text-[#1E2D2F]/20 mx-auto mb-4" />
              <p className="text-[#1E2D2F]/50">Nenhuma missão disponível no momento</p>
            </div>
          ) : (
            missions.map((mission) => (
              <div
                key={mission.id}
                className={`bg-white/60 backdrop-blur-sm rounded-3xl p-6 border transition-all duration-300 ${
                  mission.completed
                    ? 'border-green-500/30 bg-green-500/5'
                    : 'border-[#1E2D2F]/5 hover:border-[#FFC947]/30 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getCategoryColor(mission.category)} flex items-center justify-center`}>
                        {mission.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : (
                          <Target className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#1E2D2F]">{mission.title}</h3>
                        <span className="inline-block text-xs px-2 py-1 rounded-full font-medium bg-[#FFC947]/10 text-[#FFC947]">
                          {mission.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#1E2D2F]/70 mb-4">{mission.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">XP</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1E2D2F]">+{mission.xp_reward}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-yellow-600">💰</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1E2D2F]">+{mission.coin_reward}</span>
                      </div>
                    </div>
                  </div>
                  
                  {mission.completed && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-semibold">Concluída</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
