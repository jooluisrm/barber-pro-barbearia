import { ReactNode } from "react";

type Props = {
    icon: ReactNode;
    label: string;
    value: string | number;
    valueClassName?: string;
}

export const ItemInfo = ({ icon, label, value, valueClassName }: Props) => {
    return (
        <div className="flex items-center gap-3 border rounded-lg p-3">
            <div className="text-muted-foreground">{icon}</div>
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className={`font-semibold text-sm ${valueClassName}`}>{value}</span>
            </div>
        </div>
    );
};