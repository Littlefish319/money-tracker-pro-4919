import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TransactionList } from './components/TransactionList';
import { AddTransactionModal } from './components/AddTransactionModal';
import { Settings } from './components/Settings';
import { useFinance } from './hooks/useFinance';
import { Plus } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { transactions, budget, addTransaction, deleteTransaction, updateBudget } = useFinance();

  return (
    <div className="min-h-screen bg-background text-white flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-20 lg:ml-64 p-4 lg:p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Header / Title for context */}
          <div className="lg:hidden mb-6 flex justify-between items-center">
             <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
          </div>

          {activeTab === 'dashboard' && (
            <Dashboard transactions={transactions} budget={budget} />
          )}
          
          {activeTab === 'transactions' && (
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          )}

          {activeTab === 'settings' && (
            <Settings budget={budget} onUpdateBudget={updateBudget} />
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-6 bottom-6 bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/40 hover:scale-110 transition-transform z-30"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addTransaction}
      />
    </div>
  );
}

export default App;