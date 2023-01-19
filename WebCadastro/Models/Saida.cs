using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCadastro.Models
{
    public class Saida
    {
        public virtual int SAI_ID { get; set; }
        public virtual int PES_ID { get; set; }
        public virtual DateTime SAI_DATA { get; set; }
        public virtual string SAI_DESCRICAO { get; set; }
        public virtual string SAI_VALOR { get; set; }
        public virtual string PES_SALDO { get; set; }
    }
}