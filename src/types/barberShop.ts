export type BarberShop = {
    id: string;
    nome: string;
    endereco: string;
    celular: string;
    telefone: string | null;
    fotoPerfil: string | null;
    descricao: string | null;
    status: "Ativa"; 
    stripeCurrentPeriodEnd: string | null;
    latitude: number;
    longitude: number;
};
