using Microsoft.Extensions.DependencyInjection;
using NHibernate.Cfg;
using NHibernate.Cfg.MappingSchema;
using NHibernate.Dialect;
using NHibernate.Mapping.ByCode;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCadastro.Models
{
    public class Pessoas
    {
        public virtual int PES_ID { get; set; }
        public virtual string PES_NOME { get; set; }
        public virtual string PES_EMAIL { get; set; }
        public virtual decimal PES_SALARIO { get; set; }
        public virtual decimal PES_LIMITE { get; set; }
        public virtual decimal PES_MINIMO { get; set; }
        public virtual decimal PES_SALDO { get; set; }
        public virtual string PES_SENHA { get; set; }
    }

}