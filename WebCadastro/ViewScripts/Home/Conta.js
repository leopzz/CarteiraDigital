var Id = localStorage.getItem("Id")
var DATA;
$.ajax({
    async: false,
    type: "POST",
    url: "/Repositorio/GetUserInfo",
    content: "application/json; charset=utf-8",
    dataType: "json",
    data: { Id: Id },
    success: function (Response) {
        DATA = Response
    },
    error: function () {
        alert("error");
    }
});



function Send(prop) {
    if (prop.Nome() == undefined || prop.Nome() == "") {
        var Nome = DATA.PES_NOME
    } else {
        var Nome = prop.Nome()
        localStorage.setItem("Nome", Nome)
    }
    if (prop.Email() == undefined || prop.Email() == "") {
        var Email = DATA.PES_EMAIL
    } else {
        var Email = prop.Salario()
    }
    if (prop.Senha() == undefined || prop.Senha() == "") {
        var Senha = DATA.PES_SENHA
    } else {
        var Senha = prop.Senha()
    }
    if (prop.Limite() == undefined || prop.Limite() == "") {
        var Limite = DATA.PES_LIMITE
    } else {
        var Limite = prop.Limite()
    }
    if (prop.Minimo() == null || prop.Minimo() == "") {
        var Minimo = DATA.PES_MINIMO
    } else {
        var Minimo = prop.Minimo()
    }
    if (prop.Salario() == undefined || prop.Salario() == "") {
        var Salario = DATA.PES_SALARIO
    } else {
        var Salario = prop.Salario()
    }
    $.ajax({
        async: false,
        type: "POST",
        url: "/Repositorio/Atualizar",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            PES_SALDO: localStorage.getItem("Saldo"), PES_ID: localStorage.getItem("Id"),
            PES_NOME: Nome, PES_EMAIL: Email,
            PES_SENHA: Senha, PES_SALARIO: Salario,
            PES_LIMITE: Limite, PES_MINIMO: Minimo
        },
        success: function (Usuario) {
            Swal.fire({
                icon: 'success',
                title: 'Ok',
                text: 'Dados salvos!',
            }).then((result) => {
                window.location.href = "/Home/Conta";
            })
        },
        error: function () {
            alert("error");
        }
    });
}
function movimentacao(Saldo, Usuario, Nome, Email, Salario, Limite, Minimo, Senha) {
    this.Saldo = Saldo
    this.Usuario = Usuario
    this.Nome = Nome
    this.Email = Email
    this.Salario = Salario
    this.Limite = Limite
    this.Minimo = Minimo
    this.Senha = Senha
}
function movimentacaoViewModel(prop) {
    this.Usuario = ko.observable(prop.Usuario)
    this.Saldo = localStorage.getItem("Saldo")
    this.Nome = ko.observable(prop.Nome)
    this.User = ko.observable(prop.User)
    this.Email = ko.observable(prop.Email)
    this.Salario = ko.observable(prop.Salario)
    this.Limite = ko.observable(prop.Limite)
    this.Minimo = ko.observable(prop.Minimo)
    this.Senha = ko.observable(prop.Senha)
    this.placeNome = ko.observable(DATA.PES_NOME);
    this.placeEmail = ko.observable(DATA.PES_EMAIL);
    this.placeSalario = ko.observable("R$" + DATA.PES_SALARIO);
    this.placeLimite = ko.observable("R$" + DATA.PES_LIMITE);
    this.placeMinimo = ko.observable("R$" + DATA.PES_MINIMO);
}

var prop = new movimentacao()
var Movimento = new movimentacaoViewModel(prop)
Movimento.Usuario(localStorage.getItem("Nome"))
ko.applyBindings(Movimento);