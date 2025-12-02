import { useState, useEffect } from 'react';
import { Transaction, BudgetSettings } from '../types';

export const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('mtp_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState<BudgetSettings>(() => {
    const saved = localStorage.getItem('mtp_budget');
    return saved ? JSON.parse(saved) : { dailyLimit: 100 };
  });

  useEffect(() => {
    localStorage.setItem('mtp_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('mtp_budget', JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (t: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateBudget = (limit: number) => {
    setBudget({ dailyLimit: limit });
  };

  return {
    transactions,
    budget,
    addTransaction,
    deleteTransaction,
    updateBudget
  };
};