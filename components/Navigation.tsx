import React from 'react';
import { Home, PieChart, Calculator, MessageSquare, Briefcase, TrendingUp } from 'lucide-react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: AppView.DASHBOARD, icon: Home, label: 'Home' },
    { id: AppView.BUDGET, icon: PieChart, label: 'Budget' },
    { id: AppView.CALCULATORS, icon: Calculator, label: 'Tools' },
    { id: AppView.RISK_BOT, icon: MessageSquare, label: 'AI Risk' },
    { id: AppView.ADVISOR, icon: TrendingUp, label: 'Advisor' },
    { id: AppView.SCHEMES, icon: Briefcase, label: 'Schemes' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe pt-2 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-between items-center max-w-md mx-auto pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors w-16 ${
                isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;