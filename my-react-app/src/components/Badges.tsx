import React from 'react';

const badges = [
  { 
    name: 'Primer Pago', 
    icon: '🎉', 
    status: 'Desbloqueado',
    active: true 
  },
  { 
    name: 'Pagador Frecuente', 
    icon: '🚀', 
    status: '',
    active: false 
  },
  { 
    name: 'Receptor Activo', 
    icon: '💸', 
    status: '',
    active: false 
  },
  { 
    name: 'Balance Superior', 
    icon: '🏆', 
    status: 'Desbloqueado',
    active: true 
  }
];

const Badges: React.FC = () => {
  return (
    <div className="bg-black text-white p-4 rounded-lg max-w-md mx-auto">
      <h2 className="text-lg md:text-xl font-bold mb-4">Logros y Badges</h2>
      <div className="space-y-3 md:space-y-4">
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className={`
              flex items-center 
              ${badge.active ? 'opacity-100' : 'opacity-50'}
            `}
          >
            <span className="text-xl md:text-2xl mr-3 md:mr-4">{badge.icon}</span>
            <div className="flex-grow">
              <div className="text-sm md:text-base font-semibold">{badge.name}</div>
              {badge.status && (
                <div className="text-xs md:text-sm text-gray-400">{badge.status}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges; 