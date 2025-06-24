export type Barbeiro = {
    id: string;
    barbeariaId: string;
    nome: string;
    telefone: string;
    fotoPerfil: string | null;
    usuarioSistemaId: string;
    // O objeto aninhado que agora contém o email
    usuarioSistema: {
        email: string;
    };
};

export type HorariosDeTrabalho = {
    id: string;
    barbeiroId: string;
    diaSemana: number;
    hora: string;
}

export type HorariosDisponiveis = {
    id: string;
    hora: string;
}