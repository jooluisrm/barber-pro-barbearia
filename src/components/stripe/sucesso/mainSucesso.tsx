import { RightSection } from "./rightSection";

export const MainSucesso = () => {
    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 justify-center">
            <RightSection />
            <img src="./successful.svg" alt="" className="flex-1"/>
        </main>
    );
}