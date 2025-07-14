import { useMockApp } from '../context/MockAppContext';

/**
 * Hook para manejar transacciones simuladas desde el contexto global.
 * Permite obtener, agregar, filtrar y exportar transacciones a CSV.
 */
export function useTransactions() {
  const { transactions, addTransaction } = useMockApp();

  // Filtrar transacciones por tipo ('sent' | 'received' | 'all')
  const filterByType = (type: 'sent' | 'received' | 'all') => {
    if (type === 'all') return transactions;
    return transactions.filter(tx => tx.type === type);
  };

  // Filtrar por token
  const filterByToken = (token: string | 'all') => {
    if (token === 'all') return transactions;
    return transactions.filter(tx => tx.token === token);
  };

  // Filtrar por estado ('completed' | 'pending' | 'failed' | 'all')
  const filterByStatus = (status: string | 'all') => {
    if (status === 'all') return transactions;
    return transactions.filter(tx => tx.status === status);
  };

  // Búsqueda por contraparte (from/to)
  const searchByCounterparty = (query: string) => {
    return transactions.filter(tx => {
      const contraparte = tx.type === 'sent' ? tx.to : tx.from;
      return contraparte.toLowerCase().includes(query.toLowerCase());
    });
  };

  // Exportar transacciones a CSV
  const exportToCSV = (txs = transactions) => {
    if (!txs.length) return;
    const headers = ['Fecha', 'Contraparte', 'Tipo', 'Monto', 'Token', 'Estado'];
    const rows = txs.map(tx => [
      tx.date.toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
      tx.type === 'sent' ? tx.to : tx.from,
      tx.type === 'sent' ? 'Enviado' : 'Recibido',
      tx.amount,
      tx.token,
      tx.status === 'completed' ? 'Completado' : tx.status === 'pending' ? 'Pendiente' : 'Fallido',
    ]);
    const csvContent = [headers, ...rows]
      .map(e => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transacciones.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    transactions,
    addTransaction,
    filterByType,
    filterByToken,
    filterByStatus,
    searchByCounterparty,
    exportToCSV
  };
} 