import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Plus, Trash2 } from 'lucide-react';
import { Expense } from '../types';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const BudgetTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', category: 'Food', amount: 5000, date: '2023-10-01', title: 'Groceries' },
    { id: '2', category: 'Rent', amount: 15000, date: '2023-10-05', title: 'Apartment Rent' },
    { id: '3', category: 'Transport', amount: 2000, date: '2023-10-10', title: 'Metro & Cab' },
  ]);

  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Food');

  const handleAddExpense = () => {
    if (!newAmount) return;
    const expense: Expense = {
      id: Date.now().toString(),
      category: newCategory,
      amount: parseFloat(newAmount),
      date: new Date().toISOString().split('T')[0],
      title: newCategory,
    };
    setExpenses([...expenses, expense]);
    setNewAmount('');
  };

  const data = expenses.reduce((acc: any[], curr) => {
    const existing = acc.find((i) => i.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6 pb-24">
      <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Smart Budget</h2>
        <p className="text-slate-500">Track your monthly flows</p>
        <div className="mt-4">
          <span className="text-sm text-slate-500 uppercase tracking-wide">Total Spent</span>
          <div className="text-4xl font-bold text-emerald-600">₹{totalSpent.toLocaleString()}</div>
        </div>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-lg mb-4 text-slate-800">Quick Add</h3>
        <div className="flex gap-3">
          <select
            className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-1/3 p-2.5"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Rent</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills</option>
          </select>
          <input
            type="number"
            className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-1/3 p-2.5"
            placeholder="Amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <button
            onClick={handleAddExpense}
            className="w-1/3 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-lg px-2 text-slate-800">Recent Transactions</h3>
        {expenses.slice().reverse().map((expense) => (
          <div key={expense.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                {expense.category === 'Food' ? '🍔' : expense.category === 'Rent' ? '🏠' : expense.category === 'Transport' ? '🚕' : '💸'}
              </div>
              <div>
                <div className="font-medium text-slate-800">{expense.title}</div>
                <div className="text-xs text-slate-500">{expense.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-700">₹{expense.amount.toLocaleString()}</span>
                <button 
                    onClick={() => setExpenses(expenses.filter(e => e.id !== expense.id))}
                    className="text-slate-300 hover:text-red-500"
                >
                    <Trash2 size={16} />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetTracker;