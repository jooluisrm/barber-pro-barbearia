import { ReactNode } from "react";

type Props = {
    icon: ReactNode;
    label: string;
    value: string | number;
    valueClassName?: string;
    href?: string; // NOVO: Propriedade opcional para o link
}

export const ItemInfo = ({ icon, label, value, valueClassName, href }: Props) => {
    
    const ValueComponent = () => (
        <span className={`font-semibold text-sm transition-all ${valueClassName}`}>
            {value}
        </span>
    );

    return (
        <div className="flex items-center gap-3 border rounded-lg p-3">
            <div className="text-muted-foreground">{icon}</div>
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{label}</span>
                {/* Renderiza um link se href existir, senão, apenas o texto */}
                {href ? (
                    <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                    >
                        <ValueComponent />
                    </a>
                ) : (
                    <ValueComponent />
                )}
            </div>
        </div>
    );
};