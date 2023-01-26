
var UserId = sessionStorage.getItem("Id")
var DATA;
if (UserId == null) {
    window.location.href = "/Adm/Index"
} else {
    $.ajax({
        async: false,
        type: "POST",
        url: "/Repositorio/UltimasMovimentacoes",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            Id: UserId
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
}
if (DATA == null || DATA[0] == null) {
    $("#TabelaPai").html('').appendTo($("#TabelaPai"));
    $("#FormFilter").html('').appendTo($("#FormFilter"));
    $("#Title").html('<a>Esse usuário não tem movimentações</a>').appendTo($("#Title"));
}
function call(Valor) {
    Render(Valor.Tipo(), Valor.DataIni(), Valor.DataFim())
}


function Render(Tipo, dataIni, dataFim) {
    var User = sessionStorage.getItem("Id")
    $.ajax({
        type: "POST",
        url: "/Repositorio/UltimasMovimentacoes",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            Id: UserId
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


        $("#Tabela").add('<tr id="' + Id + '"><th scope="row" class="align-middle">' + Id + '</th></tr>').appendTo($("#Tabela"));
        $(document.getElementById(Id)).add('<td class="align-middle">' + Data + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle">' + Desc + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle">' + Res[i].Tipo + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle"> R$' + Valor + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle"> R$' + Saldo + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td><button id="' + Res[i].Tipo + '|' + Id + '" onclick="Delete(this.id)" class="btn btn-danger h-25">Deletar</button> </td>').appendTo(document.getElementById(Id));
    }
}
function Delete(BTNId) {
    var Deleted
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Tem certeza?',
        text: "Isso não pode ser revertido",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, delete!',
        cancelButtonText: 'Não, cancele!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Deletado!',
                'Arquivo deletado.',
            ),
                teste()
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'O "DELETE" não foi realizado'
            )
        }
    })
    function teste() {
        var Id = BTNId.split("|")[1]
        var Tipo = BTNId.split("|")[0]
        if (Tipo == "Entrada") {
            $.ajax({
                type: "POST",
                url: "/Repositorio/DeletarEnt",
                content: "application/json; charset=utf-8",
                dataType: "json",
                data: {
                    Id: Id
                },
                success: function (Res) {
                    window.location.href = "/Adm/Relatorio"
                },
                error: function () {
                    alert("error");
                }
            });
        } else if (Tipo == "Saída") {
            $.ajax({
                type: "POST",
                url: "/Repositorio/DeletarSai",
                content: "application/json; charset=utf-8",
                dataType: "json",
                data: {
                    Id: Id
                },
                success: function (Res) {
                    window.location.href = "/Adm/Relatorio"
                },
                error: function () {
                    alert("error");
                }
            });
        }

    }
}


if (localStorage.getItem("Id") != 3) {
    localStorage.clear()
    window.location.href = "/Login/Index"
}
function Sair() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/Login/Index"
}


function movimentacao(Saldo, DataIni, DataFim, Tipo, Usuario, Nome) {
    this.Saldo = Saldo
    this.DataIni = DataIni
    this.DataFim = DataFim
    this.Tipo = Tipo
    this.Usuario = Usuario
    this.Nome = Nome
}
function movimentacaoViewModel(prop) {
    this.Saldo = ko.observable(prop.Saldo);
    this.DataIni = ko.observable(prop.DataIni);
    this.DataFim = ko.observable(prop.DataFim);
    this.Tipo = ko.observable(prop.Tipo);
    this.Usuario = localStorage.getItem("Nome");
    this.Nome = ko.observable(prop.Nome);

}

var prop = new movimentacao()
var Movimento = new movimentacaoViewModel(prop)
Movimento.Saldo(localStorage.getItem("Saldo"))
Movimento.Nome(sessionStorage.getItem("Nome"))
ko.applyBindings(Movimento);