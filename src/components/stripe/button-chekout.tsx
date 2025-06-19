// components/BotaoCheckout.tsx  (renomeado para .tsx para indicar TypeScript)
"use client"
import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

// A chave pode ser undefined no início, então precisamos verificar
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Inicializamos a promise apenas se a chave existir
let stripePromise: Promise<Stripe | null>;
if (publishableKey) {
    stripePromise = loadStripe(publishableKey);
}

export default function ButtonCheckout() {
    const [loading, setLoading] = useState(false);
    const { barbearia } = useAuth();

    const handleCheckout = async () => {
        // Verificação adicional para garantir que a chave foi carregada
        if (!publishableKey) {
            alert("A chave publicável do Stripe não foi configurada corretamente.");
            return;
        }

        setLoading(true);

        try {
            const barbeariaIdParaTeste = barbearia?.id;
            // 1. Chamar nosso backend para criar a sessão de checkout
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/create-checkout-session', { // Ajustei a porta de volta para 4242 do nosso exemplo
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ barbeariaId: barbeariaIdParaTeste }),
            });

            if (!response.ok) {
                const body = await response.json();
                throw new Error(body.error.message || 'Falha ao criar a sessão de checkout');
            }

            const session = await response.json();

            // 2. Redirecionar para o checkout
            const stripe = await stripePromise;

            // ✅ A SOLUÇÃO: Verificamos se o Stripe não é nulo antes de usá-lo
            if (!stripe) {
                throw new Error("Não foi possível inicializar o Stripe.");
            }

            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (error) {
                // Erros relacionados ao redirecionamento (ex: rede, config do Stripe)
                throw new Error(error.message);
            }
        } catch (err) {
            // Usamos 'unknown' e verificamos se é um objeto de Error para acessar .message com segurança
            let errorMessage = "Ocorreu um erro inesperado.";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const router = useRouter();
    const handleRedirect = () => {
        router.push('/login');
    }

    return (
        <>
            {barbearia ? (
                <Button className='w-full' onClick={handleCheckout} disabled={loading || !publishableKey} >
                    {loading ? <LoaderCircle className='animate-spin'/> : 'Assinar Agora'}
                </Button>
            ) :
                (
                    <Button className='w-full' onClick={handleRedirect}>
                        Fazer login
                    </Button>
                )
            }
        </>
    );
}