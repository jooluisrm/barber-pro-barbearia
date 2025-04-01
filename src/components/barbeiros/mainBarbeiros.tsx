import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
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
                
                <div className="flex justify-start gap-4">

                    <Button><UserPlus/></Button>
                </div>

                <div>
                    <TableBarbeiros />
                </div>
            </div>
        </main>
    );
}