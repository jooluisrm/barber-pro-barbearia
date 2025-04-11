export const loadItems = async (barbearia: any, reqGet: any, setList: any) => {
    if (!barbearia) return;
    const dados = await reqGet(barbearia.id);
    setList(dados);
}