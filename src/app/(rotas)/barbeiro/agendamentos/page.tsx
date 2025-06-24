import { MainAgendamentos } from "@/components/Barbeiro-Pages/agendamentos/mainAgendamentos";
import { ScheduleContextProvider } from "@/contexts/Barbeiro-Pages/scheduleContext";

const Page = () => {
    return (
        <section className="sm:ml-14 p-4 min-h-screen">
            <ScheduleContextProvider>
                <MainAgendamentos />
            </ScheduleContextProvider>
        </section>
    );
}

export default Page;