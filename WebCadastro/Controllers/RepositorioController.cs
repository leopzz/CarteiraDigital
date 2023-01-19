using NHibernate;
using System;
using System.Collections;
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
                    session.SaveOrUpdate(pessoa);
                }
                catch (Exception ex)
                {
                    throw;
                }

            }
            return Json("Usuário Cadastrado");
        }
        public ActionResult Entrar(Pessoas pessoa)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var Login = session.Query<Pessoas>().Where(i => i.PES_EMAIL == pessoa.PES_EMAIL && i.PES_SENHA == pessoa.PES_SENHA).ToList();
                if (Login.Count <= 0)
                {
                    return Json("Usuário não encontrado");
                }
                else
                {
                    return Json(Login);
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
                Login[0].PES_SENHA = pessoa.PES_SENHA;
                Login[0].PES_SALARIO = pessoa.PES_SALARIO;
                Login[0].PES_LIMITE = pessoa.PES_LIMITE;
                Login[0].PES_MINIMO = pessoa.PES_MINIMO;
                session.Flush();
                return Json("Chegouaq");
                
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
                
                try
                {
                    session.SaveOrUpdate(entrada);
                    session.CreateSQLQuery("UPDATE Pessoas SET PES_SALDO = :SALDO WHERE PES_ID = :ID")
                        .SetParameter("SALDO", Saldo)
                        .SetParameter("ID", entrada.PES_ID)
                        .ExecuteUpdate();
                }
                catch (Exception ex)
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
                try
                {
                    session.SaveOrUpdate(saida);
                    session.CreateSQLQuery("UPDATE Pessoas SET PES_SALDO = :SALDO WHERE PES_ID = :ID")
                        .SetParameter("SALDO", Saldo)
                        .SetParameter("ID", saida.PES_ID)
                        .ExecuteUpdate();
                }
                catch (Exception ex)
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
                catch (Exception ex)
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
                catch (Exception ex)
                {
                    throw;
                }
            }
        }
        public ActionResult getUserInfo(int Id)
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                try
                {
                    var Pessoa = session.Get<Pessoas>(Id);
                    return Json(Pessoa);
                }
                catch (Exception ex)
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
                    //ArrayList lista = new ArrayList();
                    //lista.Add(UltimasSai);
                    //lista.Add(UltimasEnt);
                    return Json(retorno);
                }
                catch (Exception ex)
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
                catch (Exception ex)
                {
                    throw;
                }
            }
        }
    }
}