import { TableBarbeiros } from "./tableBarbeiros";

export const MainBarbeiros = () => {
    return (
        <main>
            <div className="pb-6 pt-5 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Painel de <span className="text-blue-500">Barbeiros</span>
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Visualize, crie e gerencie todos os barbeiros da sua barbearia.
                </p>
            </div>

            <div className="space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-4">

                    </div>
                </div>

                <div>
                    <TableBarbeiros />
                </div>
            </div>
        </main>
    );
}