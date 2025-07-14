# NOTA IMPORTANTE SOBRE LA RED Y EL TOKEN MXNB

## ¿En qué red debe estar el proyecto?

- **El contrato MXNB (0x82B9e52b26A2954E113F94Ff26647754d5a4247D) está desplegado en la red Arbitrum Sepolia (Chain ID: 421614).**
- **NO está en Ethereum Sepolia ni en mainnet.**
- Todas las consultas, saldos y transacciones de MXNB solo funcionarán en Arbitrum Sepolia.

## ¿Qué significa esto para desarrolladores y usuarios?

- El frontend (React, wagmi, RainbowKit, etc.) debe estar configurado para Arbitrum Sepolia.
- La wallet debe estar conectada a Arbitrum Sepolia para ver y mover MXNB.
- El contrato MXNB que se consulta debe ser el de Arbitrum Sepolia.

## ¿Qué pasa si usas otra red?

- No verás tu saldo de MXNB.
- No podrás hacer transacciones con ese contrato.
- Verás errores como “no data”, “no contract found”, etc.

## Resumen visual

| Red                | ¿Ves tu MXNB? | ¿Funciona el contrato? | ¿Debes usarla? |
|--------------------|:-------------:|:---------------------:|:--------------:|
| **Arbitrum Sepolia** |      ✅       |          ✅           |      ✅        |
| Ethereum Sepolia   |      ❌       |          ❌           |      ❌        |
| Mainnet            |      ❌       |          ❌           |      ❌        |

## ¿Qué debes hacer siempre?

1. Configura tu frontend y wagmi para Arbitrum Sepolia.
2. Conecta tu wallet a Arbitrum Sepolia.
3. Usa la dirección del contrato MXNB de esa red.

---

# Funcionalidad MXNB - MexxaFlow

## Descripción

Esta implementación proporciona una integración completa para mostrar y gestionar el saldo del token MXNB (Mexican Peso Stablecoin) en la aplicación MexxaFlow.

## Características Implementadas

### 1. Componente de Balance MXNB (`MXNBBalance.tsx`)
- **Visualización del saldo**: Muestra el balance actual de MXNB en tiempo real
- **Modo compacto**: Versión reducida para la barra de navegación
- **Estados de carga**: Indicadores visuales durante la carga
- **Manejo de errores**: Alertas y opciones de reintento
- **Botón de actualización**: Actualización manual del saldo
- **Agregar token**: Función para agregar MXNB a la wallet del usuario

### 2. Hook Personalizado (`useMXNBBalance.ts`)
- **Integración con Wagmi**: Usa los hooks nativos de Wagmi para actualizaciones automáticas
- **Cache inteligente**: Wagmi maneja automáticamente el cache y las actualizaciones
- **Manejo de estados**: Loading, error, y datos actualizados

### 3. Componente de Estadísticas (`MXNBStats.tsx`)
- **Métricas principales**: Balance, crecimiento, transacciones, volumen
- **Estadísticas detalladas**: Métricas de transacciones y actividad
- **Barras de progreso**: Visualización de métricas clave
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla

### 4. Servicio MXNB (`services/mxnb-wallet.service.ts`)
- **Integración con Wagmi**: Usa `useReadContract` para leer datos del contrato
- **Manejo automático de estados**: Loading, error, y datos
- **Funciones de utilidad**: Para obtener balance y decimales

### 5. Configuración Centralizada (`config/mxnb.ts`)
- **Constantes del token**: Dirección, símbolo, decimales
- **Configuración de redes**: Arbitrum Sepolia
- **ABI del contrato**: Funciones ERC20 necesarias
- **Funciones de utilidad**: Formateo y validaciones

## Configuración del Token

### Información del Contrato
- **Dirección**: `0x82B9e52b26A2954E113F94Ff26647754d5a4247D`
- **Red**: Arbitrum Sepolia (Chain ID: 421614)
- **Símbolo**: MXNB
- **Decimales**: 18

### Redes Soportadas
- **Arbitrum Sepolia**: Red de prueba para desarrollo
- **RPC URL**: `https://sepolia-rollup.arbitrum.io/rpc`
- **Explorer**: `https://sepolia.arbiscan.io`

