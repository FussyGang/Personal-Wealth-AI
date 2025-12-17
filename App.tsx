import React, { useState } from 'react';
import Navigation from './components/Navigation';
import BudgetTracker from './components/BudgetTracker';
import FinancialCalculators from './components/FinancialCalculators';
import RiskAssessmentBot from './components/RiskAssessmentBot';
import InvestmentAdvisor from './components/InvestmentAdvisor';
import SchemeExplorer from './components/SchemeExplorer';
import { AppView, RiskLevel } from './types';
import { User, Bell, Menu, TrendingUp, ShieldAlert } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [riskProfile, setRiskProfile] = useState<RiskLevel>(RiskLevel.UNKNOWN);

  const renderContent = () => {
    switch (currentView) {
      case AppView.BUDGET:
        return <BudgetTracker />;
      case AppView.CALCULATORS:
        return <FinancialCalculators />;
      case AppView.RISK_BOT:
        return <RiskAssessmentBot setAppRiskProfile={setRiskProfile} />;
      case AppView.ADVISOR:
        return <InvestmentAdvisor riskProfile={riskProfile} />;
      case AppView.SCHEMES:
        return <SchemeExplorer />;
      case AppView.DASHBOARD:
      default:
        return (
          <div className="space-y-6 pb-24">
            {/* Welcome Header */}
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Hello, Investor</h1>
                <p className="text-slate-500 text-sm">Let's grow your wealth today.</p>
              </div>
              <div className="flex gap-3">
                <button className="p-2 bg-white rounded-full shadow-sm border border-slate-100 text-slate-600 hover:text-emerald-600">
                    <Bell size={20} />
                </button>
                <button className="p-2 bg-emerald-600 rounded-full shadow-sm text-white">
                    <User size={20} />
                </button>
              </div>
            </header>

            {/* Risk Profile Card */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                         <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">My Risk Profile</span>
                         <ShieldAlert className="text-emerald-400" size={24}/>
                    </div>
                    <h2 className="text-3xl font-bold mb-1">{riskProfile}</h2>
                    <p className="text-slate-400 text-sm mb-6">
                        {riskProfile === RiskLevel.UNKNOWN 
                        ? "Chat with our AI to analyze your financial heartbeat." 
                        : "Your investment strategy is optimized for this level."}
                    </p>
                    <button 
                        onClick={() => setCurrentView(AppView.RISK_BOT)}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
                    >
                        {riskProfile === RiskLevel.UNKNOWN ? "Analyze Risk Now" : "Re-evaluate Profile"}
                    </button>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setCurrentView(AppView.ADVISOR)}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-all"
                >
                    <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-600">
                        <TrendingUp size={24} />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-slate-800">Get Advice</span>
                        <span className="text-xs text-slate-500">AI Recommendation</span>
                    </div>
                </button>
                 <button 
                    onClick={() => setCurrentView(AppView.BUDGET)}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-all"
                >
                    <div className="p-3 bg-orange-50 w-fit rounded-xl text-orange-600">
                        <Menu size={24} />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-slate-800">Expenses</span>
                        <span className="text-xs text-slate-500">Track Budget</span>
                    </div>
                </button>
            </div>

            {/* Market Highlight (Mock) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800">Market Pulse</h3>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">+1.2% Today</span>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                     {['NIFTY 50', 'SENSEX', 'GOLD', 'BTC'].map((item) => (
                         <div key={item} className="min-w-[100px] p-3 rounded-xl bg-slate-50 border border-slate-100">
                             <div className="text-xs text-slate-500 mb-1">{item}</div>
                             <div className="font-bold text-slate-800">19,425</div>
                             <div className="text-[10px] text-green-600">▲ 0.45%</div>
                         </div>
                     ))}
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <div className="max-w-md mx-auto min-h-screen bg-[#f8fafc] relative shadow-2xl">
        <main className="p-4 pt-8">
          {renderContent()}
        </main>
        <Navigation currentView={currentView} onNavigate={setCurrentView} />
      </div>
    </div>
  );
}

export default App;