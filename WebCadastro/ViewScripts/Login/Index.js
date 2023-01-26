localStorage.clear()

function reset(Id) {
    $('#Nome').removeClass('is-invalid');
    $('#Senha').removeClass('is-invalid');
}


function Send(Usuario) {
    $.ajax({
        type: "POST",
        url: "/Repositorio/Entrar",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: { PES_EMAIL: Usuario.Email(), PES_SENHA: Usuario.Senha() },
        success: function (Response) {
            if (Response == "Usuário não encontrado") {
                Swal.fire({
                    icon: 'error',
                    title: 'Opa...',
                    text: 'Usuário não encontrado',
                }).then((result) => {
                    $('#Nome').addClass('is-invalid');
                    $('#Senha').addClass('is-invalid');
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Ok',
                    text: 'Login Realizado!',
                }).then((result) => {
                    localStorage.setItem("Id", Response[0].PES_ID)
                    localStorage.setItem("Nome", Response[0].PES_NOME)
                    window.location.href = "/Home/Index"
                })
            };
        },
        error: function () {
            alert("error");
        }
    });
}
function login(Email, Senha) {
    this.Email = Email
    this.Senha = Senha
}
function loginViewModel(prop) {
    this.Email = ko.observable(prop.Email);
    this.Senha = ko.observable(prop.Senha);
}
var prop = new login("", "")
var UserLogin = new loginViewModel(prop)
ko.applyBindings(UserLogin);