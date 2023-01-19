using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCadastro.Models
{
    public class SaidaMap : ClassMap<Saida>
    {
        public SaidaMap()
        {
            Id(x => x.SAI_ID);
            Map(x => x.PES_ID);
            Map(x => x.SAI_DATA);
            Map(x => x.SAI_DESCRICAO);
            Map(x => x.SAI_VALOR);
            Map(x => x.PES_SALDO);
            Table("Saida");
        }
    }
}