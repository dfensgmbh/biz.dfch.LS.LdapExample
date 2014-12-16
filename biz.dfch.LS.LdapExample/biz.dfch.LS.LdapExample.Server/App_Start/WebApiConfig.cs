
using System.Web.Http;
using System.Web.Http.OData.Extensions;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Batch;
using Microsoft.Data.Edm;
using System.Diagnostics;

namespace LightSwitchApplication
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            Debug.Write("WebApiConfig::Register() START");
            config.Routes.MapODataServiceRoute(
                    routeName: "Utilities.svc"
                    ,
                    routePrefix: "Utilities.svc"
                    ,
                    model: GetModel("Utilities")
                    ,
                    // Install-Package Microsoft.AspNet.WebApi.WebHost
                    batchHandler: new DefaultODataBatchHandler(GlobalConfiguration.DefaultServer)
                );
            config.MapHttpAttributeRoutes();
            //config.EnableQuerySupport();
            Debug.Write("WebApiConfig::Register() END");
        }
        private static IEdmModel GetModel(string ContainerName)
        {
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.ContainerName = ContainerName;
            Controllers.ActiveDirectoryUsersController.ModelBuilder(builder);
            return builder.GetEdmModel();
        }
    }
}
