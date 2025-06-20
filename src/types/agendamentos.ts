export type Agendamentos = {
  id: string;
  usuarioId: string;
  barbeariaId: string;
  barbeiroId: string;
  servicoId: string;
  data: Date; // ou Date se preferir usar tipo Date
  hora: string;
  status: "Confirmado" | "Feito" | "Cancelado"; // enum de status possíveis
  usuario: {
    id: string;
    nome: string;
  };
  barbeiro: {
    id: string;
    nome: string;
  };
  servico: {
    id: string;
    nome: string;
    preco: string; // ou number se for converter
  };
};

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
