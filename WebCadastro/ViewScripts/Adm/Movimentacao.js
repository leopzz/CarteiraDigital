function Sair() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/Login/Index"
}
function reset() {
    $('#valorInput').removeClass('is-invalid');
    $('#valorDescricao').removeClass('is-invalid');
}
var UserId = sessionStorage.getItem("Id")
var DATA;
if (UserId == null) {
    window.location.href = "/Adm/Index"
} else {
    $.ajax({
        async: false,
        type: "POST",
        url: "/Repositorio/GetUserInfo",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            Id: UserId
        },
        success: function (Res) {
            DATA = Res
        },
        error: function () {
            alert("error");
        }
    });
}
if (sessionStorage.getItem("Saldo") == null && sessionStorage.getItem("Id") == null) {
    window.location.href = "/Adm/Index"
} else {
    var UserId = sessionStorage.getItem("Id")
    $.ajax({
        async: false,
        type: "POST",
        url: "/Repositorio/getSaldo",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            Id: UserId
        },
        success: function (Saldo) {
            sessionStorage.setItem("Saldo", Saldo)
        },
        error: function () {
            alert("error");
        }
    });
}


function Send(prop) {
    var Min
    if (parseFloat(DATA.PES_SALDO) - parseFloat(prop.Valor()) < parseFloat(DATA.PES_MINIMO)) {
        Min = true
    }
    if (isNaN(prop.Valor())) {
        if (prop.Descricao() == null || prop.Descricao() == "") {
            $('#valorDescricao').addClass('is-invalid');
        }
        Swal.fire({
            icon: 'error',
            title: 'Opa...',
            text: 'Valores Inválidos!',
        })
        $('#valorInput').addClass('is-invalid');
        return
    }
    if (prop.Valor() == null || prop.Valor() == "") {
        $('#valorInput').addClass('is-invalid');
        if (prop.Descricao() == null || prop.Descricao() == "") {
            $('#valorDescricao').addClass('is-invalid');
            Swal.fire({
                icon: 'error',
                title: 'Opa...',
                text: 'Valores Inválidos!',
            })
        }
        return
    }
    if (prop.Descricao() == null || prop.Descricao() == "") {
        $('#valorDescricao').addClass('is-invalid');
        Swal.fire({
            icon: 'error',
            title: 'Opa...',
            text: 'Valores Inválidos!',
        })
        return
    }


    var Id = sessionStorage.getItem("Id")
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var currentDate = date + ' ' + time;
    var Valor = prop.Valor()

    if (prop.Tipo() == "Saída") {
        var Saldo = sessionStorage.getItem("Saldo")
        if (parseInt(prop.Valor()) > parseInt(Saldo)) {
            Swal.fire({
                icon: 'warning',
                title: 'Ei!',
                text: 'Não é possível ter um saldo mínimo em conta!',
            })
            return
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
                PES_SALDO: JSON.stringify(parseFloat(sessionStorage.getItem("Saldo")) - parseFloat(Valor))
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
                        sessionStorage.setItem("Saldo", Saldo)
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
                    if (Min == true) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Cuidado!',
                            text: 'Usuário chegou ao mínimo de saldo em conta!',
                        }).then((res) => {
                            window.location.href = "/Adm/Movimentacao";
                        })
                    } else {
                        window.location.href = "/Adm/Movimentacao";
                    }
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
                PES_SALDO: JSON.stringify(parseFloat(sessionStorage.getItem("Saldo")) + parseFloat(Valor)),
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
                        sessionStorage.setItem("Saldo", Saldo)
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
                    if (Min == true) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Cuidado!',
                            text: 'Usuário chegou ao mínimo de saldo em conta!',
                        }).then((res) => {
                            window.location.href = "/Adm/Movimentacao";
                        })
                    } else {
                        window.location.href = "/Adm/Movimentacao";
                    }
                })
            },
            error: function () {
                alert("error");
            }
        });
    }


}
if (sessionStorage.getItem("Saldo") == null && sessionStorage.getItem("Id") == null) {
    window.location.href = "/Adm/Index"
} else {
    var UserId = sessionStorage.getItem("Id")
    $.ajax({
        type: "POST",
        url: "/Repositorio/getSaldo",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            Id: UserId
        },
        success: function (Saldo) {
            sessionStorage.setItem("Saldo", Saldo)
        },
        error: function () {
            alert("error");
        }
    });
}

function movimentacao(Saldo, Tipo, Descricao, Valor, Usuario, Nome) {
    this.Tipo = Tipo
    this.Descricao = Descricao
    this.Valor = Valor
    this.Saldo = Saldo
    this.Usuario = Usuario
    this.Nome = Nome
}
function movimentacaoViewModel(prop) {
    this.Tipo = ko.observable(prop.Tipo);
    this.Descricao = ko.observable(prop.Descricao);
    this.Valor = ko.observable(prop.Valor);
    this.Saldo = ko.observable(prop.Saldo);
    this.Nome = ko.observable(prop.Nome);
}
var prop = new movimentacao("", "")
var Movimento = new movimentacaoViewModel(prop)
Movimento.Saldo(sessionStorage.getItem("Saldo"))
Movimento.Nome(sessionStorage.getItem("Nome"))
ko.applyBindings(Movimento);