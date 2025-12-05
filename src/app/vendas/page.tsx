import { ArrowRight, CheckCircle, Star, Users, Calendar } from 'lucide-react';

export default function VendasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E2D2F] via-[#2A3D3F] to-[#1E2D2F] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Star className="w-16 h-16 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Transforme Sua Vida Financeira
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Descubra como milhares de pessoas estão conquistando independência financeira com nosso app inteligente de gestão pessoal e coaching
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Comece Sua Jornada Agora
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-gray-400">7 dias grátis • Sem cartão de crédito</p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">50K+</div>
              <div className="text-gray-400">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">R$ 2M+</div>
              <div className="text-gray-400">Economizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">4.9/5</div>
              <div className="text-gray-400">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Por Que Milhares Escolhem Nosso App
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <Calendar className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Controle Total das Finanças</h3>
              <p className="text-gray-300">
                Acompanhe receitas, despesas e investimentos em tempo real. Veja exatamente para onde vai seu dinheiro e tome decisões inteligentes.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Coaching Personalizado</h3>
              <p className="text-gray-300">
                Receba orientação personalizada baseada nos seus hábitos e objetivos. Desenvolva uma mentalidade de abundância e sucesso.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/15 transition-all duration-300">
              <CheckCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Missões Diárias</h3>
              <p className="text-gray-300">
                Complete missões diárias que transformam hábitos ruins em positivos. Construa uma rotina de sucesso passo a passo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Histórias de Sucesso Reais
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4 italic">
                "Em 6 meses usando o app, consegui quitar minhas dívidas e começar a investir. O coaching me ajudou a mudar minha mentalidade sobre dinheiro."
              </p>
              <div className="font-semibold">Maria Silva</div>
              <div className="text-gray-400 text-sm">São Paulo, SP</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4 italic">
                "As missões diárias me mantêm motivado. Pequenos hábitos diários levaram a grandes mudanças na minha vida financeira."
              </p>
              <div className="font-semibold">João Santos</div>
              <div className="text-gray-400 text-sm">Rio de Janeiro, RJ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-gray-300 mb-16">
            Comece grátis e evolua conforme suas necessidades
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Plano Gratuito</h3>
              <div className="text-4xl font-bold mb-6">R$ 0<span className="text-lg">/mês</span></div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Acompanhamento básico de finanças</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Até 3 missões diárias</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Relatórios mensais</span>
                </li>
              </ul>
              <button className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-all duration-300">
                Começar Grátis
              </button>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-8 text-black relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-yellow-400 px-4 py-2 rounded-full text-sm font-bold">
                MAIS POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Plano Premium</h3>
              <div className="text-4xl font-bold mb-2">R$ 29,90<span className="text-lg">/mês</span></div>
              <div className="text-sm mb-6">7 dias grátis para testar</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Todas as funcionalidades do plano gratuito</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Coaching personalizado ilimitado</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Missões diárias ilimitadas</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Relatórios avançados e insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300">
                Assinar Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Transformar Sua Vida Financeira?
          </h2>
          <p className="text-xl mb-8">
            Junte-se a milhares de pessoas que já conquistaram sua independência financeira
          </p>
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
            Começar Minha Jornada Agora
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm mt-4 opacity-80">
            Sem compromisso • Cancele a qualquer momento
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 App de Gestão Financeira. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}