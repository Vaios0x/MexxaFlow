import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { MXNB_CONFIG } from '../config/mxnb';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '18cc0d49536ead5a3e9dbc839af2eef9';

// --- Definición de redes soportadas ---
const arbitrumSepolia = {
  id: MXNB_CONFIG.CONTRACTS.ARBITRUM_SEPOLIA.chainId,
  name: MXNB_CONFIG.CONTRACTS.ARBITRUM_SEPOLIA.name,
  network: 'arbitrum-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: [MXNB_CONFIG.CONTRACTS.ARBITRUM_SEPOLIA.rpcUrl] },
    public: { http: [MXNB_CONFIG.CONTRACTS.ARBITRUM_SEPOLIA.rpcUrl] },
  },
  blockExplorers: {
    default: { name: 'Arbiscan', url: MXNB_CONFIG.CONTRACTS.ARBITRUM_SEPOLIA.explorer },
  },
  testnet: true,
};

// Ejemplo para mainnet (descomentar si se usa en producción)
const arbitrumOne = {
  id: 42161,
  name: 'Arbitrum One',
  network: 'arbitrum-one',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://arb1.arbitrum.io/rpc'] },
    public: { http: ['https://arb1.arbitrum.io/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Arbiscan', url: 'https://arbiscan.io' },
  },
  testnet: false,
};

// --- Configuración de wallets recomendados usando RainbowKit ---
const { wallets } = getDefaultWallets({
  appName: 'MexxaFlow',
  projectId,
  chains: [arbitrumSepolia, arbitrumOne],
});

// --- Configuración de RainbowKit/Wagmi con multi-wallet y multi-red ---
const config = getDefaultConfig({
  appName: 'MexxaFlow',
  projectId,
  chains: [arbitrumSepolia, arbitrumOne],
  transports: {
    [arbitrumSepolia.id]: http(),
    [arbitrumOne.id]: http(),
  },
  ssr: true,
  wallets,
});

// Función para agregar token MXNB a la wallet (usando config centralizada)
const addMXNBToken = async (chainId = arbitrumSepolia.id) => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: MXNB_CONFIG.CONTRACTS.ARBITRUM_SEPOLIA.tokenAddress, // O usar getTokenAddress(chainId)
            symbol: MXNB_CONFIG.SYMBOL,
            decimals: MXNB_CONFIG.DECIMALS,
            image: MXNB_CONFIG.RESOURCES.LOGO,
          },
        },
      });
    } catch (error) {
      console.error('Error al agregar token MXNB:', error);
    }
  }
};

export { config, addMXNBToken, arbitrumSepolia, arbitrumOne }; 