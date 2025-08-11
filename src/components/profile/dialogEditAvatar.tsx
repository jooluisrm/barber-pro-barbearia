"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CircleUserRound, Trash } from "lucide-react";
import UploadImgAvatar from "../uploadImgAvatar";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const DialogEditAvatar = () => {

    const { usuario } = useAuth();
    const [imageFile, setImageFile] = useState<File | null>(null);

    return (
        <Dialog>
            <DialogTrigger>
                {!usuario?.fotoPerfil ? <CircleUserRound className="h-28 w-28 text-muted-foreground" /> : (
                    <Avatar className="w-28 h-28">
                        <AvatarImage src={usuario.fotoPerfil} className="w-28 h-28"/>
                        <AvatarFallback className="w-28 h-28">{usuario.nome.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar avatar de perfil.</DialogTitle>
                    <DialogDescription>
                        <UploadImgAvatar initialImageUrl={usuario?.fotoPerfil} onFileSelect={setImageFile} />
                        <div className="flex items-center gap-3 pt-5">
                            <Button variant={"destructive"}><Trash /></Button>
                            <Button>Salvar</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}