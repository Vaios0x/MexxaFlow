import React from 'react';

const badgeStyles = {
  active: 'bg-green-500 text-white',
  inactive: 'bg-gray-300 text-gray-600',
};

const badges = [
  { 
    name: 'Primer Pago', 
    icon: '🎉', 
    active: true 
  },
  { 
    name: 'Pagador Frecuente', 
    icon: '🚀', 
    active: false 
  },
  { 
    name: 'Receptor Activo', 
    icon: '💸', 
    active: false 
  },
  { 
    name: 'Balance Superior', 
    icon: '🏆', 
    active: true 
  }
];

const Badges: React.FC = () => {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold mb-4">Logros y Badges</h2>
      {badges.map((badge, index) => (
        <div 
          key={index} 
          className={`
            flex items-center justify-between 
            p-4 rounded-lg 
            transition-all duration-300 
            ${badge.active ? badgeStyles.active : badgeStyles.inactive}
          `}
        >
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{badge.icon}</span>
            <span className="font-semibold">{badge.name}</span>
          </div>
          {badge.active && (
            <span className="text-sm">Desbloqueado</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Badges; 