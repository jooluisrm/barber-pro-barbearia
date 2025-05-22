import { MainAgendamentos } from "@/components/agendamentos/mainAgendamentos";
import { ScheduleContextProvider } from "@/contexts/scheduleContext";

const Agendamentos = () => {
    return (
        <section className="sm:ml-14 p-4 min-h-screen">
            <ScheduleContextProvider>
                <MainAgendamentos />
            </ScheduleContextProvider>
        </section>
    );
}

export default Agendamentos;