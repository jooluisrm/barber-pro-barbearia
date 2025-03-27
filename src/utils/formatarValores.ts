export const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

export const formatarPreco = (preco: string) => {
    return `R$ ${Number(preco).toFixed(2)}`
}