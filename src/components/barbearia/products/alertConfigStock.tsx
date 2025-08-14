import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export const AlertConfigStock = () => {
    return (
        <Alert variant="default">
            <Terminal />
            <AlertTitle>Como funciona?</AlertTitle>
            <AlertDescription>
                Ao ajustar o estoque, cada alteração será registrada em um histórico de movimentações.
                Isso garante que você tenha dados e métricas precisas sobre o desempenho e necessidades do seu negócio,
                ajudando na tomada de decisões e no controle de perdas ou entradas.
            </AlertDescription>
        </Alert>
    );
}
