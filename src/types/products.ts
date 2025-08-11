export type Products = {
    id: string;
    nome: string;
    descricao?: string;
    preco: number;
    tipo: string;
    imagemUrl?: string | null;
    estoque?: boolean;
}