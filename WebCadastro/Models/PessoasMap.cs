using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using FluentNHibernate.Mapping;


namespace WebCadastro.Models
{
    public class PessoasMap : ClassMap<Pessoas>
    {
        public PessoasMap()
        {
            Id(x => x.PES_ID);
            Map(x => x.PES_NOME);
            Map(x => x.PES_EMAIL);
            Map(x => x.PES_SENHA);
            Map(x => x.PES_SALARIO);
            Map(x => x.PES_LIMITE);
            Map(x => x.PES_MINIMO);
            Map(x => x.PES_SALDO);
            Table("Pessoas");
        }
    }
}