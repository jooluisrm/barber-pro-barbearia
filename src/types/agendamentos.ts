export type Agendamentos = {
    id: string;
    data: string;
    hora: string;
    status: string;
    valorTotal: string | null;
    
    // CAMPOS DE CLIENTE UNIFICADOS
    nomeCliente: string | null;
    emailCliente: string | null;
    telefoneCliente: string | null;
    fotoPerfilCliente: string | null;

    barbeiro: {
        id: string;
        nome: string;
        fotoPerfil: string | null;
    };
    servicosRealizados: {
        id: string;                 // ADICIONADO
        precoNoMomento: string;     // ADICIONADO
        servico: {
            id: string;             // ADICIONADO
            nome: string;
            preco: string | null;
        }
    }[];
    produtosConsumidos: {
        id: string;                 // ADICIONADO
        quantidade: number;
        precoVendaNoMomento: string; // ADICIONADO
        produto: {
            id: string;             // ADICIONADO
            nome: string;
            precoVenda: string | null;
        }
    }[];
}

// Você pode manter ou remover este tipo, já que 'Agendamentos' agora serve para ambos os casos
export type AgendamentoPendente = Agendamentos;