// Exemplo de um componente React para o botão

import axiosInstance from '@/utils/axiosInstance';
import { useState } from 'react';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
 // Sua instância configurada do Axios

function BotaoGerenciarAssinatura() {
    const [loading, setLoading] = useState(false);

    const handlePortalClick = async () => {
        setLoading(true);
        try {
            // Chama a nova rota que criamos no backend
            const response = await axiosInstance.post('/api/create-portal-session');
            const { url } = response.data;

            // Redireciona o usuário para a página do Stripe
            window.location.href = url;
        } catch (error) {
            console.error("Erro ao abrir o portal de assinaturas", error);
            alert("Não foi possível abrir o portal de gerenciamento. Tente novamente.");
            setLoading(false);
        }
    };

    return (
        <Button  className='w-full' onClick={handlePortalClick} disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin'/> : 'Gerenciar Assinatura'}
        </Button>
    );
}

export default BotaoGerenciarAssinatura;