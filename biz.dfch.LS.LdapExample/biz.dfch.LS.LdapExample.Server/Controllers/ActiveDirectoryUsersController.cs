using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.OData;
using System.Web.Http.OData.Extensions;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Query;
using LightSwitchApplication.Models;
using System.Diagnostics;
using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using System.Threading;
using System.DirectoryServices;
using System.Configuration;
using System.Reflection;

namespace LightSwitchApplication.Controllers
{
    public class ActiveDirectoryUsersController : ODataController
    {
        private static ODataValidationSettings _validationSettings = new ODataValidationSettings();
        private static DateTimeOffset _modified = DateTimeOffset.MinValue;
        private static DirectoryEntry _ldapConnection = null;
        private static DirectorySearcher _ldapSearch = null;
        private static string _ldapConnectionPath;
        private static string _ldapConnectionAuthenticationType;
        private static string _ldapConnectionUsername;
        private static string _ldapConnectionPassword;
        
        internal static void ModelBuilder(ODataConventionModelBuilder builder)
        {
            var EntitySetName = "ActiveDirectoryUsers";
            builder.EntitySet<Models.ActiveDirectoryUser>(EntitySetName);

            return;
        }
        public ActiveDirectoryUsersController()
        {
            string fn = string.Format("{0}:{1}", System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Namespace, System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name);
            Debug.WriteLine(fn);

            var ctx = ServerApplicationContext.Current;
            bool fContextCreated = false;
            try
            {
                bool fReturn = fReturn = false;
                if (null == ctx)
                {
                    fContextCreated = true;
                    ctx = ServerApplicationContext.CreateContext();
                }

                var Now = DateTimeOffset.Now;
                if (60 >= (Now - _modified).TotalMinutes) return;

                lock (this)
                {
                    _ldapConnectionPath = ConfigurationManager.AppSettings["ldapConnection.Path"];
                    //Debug.WriteLine(String.Format("_ldapConnectionPath: '{0}'", _ldapConnectionPath));
                    _ldapConnectionAuthenticationType = ConfigurationManager.AppSettings["ldapConnection.AuthenticationType"];
                    //Debug.WriteLine(String.Format("_ldapConnectionAuthenticationType: '{0}'", _ldapConnectionAuthenticationType));
                    _ldapConnectionUsername = ConfigurationManager.AppSettings["ldapConnection.Username"];
                    //Debug.WriteLine(String.Format("_ldapConnectionUsername: '{0}'", _ldapConnectionUsername));
                    _ldapConnectionPassword = ConfigurationManager.AppSettings["ldapConnection.Password"];
                    //Debug.WriteLine(String.Format("_ldapConnectionPassword: '{0}'", _ldapConnectionPassword));
                    
                    _ldapConnection = new DirectoryEntry();
                    _ldapConnection.Path = _ldapConnectionPath;
                    _ldapConnection.AuthenticationType = EnumUtil.Parse<AuthenticationTypes>(_ldapConnectionAuthenticationType);
                    _ldapConnection.Username = _ldapConnectionUsername;
                    _ldapConnection.Password = _ldapConnectionPassword;

                    _ldapSearch = new DirectorySearcher(_ldapConnection);
                    _ldapSearch.PropertiesToLoad.Add("*");
                    _ldapSearch.SizeLimit = 45;
                    _ldapSearch.Sort = new SortOption("cn", SortDirection.Ascending);
                }
                _modified = Now;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(String.Format("{0}: {1}\r\n{2}", ex.Source, ex.Message, ex.StackTrace));
                return;
            }
            finally
            {
                if (fContextCreated && (null != ctx))
                {
                    ctx.Dispose();
                }
            }
        }

        // GET: odata/ActiveDirectoryUsers
        [EnableQuery(PageSize = 45)]
        public async Task<IHttpActionResult> GetActiveDirectoryUsers(ODataQueryOptions<Models.ActiveDirectoryUser> queryOptions)
        {
            string fn = string.Format("{0}:{1}.{2}", this.GetType().Namespace, this.ControllerContext.ControllerDescriptor.ControllerName, this.ControllerContext.Request.GetActionDescriptor().ActionName);
            Debug.WriteLine(fn);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ctx = ServerApplicationContext.Current;
            bool fContextCreated = false;
            SearchResultCollection aUser = null;
            try
            {
                bool fReturn = fReturn = false;
                if (null == ctx)
                {
                    fContextCreated = true;
                    ctx = ServerApplicationContext.CreateContext();
                }
                queryOptions.Validate(_validationSettings);

                //string permissionId = string.Format("{0}:{1}{2}", "LightSwitchApplication", "ActiveDirectoryUser", "CanRead");
                //fReturn = ctx.Application.User.HasPermission(permissionId);
                //if (!fReturn)
                //{
                //    return StatusCode(HttpStatusCode.Unauthorized);
                //}

                var key = string.Format("{0}", ctx.Application.User.Name.Split('\\').Skip(1).FirstOrDefault());
                _ldapSearch.Filter = string.Format("(&(objectClass=user)(|(cn={0})(name={0})(sn={0})(sAMAccountName={0})(displayName={0})(mail={0})))", key);
                aUser = _ldapSearch.FindAll();
                var _list = new List<Models.ActiveDirectoryUser>();
                foreach (SearchResult user in aUser)
                {
                    var entity = ExtractActiveDirectoryUserProperties(user);
                    _list.Add(entity);
                }
                return Ok<IEnumerable<Models.ActiveDirectoryUser>>(_list);
                //return StatusCode(HttpStatusCode.NotImplemented);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(String.Format("{0}: {1}\r\n{2}", ex.Source, ex.Message, ex.StackTrace));
                return BadRequest(ex.Message);
            }
            finally
            {
                if (fContextCreated && (null != ctx))
                {
                    ctx.Dispose();
                }
                if (null != aUser)
                {
                    aUser.Dispose();
                }
            }
        }

