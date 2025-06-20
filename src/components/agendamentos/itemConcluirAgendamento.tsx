import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge"; // certifique-se de ter esse componente

export const ItemConcluirAgendamento = () => {
    // Exemplo de dados estáticos — substitua por props ou contexto
    const cliente = "João Silva";
    const barbeiro = "Carlos Mendes";
    const data = "20/06/2025";
    const hora = "14:30";
    const preco = "R$ 75,00";
    const status = "Pendente"; // ou Confirmado, Feito, Cancelado

    return (
        <Card className="flex items-center justify-between w-full shadow-sm border border-muted bg-background px-4 py-2">
            <div>
                <CardHeader className="pb-1">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-sm sm:text-base text-foreground">
                            {cliente}
                        </CardTitle>
                        <div className="text-xs capitalize">{status}</div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {data} • {hora}
                    </p>
                </CardHeader>

                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start text-sm text-muted-foreground pt-1">
                    <div className="space-y-1">
                        <p><span className="font-medium text-foreground">Barbeiro:</span> {barbeiro}</p>
                        <p><span className="font-medium text-foreground">Valor:</span> {preco}</p>
                    </div>
                </CardContent>
            </div>

            <div className="flex flex-col-reverse gap-2 ml-4">
                <Button variant="outline" size="sm">
                    Cancelar
                </Button>
                <Button size="sm">
                    Concluir
                </Button>
            </div>
        </Card>
    );
};
