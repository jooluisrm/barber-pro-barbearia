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
import { PlusCircle } from "lucide-react"
import { SelectSocialMidia } from "./selectSocialMidia"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { DataSocialMedia, getSocialMedia, postSocialMedia } from "@/api/barbearia/barbeariaServices"
import { loadItems } from "@/utils/loadItems"
import { useSocialContext } from "@/contexts/SocialContext"
import { NovoItem } from "@/components/reultilizar/novoItem"

export const DialogNewSocialMidia = () => {
    const { barbearia } = useAuth();
    const { setSocialMedia } = useSocialContext();

    const [selectSocialMedia, setSelectSocialMedia] = useState("");
    const [inputLink, setInputLink] = useState("");

    const [open, setOpen] = useState(false);

    const handleSelectSocialMedia = (value: string) => {
        setSelectSocialMedia(value);
    }

    const handleAddSocialMedia = async () => {
        if (!barbearia) return;
        try {
            const data: DataSocialMedia = {
                link: inputLink,
                rede: selectSocialMedia
            }
            const done = await postSocialMedia(barbearia.id, data);
            if (done) {
                await loadItems(barbearia, getSocialMedia, setSocialMedia);
                setOpen(false);
                setInputLink("");
                setSelectSocialMedia("");
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <NovoItem onCLick={setOpen}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <PlusCircle className="w-6 h-6" />
                        Cadastrar Nova Rede Social
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        <span className="block text-sm text-primary/80 mt-1">
                            A Rede Social aparecerá no site da barbearia.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-5">
                        <div className="">
                            <label htmlFor="" className="">Rede Social</label>
                            <SelectSocialMidia handleSelectSocialMedia={handleSelectSocialMedia} />
                        </div>
                    </div>
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
                <DialogFooter>
                    <Button
                        onClick={handleAddSocialMedia}
                        disabled={!inputLink || !selectSocialMedia}
                    >Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
