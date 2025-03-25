export const ocultarMostrarSenha = (setMostrarSenha: (mostrarSenha: boolean) => void, mostrarSenha: boolean) => {
    if (!mostrarSenha) {
        setMostrarSenha(true);
    } else {
        setMostrarSenha(false);
    }
}