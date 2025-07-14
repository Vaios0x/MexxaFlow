import { useAccount, useReadContract } from 'wagmi';
import { MXNB_CONFIG, MXNB_ABI } from '../config/mxnb';

export const useMXNBWallet = () => {
  const { address, isConnected } = useAccount();

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

      // Usar el hook de Wagmi para leer el contrato
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
    getMXNBBalance,
    balance: formattedBalance,
    isLoading,
    error,
    isConnected,
    refetch
  };
}; 