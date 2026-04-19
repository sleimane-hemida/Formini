"use client";
import React from 'react';
import { HiExclamationTriangle, HiCheckCircle, HiInformationCircle, HiXMark } from 'react-icons/hi2';

export default function CustomModal({ isOpen, onClose, onConfirm, title, message, type = 'info', confirmText = 'OK', cancelText = 'Annuler' }) {
    if (!isOpen) return null;

    const icons = {
        success: <HiCheckCircle className="w-12 h-12 text-green-500" />,
        warning: <HiExclamationTriangle className="w-12 h-12 text-amber-500" />,
        info: <HiInformationCircle className="w-12 h-12 text-blue-500" />,
        error: <HiXMark className="w-12 h-12 text-red-500" />
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-gray-50 rounded-2xl">
                            {icons[type]}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-600 leading-relaxed">{message}</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        {onConfirm ? (
                            <>
                                <button 
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    {cancelText}
                                </button>
                                <button 
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className={`flex-1 px-6 py-3.5 rounded-xl font-bold text-white transition-all active:scale-95 shadow-lg shadow-blue-200 ${type === 'warning' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#0C8CE9] hover:bg-[#0A71BC]'}`}
                                >
                                    {confirmText}
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={onClose}
                                className="w-full px-6 py-3.5 rounded-xl font-bold text-white bg-[#0C8CE9] hover:bg-[#0A71BC] transition-all active:scale-95 shadow-lg shadow-blue-200"
                            >
                                {confirmText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
