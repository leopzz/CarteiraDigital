using System.Web;
using System.Web.Optimization;

namespace WebCadastro
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));


            bundles.Add(new ScriptBundle("~/bundles/Login/Index").Include("~/ViewScripts/Login/Index.js"));
            bundles.Add(new ScriptBundle("~/bundles/Login/Register").Include("~/ViewScripts/Login/Register.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/Home/Index").Include("~/ViewScripts/Home/Index.js"));
            bundles.Add(new ScriptBundle("~/bundles/Home/Conta").Include("~/ViewScripts/Home/Conta.js"));
            bundles.Add(new ScriptBundle("~/bundles/Home/Movimentacao").Include("~/ViewScripts/Home/Movimentacao.js"));
            bundles.Add(new ScriptBundle("~/bundles/Home/Relatorio").Include("~/ViewScripts/Home/Relatorio.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/Adm/Relatorio").Include("~/ViewScripts/Adm/Relatorio.js"));
            bundles.Add(new ScriptBundle("~/bundles/Adm/Movimentacao").Include("~/ViewScripts/Adm/Movimentacao.js"));
            bundles.Add(new ScriptBundle("~/bundles/Adm/Index").Include("~/ViewScripts/Adm/Index.js"));
            bundles.Add(new ScriptBundle("~/bundles/Adm/Conta").Include("~/ViewScripts/Adm/Conta.js"));





            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // pronto para a produção, utilize a ferramenta de build em https://modernizr.com para escolher somente os testes que precisa.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
