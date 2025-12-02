import React from 'react';
import { LayoutDashboard, Receipt, Settings, Wallet } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'transactions', icon: Receipt, label: 'Transactions' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-20 lg:w-64 bg-surface border-r border-zinc-800 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center gap-3 justify-center lg:justify-start">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Wallet className="w-6 h-6 text-primary" />
        </div>
        <span className="font-bold text-xl hidden lg:block tracking-tight">MoneyPro</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={clsx(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
              activeTab === item.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden lg:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};