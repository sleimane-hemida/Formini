"use client";
import React from 'react';
import { HiXMark, HiBell } from 'react-icons/hi2';
import Header from '../../composant/layout/header';

export default function NotificationPopup({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Header du popup */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                    <HiBell className="w-5 h-5 text-[#0C8CE9]" />
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <HiXMark className="w-5 h-5" />
                </button>
            </div>

            {/* Contenu vide pour le design */}
            <div className="p-8 text-center text-gray-500">
                <HiBell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium mb-1">Aucune notification</p>
                <p className="text-sm">Vous êtes à jour ! Aucune nouvelle notification.</p>
            </div>

            {/* Footer avec actions */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <div className="flex justify-center items-center text-sm">
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                        Voir toutes les notifications
                    </button>
                </div>
            </div>
        </div>
    );
}

// Composant de page complète pour les notifications
export function NotificationPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="container mx-auto px-4 py-8 pt-20">
                {/* En-tête de page */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <HiBell className="w-8 h-8 text-[#0C8CE9]" />
                        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                    </div>
                </div>

                {/* Contenu vide */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <HiBell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">
                        Aucune notification
                    </h3>
                    <p className="text-gray-600">
                        Les notifications apparaîtront ici.
                    </p>
                </div>
            </div>
        </div>
    );
}
