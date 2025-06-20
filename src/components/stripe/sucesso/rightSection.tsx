import { Button } from "@/components/ui/button";
import Link from "next/link";

export const RightSection = () => {
    return (
        <aside className="text-center flex flex-col justify-center items-center gap-5">
            <img src="./barbershop.svg" alt="svg confirme" className="w-52" />
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold ">Assinatura <span className="text-blue-500">confirmada!</span></h1>
                <p className="mt-2 text-gray-700">Obrigado por se inscrever. Agora você tem acesso completo aos nossos recursos.</p>
                <p className="mt-1 text-gray-500">Em breve, você receberá um e-mail com todos os detalhes da sua assinatura.</p>
            </div>
            <div className="flex flex-col gap-2">
                <Link href={"/barbearia"}>
                    <Button className="">
                        Começe agora mesmo
                    </Button>
                </Link>
                <small className="text-sm text-gray-500">
                    Precisa de ajuda? <a href="/contato" className="text-blue-500 transition-all hover:underline">Fale conosco</a>.
                </small>
            </div>
        </aside>
    );
}
