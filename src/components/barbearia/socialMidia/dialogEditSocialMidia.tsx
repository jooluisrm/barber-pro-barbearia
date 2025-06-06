import { DataSocialMedia, deleteSocialMedia, getSocialMedia, putSocialMedia } from "@/api/barbearia/barbeariaServices"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { useSocialContext } from "@/contexts/SocialContext"
import { SocialMedia } from "@/types/socialMedia"
import { loadItems } from "@/utils/loadItems"
import { EditIcon, Scissors, Trash } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ButtonTrash } from "@/components/reultilizar/buttonTrash"

type Props = {
    itemSocialMedia: SocialMedia;
}

export const DialogEditSocialMidia = ({ itemSocialMedia }: Props) => {
    const { setSocialMedia } = useSocialContext();
    const { barbearia } = useAuth();

    const [inputLink, setInputLink] = useState(itemSocialMedia.link);

    const [open, setOpen] = useState(false);

    const handleEditSocialMedia = async () => {
        if (!barbearia) return;
        try {
            const data: DataSocialMedia = {
                link: inputLink
            }
            const done = await putSocialMedia(barbearia.id, itemSocialMedia.id, data);
            if(done) {
                await loadItems(barbearia, getSocialMedia, setSocialMedia);
                setOpen(false);
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleDeleteSocialMedia = async () => {
        if (!barbearia) return;
        try {
            await deleteSocialMedia(barbearia.id, itemSocialMedia.id);
            await loadItems(barbearia, getSocialMedia, setSocialMedia);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"} onClick={(e) => setOpen(true)}><EditIcon /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Editar/Excluir</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Scissors className="w-6 h-6" />
                        Editar Rede Social
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        Atualize os detalhes desta rede social.
                        <span className="block text-sm text-primary/80 mt-1">
                            As alterações afetará a exibição na barbearia.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="">
                        <label htmlFor="link">Link</label>
                        <Input
                            id="link"
                            placeholder="Link da rede social"
                            value={inputLink}
                            onChange={(e) => setInputLink(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="gap-3">
                    <ButtonTrash deleteFunction={handleDeleteSocialMedia}/>
                    <Button onClick={handleEditSocialMedia}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
