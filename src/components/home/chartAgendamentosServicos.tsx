import { Agendamentos } from "@/types/agendamentos";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type Props = {
    agendamentos: Agendamentos[] | null;
};

export const ChartAgendamentosServicos = ({ agendamentos }: Props) => {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const chartData = meses.map((mes, index) => {
        // 🔹 Usando 'any' para resolver temporariamente
        const data: any = { month: mes };

        agendamentos?.forEach((agendamento) => {
            const mesAgendamento = new Date(agendamento.data).getMonth();

            if (mesAgendamento === index && agendamento.status === "Feito") {
                const servico = agendamento.servico.nome;

                if (!data[servico]) data[servico] = 0;
                data[servico]++;
            }
        });

        return data;
    });

    return (
        <div className="w-full flex justify-center flex-col items-center">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 mb-4">
                Agendamentos de Serviços por Mês
            </h2>
            <p className="text-center text-gray-600 mb-6">
                Este gráfico exibe a quantidade de serviços <strong>realizados</strong> ao longo dos meses, com base nos agendamentos marcados como <strong>"Feito"</strong>.
            </p>

            <ResponsiveContainer width="95%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 14 }} />
                    <YAxis label={{ value: "Serviços", angle: -90, position: "insideLeft" }} />
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

                    {agendamentos &&
                        Array.from(new Set(agendamentos.map((a) => a.servico.nome))).map((servico, i) => (
                            <Bar key={i} dataKey={servico} fill={["#2563eb", "#f97316", "#16a34a", "#db2777", "#9333ea"][i % 5]} stackId="a" radius={[4, 4, 0, 0]} />
                        ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
