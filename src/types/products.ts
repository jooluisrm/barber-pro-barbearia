export type Products = {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    tipo: string;
    imagemUr?: string | null;
    estoque?: boolean;
}