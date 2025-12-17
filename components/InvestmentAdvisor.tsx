import React, { useState } from 'react';
    import { RiskLevel } from '../types';
    import { getInvestmentAdvice } from '../services/geminiService';
    import { Sparkles, Wallet, Target, Loader2, ArrowRight } from 'lucide-react';
    
    interface Props {
      riskProfile: RiskLevel;
    }
    
    const InvestmentAdvisor: React.FC<Props> = ({ riskProfile }) => {
      const [goals, setGoals] = useState('');
      const [savings, setSavings] = useState('');
      const [advice, setAdvice] = useState<string | null>(null);
      const [loading, setLoading] = useState(false);
    
      const handleGetAdvice = async () => {
        if (!goals || !savings) return;
        setLoading(true);
        try {
            const result = await getInvestmentAdvice(riskProfile, goals, savings);
            setAdvice(result);
        } catch (e) {
            setAdvice("Could not generate advice at this time.");
        } finally {
            setLoading(false);
        }
      };
    
      const formatAdvice = (text: string) => {
          // Simple formatter to handle markdown-style bolding from AI
          return text.split('\n').map((line, idx) => {
              if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
                  return <li key={idx} className="ml-4 mb-2 list-disc">{line.replace(/[*#-]/g, '')}</li>
              }
              return <p key={idx} className="mb-2">{line}</p>
          });
      }
    
      return (
        <div className="space-y-6 pb-24">
           <header className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
            <h2 className="text-3xl font-bold mb-2">AI Advisor</h2>
            <p className="opacity-90">Personalized wealth creation strategy based on your {riskProfile} profile.</p>
            
            <div className="mt-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-sm font-medium">
                <Sparkles size={14} />
                <span>Powered by Gemini 2.5</span>
            </div>
          </header>
    
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Wallet size={16} className="text-emerald-600"/> Current Portfolio / Savings
                </label>
                <input 
                    type="text" 
                    placeholder="e.g. ₹5 Lakhs in FD, ₹50k in stocks"
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>
    
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Target size={16} className="text-emerald-600"/> Financial Goals
                </label>
                <input 
                    type="text" 
                    placeholder="e.g. Buy a house in 5 years, Retire at 45"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>
    
            <button
                onClick={handleGetAdvice}
                disabled={loading || !goals || !savings}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
                {loading ? <Loader2 className="animate-spin" /> : <>Generate Strategy <ArrowRight size={18} /></>}
            </button>
          </div>
    
          {advice && (
              <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-emerald-500 animate-fade-in">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Your Personalized Strategy</h3>
                  <div className="text-slate-600 leading-relaxed text-sm">
                      {formatAdvice(advice)}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 italic">
                      Disclaimer: This is AI-generated advice. Please consult a certified financial planner before making decisions.
                  </div>
              </div>
          )}
        </div>
      );
    };
    
    export default InvestmentAdvisor;