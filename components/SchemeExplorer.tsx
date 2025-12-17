import React from 'react';
import { ShieldCheck, TrendingUp, Building2, ArrowUpRight } from 'lucide-react';
import { Scheme } from '../types';

const schemes: Scheme[] = [
  {
    id: '1',
    name: 'Public Provident Fund (PPF)',
    type: 'Government',
    risk: 'Low',
    returnRate: '7.1% p.a.',
    description: 'Long-term tax saving scheme backed by Govt of India. Tax-free returns.',
    badge: 'Tax Free'
  },
  {
    id: '2',
    name: 'Sovereign Gold Bonds (SGB)',
    type: 'Government',
    risk: 'Low',
    returnRate: '2.5% + Gold Appreciation',
    description: 'Safest way to buy gold. Interest paid semi-annually and no making charges.',
    badge: 'Gold'
  },
  {
    id: '3',
    name: 'Nifty 50 Index Fund',
    type: 'Mutual Fund',
    risk: 'Medium',
    returnRate: '~12-14% (Hist)',
    description: 'Invest in India’s top 50 companies. Low expense ratio and market-linked growth.',
  },
  {
    id: '4',
    name: 'National Pension System (NPS)',
    type: 'Government',
    risk: 'Medium',
    returnRate: '9-11% (Avg)',
    description: 'Retirement focused pension scheme with additional tax benefits u/s 80CCD(1B).',
  }
];

const SchemeExplorer: React.FC = () => {
  return (
    <div className="space-y-6 pb-24">
      <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Scheme Explorer</h2>
        <p className="text-slate-500">Verified investment options</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            {scheme.badge && (
                <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                    {scheme.badge}
                </div>
            )}
            
            <div className="flex justify-between items-start mb-3">
                <div className={`p-3 rounded-xl ${scheme.type === 'Government' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                    {scheme.type === 'Government' ? <ShieldCheck size={24} /> : <TrendingUp size={24} />}
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400">Returns</p>
                    <p className="text-lg font-bold text-emerald-600">{scheme.returnRate}</p>
                </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">{scheme.name}</h3>
            <div className="flex gap-2 mb-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium flex items-center gap-1">
                    <Building2 size={10} /> {scheme.type}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    scheme.risk === 'Low' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                    {scheme.risk} Risk
                </span>
            </div>

            <p className="text-sm text-slate-500 leading-snug mb-4">{scheme.description}</p>

            <button className="w-full py-2 rounded-lg border border-emerald-600 text-emerald-600 font-medium text-sm hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1">
                View Details <ArrowUpRight size={14}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemeExplorer;