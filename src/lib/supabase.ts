import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
}

export interface Sale {
  id: string;
  user_id: string;
  product_name: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  created_at: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  coin_reward: number;
  icon: string;
  category: string;
  completed: boolean;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  level: number;
  xp: number;
  coins: number;
  streak_days: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  created_at: string;
}

export interface CoachMessage {
  id: string;
  user_id: string;
  message: string;
  sender: 'user' | 'coach';
  created_at: string;
}
