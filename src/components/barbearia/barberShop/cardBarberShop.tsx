import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ItemInfoBarberShop } from "./itemInfoBarberShop";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone, Smartphone, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { loadItems } from "@/utils/loadItems";
import { useBarbershopContext } from "@/contexts/barberShopContext";
import { getBarberShop } from "@/api/barbearia/barbeariaServices";
import { DialogEditBarberShop } from "./dialogEditBarberShop";



export const CardBarberShop = () => {
    const { barbearia } = useAuth();
    const { setBarbershop, barbershop} = useBarbershopContext();

    useEffect(() => {
        if (!barbearia) return;
        loadItems(barbearia, getBarberShop, setBarbershop);
    }, [barbearia]);

    if(!barbershop) return;

    return (
        <Card className="flex flex-col justify-between">
            <div>
                <CardHeader>
                    <CardTitle>Barbearia</CardTitle>
                    <CardDescription>
                        Edite aqui as informações da sua barbearia de forma rápida e prática.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">

                    {/* Foto e nome */}
                    <div className="flex items-center gap-4 border rounded-lg p-4 overflow-x-hidden">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={`${barbershop.fotoPerfil ? barbershop.fotoPerfil : "/favicon.png"}`} />
                            <AvatarFallback>{barbershop.nome.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <ItemInfoBarberShop
                                label="Nome"
                                value={barbershop.nome}
                                className="truncate max-w-[200px]"
                            />
                            <ItemInfoBarberShop
                                label="Descrição"
                                value={barbershop.descricao ? barbershop.descricao : "Sem descrição..."}
                                className="truncate max-w-[250px]"
                            />
                        </div>
                    </div>

                    {/* Endereço */}
                    <div className="flex items-center gap-3 border rounded-lg p-4">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <ItemInfoBarberShop
                            label="Endereço"
                            value={barbershop.endereco}
                            className="truncate max-w-[250px]"
                        />
                    </div>

                    {/* Contatos */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoBarberShop label="Telefone" value={barbershop.telefone ? barbershop.telefone : "Não Informado..."} />
                        </div>
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoBarberShop label="Celular" value={barbershop.celular} />
                        </div>
                    </div>

                    {/* Localização */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <Globe className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoBarberShop label="Latitude" value={String(barbershop.latitude)} />
                        </div>
                        <div className="flex items-center gap-3 border rounded-lg p-4">
                            <Globe className="w-5 h-5 text-muted-foreground" />
                            <ItemInfoBarberShop label="Longitude" value={String(barbershop.longitude)} />
                        </div>
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                <DialogEditBarberShop infosBarbearia={barbershop}/>
            </CardFooter>
        </Card>
    );
};
