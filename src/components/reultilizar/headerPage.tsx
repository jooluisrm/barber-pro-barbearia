import { LiveClock } from "../home/liveClock";

type Props = {
    title?: string;
    subTitle: string;
    barberName?: string;
}

export const HeaderPage = ({ subTitle, title, barberName }: Props) => {

    // LÓGICA ATUALIZADA PARA FORMATAR A DATA EM PARTES
    const hoje = new Date();

    // Pega cada parte da data individualmente
    let diaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(hoje);
    const diaDoMes = hoje.getDate();
    const nomeDoMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(hoje);
    const ano = hoje.getFullYear();
    const horaAtual = hoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Capitaliza o dia da semana
    diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    return (
        <div className="pb-10 pt-5 flex flex-col-reverse md:flex-row md:justify-between md:items-center">
            <div>
                <>
                    {barberName && (
                        <h1 className="text-xl md:text-2xl">
                            Bem-vindo(a) ao <span className="font-bold">BarberPro</span>, <span className="font-bold text-blue-500 text-nowrap">{barberName}</span>!
                        </h1>
                    )}
                    {!barberName && (
                        <h1 className="text-2xl sm:text-3xl font-semibold">
                            Painel de <span className="text-blue-500">{title}</span>
                        </h1>
                    )}
                </>
                <p className="text-muted-foreground">{subTitle}</p>
            </div>

            {/* ✨ DATA ATUALIZADA E ESTILIZADA AQUI ✨ */}
            <div className="md:flex flex-col items-end">
                <span className="font-medium text-lg">
                    {diaSemana}, <span className="font-bold text-blue-500 dark:text-blue-400">{diaDoMes} de {nomeDoMes}</span> de {ano}
                </span>
                <span className="text-sm font-bold text-blue-500 dark:text-blue-400">
                    <LiveClock />
                </span>
            </div>
        </div>
    );
}