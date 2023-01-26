
function call(Valor) {
    Render(Valor.Tipo(), Valor.DataIni(), Valor.DataFim())
}
var Id = localStorage.getItem("Id")
var DATA
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
        var ResSor = Res.sort((x, i) => parseInt(x.Data.split("(")[1].split(")")[0]) - parseInt(i.Data.split("(")[1].split(")")[0]))
        var ResLis = Res.reverse()
        renderView(Res)
        DATA = Res
    },
    error: function () {
        alert("error");
    }
});
if (DATA == null || DATA[0] == null) {
    $("#TabelaPai").html('').appendTo($("#TabelaPai"));
    $("#FormFilter").html('').appendTo($("#FormFilter"));
    $("#Title").html('<a>Você ainda não nem movimentações ;)</a>  <a class="link-primary text-decoration-none" href="Movimentacao">Gerar Movimentação</a>').appendTo($("#Title"));
}
function Render(Tipo, dataIni, dataFim) {
    var Id = localStorage.getItem("Id")
    $.ajax({
        type: "POST",
        url: "/Repositorio/UltimasMovimentacoes",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            Id: Id
        },
        success: function (Res) {
            var ResSor = Res.sort((x, i) => parseInt(x.Data.split("(")[1].split(")")[0]) - parseInt(i.Data.split("(")[1].split(")")[0]))
            var ResLis = Res.reverse()
            if (dataIni == undefined) {
                var DataIni = null
            } else {
                var DataIni = new Date(dataIni)
            }
            if (dataFim == undefined) {
                var DataFim = null
            } else {
                var DataFim = new Date(dataFim)
            }
            if (DataFim == "Invalid Date") {
                DataFim = null
            }
            if (DataIni == "Invalid Date") {
                DataIni = null
            }


            if (Tipo == "Entrada e Saída") {
                if (DataIni == null && DataFim == null) {
                    renderView(Res)
                } else if (DataFim == null) {
                    var filter = Res.filter(i => parseInt(i.Data.split("(")[1].split(")")[0]) > DataIni)
                    renderView(filter)
                } else if (DataIni == null) {
                    var filter = Res.filter(i => parseInt(i.Data.split("(")[1].split(")")[0]) < DataFim)
                    renderView(filter)
                } else {
                    var filter = Res.filter(i => parseInt(i.Data.split("(")[1].split(")")[0]) < DataFim && parseInt(i.Data.split("(")[1].split(")")[0]) > DataIni)
                    renderView(filter)
                }
            } else {
                resFilterTipo = Res.filter(i => i.Tipo == Tipo)
                if (DataIni == null && DataFim == null) {
                    renderView(resFilterTipo)
                } else if (DataFim == null) {
                    var filtered = resFilterTipo.filter(i => parseInt(i.Data.split("(")[1].split(")")[0]) > DataIni.getTime())
                    renderView(filtered)
                } else if (DataIni == null) {
                    var filter = resFilterTipo.filter(i => parseInt(i.Data.split("(")[1].split(")")[0]) < DataFim.getTime())
                    renderView(filter)
                } else {
                    var filter = resFilterTipo.filter(i => parseInt(i.Data.split("(")[1].split(")")[0]) < DataFim.getTime() && parseInt(i.Data.split("(")[1].split(")")[0]) > DataIni.getTime())
                    renderView(filter)
                }
            }
        },
        error: function () {
            alert("error");
        }
    });

}
function renderView(Res) {
    $("#Tabela").html('').appendTo($("#Tabela"));
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
        $(document.getElementById(Id)).add('<td>' + Desc + '</td>').appendTo(document.getElementById(Id));
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
    },
    error: function () {
        alert("error");
    }
});
function openModal(Desc) {
    document.getElementById("modalDesc").innerHTML = Desc

}
function movimentacao(Saldo, DataIni, DataFim, Tipo, Usuario) {
    this.Saldo = Saldo
    this.DataIni = DataIni
    this.DataFim = DataFim
    this.Tipo = Tipo
    this.Usuario = Usuario
}
function movimentacaoViewModel(prop) {
    this.Saldo = ko.observable(prop.Saldo);
    this.DataIni = ko.observable(prop.DataIni);
    this.DataFim = ko.observable(prop.DataFim);
    this.Tipo = ko.observable(prop.Tipo);
    this.Usuario = localStorage.getItem("Nome");

}

var prop = new movimentacao()
var Movimento = new movimentacaoViewModel(prop)
Movimento.Saldo(localStorage.getItem("Saldo"))
ko.applyBindings(Movimento);