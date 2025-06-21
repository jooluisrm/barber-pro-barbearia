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
import { HeaderPage } from "../reultilizar/headerPage";

export const MainBarbearia = () => {
    return (
        <main className="pb-10">
            <HeaderPage
                subTitle="Visualize, crie e gerencie todos os elementos da sua barbearia."
                title="Barbearia"
            />
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