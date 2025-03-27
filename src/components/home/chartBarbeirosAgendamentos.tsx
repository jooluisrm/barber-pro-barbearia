import { Agendamentos } from "@/types/agendamentos";
import { Barbeiro } from "@/types/barbeiros";
import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";



type Props = {
    barbeiros: Barbeiro[] | null;
    agendamentos: Agendamentos[] | null;
};

export function ChartBarbeirosAgendamentos({ barbeiros, agendamentos }: Props) {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        if (!barbeiros || !agendamentos) return;

        // 🔹 Criando estrutura base tipada corretamente
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const dadosBase: Record<string, any>[] = meses.map((mes) => ({ month: mes }));

        // 🔹 Criamos um mapa para contar os agendamentos por barbeiro e mês
        agendamentos.forEach((agendamento) => {
            const data = new Date(agendamento.data);
            const mesIndex = data.getMonth();
            const barbeiro = barbeiros.find((b) => b.id === agendamento.barbeiroId);

            if (barbeiro) {
                const nomeBarbeiro = barbeiro.nome;
                if (!dadosBase[mesIndex][nomeBarbeiro]) {
                    dadosBase[mesIndex][nomeBarbeiro] = 0;
                }
                dadosBase[mesIndex][nomeBarbeiro] += 1;
            }
        });

        setChartData(dadosBase);
    }, [barbeiros, agendamentos]);

    return (
        <div className="w-full flex justify-center flex-col items-center">
            <h2 className="text-2xl text-center font-semibold dark:text-white text-gray-800 mb-4">
                Desempenho Mensal dos Barbeiros
            </h2>
            <p className="text-center text-gray-600 mb-6">
                Este gráfico exibe o número de <strong>agendamentos feitos</strong> por cada barbeiro ao longo dos meses.
            </p>

            <ResponsiveContainer width="95%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 14 }} />
                    <YAxis label={{ value: "Agendamentos", angle: -90, position: "insideLeft" }} />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1e293b",
                            color: "#f8fafc",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "bold",
                        }}
                    />
                    <Legend />

                    {/* 🔹 Geramos dinamicamente as barras para cada barbeiro */}
                    {barbeiros &&
                        barbeiros.map((barbeiro, index) => (
                            <Bar key={barbeiro.id} dataKey={barbeiro.nome} fill={getBarColor(index)} radius={[4, 4, 0, 0]} />
                        ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

// 🔹 Função para gerar cores diferentes para cada barbeiro
const getBarColor = (index: number) => {
    const colors = ["#2563eb", "#f97316", "#16a34a", "#db2777", "#9333ea", "#eab308", "#14b8a6"];
    return colors[index % colors.length]; // Alterna entre as cores
};
