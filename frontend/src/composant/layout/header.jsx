"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "../common/useTranslation";
import { ROUTES } from "../../utils/routes";
import { HiUser, HiBell } from "react-icons/hi2";
import NotificationPopup from "../../app/notification/notification";
import ProfileDropdown from "./ProfileDropdown";

export default function Header({ onSearchChange, searchValue: externalSearchValue }) {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBurger, setShowBurger] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);
    const [searchValue, setSearchValue] = useState(externalSearchValue || "");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const { t } = useTranslation('fr'); // Remplace 'fr' par la langue souhaitée

    // Synchroniser avec la valeur externe
    useEffect(() => {
        if (externalSearchValue !== undefined) {
            setSearchValue(externalSearchValue);
        }
    }, [externalSearchValue]);

    // Vérifier l'état de connexion
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            if (token && userData) {
                setIsLoggedIn(true);
                setUser(JSON.parse(userData));
            }
        }
    }, []);

    // Debug: log mounting to help detect client-side rendering issues
    useEffect(() => {
        try {
            console.log('Debug: Header mounted', { isLoggedIn, user });
        } catch (err) {
            console.error('Header debug error:', err);
        }
    }, [isLoggedIn, user]);

    // Gérer les clics en dehors du popup de notifications
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotificationOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        }

        if (notificationOpen || profileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [notificationOpen, profileOpen]);

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        router.push('/');
    };

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
                <button 
                    onClick={() => router.push('/')}
                    className={`font-serif font-bold text-black mr-2 sm:mr-8 transition-all duration-700 ease-in-out hover:text-[#0C8CE9] cursor-pointer ${scrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}
                >
                    Formini
                </button>
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
                <button 
                    onClick={() => router.push('/allFormateur/formateurListe')}
                    className="hover:text-[#0C8CE9] transition-colors hidden md:block"
                >
                    {t('header.trainers')}
                </button>
                {/* ABONNEMENT: visible >= lg */}
                <button 
                    onClick={() => router.push('/abonnement')}
                    className="hover:text-[#0C8CE9] transition-colors hidden lg:block"
                >
                    {t('header.subscription')}
                </button>
                {/* A PROPOS: visible >= xl */}
                <Link href="/about" className="hover:text-[#0C8CE9] transition-colors hidden xl:block">
                    {t('header.about')}
                </Link>
            </nav>


            {/* Boutons à droite + burger menu */}
            <div className="flex items-center gap-3 ml-2">
                {/* Boutons visibles uniquement si la largeur >= 640px (sm) */}
                {screenWidth >= 640 && (
                    <>
                        {!isLoggedIn ? (
                            // Boutons pour utilisateur non connecté
                            <>
                                <button 
                                    className="text-black hover:text-[#0C8CE9] font-medium px-4 py-2 rounded transition-colors"
                                    onClick={() => router.push('/connexion/login')}
                                >
                                    {t('header.connect')}
                                </button>
                                <button 
                                    className="bg-[#0C8CE9] hover:bg-[#0A71BC] text-white font-medium px-5 py-2 rounded-md flex items-center gap-2"
                                    onClick={() => router.push('/connexion/signup')}
                                >
                                    {t('header.becomeTrainer')}
                                </button>
                            </>
                        ) : (
                            // Menu pour utilisateur connecté
                            <div className="flex items-center gap-3">
                                <div className="relative" ref={profileRef}>
                                    <button 
                                        onClick={() => setProfileOpen(!profileOpen)}
                                        className="font-medium p-0 rounded-full transition-colors overflow-hidden border-2 border-transparent hover:border-[#0C8CE9] focus:outline-none flex items-center justify-center"
                                        title="Profil utilisateur"
                                    >
                                        {user?.avatar ? (
                                            <img 
                                                src={user.avatar.startsWith('http') ? user.avatar : `${process.env.NEXT_PUBLIC_API_URL}${user.avatar.startsWith('/') ? '' : '/'}${user.avatar.replace(/\\/g, '/')}`} 
                                                alt="Profil" 
                                                className="w-9 h-9 object-cover rounded-full" 
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-[#0C8CE9] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                                {user?.name?.charAt(0)?.toUpperCase() || user?.firstName?.charAt(0)?.toUpperCase() || <HiUser className="w-5 h-5" />}
                                            </div>
                                        )}
                                    </button>
                                    <ProfileDropdown 
                                        isOpen={profileOpen}
                                        onClose={() => setProfileOpen(false)}
                                        user={user}
                                        onLogout={handleLogout}
                                    />
                                </div>
                                <div className="relative" ref={notificationRef}>
                                    <button 
                                        onClick={() => setNotificationOpen(!notificationOpen)}
                                        className="bg-[#0C8CE9] hover:bg-[#0A71BC] text-white font-medium p-2 rounded-md transition-colors"
                                        title="Notifications"
                                    >
                                        <HiBell className="w-6 h-6" />
                                    </button>
                                    <NotificationPopup 
                                        isOpen={notificationOpen}
                                        onClose={() => setNotificationOpen(false)}
                                    />
                                </div>
                            </div>
                        )}
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
                        <Link href="/about" className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9]">
                            {t('header.about')}
                        </Link>
                    )}
                    {screenWidth < 1024 && (
                        <button 
                            onClick={() => router.push('/abonnement')}
                            className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9] text-left"
                        >
                            {t('header.subscription')}
                        </button>
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
                        <button 
                            onClick={() => router.push('/allFormateur/formateurListe')}
                            className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9] text-left"
                        >
                            {t('header.trainers')}
                        </button>
                    )}
                    {/* Boutons affichés seulement s'ils sont cachés dans le header */}
                    {screenWidth < 640 && (
                        <>
                            {!isLoggedIn ? (
                                <>
                                    <button 
                                        className="w-full py-2 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] focus:text-[#0C8CE9] active:text-[#0C8CE9] text-center"
                                        onClick={() => router.push('/connexion/login')}
                                    >
                                        {t('header.connect')}
                                    </button>
                                    <button 
                                        className="w-full mt-2 bg-[#0C8CE9] hover:bg-[#0A71BC] text-white font-medium px-5 py-2 rounded-md flex items-center gap-2 justify-center"
                                        onClick={() => router.push('/connexion/signup')}
                                    >
                                        {t('header.becomeTrainer')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        className="w-full py-3 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] flex items-center gap-2"
                                        onClick={() => router.push(ROUTES.PROFILE)}
                                    >
                                        <HiUser className="w-5 h-5" />
                                        <span>Mon profil</span>
                                    </button>
                                    <button 
                                        className="w-full py-3 px-2 rounded text-black transition-colors hover:bg-[#E6F1FA] hover:text-[#0C8CE9] flex items-center gap-2"
                                        onClick={() => {
                                            const target = user?.role === 'formateur' ? ROUTES.TRAINER_FORMATIONS_LIST : ROUTES.MES_FORMATIONS_GENERAL;
                                            router.push(target);
                                            setMenuOpen(false);
                                        }}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                        </svg>
                                        <span>Mes formations</span>
                                    </button>
                                    <button 
                                        className="w-full py-3 px-2 rounded text-[#0C8CE9] transition-colors hover:bg-[#E6F1FA] hover:text-[#0A71BC] flex items-center gap-2"
                                        onClick={() => {
                                            setNotificationOpen(!notificationOpen);
                                            setMenuOpen(false); // Fermer le menu mobile
                                        }}
                                    >
                                        <HiBell className="w-5 h-5" />
                                        <span>Notifications</span>
                                    </button>
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <button 
                                        className="w-full py-3 px-2 rounded text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
                                        onClick={() => {
                                            handleLogout();
                                            setMenuOpen(false);
                                        }}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                                        </svg>
                                        <span>Se déconnecter</span>
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>
            )}
        </header>
    );
}
