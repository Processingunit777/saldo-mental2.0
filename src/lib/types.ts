// Types para o app Saldo Mental

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  value: number;
  icon?: string;
}

export interface QuizResult {
  type: 'basico' | 'intermediario' | 'premium';
  title: string;
  description: string;
  price: string;
  features: string[];
  color: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
  category: 'mental' | 'fisica' | 'social' | 'financeira';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  memberSince: Date;
  currentStreak: number;
  totalPoints: number;
  level: number;
  planType: 'basico' | 'intermediario' | 'premium';
  trialEndsAt?: Date;
}

export interface DailyProgress {
  date: string;
  missionsCompleted: number;
  totalMissions: number;
  points: number;
}