## Uso de los Componentes

### Componente de Balance Principal
```tsx
import MXNBBalance from '../components/MXNBBalance';

// Uso básico
<MXNBBalance />

// Con opciones personalizadas
<MXNBBalance 
  showAddTokenButton={true} 
  compact={false} 
/>
```

### Componente de Estadísticas
```tsx
import MXNBStats from '../components/MXNBStats';

// Estadísticas completas
<MXNBStats showDetailedStats={true} />

// Solo estadísticas básicas
<MXNBStats showDetailedStats={false} />
```

### Hook Personalizado
```tsx
import { useMXNBBalance } from '../hooks/useMXNBBalance';

const MyComponent = () => {
  const { balance, loading, error, refresh, isConnected } = useMXNBBalance();
  
  // Usar los datos del balance
  return (
    <div>
      {loading ? 'Cargando...' : `Balance: ${balance} MXNB`}
    </div>
  );
};
```

## Integración en la Aplicación

### Dashboard
El componente principal de balance se muestra en la parte superior del Dashboard, reemplazando el balance mock anterior.

### Barra de Navegación
Se incluye una versión compacta del balance en la barra de navegación (solo visible en pantallas medianas y grandes).

### Estadísticas
Las estadísticas detalladas se muestran en el Dashboard, proporcionando métricas completas del uso de MXNB.

## Funcionalidades de Actualización

### Actualización Automática
- **Wagmi Integration**: Las actualizaciones son manejadas automáticamente por Wagmi
- **Cache inteligente**: Wagmi optimiza las llamadas al contrato
- **Revalidación**: Se actualiza automáticamente cuando cambia la conexión

### Actualización Manual
- **Botón de refresh**: En el componente de balance
- **Hook refetch**: Función disponible en el hook personalizado

### Actualización por Eventos
- **Cambio de conexión**: Se actualiza automáticamente al conectar/desconectar
- **Cambios de red**: Se actualiza cuando cambia la red de blockchain

## Manejo de Errores

### Tipos de Errores
1. **Sin conexión**: Muestra mensaje para conectar wallet
2. **Error de red**: Muestra alerta con opción de reintento
3. **Error de contrato**: Manejo de errores de blockchain

### Recuperación
- **Reintento automático**: En caso de errores temporales
- **Botón de reintento**: Para errores persistentes
- **Logs de consola**: Para debugging

## Personalización

### Temas y Estilos
Los componentes usan Material-UI y pueden ser personalizados mediante:
- **Props de estilo**: Para cambios específicos
- **Tema global**: Para cambios consistentes
- **CSS personalizado**: Para modificaciones avanzadas

### Configuración
Las constantes se pueden modificar en `config/mxnb.ts`:
- **Dirección del contrato**: Para diferentes redes
- **Intervalos de actualización**: Para diferentes frecuencias
- **URLs de recursos**: Para diferentes entornos

## Próximas Mejoras

### Funcionalidades Planificadas
1. **Gráficos de balance**: Historial de balance en el tiempo
2. **Notificaciones**: Alertas de cambios significativos
3. **Exportación**: Exportar datos de transacciones
4. **Múltiples redes**: Soporte para redes adicionales

### Optimizaciones
1. **Cache persistente**: Almacenamiento local de datos
2. **WebSocket**: Actualizaciones en tiempo real
3. **Lazy loading**: Carga bajo demanda de componentes

## Dependencias

### Principales
- `@mui/material`: Componentes de UI
- `wagmi`: Interacción con blockchain
- `@rainbow-me/rainbowkit`: Integración de wallets

### Desarrollo
- `react`: Framework principal
- `typescript`: Tipado estático
- `@mui/icons-material`: Iconos

## Notas de Desarrollo

### Consideraciones de Rendimiento
- Los componentes usan `useCallback` y `useMemo` para optimización
- Las actualizaciones automáticas se limpian correctamente
- Se evitan re-renders innecesarios

### Seguridad
- Validación de direcciones de wallet
- Manejo seguro de errores de blockchain
- No se almacenan claves privadas

### Accesibilidad
- Soporte para lectores de pantalla
- Navegación por teclado
- Contraste adecuado en todos los temas 