"use client"

import { useAuth } from "@/contexts/AuthContext";
import { DeshboardMobile } from "./deshbordMobile";
import { DeshboardPc } from "./deshbordPc";

export const Deshboard = () => {
    const { token } = useAuth();

    return (
        <div className="flex w-full flex-col bg-muted/40">
            <DeshboardPc token={token}/>
            <DeshboardMobile token={token}/>
        </div>
    );
}
