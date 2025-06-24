// components/BotaoCheckout.tsx

"use client"
import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

let stripePromise: Promise<Stripe | null>;
if (publishableKey) {
    stripePromise = loadStripe(publishableKey);
}

export default function ButtonCheckout() {
    const [loading, setLoading] = useState(false);
    // 1. Pegamos também o TOKEN do nosso contexto de autenticação
    const { usuario, token } = useAuth(); // Usando 'usuario' para ser mais consistente

    const handleCheckout = async () => {
        if (!publishableKey) {
            alert("A chave publicável do Stripe não foi configurada corretamente.");
            return;
        }

        // Verificação extra para garantir que o token existe antes de continuar
        if (!token) {
            alert("Você precisa estar logado para iniciar uma assinatura.");
            return;
        }

        setLoading(true);

        try {
            // 2. Chamar nosso backend, agora com o cabeçalho de autorização
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // A LINHA MAIS IMPORTANTE: Enviando o token
                    'Authorization': `Bearer ${token}`, 
                },
                // 3. NÃO PRECISAMOS MAIS DO BODY! O backend pega o ID do token.
            });

            if (!response.ok) {
                const body = await response.json();
                // Usamos a mensagem do backend, que agora pode ser "Acesso proibido", etc.
                throw new Error(body.error || 'Falha ao criar a sessão de checkout');
            }

            const session = await response.json();
            const stripe = await stripePromise;

            if (!stripe) {
                throw new Error("Não foi possível inicializar o Stripe.");
            }

            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (error) {
                throw new Error(error.message);
            }
        } catch (err) {
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
            {/* Verificamos o 'usuario' em vez de 'barbearia' para ser mais correto */}
            {usuario ? (
                <Button className='w-full' onClick={handleCheckout} disabled={loading || !publishableKey} >
                    {loading ? <LoaderCircle className='animate-spin'/> : 'Assinar Agora'}
                </Button>
            ) : (
                <Button className='w-full' onClick={handleRedirect}>
                    Fazer login
                </Button>
            )}
        </>
    );
}