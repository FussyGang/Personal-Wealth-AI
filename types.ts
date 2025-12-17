export enum AppView {
  DASHBOARD = 'DASHBOARD',
  BUDGET = 'BUDGET',
  CALCULATORS = 'CALCULATORS',
  RISK_BOT = 'RISK_BOT',
  SCHEMES = 'SCHEMES',
  ADVISOR = 'ADVISOR'
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  title: string;
}

export enum RiskLevel {
  UNKNOWN = 'Unknown',
  LOW = 'Conservative',
  MODERATE = 'Balanced',
  AGGRESSIVE = 'Aggressive'
}

export interface FinancialGoal {
  name: string;
  targetAmount: number;
  years: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export interface Scheme {
  id: string;
  name: string;
  type: 'Government' | 'Private' | 'Mutual Fund';
  risk: 'Low' | 'Medium' | 'High';
  returnRate: string;
  description: string;
  badge?: string;
}