'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, MessageSquare, Target, Smile, Meh, Frown, Sun, Cloud, CloudRain } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [mood, setMood] = useState<string | null>(null);
  const [greeting, setGreeting] = useState('Olá');
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('Usuário');
  const [userProgress, setUserProgress] = useState({ level: 1, xp: 0, coins: 0, streak_days: 0 });
  const [missionsProgress, setMissionsProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Calcula a saudação apenas no cliente
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      setGreeting('Bom dia');
    } else if (currentHour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }

    // Buscar dados do usuário
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Buscar primeiro usuário (em produção, seria o usuário logado)
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .limit(1);

      if (users && users.length > 0) {
        setUserName(users[0].name.split(' ')[0]); // Primeiro nome

        // Buscar progresso do usuário
        const { data: progress } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', users[0].id)
          .single();

        if (progress) {
          setUserProgress(progress);
        }

        // Calcular progresso das missões
        const { data: missions } = await supabase
          .from('missions')
          .select('completed');

        if (missions) {
          const completed = missions.filter(m => m.completed).length;
          const total = missions.length;
          setMissionsProgress(total > 0 ? Math.round((completed / total) * 100) : 0);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const moodOptions = [
    { value: 'great', label: 'Ótimo', icon: Smile, color: 'text-green-500', bg: 'bg-green-500/10' },
    { value: 'good', label: 'Bem', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { value: 'neutral', label: 'Neutro', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { value: 'bad', label: 'Mal', icon: CloudRain, color: 'text-gray-500', bg: 'bg-gray-500/10' },
    { value: 'terrible', label: 'Péssimo', icon: Frown, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="min-h-screen px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Greeting */}
        <div className="bg-gradient-to-br from-[#FFC947]/20 to-[#FFD700]/10 rounded-3xl p-6 md:p-8 border border-[#FFC947]/20">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-[#FFC947]" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#1E2D2F]" suppressHydrationWarning>
              {greeting}, {userName}!
            </h1>
          </div>
          <p className="text-[#1E2D2F]/70">
            Como você está se sentindo hoje? Vamos cuidar do seu bem-estar juntos.
          </p>
          
          {/* User Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/40 rounded-xl p-3">
              <p className="text-xs text-[#1E2D2F]/60">Nível</p>
              <p className="text-xl font-bold text-[#FFC947]">{userProgress.level}</p>
            </div>
            <div className="bg-white/40 rounded-xl p-3">
              <p className="text-xs text-[#1E2D2F]/60">XP</p>
              <p className="text-xl font-bold text-blue-600">{userProgress.xp}</p>
            </div>
            <div className="bg-white/40 rounded-xl p-3">
              <p className="text-xs text-[#1E2D2F]/60">Moedas</p>
              <p className="text-xl font-bold text-green-600">{userProgress.coins}</p>
            </div>
          </div>
        </div>

        {/* Mood Selector */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-[#1E2D2F]/5">
          <h2 className="text-lg font-semibold text-[#1E2D2F] mb-4">Como está seu humor hoje?</h2>
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {moodOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = mood === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl transition-all duration-300 ${
                    isSelected
                      ? `${option.bg} border-2 border-current ${option.color} scale-105`
                      : 'bg-white/40 border border-[#1E2D2F]/10 hover:bg-white/60 text-[#1E2D2F]/60'
                  }`}
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Access - Missões */}
        <Link href="/missoes" className="block">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-[#1E2D2F]/5 hover:border-[#FFC947]/30 transition-all duration-300 hover:shadow-lg group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FFC947]/10 rounded-2xl group-hover:bg-[#FFC947]/20 transition-colors">
                  <Target className="w-6 h-6 text-[#FFC947]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1E2D2F]">Missões Diárias</h3>
                  <p className="text-sm text-[#1E2D2F]/60">Continue sua jornada de crescimento</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-[#FFC947]">{missionsProgress}%</div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-[#1E2D2F]/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FFC947] to-[#FFD700] rounded-full transition-all duration-500" style={{ width: `${missionsProgress}%` }} />
            </div>
          </div>
        </Link>

        {/* Quick Access - Coach */}
        <Link href="/coach" className="block">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-2xl group-hover:bg-purple-500/30 transition-colors">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#1E2D2F]">Converse com seu Coach</h3>
                <p className="text-sm text-[#1E2D2F]/60">Estou aqui para te ajudar no que precisar</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Daily Tip */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-6 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1E2D2F] mb-2">Dica do dia</h3>
              <p className="text-sm text-[#1E2D2F]/70">
                Pratique 5 minutos de respiração consciente hoje. Isso pode reduzir significativamente seus níveis de estresse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
