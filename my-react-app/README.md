# MexxaFlow

**Plataforma de pagos instantáneos, seguros y sin fronteras para trabajadores independientes en Latinoamérica.**

---

## 🚀 ¿Qué es MexxaFlow?
MexxaFlow es una plataforma web que permite enviar y recibir pagos en la stablecoin MXNB sobre la red Arbitrum Sepolia, con comisiones mínimas y máxima seguridad. Pensada para freelancers, repartidores, creadores, educadores y cualquier trabajador independiente.

---

## 🛠️ Tecnologías principales
- **React + Vite** (frontend)
- **TypeScript**
- **Material UI (MUI)** para UI moderna
- **wagmi + RainbowKit** para conexión Web3
- **TailwindCSS** (opcional, para estilos utilitarios)

---

## 📁 Estructura del proyecto
```
my-react-app/
  ├── src/
  │   ├── components/      # Componentes reutilizables (Navbar, Footer, MXNBBalance...)
  │   ├── pages/           # Páginas principales (Dashboard, Home, Segmentos...)
  │   ├── web3/            # Configuración de wagmi, RainbowKit y contratos
  │   ├── hooks/           # Custom hooks (useMXNBBalance...)
  │   ├── config/          # Configuración de tokens, etc.
  │   └── ...
  ├── public/              # Archivos estáticos
  ├── package.json         # Dependencias y scripts
  └── ...
```

---

## ⚡ Funcionalidades principales
- Conexión de wallet (MetaMask, Rabby, etc.)
- Visualización de balance MXNB en tiempo real
- Envío y recepción de pagos (demo visual)
- QR para recibir pagos
- Agregar token MXNB a la wallet fácilmente
- Estadísticas y segmentos personalizados
- UX/UI moderna y responsiva

---

## 🖥️ Cómo correr el proyecto localmente
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Vaios0x/MexxaFlow.git
   cd MexxaFlow/my-react-app
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` si es necesario (ver `.env.example`)
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🤝 Contribuir
¡Pull requests y sugerencias son bienvenidas! Abre un issue o PR para mejorar la plataforma.

---

## 📄 Licencia
MIT

---

**Hecho con ❤️ por Vaios0x y la comunidad.**
