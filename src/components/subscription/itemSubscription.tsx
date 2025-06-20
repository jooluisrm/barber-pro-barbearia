"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ButtonCheckout from "../stripe/button-chekout";
import { useAuth } from "@/contexts/AuthContext";
import BotaoGerenciarAssinatura from "../stripe/BotaoGerenciarAssinatura";

export const ItemSubscription = () => {

    const { barbearia } = useAuth();

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Plano Mensal 1</CardTitle>
                <CardDescription>
                    Ideal para barbearias que estão começando.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Imagem ilustrativa do plano */}
                <img
                    src="/favicon.png"
                    alt="Plano Mensal"
                    className="w-full h-fit object-cover rounded-md mb-4"
                />

                {/* Preço */}
                <div className="text-3xl font-bold mb-4">
                    <span className="text-blue-500">R$ 20,00</span>
                    <span className="text-sm font-normal text-muted-foreground">/mês</span>
                </div>

                {/* Benefícios */}
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Acesso total ao sistema.</li>
                </ul>
            </CardContent>
            <CardFooter>
                {
                    barbearia?.stripeCurrentPeriodEnd != null ? <BotaoGerenciarAssinatura />
                        : <ButtonCheckout />
                }
            </CardFooter>
        </Card>
    );
}
