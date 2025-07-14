import { useNetwork, useSwitchNetwork } from 'wagmi';

/**
 * Hook para detectar el estado de la red y facilitar el cambio a Arbitrum Sepolia.
 * Devuelve si el usuario está en la red correcta, el nombre de la red actual y función para cambiar de red.
 */
export function useNetworkStatus() {
  // ID de Arbitrum Sepolia: 421614
  const ARBITRUM_SEPOLIA_ID = 421614;
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isConnected = !!chain;
  const isCorrectNetwork = chain?.id === ARBITRUM_SEPOLIA_ID;
  const currentNetwork = chain?.name || 'Desconocida';

  // Cambiar a Arbitrum Sepolia si es posible
  const switchToArbitrumSepolia = () => {
    if (switchNetwork) switchNetwork(ARBITRUM_SEPOLIA_ID);
  };

  return {
    isConnected,
    isCorrectNetwork,
    currentNetwork,
    switchToArbitrumSepolia
  };
} 