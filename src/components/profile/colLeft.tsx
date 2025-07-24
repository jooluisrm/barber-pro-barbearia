import { Usuario } from "@/contexts/AuthContext";
import { CircleUserRound, LoaderCircle } from "lucide-react";

type Props = {
    usuario: Usuario | null;
}

export const ColLeft = ({ usuario }: Props) => {
    return (
        <div className="md:col-span-1">
            <div className="flex flex-col items-center space-y-4 p-4 rounded-lg">
                <CircleUserRound className="h-28 w-28 text-muted-foreground" />
                <div className='text-center'>
                    {!usuario ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold">{usuario?.nome}</h2>
                            <p className="text-muted-foreground">{usuario?.email}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}