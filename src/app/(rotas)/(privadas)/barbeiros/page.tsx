import { MainBarbeiros } from "@/components/barbeiros/mainBarbeiros";
import { BarberContextProvider } from "@/contexts/BarberContext";

const Barbeiros = () => {
    return (
        <section className="sm:ml-14 p-4 min-h-screen">
            <BarberContextProvider>
                <MainBarbeiros />
            </BarberContextProvider>
        </section>
    );
}

export default Barbeiros;