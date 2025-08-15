export type Agendamentos = {
    id: string;
    data: string;
    hora: string;
    status: string;
    valorTotal: string | null; // Vem como Decimal do Prisma
    nomeCliente: string;
    telefoneVisitante: string | null;
    barbeiro: {
        id: string;
        nome: string;
    };
    servicosRealizados: {
        servico: {
            nome: string;
            preco: string | null;
        }
    }[];
    produtosConsumidos: {
        quantidade: number;
        produto: {
            nome: string;
            precoVenda: string | null;
        }
    }[];
}

export type AgendamentoPendente = {
  idAgendamento: string;
  status: string;
  data: string;         // formato: "YYYY-MM-DD"
  hora: string;         // formato: "HH:MM"
  valor: string;        // pode ser alterado para number se for numérico
  nomeCliente: string;
  nomeBarbeiro: string;
  nomeServico: string;
};
