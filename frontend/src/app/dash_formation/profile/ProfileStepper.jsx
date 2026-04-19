import React from 'react';
import { HiCheck } from 'react-icons/hi2';

export default function ProfileStepper({ current = 1 }) {
  const steps = [
    { id: 1, label: 'Infos de base' },
    { id: 2, label: 'Infos complémentaires' },
    { id: 3, label: 'Infos bancaires' },
  ];

  return (
    <nav aria-label="Progression profil" className="w-full mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center w-full overflow-x-auto no-scrollbar">
        {steps.map((s, i) => {
          const completed = s.id < current;
          const active = s.id === current;
          
          return (
            <React.Fragment key={s.id}>
              <div className="flex items-center flex-shrink-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${completed ? 'bg-green-500 text-white shadow-lg shadow-green-100' : active ? 'bg-[#0C8CE9] text-white shadow-lg shadow-blue-100' : 'bg-white border-2 border-gray-100 text-gray-400'}`}>
                  {completed ? <HiCheck className="w-5 h-5 transition-all animate-in zoom-in" /> : <span className="font-bold">{s.id}</span>}
                </div>
                <div className={`ml-3 whitespace-nowrap ${active ? 'font-bold text-gray-900' : completed ? 'font-semibold text-gray-700' : 'font-medium text-gray-400'} text-sm transition-colors`}>
                  {s.label}
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 min-w-[30px] mx-6 rounded-full transition-all duration-500 ${s.id < current ? 'bg-[#0C8CE9]' : 'bg-gray-100'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
