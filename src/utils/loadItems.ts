// ATUALIZADO: A função agora espera o objeto de resposta completo
export const loadItems = async (barbearia: any, reqGet: any, setList: any) => {
    if (!barbearia) return;
    try {
        const dados = await reqGet(barbearia.id);
        // 'dados' é o objeto { produtos: [...], total: ... }
        setList(dados); 
    } catch (error) {
        console.error("Falha ao carregar itens:", error);
        // Limpa a lista em caso de erro
        setList(null); 
    }
}