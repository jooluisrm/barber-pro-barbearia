import { ItemSubscription } from "./itemSubscription";

export const MainAssinatura = () => {
    return (
        <main>
            <div className="pb-6 pt-5 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Painel de <span className="text-blue-500">Assinaturas</span>
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Acompanhe, filtre e gerencie todas as assinaturas ativas e inativas da sua barbearia.
                </p>
            </div>

            <div>
                <ItemSubscription />
            </div>
        </main>
    );
}