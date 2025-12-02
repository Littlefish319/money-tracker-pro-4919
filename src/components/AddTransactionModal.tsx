import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CATEGORIES } from '../utils/helpers';
import { TransactionType } from '../types';
import { clsx } from 'clsx';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (t: any) => void;
}

export const AddTransactionModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAdd({
      type,
      amount: parseFloat(amount),
      category,
      date,
      note
    });
    
    // Reset
    setAmount('');
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">New Transaction</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={clsx(
                'flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all',
                type === 'expense' ? 'bg-danger text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              )}
            >
              <Minus className="w-4 h-4" /> Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={clsx(
                'flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all',
                type === 'income' ? 'bg-success text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              )}
            >
              <Plus className="w-4 h-4" /> Income
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
            >
              <option value="">Select a category</option>
              {CATEGORIES[type].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date & Note */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Note (Optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Lunch, Salary..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};