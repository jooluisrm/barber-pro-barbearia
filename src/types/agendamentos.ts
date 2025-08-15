export type Agendamentos = {
    id: string;
    data: string;
    hora: string;
    status: string;
    valorTotal: string | null;
    nomeCliente: string;
    telefoneVisitante: string | null;
    barbeiro: {
        id: string;
        nome: string;
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