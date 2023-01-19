using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCadastro.Models
{
    public class EntradaMap : ClassMap<Entrada>
    {
        public EntradaMap()
        {
            Id(x => x.ENT_ID);
            Map(x => x.PES_ID);
            Map(x => x.ENT_DATA);
            Map(x => x.ENT_DESCRICAO);
            Map(x => x.ENT_VALOR);
            Map(x => x.PES_SALDO);
            Table("Entrada");
        }
    }
}