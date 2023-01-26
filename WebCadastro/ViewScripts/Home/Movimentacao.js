var DATA;
var Id = localStorage.getItem("Id")
$.ajax({
    async: false,
    type: "POST",
    url: "/Repositorio/GetUserInfo",
    content: "application/json; charset=utf-8",
    dataType: "json",
    data: { Id: Id },
    success: function (Response) {
        localStorage.setItem("Saldo", Response.PES_SALDO)
        DATA = Response
    },
    error: function () {
        alert("esse");
    }
});
function reset() {
    $('#valorDescricao').removeClass('is-invalid');
    $('#valorInput').removeClass('is-invalid');
}

function Send(prop) {
    if (isNaN(prop.Valor())) {
        Swal.fire({
            icon: 'error',
            title: 'Opa...',
            text: 'Você precisa inserir valores válidos',
        })
        $('#valorInput').addClass('is-invalid');
        if (prop.Valor() == null || prop.Valor() == "") {
            $('#valorInput').addClass('is-invalid');
            if (prop.Descricao() == null || prop.Descricao() == "") {
                $('#valorDescricao').addClass('is-invalid');
            }
            return
        }
        return
    }
    if (prop.Valor() == null || prop.Valor() == "") {
        $('#valorInput').addClass('is-invalid');
        if (prop.Descricao() == null || prop.Descricao() == "") {
            $('#valorDescricao').addClass('is-invalid');
        }
        Swal.fire({
            icon: 'error',
            title: 'Opa...',
            text: 'Você precisa inserir valores válidos',
        }).then((result) => {
            return;
        })
        return
    }
    if (prop.Descricao() == null || prop.Descricao() == "") {
        $('#valorDescricao').addClass('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Opa...',
            text: 'Você precisa uma descrição válida',
        }).then((result) => {
        })
        return
    }



    var Id = localStorage.getItem("Id")
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var currentDate = date + ' ' + time;
    var Valor = prop.Valor()
    if (prop.Tipo() == "Saída") {
        var Saldo = localStorage.getItem("Saldo")
        if (parseInt(prop.Valor()) > parseInt(Saldo)) {
            Swal.fire({
                icon: 'error',
                title: 'Opss...',
                text: 'Não é permitido ter um saldo negativo!',
            })
            return
        }
        if (parseFloat(DATA.PES_SALDO) - parseFloat(prop.Valor()) < parseFloat(DATA.PES_MINIMO)) {
            alert("Abaixo do Limite!")
        }
        var Tipo = "Saida"
        $.ajax({
            type: "POST",
            url: "/Repositorio/" + Tipo,
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: {
                PES_ID: Id,
                SAI_DATA: currentDate,
                SAI_DESCRICAO: prop.Descricao(),
                SAI_VALOR: Valor,
                PES_SALDO: JSON.stringify(parseFloat(localStorage.getItem("Saldo")) - parseFloat(Valor))
            },
            success: function (Usuario) {
                var Id = localStorage.getItem("Id")
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
                Swal.fire({
                    icon: 'success',
                    title: 'Ok',
                    text: 'Movimentação salva!',
                }).then((result) => {
                    window.location.href = "/Home/Movimentacao";
                })
            },
            error: function () {
                alert("error");
            }
        });
    } else {
        var Tipo = "Entrada"
        $.ajax({
            type: "POST",
            url: "/Repositorio/" + Tipo,
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: {
                PES_ID: Id,
                ENT_DATA: currentDate,
                ENT_DESCRICAO: prop.Descricao(),
                ENT_VALOR: Valor,
                PES_SALDO: JSON.stringify(parseFloat(localStorage.getItem("Saldo")) + parseFloat(Valor)),
            },
            success: function (Usuario) {
                var Id = localStorage.getItem("Id")
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
                Swal.fire({
                    icon: 'success',
                    title: 'Ok',
                    text: 'Movimentação salva!',
                }).then((result) => {
                    window.location.href = "/Home/Movimentacao";
                })
            },
            error: function () {
                alert("error");
            }
        });
    }


}

function movimentacao(Saldo, Tipo, Descricao, Valor, Usuario) {
    this.Tipo = Tipo
    this.Descricao = Descricao
    this.Valor = Valor
    this.Saldo = Saldo
    this.Usuario = Usuario
}
function movimentacaoViewModel(prop) {
    this.Tipo = ko.observable(prop.Tipo);
    this.Descricao = ko.observable(prop.Descricao);
    this.Valor = ko.observable(prop.Valor);
    this.Saldo = ko.observable(prop.Saldo);
    this.Usuario = localStorage.getItem("Nome")
}
var prop = new movimentacao("", "")
var Movimento = new movimentacaoViewModel(prop)
Movimento.Saldo(localStorage.getItem("Saldo"))
ko.applyBindings(Movimento);