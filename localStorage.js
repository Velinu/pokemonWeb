function salvarAcesso() {
    if (!localStorage.getItem("registros")) {
        var registros = {
            quantidade: 1,
            ultimoRegistro: obterDataAtual()
        };

        localStorage.setItem("registros", JSON.stringify(registros));
    } else {
        var registros = JSON.parse(localStorage.getItem("registros"));
        console.log(registros);
        registros.quantidade += 1;
        registros.ultimoRegistro = obterDataAtual();
        localStorage.setItem("registros", JSON.stringify(registros));
    }
    
}
function obterDataAtual() {
    var data = new Date();

    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    }).format(data);

    return dataFormatada;
}
function exibirInformacoesAcesso() {
    var registros = JSON.parse(localStorage.getItem("registros"));
    var quantidadeAcessos = registros.quantidade;
    var ultimaVisita = registros.ultimoRegistro;

    var paragrafo = document.createElement('p');
    paragrafo.textContent = `Quantidade de acessos: ${quantidadeAcessos} - Última visita: ${ultimaVisita}`;
    footer = document.querySelector('.rodape')
    footer.appendChild(paragrafo);
}

document.addEventListener('DOMContentLoaded', function () {
    salvarAcesso();
    exibirInformacoesAcesso()
});