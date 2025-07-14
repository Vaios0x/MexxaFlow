// Configuración centralizada para el token MXNB y redes
export const MXNB_CONFIG = {
  // Contratos por red
  CONTRACTS: {
    ARBITRUM_SEPOLIA: {
      chainId: 421614,
      name: 'Arbitrum Sepolia',
      tokenAddress: '0x82B9e52b26A2954E113F94Ff26647754d5a4247D',
      bridgeAddress: '', // Si aplica
      faucetAddress: '', // Si aplica
      rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
      explorer: 'https://sepolia.arbiscan.io',
    },
    // Ejemplo para mainnet (descomentar y completar si se usa)
    // ARBITRUM_MAINNET: {
    //   chainId: 42161,
    //   name: 'Arbitrum One',
    //   tokenAddress: '0x...',
    //   bridgeAddress: '',
    //   faucetAddress: '',
    //   rpcUrl: 'https://arb1.arbitrum.io/rpc',
    //   explorer: 'https://arbiscan.io',
    // },
  },

  // Token info
  SYMBOL: 'MXNB',
  NAME: 'Mexican Peso Stablecoin',
  DECIMALS: 18,

  // Parámetros generales
  REFRESH_INTERVALS: {
    BALANCE: 30000, // 30 segundos
    STATS: 60000,   // 1 minuto
    PRICE: 15000    // 15 segundos
  },

  // Recursos
  RESOURCES: {
    LOGO: 'https://your-token-image-url.com/mxnb.png',
    WEBSITE: 'https://mxnb.com',
    DOCUMENTATION: 'https://docs.mxnb.com'
  }
};

// ABI simplificado para el token MXNB
export const MXNB_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

// Configuración para agregar el token a la wallet
export const ADD_TOKEN_CONFIG = {
  type: 'ERC20',
  options: {
    address: MXNB_CONFIG.CONTRACTS.ARBITRUM_SEPOLIA.tokenAddress,
    symbol: MXNB_CONFIG.SYMBOL,
    decimals: MXNB_CONFIG.DECIMALS,
    image: MXNB_CONFIG.RESOURCES.LOGO
  }
};

// Utilidades para redes y contratos
export const getNetworkByChainId = (chainId: number) => {
  return Object.values(MXNB_CONFIG.CONTRACTS).find(n => n.chainId === chainId);
};

export const getExplorerUrl = (chainId: number) => {
  const net = getNetworkByChainId(chainId);
  return net?.explorer || '';
};

export const getTokenAddress = (chainId: number) => {
  const net = getNetworkByChainId(chainId);
  return net?.tokenAddress || '';
};

// Utilidades de formato
export const formatMXNBCurrency = (amount: number): string => {
  return amount.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const formatMXNBBalance = (balance: number): string => {
  return `${balance.toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} MXNB`;
};

// Validaciones
export const validateMXNBAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateMXNBNetwork = (chainId: number): boolean => {
  return !!getNetworkByChainId(chainId);
};

// Validación de CLABE (básica: 18 dígitos)
export const validateCLABE = (clabe: string): boolean => {
  return /^\d{18}$/.test(clabe);
}; 