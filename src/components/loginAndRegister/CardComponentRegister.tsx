import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const CardComponentRegister = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Registre sua barbearia</CardTitle>
                <CardDescription>Complete seu registro e comece a gerenciar sua barbearia</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-5 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-lg font-bold">Dados Pessoais:</h1>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <Input id="email" placeholder="Digite seu email" />
                        </div>
                        <div>
                            <label htmlFor="senha">Senha:</label>
                            <Input id="senha" placeholder="Digite sua senha" />
                        </div>
                        <div>
                            <label htmlFor="celular">Celular:</label>
                            <Input id="celular" placeholder="Digite seu celular" />
                        </div>
                        <div>
                            <label htmlFor="telefone">Telefone:</label>
                            <Input id="telefone" placeholder="Digite sua senha" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-lg font-bold">Dados da Barbearia:</h1>
                        <div>
                            <label htmlFor="nomeBarbearia">Nome da Barbearia:</label>
                            <Input id="nomeBarbearia" placeholder="Digite o nome da sua barbearia" />
                        </div>
                        <div>
                            <label htmlFor="endereco">Endereço da Barbearia:</label>
                            <Input id="endereco" placeholder="ex: Rua Brasil, Centro, 999" />
                        </div>
                        <div>
                            <label htmlFor="latitude">Latitude:</label>
                            <Input id="latitude" placeholder="Digite seu email" />
                        </div>
                        <div>
                            <label htmlFor="lontitude">Lontitude:</label>
                            <Input id="lontitude" placeholder="Digite sua senha" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button className="font-bold">Criar Conta</Button>
            </CardFooter>
        </Card>
    );
}