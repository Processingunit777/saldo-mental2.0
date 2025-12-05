'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, MessageSquare, DollarSign, Settings } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/missoes', icon: Target, label: 'Missões' },
    { href: '/coach', icon: MessageSquare, label: 'Coach' },
    { href: '/financas', icon: DollarSign, label: 'Finanças' },
    { href: '/configuracoes', icon: Settings, label: 'Config' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#1E2D2F]/10 z-50 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around md:justify-center md:gap-8 h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-[#FFC947] bg-[#FFC947]/10'
                    : 'text-[#1E2D2F]/60 hover:text-[#1E2D2F] hover:bg-[#1E2D2F]/5'
                }`}
              >
                <Icon className="w-5 h-5 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
