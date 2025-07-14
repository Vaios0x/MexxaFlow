import { useState, useEffect } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { arbitrumSepolia, arbitrumOne } from '../web3/wagmiConfig';

/**
 * Interfaz para detalles de red
 */
export interface NetworkDetails {
  id: number;
  name: string;
  chainType: 'testnet' | 'mainnet';
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
}

/**
 * Mapeo de redes soportadas
 */
const SUPPORTED_NETWORKS: NetworkDetails[] = [
  {
    id: 421614, // Arbitrum Sepolia
    name: 'Arbitrum Sepolia',
    chainType: 'testnet',
    nativeCurrency: {
      name: 'Sepolia ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc']
  },
  {
    id: 42161, // Arbitrum One
    name: 'Arbitrum One',
    chainType: 'mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc']
  }
];

/**
 * Hook para detectar y manejar el estado de la red blockchain
 * 
 * @returns {Object} Objeto con información y métodos de estado de red
 * @property {boolean} isConnected - Si hay una wallet conectada
 * @property {boolean} isCorrectNetwork - Si la red actual es la soportada
 * @property {string} currentNetwork - Nombre de la red actual
 * @property {Function} switchToArbitrumSepolia - Cambiar a Arbitrum Sepolia
 * @property {Function} switchToArbitrumOne - Cambiar a Arbitrum One
 * @property {NetworkDetails} networkDetails - Detalles de la red actual
 */
export function useNetworkStatus() {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const [networkError, setNetworkError] = useState<string | null>(null);

  // ID de Arbitrum Sepolia: 421614
  const ARBITRUM_SEPOLIA_ID = 421614;
  const ARBITRUM_ONE_ID = 42161;

  const isConnected = !!chain;
  const isCorrectNetwork = chainId === ARBITRUM_SEPOLIA_ID;
  const currentNetwork = chain?.name || 'Desconocida';

  // Obtener detalles de la red actual
  const networkDetails = SUPPORTED_NETWORKS.find(n => n.id === chainId) || null;

  // Cambiar a Arbitrum Sepolia con manejo de errores
  const switchToArbitrumSepolia = () => {
    try {
      if (!switchChain) {
        throw new Error('Cambio de red no soportado');
      }
      switchChain({ chainId: ARBITRUM_SEPOLIA_ID });
      setNetworkError(null);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al cambiar de red';
      setNetworkError(errorMessage);
      console.error('Error al cambiar a Arbitrum Sepolia:', errorMessage);
    }
  };

  // Cambiar a Arbitrum One con manejo de errores
  const switchToArbitrumOne = () => {
    try {
      if (!switchChain) {
        throw new Error('Cambio de red no soportado');
      }
      switchChain({ chainId: ARBITRUM_ONE_ID });
      setNetworkError(null);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido al cambiar de red';
      setNetworkError(errorMessage);
      console.error('Error al cambiar a Arbitrum One:', errorMessage);
    }
  };

  // Efecto para manejar cambios de red
  useEffect(() => {
    if (chain && !isCorrectNetwork) {
      setNetworkError(`Red actual no soportada: ${currentNetwork}`);
    } else {
      setNetworkError(null);
    }
  }, [chain, isCorrectNetwork, currentNetwork]);

  return {
    isConnected,
    isCorrectNetwork,
    currentNetwork,
    networkDetails,
    networkError,
    switchToArbitrumSepolia,
    switchToArbitrumOne
  };
} 