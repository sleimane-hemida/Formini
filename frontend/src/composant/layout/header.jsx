"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../common/useTranslation";
import { ROUTES } from "../../utils/routes";

export default function Header({ onSearchChange, searchValue: externalSearchValue }) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBurger, setShowBurger] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);
    const [searchValue, setSearchValue] = useState(externalSearchValue || "");
    const { t } = useTranslation('fr'); // Remplace 'fr' par la langue souhaitée

    // Synchroniser avec la valeur externe
    useEffect(() => {
        if (externalSearchValue !== undefined) {
            setSearchValue(externalSearchValue);
        }
    }, [externalSearchValue]);

    // Gérer les changements de recherche
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearchChange) {
            onSearchChange(value);
        }
    };

    useEffect(() => {
        // Initialiser la largeur d'écran côté client uniquement
        if (typeof window !== 'undefined') {
            setScreenWidth(window.innerWidth);
        }
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        const handleResize = () => {
            const w = window.innerWidth;
            setScreenWidth(w);
            // about: visible >= 1280px, subscription: >= 1024px, catalogue: >= 840px, trainers: >= 768px
            // Si au moins un est caché, on affiche le burger
            let isHidden = false;
            if (w < 1280) isHidden = true; // about caché
            if (w < 1024) isHidden = true; // subscription caché
            if (w < 840) isHidden = true; // catalogue caché
            if (w < 768) isHidden = true; // trainers caché
            setShowBurger(isHidden);
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        // Appel initial
        handleResize();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={`w-full bg-white border-b border-gray-200 px-4 sm:px-6 transition-all duration-700 ease-in-out flex items-center z-50 top-0 left-0 ${scrolled ? 'py-1 shadow-md' : 'py-4 sm:py-6'} fixed`}> 
            {/* Logo + Search bar (toujours visibles) */}
            <div className="flex items-center flex-1 min-w-0 gap-2 sm:gap-6 mr-8 md:mr-12 lg:mr-16">
                <div className={`font-serif font-bold text-black mr-2 sm:mr-8 transition-all duration-700 ease-in-out ${scrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>Formini</div>
                <div className="flex-1 min-w-0">
                    <div className="relative w-full max-w-xs sm:max-w-md">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </span>
                        <input
                            type="text"
                            placeholder={t('header.searchPlaceholder')}
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-200 text-sm placeholder-gray-400 outline-none text-black"
                        />
                    </div>
                </div>
            </div>

            {/* Menu (desktop/tablette) */}
            <nav className="hidden sm:flex items-center gap-4 md:gap-6 text-base text-black font-normal">
                {/* CATALOGUE: visible >= md */}
                <div className="relative group hidden md:block">
                    <button 
                        onClick={() => router.push(ROUTES.BROWSE_COURSES)}
                        className="flex items-center gap-1 focus:outline-none hover:text-[#0C8CE9] transition-colors max-[840px]:hidden"
                    >
                        {t('header.catalog')}
                    </button>
                </div>
                {/* FORMATEURS: visible >= md */}
                <a href="#" className="hover:text-[#0C8CE9] transition-colors hidden md:block">{t('header.trainers')}</a>
                {/* ABONNEMENT: visible >= lg */}
                <a href="#" className="hover:text-[#0C8CE9] transition-colors hidden lg:block">{t('header.subscription')}</a>
                {/* A PROPOS: visible >= xl */}
                <a href="#" className="hover:text-[#0C8CE9] transition-colors hidden xl:block">{t('header.about')}</a>
            </nav>


            {/* Boutons à droite + burger menu */}
            <div className="flex items-center gap-3 ml-2">
                {/* Boutons visibles uniquement si la largeur >= 640px (sm) */}
                {screenWidth >= 640 && (
                    <>
                        <a href="#" className="text-black hover:text-[#0C8CE9] font-medium px-4 py-2 rounded transition-colors">{t('header.connect')}</a>
                        <button 
                            className="bg-[#0C8CE9] hover:bg-[#0A71BC] text-white font-medium px-5 py-2 rounded-md flex items-center gap-2"
                            onClick={() => router.push(ROUTES.SIGNUP)}
                        >
                            {t('header.becomeTrainer')}
                        </button>
                    </>
                )}
                {showBurger && (
                    <button
                        className="flex items-center px-2 py-1 text-gray-700 focus:outline-none ml-2"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Ouvrir le menu"
                        type="button"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}
            </div>


            {/* Mobile menu (slide down) */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 z-50 flex flex-col items-start p-4 gap-3 animate-fade-in-down">
                    {/* Afficher seulement les éléments cachés */}
                    {screenWidth < 1280 && (
                        <a href="#" className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9]">{t('header.about')}</a>
                    )}
                    {screenWidth < 1024 && (
                        <a href="#" className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9]">{t('header.subscription')}</a>
                    )}
                    {screenWidth < 840 && (
                        <button 
                            onClick={() => router.push(ROUTES.BROWSE_COURSES)}
                            className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9] text-left"
                        >
                            {t('header.catalog')}
                        </button>
                    )}
                    {screenWidth < 768 && (
                        <a href="#" className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9]">{t('header.trainers')}</a>
                    )}
                    {/* Boutons affichés seulement s'ils sont cachés dans le header */}
                    {screenWidth < 640 && (
                        <>
                            <a href="#" className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9] text-center">{t('header.connect')}</a>
                            <button 
                                className="w-full mt-2 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white font-medium px-5 py-2 rounded-md flex items-center gap-2 justify-center"
                                onClick={() => router.push(ROUTES.SIGNUP)}
                            >
                                {t('header.becomeTrainer')}
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}