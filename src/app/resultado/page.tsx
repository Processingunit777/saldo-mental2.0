'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2, Sparkles, Target, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';

export default function ResultadoPage() {
  const router = useRouter();

  // Resultado humanizado baseado nas respostas do quiz
  const resultado = {
    plano: 'Premium',
    mensagem: 'Com base nas suas respostas, identificamos que você está passando por um momento desafiador e precisa de suporte especializado.',
    recomendacoes: [
      'Acesso completo ao Coach IA com Gemini 2.5 Pro',
      'Módulos personalizados de missões diárias',
      'Acompanhamento financeiro do seu progresso',
      'Suporte prioritário e conteúdo exclusivo',
    ],
    valorMensal: 'R$ 97,00',
    oferta: '3 dias grátis para experimentar',
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E2D2F]">
            Obrigado por compartilhar!
          </h1>
          <p className="text-lg text-[#1E2D2F]/70">
            Analisamos suas respostas e preparamos uma recomendação personalizada para você.
          </p>
        </div>

        {/* Result Card */}
        <div className="bg-gradient-to-br from-[#FFC947]/20 to-[#FFD700]/10 rounded-3xl p-8 border border-[#FFC947]/30">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#FFC947]" />
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Seu Plano Recomendado</h2>
          </div>
          
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-[#FFC947] rounded-full mb-4">
              <span className="text-lg font-bold text-[#1E2D2F]">{resultado.plano}</span>
            </div>
            <p className="text-[#1E2D2F]/80 leading-relaxed">
              {resultado.mensagem}
            </p>
          </div>

          {/* Recommendations */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-[#1E2D2F]">O que está incluído:</h3>
            {resultado.recomendacoes.map((rec, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-[#1E2D2F]/80">{rec}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#1E2D2F]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#1E2D2F]/70">Valor mensal</span>
              <span className="text-3xl font-bold text-[#1E2D2F]">{resultado.valorMensal}</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">{resultado.oferta}</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#1E2D2F]/5">
            <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-3">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-[#1E2D2F] mb-2">Coach IA</h3>
            <p className="text-sm text-[#1E2D2F]/70">
              Conversas ilimitadas com inteligência emocional
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#1E2D2F]/5">
            <div className="p-3 bg-[#FFC947]/10 rounded-xl w-fit mb-3">
              <Target className="w-6 h-6 text-[#FFC947]" />
            </div>
            <h3 className="font-semibold text-[#1E2D2F] mb-2">Missões</h3>
            <p className="text-sm text-[#1E2D2F]/70">
              Desafios diários personalizados para você
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#1E2D2F]/5">
            <div className="p-3 bg-green-500/10 rounded-xl w-fit mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-[#1E2D2F] mb-2">Progresso</h3>
            <p className="text-sm text-[#1E2D2F]/70">
              Acompanhe sua evolução e economias
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full px-8 py-5 bg-gradient-to-r from-[#FFC947] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FFC947] text-[#1E2D2F] rounded-2xl font-bold text-lg transition-all hover:shadow-xl flex items-center justify-center gap-3"
          >
            Começar meus 3 dias grátis
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-center text-sm text-[#1E2D2F]/60">
            Sem compromisso. Cancele quando quiser.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
          <p className="text-sm text-[#1E2D2F]/70 text-center">
            💙 O Saldo Mental é uma ferramenta de apoio e não substitui acompanhamento profissional. 
            Em caso de emergência, procure ajuda especializada.
          </p>
        </div>
      </div>
    </div>
  );
}
