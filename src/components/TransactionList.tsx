import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/helpers';
import { format, parseISO } from 'date-fns';
import { ArrowDownRight, ArrowUpRight, Trash2, Search } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<Props> = ({ transactions, onDelete }) => {
  const [filter, setFilter] = useState('');

  const filtered = transactions.filter(t => 
    t.note.toLowerCase().includes(filter.toLowerCase()) || 
    t.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search notes or categories..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-surface border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="bg-surface border border-zinc-800 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            No transactions found.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {filtered.map((t) => (
              <div key={t.id} className="p-4 hover:bg-zinc-800/50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    t.type === 'income' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                  )}>
                    {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-medium text-white">{t.category}</div>
                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                      <span>{format(parseISO(t.date), 'MMM do, yyyy')}</span>
                      {t.note && (
                        <>
                          <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                          <span className="italic">{t.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className={clsx(
                    "font-bold text-lg",
                    t.type === 'income' ? "text-success" : "text-white"
                  )}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </span>
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="text-zinc-600 hover:text-danger opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};