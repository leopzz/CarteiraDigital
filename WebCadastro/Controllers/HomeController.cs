using DocumentFormat.OpenXml.Drawing.Charts;
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
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Movimentacao()
        {
            return View();
        }
        public ActionResult Relatorio()
        {
            return View();
        }
        public ActionResult Conta()
        {
            return View();
        }
    }
}
