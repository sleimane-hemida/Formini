"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../common/useTranslation";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t } = useTranslation('fr'); // Remplace 'fr' par la langue souhaitée

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`w-full bg-white border-b border-gray-200 px-4 sm:px-6 transition-all duration-300 flex items-center justify-between z-50 top-0 left-0 ${scrolled ? 'py-1 shadow-md' : 'py-4 sm:py-6'} fixed`}> 
            {/* Logo */}
            <div className={`font-serif font-bold text-black mr-4 sm:mr-8 transition-all duration-300 ${scrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>Formini</div>

            {/* Burger menu for mobile */}
            <button
                className="sm:hidden flex items-center px-2 py-1 text-gray-700 focus:outline-none"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Ouvrir le menu"
            >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Menu (desktop/tablette) */}
            <nav className="hidden sm:flex items-center gap-4 md:gap-6 text-base text-black font-normal">
                <div className="relative group">
                    <a href="#" className="flex items-center gap-1 focus:outline-none hover:text-[#0C8CE9] transition-colors">{t('header.catalog')}</a>
                </div>
                <a href="#" className="hover:text-[#0C8CE9] transition-colors">{t('header.trainers')}</a>
                <a href="#" className="hover:text-[#0C8CE9] transition-colors">{t('header.subscription')}</a>
                <a href="#" className="hover:text-[#0C8CE9] transition-colors">{t('header.about')}</a>
            </nav>

            {/* Search bar (hidden on mobile) */}
            <div className="hidden sm:flex flex-1 justify-center px-4 md:px-8">
                <div className="relative w-full max-w-md">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </span>
                    <input
                        type="text"
                        placeholder={t('header.searchPlaceholder')}
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-200 text-sm placeholder-gray-400 outline-none text-black"
                    />
                </div>
            </div>

            {/* Button + Connecter (hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-3">
                <a href="#" className="text-black hover:text-[#0C8CE9] font-medium px-4 py-2 rounded transition-colors">{t('header.connect')}</a>
                <button className="bg-[#0C8CE9] hover:bg-[#0A71BC] text-white font-medium px-5 py-2 rounded-md flex items-center gap-2">
                    {t('header.becomeTrainer')}
                </button>
            </div>

            {/* Mobile menu (slide down) */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 z-50 flex flex-col items-start p-4 gap-3 sm:hidden animate-fade-in-down">
                    <a href="#" className="w-full py-2 px-2 rounded hover:bg-[#E6F1FA] hover:text-[#0C8CE9] transition-colors">{t('header.catalog')}</a>
                    <a href="#" className="w-full py-2 px-2 rounded hover:bg-[#E6F1FA] hover:text-[#0C8CE9] transition-colors">{t('header.trainers')}</a>
                    <a href="#" className="w-full py-2 px-2 rounded hover:bg-[#E6F1FA] hover:text-[#0C8CE9] transition-colors">{t('header.subscription')}</a>
                    <a href="#" className="w-full py-2 px-2 rounded hover:bg-[#E6F1FA] hover:text-[#0C8CE9] transition-colors">{t('header.about')}</a>
                    <a href="#" className="w-full py-2 px-2 rounded hover:bg-[#E6F1FA] hover:text-[#0C8CE9] transition-colors text-center">{t('header.connect')}</a>
                    <button className="w-full mt-2 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white font-medium px-5 py-2 rounded-md flex items-center gap-2 justify-center">
                        {t('header.becomeTrainer')}
                    </button>
                </div>
            )}
        </header>
    );
}