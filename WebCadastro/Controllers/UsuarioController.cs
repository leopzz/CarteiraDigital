using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NHibernate;
using NHibernate.Linq;
using WebCadastro.Models;

namespace WebCadastro.Controllers
{
    public class UsuarioController : Controller
    {
        public ActionResult Users()
        {
            using (ISession session = NHibernateHelper.OpenSession())
            {
                var users = session.Query<Pessoas>().ToList();
                return View(users);
            }
        }
    }
}