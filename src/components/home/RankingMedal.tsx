// src/components/dashboard/RankingMedal.tsx

import { Medal } from "lucide-react";

type Props = {
  rank: number; // A posição no ranking (0 para 1º, 1 para 2º, etc.)
  total: number; // O total de barbeiros na lista
};

export const RankingMedal = ({ rank, total }: Props) => {
  // Só mostra medalhas se houver 3 ou mais barbeiros no ranking
  if (total < 3) {
    // Retorna um espaço vazio para manter o alinhamento
    return <div className="w-6 h-6" />;
  }
  
  switch (rank) {
    case 0: // 1º Lugar
      return <Medal className="h-6 w-6 text-amber-400" />;
    case 1: // 2º Lugar
      return <Medal className="h-6 w-6 text-slate-400" />;
    case 2: // 3º Lugar
      return <Medal className="h-6 w-6 text-orange-600" />;
    default:
      // Para os demais, retorna um espaço vazio para manter o alinhamento
      return <div className="w-6 h-6" />;
  }
};