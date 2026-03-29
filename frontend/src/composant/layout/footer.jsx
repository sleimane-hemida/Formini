
import { useTranslation } from "../common/useTranslation";

export default function Footer() {
	const { t } = useTranslation('fr'); // Remplace 'fr' par la langue souhaitée
	return (
		<footer className="w-full bg-[#0C8CE9] text-white py-12 px-4 sm:px-12 mt-auto">
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
				{/* Colonne 1 : Logo et contact */}
				<div>
					<div className="text-4xl font-semibold mb-4">{t('footer.brand')}</div>
					<div className="mb-2"><span className="font-bold">{t('footer.addressLabel')}</span> {t('footer.address')}</div>
					<div className="mb-2"><span className="font-bold">{t('footer.emailLabel')}</span> {t('footer.email')}</div>
					<div><span className="font-bold">{t('footer.phoneLabel')}</span> {t('footer.phone')}</div>
				</div>
				{/* Colonne 2 : Shopping and Categories */}
				<div>
					<div className="font-bold mb-4">{t('footer.categoriesTitle')}</div>
					<ul className="space-y-2">
						{t('footer.categories').map ? t('footer.categories').map((cat, i) => (
							<li key={i}><a href="#" className="hover:underline">{cat}</a></li>
						)) : null}
					</ul>
				</div>
				{/* Colonne 3 : Useful Links */}
				<div>
					<div className="font-bold mb-4">{t('footer.linksTitle')}</div>
					<ul className="space-y-2">
						{t('footer.links').map ? t('footer.links').map((link, i) => (
							<li key={i}><a href="#" className="hover:underline">{link}</a></li>
						)) : null}
					</ul>
				</div>
				{/* Colonne 4 : Help & Information */}
				<div>
					<div className="font-bold mb-4">{t('footer.helpTitle')}</div>
					<ul className="space-y-2">
						{t('footer.help').map ? t('footer.help').map((item, i) => (
							<li key={i}><a href="#" className="hover:underline">{item}</a></li>
						)) : null}
					</ul>
				</div>
			</div>
		</footer>
	);
}
