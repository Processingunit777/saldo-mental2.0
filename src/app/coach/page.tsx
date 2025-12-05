'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Buscar primeiro usuário
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .limit(1);

      if (users && users.length > 0) {
        setUserId(users[0].id);

        // Buscar mensagens do coach
        const { data: coachMessages } = await supabase
          .from('coach_messages')
          .select('*')
          .eq('user_id', users[0].id)
          .order('created_at', { ascending: true });

        if (coachMessages && coachMessages.length > 0) {
          const formattedMessages: Message[] = coachMessages.map(msg => ({
            id: msg.id,
            role: msg.sender === 'coach' ? 'assistant' : 'user',
            content: msg.message,
            timestamp: new Date(msg.created_at).getTime(),
          }));
          setMessages(formattedMessages);
        } else {
          // Mensagem inicial se não houver histórico
          setMessages([
            {
              id: '1',
              role: 'assistant',
              content: 'Olá! Sou seu coach pessoal de bem-estar mental. Estou aqui para conversar, ouvir e te apoiar em qualquer momento. Como você está se sentindo hoje? 💚',
              timestamp: Date.now(),
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      // Mensagem inicial em caso de erro
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Olá! Sou seu coach pessoal de bem-estar mental. Estou aqui para conversar, ouvir e te apoiar em qualquer momento. Como você está se sentindo hoje? 💚',
          timestamp: Date.now(),
        },
      ]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !userId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Salvar mensagem do usuário no Supabase
    try {
      await supabase
        .from('coach_messages')
        .insert({
          user_id: userId,
          message: userMessage.content,
          sender: 'user',
        });
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
    }

    // Integração com Gemini 2.5 Pro será implementada aqui
    setTimeout(async () => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Entendo como você se sente. É completamente normal ter esses pensamentos. Vamos trabalhar juntos nisso. Que tal começarmos com uma técnica de respiração? 🌟',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      // Salvar resposta do coach no Supabase
      try {
        await supabase
          .from('coach_messages')
          .insert({
            user_id: userId,
            message: aiMessage.content,
            sender: 'coach',
          });
      } catch (error) {
        console.error('Erro ao salvar resposta:', error);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: number) => {
    if (!mounted) return '00:00';
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-[#1E2D2F]/10 px-4 py-4 md:px-6 md:pt-20">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E2D2F]">Coach Pessoal</h1>
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
                    : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-[#FFC947]" />
                ) : (
                  <Bot className="w-5 h-5 text-purple-600" />
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
                <p className="text-xs text-[#1E2D2F]/40 mt-2 px-2" suppressHydrationWarning>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <Bot className="w-5 h-5 text-purple-600" />
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
      <div className="bg-white/60 backdrop-blur-sm border-t border-[#1E2D2F]/10 px-4 py-4 md:px-6 pb-20 md:pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-6 py-4 rounded-2xl bg-white/60 border border-[#1E2D2F]/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-[#1E2D2F] placeholder:text-[#1E2D2F]/40 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-500 disabled:hover:to-blue-500 flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="hidden md:inline">Enviar</span>
            </button>
          </div>
          <p className="text-xs text-[#1E2D2F]/40 mt-3 text-center">
            Suas conversas são privadas e seguras. O coach está aqui para apoiar, não substituir profissionais de saúde.
          </p>
        </div>
      </div>
    </div>
  );
}
