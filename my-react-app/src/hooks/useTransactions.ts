import { useState, useEffect, useCallback } from 'react';
import { useMockApp } from '../context/MockAppContext';
import type { MockTransaction } from '../context/MockAppContext';

/**
 * Hook para manejar transacciones con persistencia en localStorage
 * 
 * @returns {Object} Objeto con métodos y estado de transacciones
 * @property {Transaction[]} transactions - Lista de transacciones
 * @property {Function} addTransaction - Añade una nueva transacción
 * @property {Function} filterByType - Filtra transacciones por tipo
 * @property {Function} filterByToken - Filtra transacciones por token
 * @property {Function} filterByStatus - Filtra transacciones por estado
 * @property {Function} searchByCounterparty - Busca transacciones por contraparte
 * @property {Function} exportToCSV - Exporta transacciones a CSV
 */
export function useTransactions() {
  const { 
    transactions: contextTransactions, 
    sendPayment, 
    receivePayment 
  } = useMockApp();

  // Estado de transacciones con persistencia en localStorage
  const [transactions, setTransactions] = useState<MockTransaction[]>(() => {
    try {
      const storedTransactions = localStorage.getItem('mexxaflow_transactions');
      return storedTransactions 
        ? JSON.parse(storedTransactions).map((tx: MockTransaction) => ({
            ...tx,
            date: new Date(tx.date)
          }))
        : contextTransactions;
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
      return contextTransactions;
    }
  });

  // Efecto para guardar transacciones en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mexxaflow_transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error al guardar transacciones:', error);
    }
  }, [transactions]);

  // Añadir transacción con validación
  const addTransaction = useCallback((newTransaction: Omit<MockTransaction, 'id' | 'date'>) => {
    try {
      // Validaciones básicas
      if (!newTransaction.amount || newTransaction.amount <= 0) {
        throw new Error('El monto de la transacción debe ser mayor a 0');
      }

      if (!newTransaction.from || !newTransaction.to) {
        throw new Error('Dirección de origen y destino son obligatorias');
      }

      // Usar métodos del contexto según el tipo de transacción
      if (newTransaction.type === 'sent') {
        sendPayment(newTransaction.to, newTransaction.amount, newTransaction.token);
      } else {
        receivePayment(newTransaction.from, newTransaction.amount, newTransaction.token);
      }

      return null; // El contexto ya maneja la adición de transacciones
    } catch (error) {
      console.error('Error al añadir transacción:', error);
      return null;
    }
  }, [sendPayment, receivePayment]);

  // Filtrar transacciones por tipo
  const filterByType = useCallback((type: 'sent' | 'received' | 'all') => {
    if (type === 'all') return transactions;
    return transactions.filter(tx => tx.type === type);
  }, [transactions]);

  // Filtrar por token
  const filterByToken = useCallback((token: string | 'all') => {
    if (token === 'all') return transactions;
    return transactions.filter(tx => tx.token === token);
  }, [transactions]);

  // Filtrar por estado
  const filterByStatus = useCallback((status: string | 'all') => {
    if (status === 'all') return transactions;
    return transactions.filter(tx => tx.status === status);
  }, [transactions]);

  // Búsqueda por contraparte
  const searchByCounterparty = useCallback((query: string) => {
    return transactions.filter(tx => {
      const contraparte = tx.type === 'sent' ? tx.to : tx.from;
      return contraparte.toLowerCase().includes(query.toLowerCase());
    });
  }, [transactions]);

  // Exportar a CSV con mejor manejo de errores
  const exportToCSV = useCallback((txs = transactions) => {
    try {
      if (!txs.length) {
        throw new Error('No hay transacciones para exportar');
      }

      const headers = ['Fecha', 'Contraparte', 'Tipo', 'Monto', 'Token', 'Estado'];
      const rows = txs.map(tx => [
        tx.date.toLocaleString('es-MX', { 
          day: '2-digit', 
          month: '2-digit', 
          year: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        tx.type === 'sent' ? tx.to : tx.from,
        tx.type === 'sent' ? 'Enviado' : 'Recibido',
        tx.amount.toString(),
        tx.token,
        tx.status === 'completed' ? 'Completado' : 
        tx.status === 'pending' ? 'Pendiente' : 'Fallido',
      ]);

      const csvContent = [headers, ...rows]
        .map(e => e.map(cell => `"${cell}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transacciones_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al exportar transacciones:', error);
      alert('No se pudo exportar las transacciones. Inténtalo de nuevo.');
    }
  }, [transactions]);

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