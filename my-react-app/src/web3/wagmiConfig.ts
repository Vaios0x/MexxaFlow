import '@rainbow-me/rainbowkit/styles.css';
import { 
  getDefaultConfig 
} from '@rainbow-me/rainbowkit';
import { http } from 'viem';

// Dirección del contrato MXNB en Arbitrum Sepolia
const MXNB_CONTRACT_ADDRESS = '0x82B9e52b26A2954E113F94Ff26647754d5a4247D';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '18cc0d49536ead5a3e9dbc839af2eef9';

export const arbitrumSepolia = {
  id: 421614,
  name: 'Arbitrum Sepolia',
  network: 'arbitrum-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
    public: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io' },
  },
  testnet: true,
};

const config = getDefaultConfig({
  appName: 'MexxaFlow',
  projectId,
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http(),
  },
  ssr: true, // Si tu aplicación usa server-side rendering
});

// Función para agregar token MXNB a la wallet
const addMXNBToken = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: MXNB_CONTRACT_ADDRESS,
            symbol: 'MXNB',
            decimals: 18,
            image: 'https://example.com/mxnb-token-logo.png', // Reemplazar con URL real del logo
          },
        },
      });
    } catch (error) {
      console.error('Error al agregar token MXNB:', error);
    }
  }
};

export { config, addMXNBToken, MXNB_CONTRACT_ADDRESS }; 