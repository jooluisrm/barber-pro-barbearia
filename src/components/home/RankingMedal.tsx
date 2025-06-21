// src/components/dashboard/RankingMedal.tsx

import { Medal } from "lucide-react";

type Props = {
  rank: number; // A posição no ranking (0 para 1º, 1 para 2º, etc.)
  // A prop 'total' não é mais necessária para a lógica, mas pode ser mantida se quiser
};

export const RankingMedal = ({ rank }: Props) => {
  // ✨ A CONDIÇÃO "if (total < 3)" FOI REMOVIDA DAQUI ✨
  // Agora a lógica do switch é executada sempre.
  
  switch (rank) {
    case 0: // 1º Lugar
      return <Medal className="h-6 w-6 text-amber-400" />;
    case 1: // 2º Lugar
      return <Medal className="h-6 w-6 text-slate-400" />;
    case 2: // 3º Lugar
      return <Medal className="h-6 w-6 text-orange-600" />;
    default:
      // Para os demais (4º lugar em diante), retorna um espaço vazio.
      return <div className="w-6 h-6" />;
  }
};