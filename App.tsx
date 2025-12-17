
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import BudgetTracker from './components/BudgetTracker';
import FinancialCalculators from './components/FinancialCalculators';
import RiskAssessmentBot from './components/RiskAssessmentBot';
import InvestmentAdvisor from './components/InvestmentAdvisor';
import SchemeExplorer from './components/SchemeExplorer';
import { AppView, RiskLevel, UserProfile } from './types';
import { User, Bell, Menu, TrendingUp, ShieldAlert, X, Save } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [riskProfile, setRiskProfile] = useState<RiskLevel>(RiskLevel.UNKNOWN);
  const [user, setUser] = useState<UserProfile>({ name: 'Investor', email: 'investor@easywealth.com' });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const getRiskSlang = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return "Wealth Protector";
      case RiskLevel.MODERATE: return "Growth Navigator";
      case RiskLevel.AGGRESSIVE: return "Aggressive Alpha";
      default: return "Unknown";
    }
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: tempName || 'Investor' });
    setIsProfileOpen(false);
  };

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
          <div className="space-y-6 pb-24 animate-fade-in">
            {/* Welcome Header */}
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">Hello, {user.name}</h1>
                <p className="text-slate-500 text-sm">Let's grow your wealth today.</p>
              </div>
              <div className="flex gap-3">
                <button className="p-2 bg-white rounded-full shadow-sm border border-slate-100 text-slate-600 hover:text-emerald-600 transition-all">
                    <Bell size={20} />
                </button>
                <button 
                  onClick={() => { setTempName(user.name); setIsProfileOpen(true); }}
                  className="p-2 bg-emerald-600 rounded-full shadow-sm text-white hover:bg-emerald-700 transition-all"
                >
                    <User size={20} />
                </button>
              </div>
            </header>

            {/* Risk Profile Card */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                         <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">My Risk Profile</span>
                         <ShieldAlert className="text-emerald-400 group-hover:scale-110 transition-transform" size={24}/>
                    </div>
                    <div className="mb-1">
                        <h2 className="text-3xl font-bold tracking-tight">{getRiskSlang(riskProfile)}</h2>
                        {riskProfile !== RiskLevel.UNKNOWN && (
                          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold opacity-80">{riskProfile}</span>
                        )}
                    </div>
                    <p className="text-slate-400 text-sm mb-6 max-w-[80%]">
                        {riskProfile === RiskLevel.UNKNOWN 
                        ? "Chat with our AI to analyze your financial heartbeat." 
                        : "Your investment strategy is optimized for this level."}
                    </p>
                    <button 
                        onClick={() => setCurrentView(AppView.RISK_BOT)}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/30 active:scale-95"
                    >
                        {riskProfile === RiskLevel.UNKNOWN ? "Analyze Risk Now" : "Re-evaluate Profile"}
                    </button>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setCurrentView(AppView.ADVISOR)}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-all group"
                >
                    <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <TrendingUp size={24} />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-slate-800">Get Advice</span>
                        <span className="text-xs text-slate-500">AI Recommendation</span>
                    </div>
                </button>
                 <button 
                    onClick={() => setCurrentView(AppView.BUDGET)}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-all group"
                >
                    <div className="p-3 bg-orange-50 w-fit rounded-xl text-orange-600 group-hover:bg-orange-100 transition-colors">
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
                         <div key={item} className="min-w-[100px] p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white transition-colors">
                             <div className="text-xs text-slate-500 mb-1">{item}</div>
                             <div className="font-bold text-slate-800">19,425</div>
                             <div className="text-[10px] text-green-600 font-semibold">▲ 0.45%</div>
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

        {/* Profile Modal */}
        {isProfileOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-t-[32px] p-8 shadow-2xl transform transition-transform animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 border-4 border-emerald-50">
                    <User size={40} />
                  </div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Profile Photo</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    disabled
                    value={user.email}
                    className="w-full bg-slate-100 border border-slate-200 rounded-2xl p-4 text-slate-400 cursor-not-allowed font-medium"
                  />
                </div>

                <button 
                  onClick={handleSaveProfile}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Save size={20} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