        // GET: odata/ActiveDirectoryUsers(5)
        public async Task<IHttpActionResult> GetActiveDirectoryUser([FromODataUri] string key, ODataQueryOptions<Models.ActiveDirectoryUser> queryOptions)
        {
            string fn = string.Format("{0}:{1}.{2}", this.GetType().Namespace, this.ControllerContext.ControllerDescriptor.ControllerName, this.ControllerContext.Request.GetActionDescriptor().ActionName);
            Debug.WriteLine(fn);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ctx = ServerApplicationContext.Current;
            bool fContextCreated = false;
            SearchResultCollection aUser = null;
            //SearchResult user;
            try
            {
                bool fReturn = fReturn = false;
                if (null == ctx)
                {
                    fContextCreated = true;
                    ctx = ServerApplicationContext.CreateContext();
                }
                //string permissionId = string.Format("{0}:{1}{2}", "LightSwitchApplication", "ActiveDirectoryUser", "CanRead");
                //fReturn = ctx.Application.User.HasPermission(permissionId);
                //if (!fReturn)
                //{
                //    return StatusCode(HttpStatusCode.Unauthorized);
                //}

      
                _ldapSearch.Filter = string.Format("(&(objectClass=user)(|(cn={0})(name={0})(sn={0})(sAMAccountName={0})(displayName={0})(mail={0})))", key);
                aUser = _ldapSearch.FindAll();
                var _list = new List<Models.ActiveDirectoryUser>();
                foreach (SearchResult user in aUser)
                {
                    var entity = ExtractActiveDirectoryUserProperties(user);
                    _list.Add(entity);
                }
                return Ok<IEnumerable<Models.ActiveDirectoryUser>>(_list);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(String.Format("{0}: {1}\r\n{2}", ex.Source, ex.Message, ex.StackTrace));
                return BadRequest(ex.Message);
            }
            finally
            {
                if (fContextCreated && (null != ctx))
                {
                    ctx.Dispose();
                }
                if (null == aUser)
                {
                    aUser.Dispose();
                }
            }
        }

        // PUT: odata/ActiveDirectoryUsers(5)
        public async Task<IHttpActionResult> Put([FromODataUri] string key, Models.ActiveDirectoryUser ActiveDirectoryUser)
        {
            string fn = string.Format("{0}:{1}.{2}", this.GetType().Namespace, this.ControllerContext.ControllerDescriptor.ControllerName, this.ControllerContext.Request.GetActionDescriptor().ActionName);
            Debug.WriteLine(fn);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ctx = ServerApplicationContext.Current;
            bool fContextCreated = false;
            try
            {
                bool fReturn = fReturn = false;
                if (null == ctx)
                {
                    fContextCreated = true;
                    ctx = ServerApplicationContext.CreateContext();
                }
                string permissionId = string.Format("{0}:{1}{2}", "LightSwitchApplication", "ActiveDirectoryUser", "CanUpdate");
                fReturn = ctx.Application.User.HasPermission(permissionId);
                if (!fReturn)
                {
                    return StatusCode(HttpStatusCode.Unauthorized);
                }
                return StatusCode(HttpStatusCode.NotImplemented);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(String.Format("{0}: {1}\r\n{2}", ex.Source, ex.Message, ex.StackTrace));
                throw;
            }
            finally
            {
                if (fContextCreated && (null != ctx))
                {
                    ctx.Dispose();
                }
            }
        }

