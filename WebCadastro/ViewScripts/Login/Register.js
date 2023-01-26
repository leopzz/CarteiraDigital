var buttonViewModel = function (num) {
    this.Count = ko.computed(function () { return this.num() }, this)
}
function reset() {
    $('#Email').removeClass('is-invalid');
    $('#Senha').removeClass('is-invalid');
    $('#Nome').removeClass('is-invalid');
    $('#Minimo').removeClass('is-invalid');
}
function Send(Usuario) {
    Nome = Usuario.Nome()
    Email = Usuario.Email()
    Senha = Usuario.Senha()
    Minimo = Usuario.Minimo()
    var verN
    var verE
    var verS
    var verM
    if (Nome == "" || Nome == null) {
        $('#Nome').addClass('is-invalid');
        var verN = false
    }
    if (Email == "" || Email == null) {
        var verE = false
    }
    if (Senha == "" || Senha == null) {
        $('#Senha').addClass('is-invalid');
        var verS = false
    }
    if (Minimo == "" || Minimo == null) {
        $('#Minimo').addClass('is-invalid');
        var verM = false
    }
    if (verN == false || verE == false || verS == false || verM == false) {
        Swal.fire({
            icon: 'error',
            title: 'Opa...',
            text: 'Os campos obrigatórios devem ser preenchidos!',
        }).then((result) => {
            $('#Email').addClass('is-invalid');
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/Repositorio/Salvar",
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: {
                PES_NOME: Usuario.Nome(), PES_EMAIL: Usuario.Email(),
                PES_SENHA: Usuario.Senha(), PES_SALARIO: Usuario.Salario(),
                PES_LIMITE: Usuario.Limite(), PES_MINIMO: Usuario.Minimo()
            },
            success: function (Res) {
                if (Res == "Erro") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Opa...',
                        text: 'Usuário já cadastrado',
                    }).then((result) => {
                        $('#Email').addClass('is-invalid');
                    })
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Ok',
                        text: 'Usuário cadastrado',
                    }).then((result) => {
                        window.location.href = "/Login/Index";
                    })

                }
            },
            error: function () {
                alert("error");
            }
        });
    }




}
function login(Nome, Email, Senha, Salario, Limite, Minimo) {
    this.Nome = Nome
    this.Email = Email
    this.Senha = Senha
    this.Salario = Salario
    this.Limite = Limite
    this.Minimo = Minimo
}
function loginViewModel(prop) {
    this.Email = ko.observable(prop.Email);
    this.Nome = ko.observable(prop.Nome);
    this.Senha = ko.observable(prop.Senha);
    this.Salario = ko.observable(prop.Salario);
    this.Limite = ko.observable(prop.Limite);
    this.Minimo = ko.observable(prop.Minimo);
}
var prop = new login("", "")
var UserLogin = new loginViewModel(prop)
ko.applyBindings(UserLogin);