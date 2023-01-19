using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebCadastro.Models
{
    public class MovimentoFinanceiro
    {
        public int Numero { get; set; }
        public string Tipo { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public string Valor { get; set; }
        public string Saldo { get; set; }
    }
}