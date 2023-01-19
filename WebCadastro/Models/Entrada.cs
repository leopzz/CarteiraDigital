using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCadastro.Models
{
    public class Entrada
    {
        public virtual int ENT_ID { get; set; }
        public virtual int PES_ID { get; set; }
        public virtual DateTime ENT_DATA { get; set; }
        public virtual string ENT_DESCRICAO { get; set; }
        public virtual string ENT_VALOR { get; set; }
        public virtual string PES_SALDO { get; set; }
      
    }
}