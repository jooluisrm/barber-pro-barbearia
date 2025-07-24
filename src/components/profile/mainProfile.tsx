"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeaderPage } from "../reultilizar/headerPage";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { ProfileInfoForm } from "./ProfileInfoForm";
import { ColLeft } from "./colLeft";
import { SecurityForm } from "./securityForm";

const formSchemaPassword = z.object({
    senhaAtual: z.string(),
    novaSenha: z.string(),
    confirmarSenha: z.string()
});

export const MainProfile = () => {
    const { usuario } = useAuth();

    return (
        <main>
            <HeaderPage
                title="Meu Perfil"
                subTitle="Gerencie suas informações pessoais e de segurança."
            />

            <div className="container mx-auto max-w-5xl py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

                    
                    <ColLeft usuario={usuario}/>

                   
                    <div className="md:col-span-2">
                        
                        <Tabs defaultValue="personal">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configurações do Perfil</CardTitle>
                                    <CardDescription>
                                        Selecione uma aba para editar as informações desejadas.
                                    </CardDescription>
                                   
                                    <TabsList className="grid w-full grid-cols-2 mt-4">
                                        <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                                        <TabsTrigger value="security">Segurança</TabsTrigger>
                                    </TabsList>
                                </CardHeader>
                                <CardContent>
                                    
                                    <TabsContent value="personal">
                                       <ProfileInfoForm />
                                    </TabsContent>

                                    
                                    <TabsContent value="security">
                                        <SecurityForm />
                                    </TabsContent>
                                </CardContent>
                            </Card>
                        </Tabs>
                    </div>
                </div>
            </div>
        </main>
    );
}