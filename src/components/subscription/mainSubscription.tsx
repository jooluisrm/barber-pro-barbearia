import { HeaderPage } from "../reultilizar/headerPage";
import { ItemSubscription } from "./itemSubscription";

export const MainAssinatura = () => {
    return (
        <main>
            <HeaderPage
                subTitle="Acompanhe, filtre e gerencie todas as assinaturas ativas e inativas da sua barbearia."
                title="Assinaturas"
            />

            <div>
                <ItemSubscription />
            </div>
        </main>
    );
}