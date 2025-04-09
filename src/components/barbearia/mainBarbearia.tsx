import { CardWithForm } from "./cardOpenTime";

export const MainBarbearia = () => {
    return (
        <main>
            <div className="pb-6 pt-5 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Painel da <span className="text-blue-500">Barbearia</span>
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Visualize, crie e gerencie todos os barbeiros da sua barbearia.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <CardWithForm />
                <CardWithForm />
            </div>
        </main>
    );
}