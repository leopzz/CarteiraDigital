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
            HttpCookie Id = Request.Cookies["Id"];
            if (Id.Value == "3")
            {
                return View();
            }
            else
            {
                return Redirect("/Login/Index");
            }
           
        }
        public ActionResult Relatorio()
        {
            HttpCookie Id = Request.Cookies["Id"];
            if (Id.Value == "3")
            {
                return View();
            }
            else
            {
                return Redirect("/Login/Index");
            }

        }
        public ActionResult Movimentacao()
        {
            HttpCookie Id = Request.Cookies["Id"];
            if (Id.Value == "3")
            {
                return View();
            }
            else
            {
                return Redirect("/Login/Index");
            }

        }
        public ActionResult Conta()
        {
            HttpCookie Id = Request.Cookies["Id"];
            if (Id.Value == "3")
            {
                return View();
            }
            else
            {
                return Redirect("/Login/Index");
            }

        }
    }
}