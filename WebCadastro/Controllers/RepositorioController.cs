using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebCadastro.Models;


namespace WebCadastro.Controllers
{
    public class RepositorioController : Controller
    {
        public ActionResult Salvar(Pessoas pessoa)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var Buscar = session.Query<Pessoas>().Where(i => i.PES_EMAIL == pessoa.PES_EMAIL).ToList();
                    if (Buscar.Count == 1)
                    {
                        return Json("Erro");
                    }
                    else
                    {
                        pessoa.PES_SENHA = BCrypt.Net.BCrypt.HashPassword(pessoa.PES_SENHA);
                        session.SaveOrUpdate(pessoa);
                        return Json("Certo");
                    }
                }
                catch
                {
                    throw;
                }

            }
        }
        public ActionResult Entrar(Pessoas pessoa)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var Login = session.Query<Pessoas>().Where(i => i.PES_EMAIL == pessoa.PES_EMAIL).ToList();
                    bool verified = BCrypt.Net.BCrypt.Verify(pessoa.PES_SENHA, Login[0].PES_SENHA);
                    if (verified)
                    {
                        HttpCookie Id = new HttpCookie("Id", Login[0].PES_ID.ToString());
                        Id.Expires = DateTime.Now.AddDays(2);
                        Response.Cookies.Add(Id);

                        return Json(Login);
                    }
                    else
                    {
                        return Json("Usuário não encontrado");
                    }
                } catch
                {
                    return Json("Usuário não encontrado");
                }
            }
        }
        public ActionResult Atualizar(Pessoas pessoa)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var Login = session.Query<Pessoas>().Where(i => i.PES_ID == pessoa.PES_ID).ToList();
                Login[0].PES_NOME = pessoa.PES_NOME;
                Login[0].PES_EMAIL = pessoa.PES_EMAIL;
                Login[0].PES_SENHA = BCrypt.Net.BCrypt.HashPassword(pessoa.PES_SENHA);
                Login[0].PES_SALARIO = pessoa.PES_SALARIO;
                Login[0].PES_LIMITE = pessoa.PES_LIMITE;
                Login[0].PES_MINIMO = pessoa.PES_MINIMO;
                session.Flush();
                return Json("C");
                
            }
        }
        public ActionResult Entrada(Entrada entrada)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var ValorStr = entrada.ENT_VALOR;
                var ValorReplaced = ValorStr.Replace(".", ",");
                var Valor = Convert.ToDecimal(ValorReplaced);
                var prevSaldo = session.Get<Pessoas>(entrada.PES_ID).PES_SALDO;
                var Saldo = prevSaldo + Valor;
                var pessoa = session.Query<Pessoas>().Where(i => i.PES_ID == entrada.PES_ID).ToList();
                
                try
                {
                    
                    session.SaveOrUpdate(entrada);
                    session.CreateSQLQuery("UPDATE Pessoas SET PES_SALDO = :SALDO WHERE PES_ID = :ID")
                        .SetParameter("SALDO", Saldo)
                        .SetParameter("ID", entrada.PES_ID)
                        .ExecuteUpdate();
                }
                catch
                {
                    throw;
                }
                return Json("Movimentação realizada");
            }
        }
        public ActionResult Saida(Saida saida)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var ValorStr = saida.SAI_VALOR;
                var ValorReplaced = ValorStr.Replace(".", ",");
                var Valor = Convert.ToDecimal(ValorReplaced);
                var prevSaldo = session.Get<Pessoas>(saida.PES_ID).PES_SALDO;
                var Saldo = prevSaldo - Valor;
                var Login = session.Get<Pessoas>(saida.PES_ID);
                try
                {       
                    session.SaveOrUpdate(saida);
                    session.CreateSQLQuery("UPDATE Pessoas SET PES_SALDO = :SALDO WHERE PES_ID = :ID")
                        .SetParameter("SALDO", Saldo)
                        .SetParameter("ID", saida.PES_ID)
                        .ExecuteUpdate();
                }
                catch
                {
                    throw;
                }
                return Json("Movimentação realizada");
            }
        }
        public ActionResult GetSaldo(int Id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var Saldo = session.Get<Pessoas>(Id);
                    return Json(Saldo.PES_SALDO);
                }
                catch
                {
                    throw;
                }
            }
        }
        public ActionResult GetNome(int Id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var Pessoa = session.Get<Pessoas>(Id);
                    return Json(Pessoa.PES_NOME);
                }
                catch
                {
                    throw;
                }
            }
        }
        public ActionResult GetUserInfo(int Id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var Pessoa = session.Query<Pessoas>().Where(x => x.PES_ID == Id).ToList();
                    return Json(Pessoa[0]);
                }
                catch
                {
                    throw;
                }
            }
        }
        public ActionResult UltimasMovimentacoes(int Id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var UltimasEnt = session.Query<Entrada>().Where(x => x.PES_ID == Id).ToList();
                    var UltimasSai = session.Query<Saida>().Where(x => x.PES_ID == Id).ToList();

                    List<MovimentoFinanceiro> retorno = new List<MovimentoFinanceiro>();
                    foreach (var saida in UltimasSai)
                    {
                        retorno.Add(new MovimentoFinanceiro() {
                            Data = saida.SAI_DATA,
                            Descricao = saida?.SAI_DESCRICAO,
                            Numero = saida.SAI_ID,
                            Saldo = saida.PES_SALDO,
                            Tipo = "Saída",
                            Valor = saida.SAI_VALOR
                        });
                    }
                    foreach (var entrada in UltimasEnt)
                        retorno.Add(new MovimentoFinanceiro()
                        {
                            Data = entrada.ENT_DATA,
                            Descricao = entrada?.ENT_DESCRICAO,
                            Numero = entrada.ENT_ID,
                            Saldo = entrada.PES_SALDO,
                            Tipo = "Entrada",
                            Valor = entrada.ENT_VALOR

                        });
                    retorno.OrderBy(x => x.Data);
                    return Json(retorno);
                }
                catch
                {
                    throw;
                }
            }
        }
        public ActionResult getAllUser()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var pessoas = session.Query<Pessoas>().ToList();
                    return Json(pessoas);
                }
                catch
                {
                    throw;
                }
            }
        }
        public ActionResult DeletarEnt(int Id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    session.CreateQuery("DELETE FROM Entrada WHERE ENT_ID = :Id")
                    .SetParameter("Id", Id)
                    .ExecuteUpdate();
                    return Json("Foi");
                } catch 
                {
                    throw;
                }
            }
        }
        public ActionResult DeletarSai(int Id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    session.CreateQuery("DELETE FROM Saida WHERE SAI_ID = :Id")
                    .SetParameter("Id", Id)
                    .ExecuteUpdate();
                    return Json("Foi");
                }
                catch
                {
                    throw;
                }
            }
        } 
        public ActionResult DeletarUsuario(int Id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                session.CreateQuery("DELETE FROM Saida WHERE PES_ID = :Id")
                .SetParameter("Id", Id)
                .ExecuteUpdate();
                session.CreateQuery("DELETE FROM Entrada WHERE PES_ID = :Id")
                .SetParameter("Id", Id)
                .ExecuteUpdate();
                session.CreateQuery("DELETE FROM Pessoas WHERE PES_ID = :Id")
                .SetParameter("Id", Id)
                .ExecuteUpdate();
                return Json("Usuário Deletado");
            }
        }
    }
}