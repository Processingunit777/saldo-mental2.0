'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface QuizData {
  nomeCompleto: string;
  idade: string;
  email: string;
  telefone: string;
  descanso: string;
  relacionamentos: string;
  motivacao: string;
  sobrecarga: string;
  apoio: string;
  controle: string;
  tipoHabito: string;
  frequencia: string;
  gastodiario: string;
  tempoHabito: string;
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>({
    nomeCompleto: '',
    idade: '',
    email: '',
    telefone: '',
    descanso: '',
    relacionamentos: '',
    motivacao: '',
    sobrecarga: '',
    apoio: '',
    controle: '',
    tipoHabito: '',
    frequencia: '',
    gastodiario: '',
    tempoHabito: '',
  });

  const totalSteps = 14;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Salvar dados e ir para resultado
      router.push('/resultado');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateData = (field: keyof QuizData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return data.nomeCompleto.trim() !== '';
      case 2: return data.idade.trim() !== '';
      case 3: return data.email.trim() !== '';
      case 4: return data.telefone.trim() !== '';
      case 5: return data.descanso !== '';
      case 6: return data.relacionamentos !== '';
      case 7: return data.motivacao !== '';
      case 8: return data.sobrecarga !== '';
      case 9: return data.apoio !== '';
      case 10: return data.controle !== '';
      case 11: return data.tipoHabito.trim() !== '';
      case 12: return data.frequencia.trim() !== '';
      case 13: return data.gastodiario.trim() !== '';
      case 14: return data.tempoHabito.trim() !== '';
      default: return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Qual é o seu nome completo?</h2>
            <input
              type="text"
              value={data.nomeCompleto}
              onChange={(e) => updateData('nomeCompleto', e.target.value)}
              placeholder="Digite seu nome completo"
              className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-[#FFC947] focus:outline-none focus:ring-2 focus:ring-[#FFC947]/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40"
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Qual é a sua idade?</h2>
            <input
              type="number"
              value={data.idade}
              onChange={(e) => updateData('idade', e.target.value)}
              placeholder="Digite sua idade"
              className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-[#FFC947] focus:outline-none focus:ring-2 focus:ring-[#FFC947]/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40"
            />
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Qual é o seu e-mail?</h2>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData('email', e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-[#FFC947] focus:outline-none focus:ring-2 focus:ring-[#FFC947]/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40"
            />
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Qual é o seu telefone?</h2>
            <input
              type="tel"
              value={data.telefone}
              onChange={(e) => updateData('telefone', e.target.value)}
              placeholder="(00) 00000-0000"
              className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-[#FFC947] focus:outline-none focus:ring-2 focus:ring-[#FFC947]/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40"
            />
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Com que frequência você se sente descansado(a) ao acordar?</h2>
            <div className="space-y-3">
              {['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('descanso', option)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    data.descanso === option
                      ? 'border-[#FFC947] bg-[#FFC947]/10 text-[#1E2D2F]'
                      : 'border-[#1E2D2F]/10 bg-white/60 text-[#1E2D2F]/70 hover:border-[#FFC947]/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Qual o seu nível de satisfação com seus relacionamentos?</h2>
            <div className="space-y-3">
              {['Muito insatisfeito', 'Insatisfeito', 'Neutro', 'Satisfeito', 'Muito satisfeito'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('relacionamentos', option)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    data.relacionamentos === option
                      ? 'border-[#FFC947] bg-[#FFC947]/10 text-[#1E2D2F]'
                      : 'border-[#1E2D2F]/10 bg-white/60 text-[#1E2D2F]/70 hover:border-[#FFC947]/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Com que frequência você se sente motivado(a) e com um propósito claro?</h2>
            <div className="space-y-3">
              {['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('motivacao', option)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    data.motivacao === option
                      ? 'border-[#FFC947] bg-[#FFC947]/10 text-[#1E2D2F]'
                      : 'border-[#1E2D2F]/10 bg-white/60 text-[#1E2D2F]/70 hover:border-[#FFC947]/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Com que frequência você se sente sobrecarregado(a) ou incapaz de relaxar?</h2>
            <div className="space-y-3">
              {['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('sobrecarga', option)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    data.sobrecarga === option
                      ? 'border-[#FFC947] bg-[#FFC947]/10 text-[#1E2D2F]'
                      : 'border-[#1E2D2F]/10 bg-white/60 text-[#1E2D2F]/70 hover:border-[#FFC947]/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 9:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Você tem pessoas em quem confia para compartilhar seus problemas?</h2>
            <div className="space-y-3">
              {['Não tenho ninguém', 'Tenho uma pessoa', 'Tenho algumas pessoas', 'Tenho várias pessoas'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('apoio', option)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    data.apoio === option
                      ? 'border-[#FFC947] bg-[#FFC947]/10 text-[#1E2D2F]'
                      : 'border-[#1E2D2F]/10 bg-white/60 text-[#1E2D2F]/70 hover:border-[#FFC947]/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 10:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Você sente que perde o controle sobre o uso de alguma substância ou comportamento?</h2>
            <div className="space-y-3">
              {['Sim, frequentemente', 'Sim, às vezes', 'Raramente', 'Não'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('controle', option)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    data.controle === option
                      ? 'border-[#FFC947] bg-[#FFC947]/10 text-[#1E2D2F]'
                      : 'border-[#1E2D2F]/10 bg-white/60 text-[#1E2D2F]/70 hover:border-[#FFC947]/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 11:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Qual o tipo de hábito?</h2>
            <input
              type="text"
              value={data.tipoHabito}
              onChange={(e) => updateData('tipoHabito', e.target.value)}
              placeholder="Ex: Cigarro, álcool, jogos, etc."
              className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-[#FFC947] focus:outline-none focus:ring-2 focus:ring-[#FFC947]/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40"
            />
          </div>
        );
      
      case 12:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Frequência de uso/prática?</h2>
            <div className="space-y-3">
              {['Diariamente', 'Semanalmente', 'Mensalmente', 'Ocasionalmente'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('frequencia', option)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    data.frequencia === option
                      ? 'border-[#FFC947] bg-[#FFC947]/10 text-[#1E2D2F]'
                      : 'border-[#1E2D2F]/10 bg-white/60 text-[#1E2D2F]/70 hover:border-[#FFC947]/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 13:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Gasto diário aproximado com o hábito?</h2>
            <input
              type="number"
              value={data.gastodiario}
              onChange={(e) => updateData('gastodiario', e.target.value)}
              placeholder="R$ 0,00"
              className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-[#FFC947] focus:outline-none focus:ring-2 focus:ring-[#FFC947]/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40"
            />
          </div>
        );
      
      case 14:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E2D2F]">Há quanto tempo pratica o hábito?</h2>
            <input
              type="text"
              value={data.tempoHabito}
              onChange={(e) => updateData('tempoHabito', e.target.value)}
              placeholder="Ex: 5 anos, 2 meses, etc."
              className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-[#FFC947] focus:outline-none focus:ring-2 focus:ring-[#FFC947]/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFC947]/10 rounded-full">
            <Sparkles className="w-4 h-4 text-[#FFC947]" />
            <span className="text-sm font-semibold text-[#FFC947]">Questionário Inicial</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1E2D2F]">Vamos te conhecer melhor</h1>
          <p className="text-[#1E2D2F]/70">
            Responda algumas perguntas para personalizarmos sua experiência
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#1E2D2F]/60">Progresso</span>
            <span className="font-semibold text-[#FFC947]">{step}/{totalSteps}</span>
          </div>
          <div className="h-2 bg-[#1E2D2F]/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FFC947] to-[#FFD700] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#1E2D2F]/5">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-4 bg-white/60 border border-[#1E2D2F]/10 hover:bg-white/80 text-[#1E2D2F] rounded-2xl font-semibold transition-all flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1 px-6 py-4 bg-[#FFC947] hover:bg-[#FFD700] text-[#1E2D2F] rounded-2xl font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FFC947] flex items-center justify-center gap-2"
          >
            {step === totalSteps ? 'Finalizar' : 'Próximo'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
