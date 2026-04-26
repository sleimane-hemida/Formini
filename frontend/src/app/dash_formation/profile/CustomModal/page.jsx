"use client";
import CustomModal from "./CustomModal";

export default function ModalPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md text-center">
                <h1 className="text-xl font-bold mb-4">Aperçu du composant Modal</h1>
                <p className="text-gray-600 mb-6">Ce fichier sert d'export et permet de prévisualiser le design de la modale.</p>
                <CustomModal 
                    isOpen={true} 
                    onClose={() => {}} 
                    title="Design Preview" 
                    message="Ceci est un aperçu du design de votre composant de popup personnalisé." 
                    type="success"
                    confirmText="Super !"
                />
            </div>
        </div>
    );
}
