import { Suspense } from "react";
import Learning from "./learning";

export default function Page() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#111827] text-white text-sm">Chargement...</div>}>
            <Learning />
        </Suspense>
    );
}
