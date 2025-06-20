import { RightSection } from "./rightSection";

export const MainCancelado = () => {
    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 justify-center">
            <RightSection />
            <img src="./cancel.svg" alt="svg cancel" className="flex-1" />
        </main>
    );
}