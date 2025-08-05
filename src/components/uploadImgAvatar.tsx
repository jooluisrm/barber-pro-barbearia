"use client"

import { CircleUserRoundIcon, Image, XIcon } from "lucide-react"

import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

type UploadImgAvatarProps = {
    onFileSelect: (file: File | null) => void;
    initialImageUrl?: string | null;
}

export default function UploadImgAvatar({ onFileSelect, initialImageUrl }: UploadImgAvatarProps) {
    const [
        { files, isDragging },
        {
            removeFile,
            openFileDialog,
            getInputProps,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
        },
    ] = useFileUpload({
        accept: "image/*",
    })

    const previewUrl = files[0]?.preview || null

     // ✅ 2. USAR USEEFFECT PARA AVISAR O PAI QUANDO O ARQUIVO MUDAR
    useEffect(() => {
        // Pega o primeiro arquivo do array (se existir)
        const file: any = files[0]?.file || null;
        // Chama a função do pai para atualizar o estado lá em cima
        onFileSelect(file);
    }, [files, onFileSelect]); // Roda sempre que a lista de 'files' mudar

    // ✅ 2. LÓGICA DE EXIBIÇÃO: PRIORIZA A NOVA IMAGEM, SENÃO MOSTRA A ANTIGA
    const newPreviewUrl = files[0]?.preview || null;
    const displayUrl = newPreviewUrl || initialImageUrl;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative inline-flex">
                {/* Drop area */}
                <button
                    className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
                    onClick={openFileDialog}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                    aria-label={previewUrl ? "Change image" : "Upload image"}
                >
                    {displayUrl ? (
                        <img
                            className="size-full object-cover"
                            src={displayUrl}
                            alt={files[0]?.file?.name || "Uploaded image"}
                            width={64}
                            height={64}
                            style={{ objectFit: "cover" }}
                        />
                    ) : (
                        <div aria-hidden="true">
                            <Image className="size-4 opacity-60" />
                        </div>
                    )}
                </button>
                {previewUrl && (
                    <Button
                        onClick={() => removeFile(files[0]?.id)}
                        size="icon"
                        className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
                        aria-label="Remove image"
                    >
                        <XIcon className="size-3.5" />
                    </Button>
                )}
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload image file"
                    tabIndex={-1}
                />
            </div>
            <p
                aria-live="polite"
                role="region"
                className="text-muted-foreground mt-2 text-xs"
            >
                Selecione uma imagem.
            </p>
        </div>
    )
}
