import { 
    FaPaintBrush, FaCode, FaChartBar, FaCamera, FaMusic, FaGraduationCap, 
    FaBookOpen, FaBullhorn, FaHeartbeat, FaUserGraduate, FaBalanceScale, 
    FaTools, FaLanguage, FaChartLine, FaVideo, FaRocket 
} from "react-icons/fa";

export const getIconForCategory = (name, size = 16) => {
    const n = (name || "").toLowerCase();
    const props = { size, className: "text-[#B1B5C3]" };

    if (n.includes("éducation") || n.includes("soutien")) return <FaBookOpen {...props} />;
    if (n.includes("marketing") || n.includes("communication")) return <FaBullhorn {...props} />;
    if (n.includes("santé") || n.includes("bien-être")) return <FaHeartbeat {...props} />;
    if (n.includes("développement personnel")) return <FaUserGraduate {...props} />;
    if (n.includes("droit") || n.includes("juridique")) return <FaBalanceScale {...props} />;
    if (n.includes("métiers pratiques")) return <FaTools {...props} />;
    if (n.includes("langue")) return <FaLanguage {...props} />;
    if (n.includes("finance") || n.includes("investissement")) return <FaChartLine {...props} />;
    if (n.includes("médias") || n.includes("contenu")) return <FaVideo {...props} />;
    if (n.includes("design") || n.includes("créativité")) return <FaPaintBrush {...props} />;
    if (n.includes("développement") || n.includes("tech")) return <FaCode {...props} />;
    if (n.includes("entreprise") || n.includes("startup")) return <FaRocket {...props} />;
    
    return <FaGraduationCap {...props} />;
};
