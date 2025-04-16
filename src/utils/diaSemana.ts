export function getNomeDiaSemana(dia: number): string {
  const diasSemana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  return diasSemana[dia] ?? 'Dia inválido';
}
