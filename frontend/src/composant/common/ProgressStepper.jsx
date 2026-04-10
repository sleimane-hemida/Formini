import React from 'react';
import Link from 'next/link';
import { HiCheck } from 'react-icons/hi2';

export default function ProgressStepper({ current = 1, fId = null }) {
  const steps = [
    { id: 1, label: 'Informations générales', path: '/dash_formation/formations_formateurs/formation_completer/general_forma' },
    { id: 2, label: 'Détails', path: '/dash_formation/formations_formateurs/formation_completer/detail_forma' },
    { id: 3, label: 'Modules & Leçons', path: '/dash_formation/formations_formateurs/formation_completer/module' },
    { id: 4, label: 'Tarification', path: '/dash_formation/formations_formateurs/formation_completer/tarification' },
  ];

  return (
    <nav aria-label="Progression formation" className="w-full mb-6">
      <div className="flex items-center w-full">
        {steps.map((s, i) => {
          const completed = s.id < current;
          const active = s.id === current;
          const url = s.path; // keep href stable for SSR/CSR; fId (if any) handled by parent routing
          return (
            <React.Fragment key={s.id}>
              <Link href={url} className="flex items-center select-none">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${completed ? 'bg-green-500 text-white' : active ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                  {completed ? <HiCheck className="w-5 h-5" /> : <span className="font-semibold">{s.id}</span>}
                </div>
                <div className={`ml-3 ${active ? 'font-semibold text-black' : 'text-gray-600'} text-sm`}>{s.label}</div>
              </Link>

              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${s.id < current ? 'bg-blue-300' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
