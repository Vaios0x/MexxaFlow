import { useMXNBWallet } from '../services/mxnb-wallet.service';

export const useMXNBBalance = () => {
  const { balance, isLoading, error, isConnected, refetch } = useMXNBWallet();

  return {
    balance: balance || 0,
    loading: isLoading,
    error: error?.message || null,
    isConnected,
    refresh: refetch,
    lastUpdated: new Date() // Wagmi maneja las actualizaciones automáticamente
  };
}; 