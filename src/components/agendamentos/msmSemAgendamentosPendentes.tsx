import { Card, CardContent } from "@/components/ui/card";

export const MensagemSemAgendamentosPendentes = () => {
    return (
        <Card className="w-full text-center py-8 bg-muted/50">
            <CardContent className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">
                    Nenhum agendamento pendente!
                </h2>
                <p className="text-sm text-muted-foreground">
                    Parabéns! Todos os agendamentos já foram concluídos ou atualizados. 🎉
                </p>
            </CardContent>
        </Card>
    );
};
