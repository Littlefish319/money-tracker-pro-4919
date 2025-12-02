import React, { useState } from 'react';
import { BudgetSettings } from '../types';
import { Save } from 'lucide-react';

interface Props {
  budget: BudgetSettings;
  onUpdateBudget: (limit: number) => void;
}

export const Settings: React.FC<Props> = ({ budget, onUpdateBudget }) => {
  const [limit, setLimit] = useState(budget.dailyLimit.toString());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBudget(parseFloat(limit));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="bg-surface border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Budget Configuration</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Daily Spending Limit ($)
            </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-zinc-500 mt-2">
              This limit is used to calculate your daily budget progress bar on the dashboard.
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="mt-8 p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
        <h4 className="font-bold text-zinc-400 mb-2">About Money Tracker Pro</h4>
        <p className="text-sm text-zinc-500">
          Version 1.0.0. Data is stored locally in your browser. 
          The 4.5% interest calculation is a projection based on your total income entries, 
          simulating a high-yield savings account return over one year.
        </p>
      </div>
    </div>
  );
};