var DATA
var Id = localStorage.getItem("Id")
$.ajax({
    async: false,
    type: "POST",
    url: "/Repositorio/UltimasMovimentacoes",
    content: "application/json; charset=utf-8",
    dataType: "json",
    data: {
        Id: Id
    },
    success: function (Res) {
        Render(Res)
        DATA = Res
    },
    error: function () {
        alert("error");
    }
});
if (DATA == null || DATA[0] == null) {
    $("#TabelaPai").html('').appendTo($("#TabelaPai"));
    $("#Title").html('Você ainda não nem movimentações ;) <a class="link-primary text-decoration-none" href="Movimentacao">Gerar Movimentação</a>').appendTo($("#Title"));
}
function Render(Res) {
    var ResSor = Res.sort((x, i) => parseInt(x.Data.split("(")[1].split(")")[0]) - parseInt(i.Data.split("(")[1].split(")")[0]))
    var ResLis = Res.reverse()
    var Tabela = document.getElementById("Tabela")
    for (var i in Res) {

        var Id = Res[i].Numero
        var Data0 = Res[i].Data.split("(")[1]
        var Data1 = Data0.split(")")[0]
        var Data = new Date(parseInt(Data1)).toLocaleDateString()

        var ValorStr = Res[i].Valor.replace(",", ".")
        var ValorFlt = parseFloat(ValorStr)
        var Valor = Math.floor(ValorFlt * 1000) / 1000

        var SaldoStr = Res[i].Saldo.replace(",", ".")
        var SaldoFlt = parseFloat(SaldoStr).toFixed(3)
        var Saldo = Math.floor(SaldoFlt * 1000) / 1000

        var Desc = Res[i].Descricao
        $("#Tabela").add('<tr id=' + Id + '><th scope="row">' + Id + '</th></tr>').appendTo($("#Tabela"));
        $(document.getElementById(Id)).add('<td>' + Data + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td>' + Res[i].Tipo + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td> R$' + Valor + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td> R$' + Saldo + '</td>').appendTo(document.getElementById(Id));
    }

}


$.ajax({
    type: "POST",
    url: "/Repositorio/getSaldo",
    content: "application/json; charset=utf-8",
    dataType: "json",
    data: {
        Id: Id
    },
    success: function (Saldo) {
        localStorage.setItem("Saldo", Saldo)
        Movimento.Saldo(Saldo)
    },
    error: function () {
        alert("error");
    }
});
function openModal(Desc) {
    document.getElementById("modalDesc").innerHTML = Desc

}

function movimentacao(Saldo, Usuario) {
    this.Saldo = Saldo
    this.Usuario = Usuario
}
function movimentacaoViewModel(prop) {
    this.Saldo = ko.observable(prop.Saldo);
    this.Usuario = ko.observable(localStorage.getItem("Nome"))
}
var prop = new movimentacao("", "")
var Movimento = new movimentacaoViewModel(prop)
Movimento.Saldo(localStorage.getItem("Saldo"))
ko.applyBindings(Movimento);