import React, { useMemo } from 'react';
import { Transaction, BudgetSettings } from '../types';
import { formatCurrency } from '../utils/helpers';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, isSameDay, parseISO, subDays } from 'date-fns';

interface Props {
  transactions: Transaction[];
  budget: BudgetSettings;
}

export const Dashboard: React.FC<Props> = ({ transactions, budget }) => {
  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // 4.5% Annual Interest Projection on Total Income (Simulating "Money In" growth)
  // Formula: Income * 0.045
  const projectedInterest = totalIncome * 0.045;

  // Daily Budget Logic
  const today = new Date();
  const todayExpenses = transactions
    .filter(t => t.type === 'expense' && isSameDay(parseISO(t.date), today))
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const budgetProgress = Math.min((todayExpenses / budget.dailyLimit) * 100, 100);
  const isOverBudget = todayExpenses > budget.dailyLimit;

  // Chart Data (Last 7 Days)
  const chartData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayIncome = transactions
        .filter(t => t.type === 'income' && t.date === dateStr)
        .reduce((sum, t) => sum + t.amount, 0);
      const dayExpense = transactions
        .filter(t => t.type === 'expense' && t.date === dateStr)
        .reduce((sum, t) => sum + t.amount, 0);
      
      data.push({
        name: format(date, 'EEE'),
        income: dayIncome,
        expense: dayExpense
      });
    }
    return data;
  }, [transactions]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Financial Overview</h1>
        <p className="text-zinc-400">Track your wealth and daily habits.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-6 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-zinc-400 font-medium">Total Balance</span>
          </div>
          <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/10 rounded-lg text-success">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-zinc-400 font-medium">Total Income</span>
          </div>
          <div className="text-2xl font-bold text-success">+{formatCurrency(totalIncome)}</div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-danger/10 rounded-lg text-danger">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-zinc-400 font-medium">Total Expenses</span>
          </div>
          <div className="text-2xl font-bold text-danger">-{formatCurrency(totalExpense)}</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-2xl border border-indigo-700/50 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/10 rounded-lg text-white">
                <PiggyBank className="w-5 h-5" />
              </div>
              <span className="text-indigo-200 font-medium">Est. 1Y Interest (4.5%)</span>
            </div>
            <div className="text-2xl font-bold text-white">+{formatCurrency(projectedInterest)}</div>
            <p className="text-xs text-indigo-300 mt-1">Passive growth on income</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <PiggyBank className="w-32 h-32" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-2xl border border-zinc-800">
          <h3 className="text-lg font-bold mb-6">Cash Flow (Last 7 Days)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#71717a', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#71717a', fontSize: 12}} 
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: '#27272a'}}
                />
                <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Budget Card */}
        <div className="bg-surface p-6 rounded-2xl border border-zinc-800 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-bold">Daily Budget</h3>
            <span className="text-sm text-zinc-400">{format(today, 'MMM do')}</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-bold">{formatCurrency(todayExpenses)}</span>
              <span className="text-zinc-400 mb-1">/ {formatCurrency(budget.dailyLimit)}</span>
            </div>

            <div className="h-4 bg-zinc-800 rounded-full overflow-hidden mb-4">
              <div 
                className={clsx(
                  "h-full transition-all duration-500",
                  isOverBudget ? "bg-danger" : "bg-primary"
                )}
                style={{ width: `${budgetProgress}%` }}
              />
            </div>

            {isOverBudget ? (
              <div className="flex items-center gap-2 text-danger bg-danger/10 p-3 rounded-xl">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">You've exceeded your daily limit!</span>
              </div>
            ) : (
              <div className="text-sm text-zinc-400">
                You have <span className="text-white font-bold">{formatCurrency(budget.dailyLimit - todayExpenses)}</span> left to spend today.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};