export type Barbeiro = {
    id: string;
    barbeariaId: string;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    fotoPerfil: string | null; // Pode ser string (URL) ou null
};

export type HorariosDeTrabalho = {
    id: string;
    barbeiroId: string;
    diaSemana: number;
    hora: string;
}