import { Terminal } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export const AlertSelectBarber = () => {
    return (
        <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Selecione um Barbeiro para Continuar</AlertTitle>
            <AlertDescription>
                Os horários serão carregados com base no barbeiro selecionado!
            </AlertDescription>
        </Alert>
    )
}
