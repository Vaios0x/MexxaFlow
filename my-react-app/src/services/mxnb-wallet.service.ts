import { useAccount, useReadContract } from 'wagmi';
import { MXNB_CONFIG, MXNB_ABI } from '../config/mxnb';
import { useState } from 'react';

/**
 * Hook para interactuar con el contrato MXNB y simulaciones avanzadas:
 * - Transferencias programadas (simuladas)
 * - Integración simulada con Portal (MPC wallets)
 * - Soporte multiusuario (MultiCLABE)
 */
export const useMXNBWallet = () => {
  const { address, isConnected } = useAccount();

  // --- Simulación: transferencias programadas ---
  const [scheduledTransfers, setScheduledTransfers] = useState<{
    id: string;
    to: string;
    amount: number;
    date: Date;
    status: 'pendiente' | 'enviada' | 'cancelada';
  }[]>([]);

  // Agregar transferencia programada
  const scheduleTransfer = (to: string, amount: number, date: Date) => {
    setScheduledTransfers(prev => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        to,
        amount,
        date,
        status: 'pendiente'
      }
    ]);
  };

  // Marcar transferencia como enviada/cancelada
  const updateScheduledTransfer = (id: string, status: 'enviada' | 'cancelada') => {
    setScheduledTransfers(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  // --- Simulación: integración Portal (MPC wallets) ---
  const [portalLinked, setPortalLinked] = useState(false);
  const [portalWallet, setPortalWallet] = useState<string | null>(null);

  // Simular vinculación de wallet Portal
  const linkPortalWallet = (mpcAddress: string) => {
    setPortalLinked(true);
    setPortalWallet(mpcAddress);
  };
  // Simular desvinculación
  const unlinkPortalWallet = () => {
    setPortalLinked(false);
    setPortalWallet(null);
  };

  // --- Simulación: MultiCLABE (multiusuario bancario) ---
  const [clabes, setClabes] = useState<string[]>([]);
  // Agregar CLABE
  const addClabe = (clabe: string) => {
    if (!clabes.includes(clabe)) setClabes(prev => [...prev, clabe]);
  };
  // Eliminar CLABE
  const removeClabe = (clabe: string) => {
    setClabes(prev => prev.filter(c => c !== clabe));
  };

  // --- Lógica original de balance ---
  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: MXNB_CONFIG.TOKEN_ADDRESS as `0x${string}`,
    abi: MXNB_ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && isConnected,
    },
  });

  const { data: decimals } = useReadContract({
    address: MXNB_CONFIG.TOKEN_ADDRESS as `0x${string}`,
    abi: MXNB_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!address && isConnected,
    },
  });

  const getMXNBBalance = async (userAddress?: string) => {
    if (!userAddress && !address) return 0;
    try {
      const targetAddress = userAddress || address;
      if (!targetAddress) return 0;
      const { data: balanceData } = await refetch();
      if (balanceData && decimals) {
        return Number(balanceData) / Math.pow(10, Number(decimals));
      }
      return 0;
    } catch (error) {
      console.error('Error getting MXNB balance:', error);
      return 0;
    }
  };

  const formattedBalance = balance && decimals ? Number(balance) / Math.pow(10, Number(decimals)) : 0;

  return {
    // Balance y contrato
    getMXNBBalance,
    balance: formattedBalance,
    isLoading,
    error,
    isConnected,
    refetch,
    // Transferencias programadas
    scheduledTransfers,
    scheduleTransfer,
    updateScheduledTransfer,
    // Portal (MPC wallets)
    portalLinked,
    portalWallet,
    linkPortalWallet,
    unlinkPortalWallet,
    // MultiCLABE
    clabes,
    addClabe,
    removeClabe
  };
}; 