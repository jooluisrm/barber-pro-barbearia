export type Products = {
    id: string;
    nome: string;
    descricao?: string | null;
    precoVenda: number; // MUDANÇA: de 'preco' para 'precoVenda'
    custo: number;
    quantidade: number;
    status: StatusProduto;
    tipo: string;
    imagemUrl?: string | null;
    alertaEstoqueBaixo?: number | null;
    dataValidade?: string | null; // A API retorna como string no JSON
}

export type StatusProduto = 'ATIVO' | 'ARQUIVADO';