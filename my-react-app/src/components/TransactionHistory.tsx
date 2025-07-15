import React, { useState } from 'react';

interface Transaction {
  date: string;
  time: string;
  counterpart: string;
  type: 'Recibí' | 'Enviar';
}

const mockTransactions: Transaction[] = [
  {
    date: '14/07/25',
    time: '08:58 p.m.',
    counterpart: 'Ana López',
    type: 'Recibí'
  },
  {
    date: '14/07/25',
    time: '08:58 p.m.',
    counterpart: 'Carlos Ruiz',
    type: 'Enviar'
  }
];

const TransactionHistory: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [tokenFilter, setTokenFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = mockTransactions.filter(transaction => 
    (typeFilter === 'Todos' || transaction.type === typeFilter) &&
    transaction.counterpart.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black text-white rounded-lg p-4 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-bold">Últimas Transacciones</h2>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2 9.5a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm0-8a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5z" clipRule="evenodd" />
          </svg>
          Exportar historial
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <select 
          className="bg-gray-800 text-white rounded-lg p-2 text-sm"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="Todos">Tipo</option>
          <option value="Recibí">Recibí</option>
          <option value="Enviar">Enviar</option>
        </select>
        <select 
          className="bg-gray-800 text-white rounded-lg p-2 text-sm"
          value={tokenFilter}
          onChange={(e) => setTokenFilter(e.target.value)}
        >
          <option value="Todos">Token</option>
        </select>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Buscar contraparte..." 
          className="w-full bg-gray-800 text-white rounded-lg p-2 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 text-xs md:text-sm font-semibold text-gray-400 mb-2 px-2">
        <span>Fecha</span>
        <span>Contraparte</span>
        <span className="text-right">Tipo</span>
      </div>

      <div className="space-y-2">
        {filteredTransactions.map((transaction, index) => (
          <div 
            key={index} 
            className="grid grid-cols-3 items-center bg-gray-900 rounded-lg p-2 text-sm"
          >
            <div>
              <div>{transaction.date}</div>
              <div className="text-xs text-gray-500">{transaction.time}</div>
            </div>
            <div>{transaction.counterpart}</div>
            <div className="text-right">
              <span 
                className={`
                  px-2 py-1 rounded-full text-xs 
                  ${transaction.type === 'Recibí' ? 'bg-green-600' : 'bg-blue-600'}
                `}
              >
                {transaction.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory; 