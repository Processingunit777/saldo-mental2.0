'use client';

import { useState, useEffect } from 'react';
import { DollarSign, TrendingDown, TrendingUp, Calendar, Target, Award, PiggyBank } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function FinancasPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [mounted, setMounted] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchFinancialData();
  }, [selectedPeriod]);

  const fetchFinancialData = async () => {
    try {
      // Buscar primeiro usuário
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .limit(1);

      if (users && users.length > 0) {
        const userId = users[0].id;

        // Calcular data de início baseado no período
        const today = new Date();
        let startDate = new Date();
        
        switch (selectedPeriod) {
          case 'week':
            startDate.setDate(today.getDate() - 7);
            break;
          case 'month':
            startDate.setDate(today.getDate() - 30);
            break;
          case 'year':
            startDate.setDate(today.getDate() - 365);
            break;
        }

        // Buscar transações do período
        const { data: transactionsData } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', userId)
          .gte('date', startDate.toISOString().split('T')[0])
          .order('date', { ascending: false });

        if (transactionsData) {
          setTransactions(transactionsData);

          // Calcular totais
          const income = transactionsData
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);
          
          const expense = transactionsData
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

          setTotalIncome(income);
          setTotalExpense(expense);
          setBalance(income - expense);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados financeiros:', error);
    }
  };

  const periods = [
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
    { value: 'year', label: 'Ano' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!mounted) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#1E2D2F]">Finanças</h1>
          </div>
          <p className="text-[#1E2D2F]/70">
            Acompanhe suas receitas, despesas e saldo em tempo real.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-[#1E2D2F]/5">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value as 'week' | 'month' | 'year')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedPeriod === period.value
                  ? 'bg-[#FFC947] text-[#1E2D2F] shadow-md'
                  : 'text-[#1E2D2F]/60 hover:text-[#1E2D2F] hover:bg-white/40'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Balance Card */}
        <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600'} rounded-3xl p-8 text-white`}>
          <div className="flex items-center gap-3 mb-4">
            <PiggyBank className="w-8 h-8" />
            <div>
              <p className="text-white/80 text-sm">Saldo do Período</p>
              <p className="text-xs text-white/60">
                {selectedPeriod === 'week' && 'Últimos 7 dias'}
                {selectedPeriod === 'month' && 'Últimos 30 dias'}
                {selectedPeriod === 'year' && 'Últimos 12 meses'}
              </p>
            </div>
          </div>
          <p className="text-5xl font-bold mb-2" suppressHydrationWarning>
            {formatCurrency(balance)}
          </p>
          <div className="flex items-center gap-2 text-white/80">
            {balance >= 0 ? (
              <>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Saldo positivo</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">Saldo negativo</span>
              </>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#1E2D2F]/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm text-[#1E2D2F]/60">Receitas</span>
            </div>
            <p className="text-3xl font-bold text-green-600" suppressHydrationWarning>
              {formatCurrency(totalIncome)}
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#1E2D2F]/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-sm text-[#1E2D2F]/60">Despesas</span>
            </div>
            <p className="text-3xl font-bold text-red-600" suppressHydrationWarning>
              {formatCurrency(totalExpense)}
            </p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-[#1E2D2F]/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#FFC947]/10 rounded-xl">
              <Calendar className="w-6 h-6 text-[#FFC947]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1E2D2F]">Transações Recentes</h3>
              <p className="text-sm text-[#1E2D2F]/60">{transactions.length} transações no período</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-center text-[#1E2D2F]/50 py-8">
                Nenhuma transação encontrada neste período
              </p>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-4 bg-white/40 rounded-xl">
                  <div className="flex-1">
                    <p className="font-semibold text-[#1E2D2F]">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#1E2D2F]/50">{transaction.category}</span>
                      <span className="text-xs text-[#1E2D2F]/30">•</span>
                      <span className="text-xs text-[#1E2D2F]/50" suppressHydrationWarning>
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                  <p className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(parseFloat(transaction.amount)))}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Motivational Card */}
        {balance > 0 && (
          <div className="bg-gradient-to-br from-[#FFC947]/20 to-[#FFD700]/10 rounded-3xl p-6 border border-[#FFC947]/30">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#FFC947]/20 rounded-xl">
                <Award className="w-6 h-6 text-[#FFC947]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1E2D2F] mb-2">Parabéns! 🎉</h3>
                <p className="text-sm text-[#1E2D2F]/70" suppressHydrationWarning>
                  Você está com saldo positivo de {formatCurrency(balance)} neste período! 
                  Continue mantendo suas finanças organizadas e alcance seus objetivos.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
