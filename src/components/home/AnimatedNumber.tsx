"use client"

import CountUp from 'react-countup';

type AnimatedNumberProps = {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  format?: 'currency' | 'integer';
};

export const AnimatedNumber = ({ 
    value, 
    className, 
    prefix = '', 
    suffix = '',
    format 
}: AnimatedNumberProps) => {

  // Define a quantidade de casas decimais com base no formato
  const decimals = format === 'currency' ? 2 : 0;
  
  // Função de formatação para o padrão monetário brasileiro
  const formattingFn = (n: number) => {
    if (format === 'currency') {
      return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return Math.round(n).toString();
  };

  return (
    <div className={className}>
      <CountUp
        end={value}
        duration={2.5} // Duração da animação em segundos
        separator="."
        decimal=","
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        formattingFn={format === 'currency' ? formattingFn : undefined}
      />
    </div>
  );
};