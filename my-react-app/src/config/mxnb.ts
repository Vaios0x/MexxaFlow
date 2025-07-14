// Configuración del token MXNB
export const MXNB_CONFIG = {
  // Dirección del contrato en Arbitrum Sepolia
  TOKEN_ADDRESS: '0x82B9e52b26A2954E113F94Ff26647754d5a4247D',
  
  // Información del token
  SYMBOL: 'MXNB',
  NAME: 'Mexican Peso Stablecoin',
  DECIMALS: 18,
  
  // Redes soportadas
  SUPPORTED_NETWORKS: {
    ARBITRUM_SEPOLIA: {
      chainId: 421614,
      name: 'Arbitrum Sepolia',
      rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
      explorer: 'https://sepolia.arbiscan.io'
    }
  },
  
  // Configuración de actualización
  REFRESH_INTERVALS: {
    BALANCE: 30000, // 30 segundos
    STATS: 60000,   // 1 minuto
    PRICE: 15000    // 15 segundos
  },
  
  // URLs de recursos
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
    address: MXNB_CONFIG.TOKEN_ADDRESS,
    symbol: MXNB_CONFIG.SYMBOL,
    decimals: MXNB_CONFIG.DECIMALS,
    image: MXNB_CONFIG.RESOURCES.LOGO
  }
};

// Funciones de utilidad
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
  return chainId === MXNB_CONFIG.SUPPORTED_NETWORKS.ARBITRUM_SEPOLIA.chainId;
}; 