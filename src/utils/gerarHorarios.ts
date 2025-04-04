export function gerarHorarios(inicio: string, fim: string, intervalo: number) {
    const horarios = [];
    let [h, m] = inicio.split(':').map(Number);
    const [fimH, fimM] = fim.split(':').map(Number);

    while (h < fimH || (h === fimH && m <= fimM)) {
        const hora = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        horarios.push({ value: hora, label: hora });

        m += intervalo;
        if (m >= 60) {
            m = m % 60;
            h += 1;
        }
    }

    return horarios;
}
