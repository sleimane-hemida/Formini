"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { HiUser, HiBookOpen, HiArrowRightOnRectangle, HiCog6Tooth } from 'react-icons/hi2';
import { ROUTES } from '../../utils/routes';

export default function ProfileDropdown({ isOpen, onClose, user, onLogout }) {
    if (!isOpen) return null;
    const router = useRouter();

    return (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            {/* Header avec infos utilisateur */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0C8CE9] rounded-full flex items-center justify-center">
                        <HiUser className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                            {user?.name || user?.firstName || 'Utilisateur'}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                            {user?.email || 'email@example.com'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu options */}
            <div className="py-2">
                <button 
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-[#0C8CE9]"
                    onClick={() => {
                        // Redirige vers le bon profil dashboard si formateur
                        if (user?.role === 'formateur') {
                            router.push('/dash_formation/profile');
                        } else {
                            router.push(ROUTES.PROFILE);
                        }
                        onClose();
                    }}
                >
                    <HiUser className="w-5 h-5" />
                    <span>Mon profil</span>
                </button>

                <button 
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-[#0C8CE9]"
                    onClick={() => {
                        const target = user?.role === 'formateur' ? ROUTES.TRAINER_FORMATIONS_LIST : ROUTES.MES_FORMATIONS_GENERAL;
                        router.push(target);
                        onClose();
                    }}
                >
                    <HiBookOpen className="w-5 h-5" />
                    <span>Mes formations</span>
                </button>

                <button 
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-[#0C8CE9]"
                    onClick={() => {
                        router.push(ROUTES.SETTINGS);
                        onClose();
                    }}
                >
                    <HiCog6Tooth className="w-5 h-5" />
                    <span>Paramètres</span>
                </button>

                {/* Séparateur */}
                <div className="border-t border-gray-100 my-2"></div>

                <button 
                    className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-red-600"
                    onClick={() => {
                        onLogout();
                        onClose();
                    }}
                >
                    <HiArrowRightOnRectangle className="w-5 h-5" />
                    <span>Se déconnecter</span>
                </button>
            </div>
        </div>
    );
}