        // POST: odata/ActiveDirectoryUsers
        public async Task<IHttpActionResult> Post(Models.ActiveDirectoryUser ActiveDirectoryUser)
        {
            string fn = string.Format("{0}:{1}.{2}", this.GetType().Namespace, this.ControllerContext.ControllerDescriptor.ControllerName, this.ControllerContext.Request.GetActionDescriptor().ActionName);
            Debug.WriteLine(fn);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ctx = ServerApplicationContext.Current;
            bool fContextCreated = false;
            try
            {
                bool fReturn = fReturn = false;
                if (null == ctx)
                {
                    fContextCreated = true;
                    ctx = ServerApplicationContext.CreateContext();
                }
                string permissionId = string.Format("{0}:{1}{2}", "LightSwitchApplication", "ActiveDirectoryUser", "CanCreate");
                fReturn = ctx.Application.User.HasPermission(permissionId);
                if (!fReturn)
                {
                    return StatusCode(HttpStatusCode.Unauthorized);
                }
                return StatusCode(HttpStatusCode.NotImplemented);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(String.Format("{0}: {1}\r\n{2}", ex.Source, ex.Message, ex.StackTrace));
                throw;
            }
            finally
            {
                if (fContextCreated && (null != ctx))
                {
                    ctx.Dispose();
                }
            }
        }

        // PATCH: odata/ActiveDirectoryUsers(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] string key, Delta<Models.ActiveDirectoryUser> delta)
        {
            string fn = string.Format("{0}:{1}.{2}", this.GetType().Namespace, this.ControllerContext.ControllerDescriptor.ControllerName, this.ControllerContext.Request.GetActionDescriptor().ActionName);
            Debug.WriteLine(fn);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ctx = ServerApplicationContext.Current;
            bool fContextCreated = false;
            try
            {
                bool fReturn = fReturn = false;
                if (null == ctx)
                {
                    fContextCreated = true;
                    ctx = ServerApplicationContext.CreateContext();
                }
                string permissionId = string.Format("{0}:{1}{2}", "LightSwitchApplication", "ActiveDirectoryUser", "CanUpdate");
                fReturn = ctx.Application.User.HasPermission(permissionId);
                if (!fReturn)
                {
                    return StatusCode(HttpStatusCode.Unauthorized);
                }
                return StatusCode(HttpStatusCode.NotImplemented);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(String.Format("{0}: {1}\r\n{2}", ex.Source, ex.Message, ex.StackTrace));
                throw;
            }
            finally
            {
                if (fContextCreated && (null != ctx))
                {
                    ctx.Dispose();
                }
            }
        }

        // DELETE: odata/ActiveDirectoryUsers(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] string key)
        {
            string fn = string.Format("{0}:{1}.{2}", this.GetType().Namespace, this.ControllerContext.ControllerDescriptor.ControllerName, this.ControllerContext.Request.GetActionDescriptor().ActionName);
            Debug.WriteLine(fn);

            return StatusCode(HttpStatusCode.NotImplemented);

            var ctx = ServerApplicationContext.Current;
            bool fContextCreated = false;
            try
            {
                bool fReturn = fReturn = false;
                if (null == ctx)
                {
                    fContextCreated = true;
                    ctx = ServerApplicationContext.CreateContext();
                }
                string permissionId = string.Format("{0}:{1}{2}", "LightSwitchApplication", "ActiveDirectoryUser", "CanDelete");
                fReturn = ctx.Application.User.HasPermission(permissionId);
                if (!fReturn)
                {
                    return StatusCode(HttpStatusCode.Unauthorized);
                }
                return StatusCode(HttpStatusCode.NotImplemented);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(String.Format("{0}: {1}\r\n{2}", ex.Source, ex.Message, ex.StackTrace));
                throw;
            }
            finally
            {
                if (fContextCreated && (null != ctx))
                {
                    ctx.Dispose();
                }
            }
        }
        private Models.ActiveDirectoryUser ExtractActiveDirectoryUserProperties(SearchResult user)
        {
            if (null == user) throw new ArgumentNullException("user", "user: Parameter validation FAILED. SearchResult 'user' must not be 'null'.");

            var entity = new Models.ActiveDirectoryUser();
            foreach (System.Collections.DictionaryEntry property in user.Properties)
            {
                var propInfo = entity.GetType().GetProperty(property.Key.ToString(), BindingFlags.Public | BindingFlags.IgnoreCase | BindingFlags.Instance);
                if (null == propInfo) continue;
                var v = property.Value as ResultPropertyValueCollection;
                if (v[0] is Byte[])
                {
                    bool fResult = fResult = false;
                    var ab = v[0] as Byte[];
                    if (Guid.Empty.ToByteArray().Length == ab.Length)
                    {
                        var guid = new Guid(ab);
                        propInfo.SetValue(entity, guid.ToString());
                    }
                    else
                    {
                        var sid = new System.Security.Principal.SecurityIdentifier(ab, 0);
                        propInfo.SetValue(entity, sid.ToString());
                    }
                }
                else
                {
                    propInfo.SetValue(entity, v[0]);
                }
            }
            return entity;
        }
    }
}