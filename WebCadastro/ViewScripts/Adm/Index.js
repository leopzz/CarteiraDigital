function PageCheck() {
    if (sessionStorage.getItem("Id") == null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nenhum usuário selecionado',
        })
        return false
    } else {
        return true
    }
}

function Sair() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/Login/Index"
}

if (sessionStorage.length == 0)
    document.getElementById("Traco").style.visibility = "hidden"

function call(Filtro) {
    var Nome = Filtro.BuscarNome()
    var Email = Filtro.BuscarEmail()
    var Id = Filtro.BuscarId()
    if (Id == null || Id == "") {
        if (Nome == null || Nome == "" && Email == null || Email == "") {
            Render(DATA)
        } else if (Nome == null || Nome == "" && Email != null) {
            var filterEmail = DATA.filter(i => i.PES_EMAIL.match(Email))
            Render(filterEmail)
        } else if (Email == null || Email == "" && Nome != null) {
            var filterNome = DATA.filter(i => i.PES_NOME.match(Nome))
            Render(filterNome)
        } else {
            var filterNomeEmail = DATA.filter(i => i.PES_NOME.match(Nome) && i.PES_EMAIL.match(Email))
            Render(filterNomeEmail)
        }
    }
    else {
        var filterId = DATA.filter(i => parseInt(i.PES_ID).toString().match(Id.toString()))
        if (Nome == null || Nome == "" && Email == null || Email == "") {
            Render(filterId)
        } else {
            if (Email == null || Email == "") {
                var filterIdName = filterId.filter(i => i.PES_NOME.match(Nome))
                Render(filterIdName)
            } else {
                filterIdEmail = filterId.filter(i => i.PES_EMAIL.match(Email))
                Render(filterIdEmail)
            }
        }
    }
}



var DATA;
$.ajax({
    async: false,
    type: "POST",
    url: "/Repositorio/getAllUser",
    content: "application/json; charset=utf-8",
    dataType: "json",
    data: {},
    success: function (Response) {
        DATA = Response
    },
    error: function () {
        alert("error");
    }
});
Render(DATA)
function Render(Res) {
    $("#Tabela").html('').appendTo($("#Tabela"));
    var ResLis = Res.reverse()
    for (var i in Res) {
        var Id = Res[i].PES_ID
        var Desc = Res[i].Descricao
        $("#Tabela").add('<tr id=' + Res[i].PES_ID + '><th scope="row" class="align-middle">' + Res[i].PES_ID + '</th></tr>').appendTo($("#Tabela"));
        $(document.getElementById(Id)).add('<td class="align-middle">' + Res[i].PES_NOME + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle">' + Res[i].PES_EMAIL + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle"> R$' + Res[i].PES_SALARIO + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle"> R$' + Res[i].PES_LIMITE + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle"> R$' + Res[i].PES_MINIMO + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<td class="align-middle"> R$' + Res[i].PES_SALDO + '</td>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<th><button id="' + "BTN" + Res[i].PES_ID + '" onclick="{Selecionar(this.id)}" class="btn btn-default">Selecionar</button></th>').appendTo(document.getElementById(Id));
        $(document.getElementById(Id)).add('<th><button id="' + "BTN" + Res[i].PES_ID + '" onclick="{Deletar(this.id)}" class="btn btn-danger">Deletar</button></th>').appendTo(document.getElementById(Id));
    }

}
var DATA;
function Selecionar(IdT) {
    var Id = IdT.split("BTN")[1]
    sessionStorage.setItem("Id", Id)
    $.ajax({
        async: false,
        type: "POST",
        url: "/Repositorio/getNome",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: { Id: Id },
        success: function (Response) {
            Swal.fire({
                icon: 'success',
                title: 'Ok!',
                text: 'Usuário '+Id+' selecionado!',
            })
            console.log("123")
            document.getElementById("Traco").style.visibility = "visible"
            DATA = Response
            Movimento.Nome(DATA)
            sessionStorage.setItem("Nome", DATA)
        },
        error: function () {
            alert("error");
        }
    });
}
function Deletar(IdT) {
    var Id = IdT.split("BTN")[1]
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
            Swal.fire({
                icon: 'success',
                title: 'Ok!',
                text: 'Usuário deletado!',
            }).then((result) => {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "/Repositorio/DeletarUsuario",
                    content: "application/json; charset=utf-8",
                    dataType: "json",
                    data: { Id: Id },
                });
                window.location.href = "/Adm/Index"
            })  
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Cancelado!',
                text: 'Usuário não foi deletado!',
            })
        }
    })
}
function movimentacao(Nome, BuscarId, BuscarNome, BuscarEmail) {
    this.Nome = Nome
    this.BuscarId = BuscarId
    this.BuscarNome = BuscarNome
    this.BuscarEmail = BuscarEmail
}
function movimentacaoViewModel(prop) {
    this.Nome = ko.observable(prop.Nome);
    this.BuscarId = ko.observable(prop.BuscarId);
    this.BuscarNome = ko.observable(prop.BuscarNome);
    this.BuscarEmail = ko.observable(prop.BuscarEmail);

}
var prop = new movimentacao("", "")
var Movimento = new movimentacaoViewModel(prop)
Movimento.Nome(sessionStorage.getItem("Nome"))
ko.applyBindings(Movimento);