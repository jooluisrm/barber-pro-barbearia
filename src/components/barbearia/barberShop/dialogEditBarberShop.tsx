"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Smartphone, Globe } from "lucide-react";
import UploadImgAvatar from "@/components/uploadImgAvatar";
import { BarberShop } from "@/types/barberShop";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "react-input-mask";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { putBarberShop } from "@/api/barbearia/barbeariaServices";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
    infosBarbearia: BarberShop;
};

const formSchema = z.object({
    nome: z.string().min(1, "O nome da barbearia é obrigatório."),
    descricao: z.string().optional(),
    endereco: z.string().min(1, "O endereço é obrigatório."),
    celular: z
        .string()
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido (ex: (11) 91234-5678)"),
    telefone: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^\(\d{2}\) \d{4}-\d{4}$/.test(val),
            "Telefone inválido (ex: (11) 3123-4567)"
        ),
    latitude: z
        .number({ invalid_type_error: "Latitude deve ser um número." })
        .min(-90, "Latitude mínima é -90")
        .max(90, "Latitude máxima é 90"),
    longitude: z
        .number({ invalid_type_error: "Longitude deve ser um número." })
        .min(-180, "Longitude mínima é -180")
        .max(180, "Longitude máxima é 180"),
});

export const DialogEditBarberShop = ({ infosBarbearia }: Props) => {
    const { updateBarbearia } = useAuth();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [scrolledTop, setScrolledTop] = useState(false);
    const [scrolledBottom, setScrolledBottom] = useState(false);
    const [open, setOpen] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        setScrolledTop(target.scrollTop > 0);
        setScrolledBottom(target.scrollHeight - target.scrollTop > target.clientHeight);
    };

    if (!infosBarbearia) return null;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: infosBarbearia.nome || "",
            celular: infosBarbearia.celular || "",
            telefone: infosBarbearia.telefone || "",
            descricao: infosBarbearia.descricao || "",
            endereco: infosBarbearia.endereco || "",
            latitude: infosBarbearia.latitude || 0,
            longitude: infosBarbearia.longitude || 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, String(value));
            }
        });
        if (imageFile) {
            formData.append('fotoPerfil', imageFile);
        }

        try {
            const response = await putBarberShop(formData);
            if (response && response.barbearia) {
                updateBarbearia(response.barbearia);
                setOpen(false);
            }
        } catch (error) {
            console.error("Falha ao enviar formulário:", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">Editar</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-0 overflow-hidden">
                {/* Cabeçalho fixo */}
                <DialogHeader
                    className={`p-6 border-b transition-shadow ${scrolledTop ? "shadow-sm" : ""
                        }`}
                >
                    <DialogTitle>Editar Barbearia</DialogTitle>
                </DialogHeader>
                <div
                    className="max-h-[70vh] overflow-y-auto p-6 space-y-4"
                    onScroll={handleScroll}
                >
                    {/* Foto */}
                    <div className="flex items-center gap-4 border rounded-lg p-4">
                        <div className="flex-1 space-y-2">
                            <Label>Foto de Perfil</Label>
                            <UploadImgAvatar
                                onFileSelect={setImageFile}
                                initialImageUrl={infosBarbearia?.fotoPerfil}
                            />
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Corpo rolável */}



                            {/* Nome */}
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem className="border rounded-lg p-4">
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome da barbearia" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Descrição */}
                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem className="border rounded-lg p-4">
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Descrição da barbearia" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Endereço */}
                            <FormField
                                control={form.control}
                                name="endereco"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-3 border rounded-lg p-4">
                                        <MapPin className="w-5 h-5 text-muted-foreground" />
                                        <div className="flex-1 space-y-2">
                                            <FormLabel>Endereço</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Endereço completo" {...field} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Telefones */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Telefone */}
                                <FormField
                                    control={form.control}
                                    name="telefone"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3 border rounded-lg p-4">
                                            <Phone className="w-5 h-5 text-muted-foreground" />
                                            <div className="flex-1 space-y-2">
                                                <FormLabel>Telefone Fixo</FormLabel>
                                                <FormControl>
                                                    <InputMask
                                                        mask="(99) 9999-9999"
                                                        value={field.value || ""}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                    >
                                                        {(inputProps: any) => (
                                                            <Input
                                                                {...inputProps}
                                                                placeholder="Digite um telefone fixo..."
                                                            />
                                                        )}
                                                    </InputMask>
                                                </FormControl>
                                                <FormDescription>Opcional</FormDescription>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {/* Celular */}
                                <FormField
                                    control={form.control}
                                    name="celular"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3 border rounded-lg p-4">
                                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                                            <div className="flex-1 space-y-2">
                                                <FormLabel>Celular (WhatsApp)</FormLabel>
                                                <FormControl>
                                                    <InputMask
                                                        mask="(99) 99999-9999"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                    >
                                                        {(inputProps: any) => (
                                                            <Input
                                                                {...inputProps}
                                                                placeholder="Digite o celular principal..."
                                                            />
                                                        )}
                                                    </InputMask>
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Localização */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="latitude"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3 border rounded-lg p-4">
                                            <Globe className="w-5 h-5 text-muted-foreground" />
                                            <div className="flex-1 space-y-2">
                                                <FormLabel>Latitude</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="any"
                                                        placeholder="-23.5505"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(parseFloat(e.target.value))
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="longitude"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-3 border rounded-lg p-4">
                                            <Globe className="w-5 h-5 text-muted-foreground" />
                                            <div className="flex-1 space-y-2">
                                                <FormLabel>Longitude</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="any"
                                                        placeholder="-46.6333"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(parseFloat(e.target.value))
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>


                            {/* Rodapé fixo */}
                            <div
                                className={`p-6 border-t flex justify-end gap-2 transition-shadow ${scrolledBottom
                                    ? "shadow-[0_-2px_4px_rgba(0,0,0,0.05)]"
                                    : ""
                                    }`}
                            >
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                                <Button type="submit">Salvar</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog >
    );
};
