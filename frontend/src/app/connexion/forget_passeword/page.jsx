import PasswordForget from "./password_forget";

export const metadata = {
    title: "Mot de passe oublié - Vérification",
    description: "Vérifiez votre identité pour réinitialiser votre mot de passe.",
};

export default function Page() {
    return <PasswordForget />;
}
