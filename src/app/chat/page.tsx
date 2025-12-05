'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou sua assistente de bem-estar mental. Como você está se sentindo hoje? Estou aqui para conversar, ouvir e ajudar no que você precisar. 💚',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simular resposta da IA (integração com Gemini será feita depois)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Entendo como você se sente. É completamente normal ter esses pensamentos. Vamos trabalhar juntos nisso. Que tal começarmos com uma técnica de respiração? 🌟',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-[#1E2D2F]/10 px-4 py-4 md:px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="p-2 bg-[#FFC947]/10 rounded-xl">
            <Sparkles className="w-6 h-6 text-[#FFC947]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E2D2F]">Chat com IA</h1>
            <p className="text-sm text-[#1E2D2F]/60">Seu espaço seguro para conversar</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-[#FFC947]/20'
                    : 'bg-gradient-to-br from-[#9B59B6]/20 to-[#3498DB]/20'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-[#FFC947]" />
                ) : (
                  <Bot className="w-5 h-5 text-[#9B59B6]" />
                )}
              </div>

              <div
                className={`flex-1 max-w-2xl ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-[#FFC947] text-[#1E2D2F]'
                      : 'bg-white/60 backdrop-blur-sm text-[#1E2D2F] border border-[#1E2D2F]/5'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-[#1E2D2F]/40 mt-2 px-2">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#9B59B6]/20 to-[#3498DB]/20">
                <Bot className="w-5 h-5 text-[#9B59B6]" />
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-[#1E2D2F]/5">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-[#1E2D2F]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#1E2D2F]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#1E2D2F]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/60 backdrop-blur-sm border-t border-[#1E2D2F]/10 px-4 py-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-[#FFC947] focus:outline-none focus:ring-2 focus:ring-[#FFC947]/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-4 bg-[#FFC947] hover:bg-[#FFD700] text-[#1E2D2F] rounded-2xl font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FFC947] flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="hidden md:inline">Enviar</span>
            </button>
          </div>
          <p className="text-xs text-[#1E2D2F]/40 mt-3 text-center">
            Suas conversas são privadas e seguras. A IA está aqui para apoiar, não substituir profissionais de saúde.
          </p>
        </div>
      </div>
    </div>
  );
}
