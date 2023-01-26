using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebCadastro.Controllers
{
    public class AdmController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Relatorio()
        {
            return View();
        }
        public ActionResult Movimentacao()
        {
            return View();
        }
        public ActionResult Conta()
        {
            return View();
        }
    }
}