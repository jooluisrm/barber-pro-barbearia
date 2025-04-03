import { AlertTriangle, Terminal } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export const AlertSelectDiaSemana = () => {
    return (
        <Alert className="border-primary bg-primary/10">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <AlertTitle className="font-medium text-primary">Selecione um dia de trabalho</AlertTitle>
            <AlertDescription className="mt-2 text-muted-foreground">
                <div className="space-y-2">
                    <p>Para configurar os horários de atendimento, primeiro escolha um dia da semana:</p>

                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><span className="font-medium">Dias úteis</span> (Segunda a Sexta) - Configure os horários comerciais</li>
                        <li><span className="font-medium">Fim de semana</span> (Sábado/Domingo) - Defina horários especiais ou fechado</li>
                    </ul>

                    <p className="pt-1 text-sm text-primary/80">
                        Você pode editar essas configurações a qualquer momento no painel.
                    </p>
                </div>
            </AlertDescription>
        </Alert>
    )
}
