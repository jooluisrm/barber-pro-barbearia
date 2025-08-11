"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CircleUserRound, Loader, LoaderCircle, Trash, UserRoundPen } from "lucide-react";
import UploadImgAvatar from "../uploadImgAvatar";
import { useAuth, Usuario } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { deleteProfilePicture, updateProfilePicture } from "@/api/perfil/perfilServices";

export const DialogEditAvatar = () => {

    const { usuario, updateUsuario } = useAuth();
    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTrash, setIsLoadingTrash] = useState(false);

    const handleSave = async () => {
        if (!imageFile) return;
        setIsLoading(true);
        try {
            // 1. Capturamos a resposta da API, que contém a nova URL da foto
            const response = await updateProfilePicture(imageFile);

            // 2. Verificamos se a resposta foi bem-sucedida e tem a nova URL
            if (response && response.fotoPerfilUrl) {
                // 3. Chamamos updateUsuario COM a nova URL da foto
                updateUsuario({ fotoPerfil: response.fotoPerfilUrl });

                setOpen(false);
                setImageFile(null);
            }
        } catch (error) {
            // O toast de erro já é mostrado na função da API
        } finally {
            setIsLoading(false);
        }
    }
    const handleDelete = async () => {
        if (!usuario?.fotoPerfil) return;
        setIsLoadingTrash(true);
        try {
            // 1. Chamamos a função para deletar
            const response = await deleteProfilePicture();

            // 2. Se a deleção foi bem-sucedida
            if (response) {
                // 3. Chamamos updateUsuario para definir a foto como null no estado local
                updateUsuario({ fotoPerfil: null });

                setOpen(false);
            }
        } catch (error) {
            // O toast de erro já é mostrado na função da API
        } finally {
            setIsLoadingTrash(false);
        }
    }

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger>
                {!usuario?.fotoPerfil ? <UserRoundPen className="h-28 w-28 text-muted-foreground border-[1px] border-[#A1A1AA] rounded-full" /> : (
                    <Avatar className="w-28 h-28">
                        <AvatarImage src={usuario.fotoPerfil} className="w-28 h-28" />
                        <AvatarFallback className="w-28 h-28">{usuario.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar avatar de perfil.</DialogTitle>
                    <DialogDescription>
                        <UploadImgAvatar initialImageUrl={usuario?.fotoPerfil} onFileSelect={setImageFile} />
                        <div className="flex items-center gap-3 pt-5">
                            {
                                usuario?.fotoPerfil && (
                                    <Button
                                        variant={"destructive"}
                                        onClick={handleDelete}
                                        disabled={!usuario?.fotoPerfil || isLoadingTrash}
                                    >
                                        {isLoadingTrash ? <LoaderCircle className="animate-spin" /> : <Trash className="h-4 w-4" />}
                                    </Button>
                                ) 
                            }
                            <Button
                                onClick={handleSave}
                                disabled={!imageFile || isLoading}
                            >
                                {isLoading ? <LoaderCircle className="animate-spin" /> : "Salvar"}
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}