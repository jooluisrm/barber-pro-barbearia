export const formatarData = (data: Date) => {
    let dataString = data.toString();

    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
}

export const formatarPreco = (preco: string) => {
    return `R$ ${Number(preco).toFixed(2)}`
}