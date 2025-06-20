import { Button } from "@/components/ui/button";
import Link from "next/link";

export const RightSection = () => {
    return (
        <aside className="text-center flex flex-col justify-center items-center gap-5">
            <img src="./cancel2.svg" alt="svg cancelado" className="w-52" />
            
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-red-500">Compra não concluída</h1>
                <p className="mt-2 text-gray-700">
                    Parece que algo deu errado ou a assinatura não foi finalizada.
                </p>
                <p className="mt-1 text-gray-500">
                    Se você tiver enfrentado algum problema, estamos aqui para ajudar.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Link href={"/assinaturas"}>
                    <Button>
                        Tentar novamente
                    </Button>
                </Link>
                <small className="text-sm text-gray-500">
                    Tem alguma dúvida? <a href="/contato" className="text-blue-500 hover:underline">Entre em contato conosco</a>.
                </small>
            </div>
        </aside>
    );
}
