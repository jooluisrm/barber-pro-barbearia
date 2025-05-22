"use client"

import { ServiceContextProvider } from "@/contexts/ServicesContext";
import { CardOpeningHours } from "./openingHours/cardOpeningHours";
import { CardPaymentMethod } from "./paymentMethod/cardPaymentMethod";
import { CardProducts } from "./products/cardProducts";
import { CardServices } from "./services/cardServices";
import { CardSocialMidia } from "./socialMidia/cardSocialMidia";
import { ProductContextProvider } from "@/contexts/ProductsContext";
import { SocialContextProvider } from "@/contexts/SocialContext";
import { PaymentContextProvider } from "@/contexts/PaymentContext";
import { OpeningHoursContextProvider } from "@/contexts/OpeningHoursContext";

export const MainBarbearia = () => {
    return (
        <main className="pb-10">
            <div className="pb-6 pt-5 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Painel da <span className="text-blue-500">Barbearia</span>
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Visualize, crie e gerencie todos os elementos da sua barbearia.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ServiceContextProvider>
                    <CardServices />
                </ServiceContextProvider>

                <ProductContextProvider>
                    <CardProducts />
                </ProductContextProvider>

                <SocialContextProvider>
                    <CardSocialMidia />
                </SocialContextProvider>

                <PaymentContextProvider>
                    <CardPaymentMethod />
                </PaymentContextProvider>

                <OpeningHoursContextProvider>
                    <CardOpeningHours />
                </OpeningHoursContextProvider>
            </div>
        </main>
    );
}